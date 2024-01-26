import { Navigate } from 'react-router-dom';
import { context } from '../ui';

const { isTokenAlive, isTokenValid } = utils


export default ({ url, children }) => {

    const token = context.token

    isTokenAlive(token)
    isTokenValid(token)

    if (!isTokenAlive(token) || !isTokenValid(token)) {
        return <Navigate to={url} replace />;
    }
    return children;
};  