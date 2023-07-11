import { useEffect } from 'react';

const inLogger = (WrappedComponent) => {

  const componentName = WrappedComponent.name || 'Component';

  const Logger = (props) => {
    useEffect(() => {
      inLogger.on && console.log(`%c[${componentName}] Mounted`, 'color: teal; font-weight: bold');

      return () => {
        inLogger.on && console.log(`%c[${componentName}] Unmounted`, 'color: cornflowerBlue; font-weight: bold');
      };
    }, []);

    useEffect(() => {
      inLogger.on && console.log(`%c[${componentName}] Rendered`, 'color: dodgerBlue; font-weight: bold');
    });

    const log = (message, level) => {
      inLogger.on && console.log(`%c[${componentName}] ${message}`, `font-weight: bold; color: ${level === 'danger' ? 'fireBrick' : level === 'success' ? 'forestGreen' : 'rebeccaPurple'}`);
    };

    return <WrappedComponent {...props} log={log} />;

  };

  return Logger;
};

inLogger.on = true;
export default inLogger;