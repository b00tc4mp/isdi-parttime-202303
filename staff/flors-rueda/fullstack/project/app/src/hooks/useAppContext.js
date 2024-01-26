import { useContext } from 'react';
import AppContext from '../AppContext';

/**
 * Custom hook for accessing the application context.
 *
 * @returns {object} The application context value.
 */
const useAppContext = () => useContext(AppContext);

export default useAppContext;