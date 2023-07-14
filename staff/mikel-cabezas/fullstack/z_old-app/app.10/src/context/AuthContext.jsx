const AuthProvider = ({ children }) => {
    const [token, setToken] = React.useState(null);

    const handleLogin = async () => {
        const token = await fakeAuth();

        setToken(token);
    };

    const handleLogout = () => {
        setToken(null);
    };

    const value = {
        token,
        onLogin: handleLogin,
        onLogout: handleLogout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
