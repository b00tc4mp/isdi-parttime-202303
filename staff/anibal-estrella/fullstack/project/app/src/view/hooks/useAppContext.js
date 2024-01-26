// import { useContext } from "react"
// import Context from "../../AppContext"
// //if youu use "export default" with an arrow function, dont name it, only where receive it
// export default () => useContext(Context)ç


// customHooks.js
import { useContext } from 'react';
import Context from '../../AppContext';
import { useNavigate } from 'react-router-dom';

const useAppContext = () => {
    const context = useContext(Context);
    const navigate = useNavigate();

    if (!context) {
        throw new Error('useAppContext must be used within an AppContextProvider');
    }

    return {
        ...context,
        navigate,
    };
};

export default useAppContext;
