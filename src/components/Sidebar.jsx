import React from 'react';
import { NavLink } from '../simple-router';
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
    Banknote
} from 'lucide-react';

export function Sidebar() {
    const navItems = [
        { id: 'Dashboard', icon: <LayoutDashboard size={22} />, label: 'Dashboard', path: '/' },
        { id: 'Events', icon: <Calendar size={22} />, label: 'Events', path: '/events' },
        { id: 'Devotees', icon: <Users size={22} />, label: 'Devotees', path: '/devotees' },
        { id: 'Volunteers', icon: <UserSquare2 size={22} />, label: 'Volunteers', path: '/volunteers' },
        { id: 'Notifications', icon: <Bell size={22} />, label: 'Notifications', path: '/notifications' },
        { id: 'Upload Medias', icon: <Music size={22} />, label: 'Upload Medias', path: '/medias' },
        { id: 'Payment Config', icon: <Banknote size={22} />, label: 'Payment Config', path: '/payments' },
    ];

    return (
        <div className="sidebar" style={{
            padding: '2.5rem 0',
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
        }}>
            {/* Logo Section */}
            <div className="logo-section" style={{ padding: '0 2.5rem', marginBottom: '3rem', display: 'flex', alignItems: 'center' }}>
                <div style={{
                    width: '40px',
                    height: '40px',
                    background: '#F97316',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white'
                }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                </div>
                <div style={{ marginLeft: '0.75rem' }}>
                    <h1 style={{ fontSize: '1.25rem', fontFamily: 'Outfit, sans-serif', fontWeight: 800, color: '#1e293b', lineHeight: 1 }}>Temple Walk</h1>
                    <p style={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Admin Console</p>
                </div>
            </div>

            {/* Nav Items */}
            <ul className="nav-links" style={{ padding: '0 1rem', flex: 1 }}>
                {navItems.map((item) => (
                    <li key={item.id} style={{ listStyle: 'none', marginBottom: '0.5rem' }}>
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
                                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
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
                    <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#1e293b', display: 'block' }}>Alex Rivera</span>
                    <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 600 }}>Temple Admin</span>
                </div>
                <div style={{ color: '#94a3b8', cursor: 'pointer' }}>
                    <LogOut size={20} />
                </div>
            </div>
        </div>
    );
}
