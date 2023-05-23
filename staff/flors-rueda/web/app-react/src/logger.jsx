import { useEffect } from 'react';

const inLogger = (WrappedComponent) => {
  const componentName = WrappedComponent.name || 'Component';

  const Logger = (props) => {
    useEffect(() => {
      console.log(`%c[${componentName}] Mounted`, 'color: green; font-weight: bold');

      return () => {
        console.log(`%c[${componentName}] Unmounted`, 'color: orange; font-weight: bold');
      };
    }, []);

    return <WrappedComponent {...props} />;
  };

  return Logger;
};

export default inLogger;