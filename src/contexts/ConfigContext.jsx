import React, { createContext, useState, useContext, useEffect } from 'react';

const ConfigContext = createContext();

export const useConfig = () => useContext(ConfigContext);

export const ConfigProvider = ({ children }) => {
    // App Config
    const [appConfig, setAppConfig] = useState({
        title: 'PANGUNI UTHTHIRAM DFW WALK',
        subtitle: 'ADMIN CONSOLE',
        logo: '/temple logo.jpg' // Default logo
    });

    // Auth State
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    // Load from localStorage on mount (mock persistence)
    useEffect(() => {
        const storedConfig = localStorage.getItem('appConfig');
        if (storedConfig) {
            try {
                const parsed = JSON.parse(storedConfig);
                if (parsed && typeof parsed === 'object') {
                    if (!parsed.logo) parsed.logo = '/temple logo.jpg';
                    setAppConfig(prev => ({ ...prev, ...parsed }));
                }
            } catch (e) {
                console.error("Failed to parse appConfig", e);
            }
        }

        const storedAuth = localStorage.getItem('isAuthenticated');
        const storedName = localStorage.getItem('userName');
        if (storedAuth === 'true') {
            setIsAuthenticated(true);
            setUser({ name: storedName || 'Admin User', role: 'Administrator' });
        }
    }, []);

    const updateConfig = (newConfig) => {
        const updated = { ...appConfig, ...newConfig };
        setAppConfig(updated);
        localStorage.setItem('appConfig', JSON.stringify(updated));
    };

    const login = (email, password) => {
        // Mock Login
        if (email && password) {
            const displayName = email.includes('@') ? email.split('@')[0] : email;
            const formattedName = displayName.charAt(0).toUpperCase() + displayName.slice(1);

            setIsAuthenticated(true);
            setUser({ name: formattedName, role: 'Administrator' });
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('userName', formattedName);
            return true;
        }
        return false;
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userName');
    };

    return (
        <ConfigContext.Provider value={{
            appConfig,
            updateConfig,
            isAuthenticated,
            user,
            login,
            logout
        }}>
            {children}
        </ConfigContext.Provider>
    );
};
