import React, {
  createContext, useContext, useState, useEffect, useMemo,
} from 'react';
import { useAuth } from 'contexts/user/AuthContext';
import PropTypes from 'prop-types';

const SystemContext = createContext();

const API = JSON.parse(process.env.REACT_APP_DEVELOPMENT)
  ? `${process.env.REACT_APP_DEV_DOMAIN}api/systems/`
  : `${process.env.REACT_APP_PROD_DOMAIN}api/systems/`;

const APIConnect = JSON.parse(process.env.REACT_APP_DEVELOPMENT)
  ? `${process.env.REACT_APP_DEV_DOMAIN}api/ssh/`
  : `${process.env.REACT_APP_PROD_DOMAIN}api/ssh/`;

export const SystemProvider = ({ children }) => {
  const [userSystems, setUserSystems] = useState([]);
  const [activeSystem, setActiveSystem] = useState();
  const [isLoading, setIsLoading] = useState();
  const [isAdding, setIsAdding] = useState(false);
  const [isConnecting, setIsconnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [directoryState, setDirectoryState] = useState({});
  const [copyContent, setCopyContent] = useState(null);
  const [openFileContents, setOpenFileContents] = useState(null);
  const [sysErrors, setSysErrors] = useState([]);
  const [myState, setMyState] = useState('smile');

  const { signOut } = useAuth();

  useEffect(() => {
    setIsLoading(true);
    const storedSystems = localStorage.getItem('systems');
    if (storedSystems) {
      setUserSystems(JSON.parse(storedSystems));
    }

    const storedActive = localStorage.getItem('active');
    if (storedActive) {
      setActiveSystem(JSON.parse(storedActive));
      setIsConnected(true);
    }

    const storedDirectories = localStorage.getItem('directoryState');
    if (storedDirectories) {
      setDirectoryState(JSON.parse(storedDirectories));
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (activeSystem && isConnected) {
      localStorage.setItem('active', JSON.stringify(activeSystem));
    } else {
      localStorage.removeItem('active');
    }
  }, [isConnected]);

  useEffect(() => {
    if (userSystems) {
      localStorage.setItem('systems', JSON.stringify(userSystems));
    } else {
      localStorage.removeItem('systems');
    }
  }, [userSystems]);

  useEffect(() => {
    if (directoryState) {
      localStorage.setItem('directoryState', JSON.stringify(directoryState));
    } else {
      localStorage.removeItem('directoryState');
    }
  }, [directoryState]);

  const getHeaders = () => ({
    'Content-Type': 'application/json',
    'x-auth-token': localStorage.getItem('token'),
  });

  const fetchData = async (endpoint, method, body) => (
    fetch(endpoint, { method, headers: getHeaders(), body })
  );

  const addSystem = async (formData) => {
    let data;
    setIsLoading(() => true);
    try {
      const response = await fetchData(`${API}system/create`, 'POST', JSON.stringify(formData));
      data = await response.json();
      if (data?.msg === 'Token is not valid') {
        signOut();
      }
      if (!data.errors) {
        setUserSystems((prev) => [...prev, data]);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
    return data;
  };

  const getAllSystems = async () => {
    let data;
    setIsLoading(() => true);
    try {
      const response = await fetchData(`${API}retrieve/all`, 'GET');
      data = await response.json();
      if (data?.msg === 'Token is not valid') {
        signOut();
      }
      setUserSystems(() => data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(() => false);
    }
    return data;
  };

  const disconnectFromSystem = () => {
    setActiveSystem(() => null);
    setIsConnected(() => false);
  };

  const selectActiveSystem = (system) => {
    disconnectFromSystem();
    setActiveSystem(() => system);
  };

  const directoryTraverse = async (folderName, showHiddenFiles) => {
    setIsLoading(true);
    const backendData = { folderName, _id: activeSystem._id, showHiddenFiles };
    let data;
    try {
      const response = await fetchData(`${APIConnect}getFolders`, 'POST', JSON.stringify(backendData));
      data = await response.json();
      if (data?.msg === 'Token is not valid') {
        signOut();
      }
      if (!data.errors) {
        setDirectoryState(() => data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
    return data;
  };

  const connectToSystem = async (formData) => {
    setIsconnecting(() => true);
    let data;
    try {
      const response = await fetchData(`${APIConnect}connect`, 'POST', JSON.stringify(formData));
      data = await response.json();
      if (data?.msg === 'Token is not valid') {
        signOut();
      }
      if (!data.errors) {
        setIsConnected(true);
        setDirectoryState(() => data);
        setActiveSystem(data.systemData);
        directoryTraverse('homesysgopoopskinull');
      }
    } catch (err) {
      setIsConnected(false);
    } finally {
      setIsconnecting(false);
    }
    return data;
  };

  const handleCopyContent = (content) => {
    setCopyContent(() => ({
      targetName: content?.fileName,
      targetLocation: content?.location?.session,
    }));
  };

  const handlePasteContent = async (content) => {
    setIsLoading(true);
    const backendData = {
      sourceName: copyContent?.targetName || null,
      sourceLocation: copyContent?.targetLocation || null,
      targetLocation: content?.location?.session || null,
      _id: activeSystem._id,
    };
    let data;
    try {
      const response = await fetchData(`${APIConnect}pasteControl`, 'POST', JSON.stringify(backendData));
      data = await response.json();
      if (data?.msg === 'Token is not valid') {
        signOut();
      }
      if (!data.errors) {
        directoryTraverse('homesysgopoopskinull');
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
    return data;
  };

  const handleRenameContent = async (content) => {
    setIsLoading(true);
    const backendData = {
      sourceName: content?.sourceName || null,
      sourceLocation: content?.sourceLocation?.session || null,
      targetName: content?.targetName || null,
      _id: activeSystem._id,
    };
    let data;
    try {
      const response = await fetchData(`${APIConnect}rename`, 'POST', JSON.stringify(backendData));
      data = await response.json();
      if (data?.msg === 'Token is not valid') {
        signOut();
      }
      if (!data.errors) {
        directoryTraverse('homesysgopoopskinull');
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
    return data;
  };

  const handleInformationFileFolder = async (content) => {
    setIsLoading(true);
    const backendData = {
      sourceName: content?.fileName || null,
      sourceLocation: content?.sourceLocation?.session || null,
      _id: activeSystem._id,
    };
    let data;
    try {
      const response = await fetchData(`${APIConnect}information`, 'POST', JSON.stringify(backendData));
      data = await response.json();
      if (data?.msg === 'Token is not valid') {
        signOut();
      }
      if (!data.errors) {
        directoryTraverse('homesysgopoopskinull');
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
    return data;
  };

  const getFileContents = async (content) => {
    setIsLoading(true);
    const backendData = {
      sourceName: content?.fileName || null,
      sourceLocation: content?.sourceLocation?.session || null,
      _id: activeSystem._id,
    };
    let data;
    try {
      const response = await fetchData(`${APIConnect}readFile`, 'POST', JSON.stringify(backendData));
      data = await response.json();
      if (data?.msg === 'Token is not valid') {
        signOut();
      }
      data.sourceName = backendData.sourceName;
      setOpenFileContents(data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
    return data;
  };

  const activateModule = async (content) => {
    setIsLoading(true);
    const backendData = {
      moduleName: content?.moduleName || null,
      _id: activeSystem._id,
    };
    let data;
    try {
      const response = await fetchData(`${APIConnect}activateModule`, 'POST', JSON.stringify(backendData));
      data = await response.json();
      if (data?.msg === 'Token is not valid') {
        signOut();
      }
      if (!data.errors) {
        setActiveSystem(() => data.updatedSystem);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
    return data;
  };

  const deactivateModule = async (content) => {
    setIsLoading(true);
    const backendData = {
      moduleName: content?.moduleName || null,
      _id: activeSystem._id,
    };
    let data;
    try {
      const response = await fetchData(`${APIConnect}deactivateModule`, 'POST', JSON.stringify(backendData));
      data = await response.json();
      if (data?.msg === 'Token is not valid') {
        signOut();
      }
      if (!data.errors) {
        setActiveSystem(() => data.updatedSystem);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
    return data;
  };

  const PM2DataGrab = async (currentApp = '') => {
    setIsLoading(true);
    setMyState('blink');
    const backendData = {
      _id: activeSystem._id,
      currentLog: currentApp,
    };
    let data;
    try {
      const response = await fetchData(`${APIConnect}pm2ModuleData`, 'POST', JSON.stringify(backendData));
      data = await response.json();
      if (data?.msg === 'Token is not valid') {
        signOut();
      }
    } catch (err) {
      console.log(err);
      return { errors: [{ msg: { level: 'Server Error - Please contact support' } }] };
    } finally {
      setIsLoading(false);
      setMyState('smile');
    }
    return data;
  };

  const PM2ServiceControl = async (content) => {
    setIsLoading(true);
    const backendData = {
      _id: activeSystem._id,
      action: content.action,
      application_id: content.application_id,
    };
    let data;
    try {
      const response = await fetchData(`${APIConnect}pm2Control`, 'POST', JSON.stringify(backendData));
      data = await response.json();
      if (data?.msg === 'Token is not valid') {
        signOut();
      }
    } catch (err) {
      console.log(err);
    }
    return data;
  };

  const NginxGrabData = async () => {
    setIsLoading(true);
    setMyState('blink');
    const backendData = {
      _id: activeSystem._id,
    };
    let data;
    try {
      const response = await fetchData(`${APIConnect}nginxModuleData`, 'POST', JSON.stringify(backendData));
      data = await response.json();
      if (data?.msg === 'Token is not valid') {
        signOut();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
      setMyState('smile');
    }
    return data;
  };

  const Apache2GrabData = async () => {
    setIsLoading(true);
    const backendData = {
      _id: activeSystem._id,
    };
    let data;
    try {
      const response = await fetchData(`${APIConnect}apache2ModuleData`, 'POST', JSON.stringify(backendData));
      data = await response.json();
      if (data?.msg === 'Token is not valid') {
        signOut();
      }
    } catch (err) {
      return { errors: [{ msg: { level: 'Server Error - Please contact support' } }] };
    } finally {
      setIsLoading(false);
    }
    return data;
  };

  const GetSystemInfo = async () => {
    if (!activeSystem._id) {
      return { errors: [{ msg: { level: 'No active System' } }] };
    }
    const backendData = {
      _id: activeSystem._id,
    };
    let data;
    try {
      const response = await fetchData(`${APIConnect}systemInfo`, 'POST', JSON.stringify(backendData));
      data = await response.json();
      if (data?.msg === 'Token is not valid') {
        signOut();
      }
    } catch (err) {
      return { errors: [{ msg: { level: 'Server Error - Please contact support' } }] };
    }
    return data;
  };

  const value = useMemo(() => ({
    getAllSystems,
    addSystem,
    userSystems,
    isAdding,
    setIsAdding,
    connectToSystem,
    activeSystem,
    setActiveSystem,
    selectActiveSystem,
    disconnectFromSystem,
    isConnecting,
    isConnected,
    setIsconnecting,
    directoryState,
    directoryTraverse,
    copyContent,
    setCopyContent,
    handleCopyContent,
    handlePasteContent,
    handleRenameContent,
    handleInformationFileFolder,
    getFileContents,
    openFileContents,
    setOpenFileContents,
    setIsLoading,
    isLoading,
    activateModule,
    deactivateModule,
    PM2DataGrab,
    PM2ServiceControl,
    NginxGrabData,
    Apache2GrabData,
    sysErrors,
    setSysErrors,
    myState,
    GetSystemInfo,
  }), [
    userSystems,
    isAdding,
    activeSystem,
    isConnecting,
    isConnected,
    directoryState,
    copyContent,
    openFileContents,
    isLoading,
    myState,
    sysErrors,
  ]);

  return (
    <SystemContext.Provider
      value={value}
    >
      {children}
    </SystemContext.Provider>
  );
};

SystemProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useSystem() {
  return useContext(SystemContext);
}
