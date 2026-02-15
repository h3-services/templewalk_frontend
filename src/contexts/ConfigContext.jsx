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
        if (storedAuth === 'true') {
            setIsAuthenticated(true);
            setUser({ name: 'Admin User', role: 'Administrator' });
        }
    }, []);

    const updateConfig = (newConfig) => {
        const updated = { ...appConfig, ...newConfig };
        setAppConfig(updated);
        localStorage.setItem('appConfig', JSON.stringify(updated));
    };

    const login = (username, password) => {
        // Mock Login
        if (username && password) {
            setIsAuthenticated(true);
            setUser({ name: 'Admin User', role: 'Administrator' });
            localStorage.setItem('isAuthenticated', 'true');
            return true;
        }
        return false;
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem('isAuthenticated');
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
