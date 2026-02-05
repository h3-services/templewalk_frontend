import React from 'react';
import {
    Calendar,
    Users,
    UserSquare2,
    Bell,
    Music,
    Settings,
    LogOut
} from 'lucide-react';

export function Sidebar({ activeTab, setActiveTab }) {
    const navItems = [
        { id: 'Dashboard', icon: <Calendar size={20} />, label: 'Setup Pathayatra' },
        { id: 'Devotees', icon: <Users size={20} />, label: 'Devotees' },
        { id: 'Volunteers', icon: <UserSquare2 size={20} />, label: 'Volunteers' },
        { id: 'Notifications', icon: <Bell size={20} />, label: 'Notifications' },
        { id: 'Medias', icon: <Music size={20} />, label: 'Upload Medias' },
        { id: 'Payments', icon: <Settings size={20} />, label: 'Payment Config' },
    ];

    return (
        <div className="sidebar">
            <div className="logo-section" style={{ marginBottom: '1.5rem' }}>
                <div className="logo-icon">
                    <img src="/logo.png" alt="Logo" onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement.innerHTML = '<div style="font-weight: 800; font-size: 1.5rem; color: white">T</div>';
                    }} />
                </div>
                <div className="logo-text">
                    <h1>Temple Walk</h1>
                    <p>Admin Console</p>
                </div>
            </div>

            <ul className="nav-links">
                {navItems.map((item) => (
                    <li key={item.id}>
                        <button
                            onClick={() => setActiveTab(item.id)}
                            className={`nav-link ${activeTab === item.id ? 'active' : ''}`}
                            style={{ width: '100%', border: 'none', background: 'none', cursor: 'pointer', textAlign: 'left' }}
                        >
                            {item.icon}
                            {item.label}
                        </button>
                    </li>
                ))}
            </ul>

            <div className="user-profile" style={{ padding: '1.5rem 1rem', marginTop: 'auto' }}>
                <img
                    src="/avatar.png"
                    alt="User"
                    style={{ width: '40px', height: '40px', borderRadius: '12px', objectFit: 'cover' }}
                    onError={(e) => {
                        e.currentTarget.style.display = 'none';
                    }}
                />
                <div className="user-info" style={{ marginLeft: '0.75rem' }}>
                    <span className="name">Alex Rivera</span>
                    <span className="role">Temple Admin</span>
                </div>
                <div style={{ marginLeft: 'auto', color: '#9ca3af', cursor: 'pointer' }} title="Logout">
                    <LogOut size={18} />
                </div>
            </div>
        </div>
    );
}
