import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import PropTypes from 'prop-types';

// TODO
// Revamp, find a better solution that is a 1-1 of any OS Shell.

// RENAME - This isnt a TerminalBlock as much as it is a syntax interpreter at this point.

const TerminalBlock = ({ codeLanguage, code, extra }) => (
  <SyntaxHighlighter
    language={codeLanguage}
    style={materialDark}
    customStyle={{
      fontSize: '13px',
    }}
    className={`${extra} module-content scrollbar-hide`}
  >
    {code}
  </SyntaxHighlighter>
);

TerminalBlock.propTypes = {
  codeLanguage: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  extra: PropTypes.string,
};

TerminalBlock.defaultProps = {
  extra: '',
};

export default TerminalBlock;
