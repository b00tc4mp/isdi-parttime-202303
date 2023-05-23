import { useEffect, useContext } from 'react';
import Context from './Context';

const inLogger = (WrappedComponent) => {
  const componentName = WrappedComponent.name || 'Component';

  const Logger = (props) => {
    const logger = useContext(Context);

    useEffect(() => {
      console.log(`[%c${componentName}] Mounted`, 'color: teal; font-weight: bold');

      return () => {
        console.log(`[%c${componentName}] Unmounted`, 'color: cornflowerBlue; font-weight: bold');
      };
    }, [logger]);


    const handleAlert = (message, level) => {
      console.log(`[%c${componentName}] ${message}`, `font-weight: bold; color: ${level === 'danger' ? 'fireBrick' : level === 'success' ? 'forestGreen' : 'rebeccaPurple'}`);
    };

    return <WrappedComponent {...props} handleAlert={handleAlert} />;

  };

  return Logger;
};

export default inLogger;