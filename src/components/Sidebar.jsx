import React, { useState } from 'react';
import { NavLink, useNavigate } from '../simple-router';
import {
    Calendar,
    Users,
    UserSquare2,
    Bell,
    Music,
    LogOut,
    LayoutDashboard,
    Banknote,
    Settings,
    Menu,
    X,
    AlertTriangle,
    BookOpen
} from 'lucide-react';
import velIcon from '../assets/Vel.svg';

export function Sidebar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    const navItems = [
        { id: 'Dashboard', icon: <LayoutDashboard size={22} />, label: 'Dashboard', path: '/dashboard' },
        { id: 'Events', icon: <Calendar size={22} />, label: 'Walks', path: '/events' },
        { id: 'Devotees', icon: <Users size={22} />, label: 'Devotees', path: '/devotees' },
        { id: 'Volunteers', icon: <UserSquare2 size={22} />, label: 'Volunteers', path: '/volunteers' },
        { id: 'Media', icon: <Music size={22} />, label: 'Media', path: '/media' },
        { id: 'SOSRequests', icon: <AlertTriangle size={22} />, label: 'SOS Requests', path: '/sos-requests' },
        { id: 'GuideCreation', icon: <BookOpen size={22} />, label: 'Vratham Guide', path: '/guide-creation' },
        { id: 'Notifications', icon: <Bell size={22} />, label: 'Notifications', path: '/notifications' },
    ];

    return (
        <>
            {/* Mobile Menu Toggle Button */}
            <button
                className="mobile-menu-toggle"
                onClick={toggleMobileMenu}
                aria-label="Toggle menu"
                style={{
                    position: 'fixed',
                    top: '1.25rem',
                    left: '1.5rem',
                    zIndex: 1001,
                    background: 'white',
                    border: '1.5px solid #f1f5f9',
                    borderRadius: '10px',
                    width: '40px',
                    height: '40px',
                    display: 'none',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#64748b',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    cursor: 'pointer'
                }}
            >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Overlay for closing sidebar on mobile */}
            <div
                className={`sidebar-overlay ${isMobileMenuOpen ? 'visible' : ''}`}
                onClick={closeMobileMenu}
            />

            <div className={`sidebar ${isMobileMenuOpen ? 'sidebar-open' : ''}`} style={{
                padding: '2.5rem 0',
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
            }}>
                {/* Logo Section */}
                <div className="logo-section" style={{ padding: '0 2.5rem', marginBottom: '3rem', display: 'flex', alignItems: 'center' }}>
                    <img src={velIcon} alt="Vel Icon" style={{ width: '50px', height: '50px' }} />
                    <div style={{ marginLeft: '0.75rem' }}>
                        <h1 style={{ fontSize: '1rem', fontFamily: 'Outfit, sans-serif', fontWeight: 800, color: '#1e293b', lineHeight: 1.2 }}>Panguni Uththiram DFW Walk</h1>
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
                    <div
                        onClick={() => { navigate('/account-settings'); closeMobileMenu(); }}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            flex: 1,
                            cursor: 'pointer',
                            borderRadius: '16px',
                            transition: 'opacity 0.2s ease',
                        }}
                        onMouseEnter={e => e.currentTarget.style.opacity = '0.75'}
                        onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                    >
                        <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '0.8rem',
                            fontWeight: 800,
                            flexShrink: 0,
                        }}>
                            AR
                        </div>
                        <div style={{ flex: 1 }}>
                            <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#1e293b', display: 'block' }}>Alex Rivera</span>
                            <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 600 }}>Temple Admin</span>
                        </div>
                    </div>
                    <div style={{ color: '#94a3b8', cursor: 'pointer' }}>
                        <LogOut size={20} />
                    </div>
                </div>
            </div>
            <style dangerouslySetInnerHTML={{
                __html: `
                @media (max-width: 768px) {
                    .mobile-menu-toggle { display: flex !important; }
                    .sidebar {
                        position: fixed;
                        top: 0;
                        left: -100%;
                        width: 280px;
                        z-index: 1000;
                        transition: all 0.3s ease;
                        background: white;
                    }
                    .sidebar-open { left: 0 !important; }
                    .sidebar-overlay {
                        position: fixed;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background: rgba(0,0,0,0.5);
                        opacity: 0;
                        visibility: hidden;
                        z-index: 999;
                        transition: all 0.3s ease;
                    }
                    .sidebar-overlay.visible {
                        opacity: 1;
                        visibility: visible;
                    }
                }
            `}} />
        </>
    );
}