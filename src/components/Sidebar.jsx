import React from 'react';
import { NavLink, useNavigate, useLocation } from '../simple-router';
import {
    Calendar,
    Users,
    UserSquare2,
    Bell,
    Music,
    LogOut,
    LayoutDashboard,
    Settings,
    AlertTriangle,
    BookOpen,
    Menu,
    X,
    UserCircle
} from 'lucide-react';
import velIcon from '../assets/Vel.svg';
import { useConfig } from '../contexts/ConfigContext';

export function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();
    const { logout, user } = useConfig();

    // Generate initials from user name
    const getUserInitials = (name) => {
        if (!name) return 'AD';
        const parts = name.split(' ');
        if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
        return name.substring(0, 2).toUpperCase();
    };

    const initials = getUserInitials(user?.name);

    const navItems = [
        { id: 'Dashboard', icon: <LayoutDashboard size={22} />, mobileIcon: <LayoutDashboard size={22} />, label: 'Dashboard', path: '/dashboard' },
        { id: 'Events', icon: <Calendar size={22} />, mobileIcon: <Calendar size={22} />, label: 'Walks', path: '/events' },
        { id: 'Devotees', icon: <Users size={22} />, mobileIcon: <Users size={22} />, label: 'Devotees', path: '/devotees' },
        { id: 'Volunteers', icon: <UserSquare2 size={22} />, mobileIcon: <UserSquare2 size={22} />, label: 'Volunteers', path: '/volunteers' },
        { id: 'SOSRequests', icon: <AlertTriangle size={22} />, mobileIcon: <AlertTriangle size={22} />, label: 'SOS', path: '/sos-requests' },
        { id: 'Media', icon: <Music size={22} />, mobileIcon: <Music size={22} />, label: 'Media', path: '/media' },
        { id: 'GuideCreation', icon: <BookOpen size={22} />, mobileIcon: <BookOpen size={22} />, label: 'Guide', path: '/guide-creation' },
        { id: 'Notifications', icon: <Bell size={22} />, mobileIcon: <Bell size={22} />, label: 'Alerts', path: '/notifications' },
    ];

    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
    const toggleDrawer = () => setIsDrawerOpen(prev => !prev);
    const closeDrawer = () => setIsDrawerOpen(false);

    // Listen for global toggle event
    React.useEffect(() => {
        const handleSidePanelToggle = () => toggleDrawer();
        window.addEventListener('toggle-sidebar', handleSidePanelToggle);
        return () => window.removeEventListener('toggle-sidebar', handleSidePanelToggle);
    }, []);

    // Body scroll lock when drawer is open
    React.useEffect(() => {
        if (isDrawerOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isDrawerOpen]);

    // Mobile Nav Items removed as per request. Navigation is now handled by the side drawer.

    return (
        <>
            {/* ==================== DESKTOP SIDEBAR ==================== */}
            <div className="sidebar" style={{
                padding: '2.5rem 0',
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
            }}>
                {/* Logo Section */}
                <div className="logo-section" style={{ padding: '0 2rem', marginBottom: '3.5rem', display: 'flex', alignItems: 'center' }}>
                    <img src={velIcon} alt="Vel Icon" style={{ width: '56px', height: 'auto' }} />
                    <div style={{ marginLeft: '1rem' }}>
                        <h1 style={{ fontSize: '1.2rem', fontFamily: 'Outfit, sans-serif', fontWeight: 800, color: '#1e293b', lineHeight: 1.1, margin: 0 }}>Panguni Uththiram</h1>
                        <h1 style={{ fontSize: '1.2rem', fontFamily: 'Outfit, sans-serif', fontWeight: 800, color: '#1e293b', lineHeight: 1.1, margin: 0 }}>DFW Walk</h1>
                        <p style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '0.25rem' }}>Admin Console</p>
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
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            flex: 1,
                            borderRadius: '16px'
                        }}
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
                            {initials}
                        </div>
                        <div style={{ flex: 1 }}>
                            <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#1e293b', display: 'block' }}>{user?.name || 'Admin User'}</span>
                            <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 600 }}>{user?.role || 'Administrator'}</span>
                        </div>
                    </div>
                    <div
                        style={{ color: '#94a3b8', cursor: 'pointer' }}
                        onClick={() => {
                            if (window.confirm('Are you sure you want to logout?')) {
                                logout();
                                navigate('/login');
                            }
                        }}
                    >
                        <LogOut size={20} />
                    </div>
                </div>
            </div>

            {/* MOBILE BOTTOM NAV REMOVED */}

            {/* ==================== MOBILE SIDE DRAWER (SIDE PANEL) ==================== */}
            {isDrawerOpen && (
                <div className="mobile-drawer-overlay" onClick={closeDrawer} />
            )}
            <div className={`mobile-drawer ${isDrawerOpen ? 'open' : ''}`}>
                <div className="drawer-header">
                    <div className="logo-section" style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={velIcon} alt="Vel Icon" style={{ width: '40px', height: 'auto' }} />
                        <div style={{ marginLeft: '0.75rem' }}>
                            <h1 style={{ fontSize: '0.95rem', fontFamily: 'Outfit, sans-serif', fontWeight: 800, color: '#1e293b', lineHeight: 1.1, margin: 0 }}>Panguni Uththiram</h1>
                            <h1 style={{ fontSize: '0.95rem', fontFamily: 'Outfit, sans-serif', fontWeight: 800, color: '#1e293b', lineHeight: 1.1, margin: 0 }}>DFW Walk</h1>
                            <p style={{ fontSize: '0.6rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '1px' }}>Admin Console</p>
                        </div>
                    </div>
                    <button className="close-drawer" onClick={closeDrawer}>
                        <X size={20} />
                    </button>
                </div>

                <div className="drawer-content">
                    <ul className="drawer-links">
                        {navItems.map((item) => (
                            <li key={item.id} onClick={closeDrawer}>
                                <NavLink
                                    to={item.path}
                                    className={({ isActive }) => `drawer-link ${isActive ? 'active' : ''}`}
                                >
                                    {item.icon}
                                    {item.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>

                    <div className="drawer-footer">
                        <div className="drawer-profile">
                            <div className="profile-avatar">{initials}</div>
                            <div className="profile-info">
                                <span className="profile-name">{user?.name || 'Admin User'}</span>
                                <span className="profile-role">{user?.role || 'Administrator'}</span>
                            </div>
                        </div>
                        <button
                            className="drawer-logout"
                            onClick={() => {
                                if (window.confirm('Are you sure you want to logout?')) {
                                    logout();
                                    closeDrawer();
                                    navigate('/login');
                                }
                            }}
                        >
                            <LogOut size={18} />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .mobile-drawer-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(15, 23, 42, 0.5);
                    backdrop-filter: blur(8px);
                    -webkit-backdrop-filter: blur(8px);
                    z-index: 10000;
                    animation: fadeIn 0.3s ease;
                }

                .mobile-drawer {
                    position: fixed;
                    top: 0;
                    left: -280px;
                    width: 280px;
                    height: 100vh;
                    background: white;
                    z-index: 10001;
                    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    display: flex;
                    flex-direction: column;
                    box-shadow: 20px 0 50px rgba(0,0,0,0.1);
                }

                .mobile-drawer.open {
                    transform: translateX(280px);
                }

                .drawer-header {
                    padding: 1.5rem;
                    border-bottom: 1px solid #f1f5f9;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .close-drawer {
                    background: #f8fafc;
                    border: none;
                    width: 36px;
                    height: 36px;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #64748b;
                    cursor: pointer;
                }

                .drawer-content {
                    flex: 1;
                    overflow-y: auto;
                    padding: 1rem;
                    display: flex;
                    flex-direction: column;
                }

                .drawer-links {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    flex: 1;
                }

                .drawer-link {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 0.85rem 1rem;
                    border-radius: 12px;
                    color: #64748b;
                    text-decoration: none;
                    font-weight: 700;
                    font-size: 0.95rem;
                    margin-bottom: 0.25rem;
                    transition: all 0.2s;
                }

                .drawer-link.active {
                    color: #f97316;
                    background: #fff7ed;
                }

                .drawer-footer {
                    margin-top: auto;
                    padding: 1rem 0;
                    border-top: 1px solid #f1f5f9;
                }

                .drawer-profile {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    padding: 1rem;
                    background: #f8fafc;
                    border-radius: 16px;
                    margin-bottom: 1rem;
                }

                .profile-avatar {
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.75rem;
                    font-weight: 800;
                }

                .profile-name {
                    font-size: 0.85rem;
                    font-weight: 800;
                    color: #1e293b;
                    display: block;
                }

                .profile-role {
                    font-size: 0.7rem;
                    color: #94a3b8;
                    font-weight: 600;
                }

                .drawer-logout {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.75rem;
                    padding: 0.75rem;
                    border-radius: 12px;
                    border: 1.5px solid #f1f5f9;
                    background: white;
                    color: #64748b;
                    font-weight: 700;
                    font-size: 0.9rem;
                    cursor: pointer;
                }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                @media (min-width: 769px) {
                    .mobile-drawer, .mobile-drawer-overlay {
                        display: none !important;
                    }
                }
                `
            }} />
        </>
    );
}