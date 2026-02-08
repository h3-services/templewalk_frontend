import React from 'react';
import { NavLink } from '../simple-router';
import { useConfig } from '../contexts/ConfigContext';
import {
    Calendar,
    Users,
    UserSquare2,
    Bell,
    Music,
    Settings,
    LogOut,
    LayoutDashboard,
    Wallet,
    Banknote,
    Landmark,
    Map
} from 'lucide-react';

export function Sidebar() {
    const { appConfig, logout, user } = useConfig();

    const navItems = [
        { id: 'Dashboard', icon: <LayoutDashboard size={22} />, label: 'Dashboard', path: '/dashboard' },
        { id: 'Devotees', icon: <Users size={22} />, label: 'Devotees', path: '/devotees' },
        { id: 'Volunteers', icon: <UserSquare2 size={22} />, label: 'Volunteers', path: '/volunteers' },
        { id: 'Notifications', icon: <Bell size={22} />, label: 'Notifications', path: '/notifications' },
        { id: 'Settings', icon: <Settings size={22} />, label: 'Settings', path: '/settings' },
    ];

    return (
        <div className="sidebar" style={{
            padding: '2.5rem 0',
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
        }}>
            {/* Logo Section */}
            <div className="logo-section" style={{ padding: '0 2rem', marginBottom: '3rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                    width: '42px',
                    height: '56px',
                    background: '#F97316',
                    borderRadius: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    flexShrink: 0,
                    overflow: 'hidden'
                }}>
                    {appConfig.logo ? (
                        <img src={appConfig.logo} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                        <Landmark size={28} strokeWidth={1.5} />
                    )}
                </div>
                <div>
                    <h1 style={{
                        fontSize: '0.95rem',
                        fontFamily: 'Outfit, sans-serif',
                        fontWeight: 800,
                        color: '#0f172a',
                        lineHeight: 1.2,
                        marginBottom: '0.2rem'
                    }}>
                        ADMIN
                    </h1>
                    <p style={{ fontSize: '0.6rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>DASHBOARD</p>
                </div>
            </div>

            {/* Nav Items */}
            <ul className="nav-links" style={{ padding: '0 1rem', flex: 1 }}>
                {navItems.map((item) => (
                    <li key={item.id} style={{ listStyle: 'none', margin: '0.5rem 0' }}>
                        <NavLink
                            to={item.path}
                            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                            style={({ isActive }) => ({
                                textDecoration: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                padding: '0.85rem 1.25rem',
                                borderRadius: '16px',
                                color: isActive ? '#F97316' : '#64748b',
                                background: isActive ? '#FFF7ED' : 'transparent',
                                fontSize: '0.95rem',
                                fontWeight: isActive ? 800 : 700,
                                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                height: '48px',
                                boxSizing: 'border-box'
                            })}
                        >
                            {({ isActive }) => (
                                <>
                                    <span style={{ display: 'flex', opacity: 1 }}>{item.icon}</span>
                                    {item.label}
                                </>
                            )}
                        </NavLink>
                    </li>
                ))}
            </ul>

            {/* Profile Section */}
            <div className="user-profile" style={{
                margin: '0 1rem',
                padding: '1rem',
                background: '#f8fafc',
                borderRadius: '24px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                border: '1.5px solid #f1f5f9'
            }}>
                <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: '#E6BEA5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden' }}>
                        <div style={{ width: '100%', height: '100%', background: '#E6BEA5' }}></div>
                    </div>
                </div>
                <div style={{ flex: 1 }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#1e293b', display: 'block' }}>{user ? user.name : 'Guest'}</span>
                    <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 600 }}>{user ? user.role : 'Read Only'}</span>
                </div>
                <div style={{ color: '#94a3b8', cursor: 'pointer' }} onClick={logout}>
                    <LogOut size={20} />
                </div>
            </div>
        </div>
    );
}
