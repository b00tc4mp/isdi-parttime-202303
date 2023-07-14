import {
    Navigate
} from 'react-router-dom';
import { context } from '../ui';

export default ({ url, children }) => {

    const token = context.token

    if (!token) {
        return <Navigate to={url} replace />;
    }
    return children;
}; 