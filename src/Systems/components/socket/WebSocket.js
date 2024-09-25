// TODO
// REFACTOR AND FIND BETTER SOLUTION - TERMCONN
// SRC- TerminalSelect.js

import React, { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import PropTypes from 'prop-types';

const socketAdd = JSON.parse(process.env.REACT_APP_DEVELOPMENT)
  ? process.env.REACT_APP_WEBSOKET_DEV
  : process.env.REACT_APP_WEBSOCKET_PROD;

const WebSocketComponent = ({ activeSystem }) => {
  const terminalRef = useRef(null);
  const fitAddon = new FitAddon();

  useEffect(() => {
    if (activeSystem) {
      let bufferedInput = '';
      try {
        const terminal = new Terminal({
          scrollback: 0,
        });

        terminal.loadAddon(fitAddon);

        if (terminalRef.current) {
          terminal.open(terminalRef.current);
          fitAddon.fit();

          const ws = new WebSocket(socketAdd);
          const dataToSend = {
            systemId: activeSystem._id,
          };

          ws.onopen = () => {
            ws.send(JSON.stringify(dataToSend));
          };

          ws.onmessage = (event) => {
            if (bufferedInput.length > 0 && event.data.startsWith(bufferedInput)) {
              terminal.write(event.data.split(bufferedInput)[1]);
              bufferedInput = '';
            } else {
              terminal.write(event.data);
              bufferedInput = '';
            }
            terminal.scrollToBottom();
          };

          ws.onclose = () => {
            terminal.reset();
          };

          ws.onerror = (error) => {
            console.error('WebSocket error:', error);
          };

          terminal.onData((data) => {
            if (data === '\r') {
              ws.send(bufferedInput);
            } else if (data === '\x7F') {
              bufferedInput = bufferedInput.slice(0, -1);
              terminal.write('\x1B[D\x1B[P');
            } else {
              bufferedInput += data;
              terminal.write(data);
            }
          });

          terminal.onResize((size) => {
            const { cols, rows } = size;
            ws.send(`resize:${cols},${rows}`);
            terminal.clear();
          });

          return () => {
            if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING) {
              ws.close();
            }
          };
        }
      } catch (err) {
        console.log(err);
      }
    }
    return null;
  }, []);

  return (
    <div className="w-full h-full">
      <div ref={terminalRef} />
    </div>
  );
};

WebSocketComponent.propTypes = {
  activeSystem: PropTypes.object.isRequired,
};

export default WebSocketComponent;
