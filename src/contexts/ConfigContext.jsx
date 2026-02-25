import React, { createContext, useState, useContext, useEffect } from 'react';
import { apiFetch } from '../api';

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

    const login = async (email, password) => {
        // Validate input
        if (!email || !password) {
            return { success: false, message: 'Please enter both email and password.' };
        }

        try {
            // Fetch all users from the API to check admin role
            const response = await apiFetch('/api/users/?skip=0&limit=2000');
            if (!response.ok) {
                return { success: false, message: 'Unable to verify credentials. Server error.' };
            }

            const users = await response.json();

            // Find a user whose email matches AND whose role is "admin"
            const adminUser = users.find(
                u => u.email && u.email.trim().toLowerCase() === email.trim().toLowerCase() && u.role === 'admin'
            );

            if (!adminUser) {
                return { success: false, message: 'Access denied. Only admin users can login.' };
            }

            // Admin found — log them in with their actual name from the API
            const displayName = adminUser.name || (email.includes('@') ? email.split('@')[0] : email);

            setIsAuthenticated(true);
            setUser({ name: displayName, role: 'Administrator' });
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('userName', displayName);
            return { success: true };
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, message: 'Network error. Please check your connection.' };
        }
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
