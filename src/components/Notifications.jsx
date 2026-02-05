import React, { useState } from 'react';
import {
    Bell, Send, CheckCircle2, AlertTriangle, Info, Clock,
    Users, Plus, Search, ChevronRight, Mail, Layout,
    BarChart3, Settings, MoreHorizontal, History
} from 'lucide-react';

export function Notifications() {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('Sent Broadcasts');

    const [notifications, setNotifications] = useState([
        {
            id: 1,
            title: "Morning Padhayatra Update",
            message: "Devotees starting from Meenakshi Temple at 5:00 AM. Please gather at East Gate.",
            time: "10 mins ago",
            type: "info",
            sentTo: "All Devotees",
            reached: "4.2k",
            opened: "2.8k"
        },
        {
            id: 2,
            title: "Breakfast Served",
            message: "Food distribution counter is now open at Vadapalanji stop.",
            time: "2 hours ago",
            type: "success",
            sentTo: "Nagarkoil Batch",
            reached: "850",
            opened: "640"
        },
        {
            id: 3,
            title: "Weather Alert",
            message: "Moderate rain expected between 11 AM - 1 PM. Please carry raincoats.",
            time: "5 hours ago",
            type: "warning",
            sentTo: "All Participants",
            reached: "12k+",
            opened: "10k"
        },
    ]);

    const handleBroadcast = () => {
        const title = prompt("Enter Broadcast Title:");
        if (title) {
            const message = prompt("Enter Notification Message:");
            if (message) {
                const newNotif = {
                    id: Date.now(),
                    title,
                    message,
                    time: "Just now",
                    type: "info",
                    sentTo: "All Participants",
                    reached: "0",
                    opened: "0"
                };
                setNotifications([newNotif, ...notifications]);
                alert("Broadcast sent successfully to all devices!");
            }
        }
    };

    return (
        <div className="notifications-page" style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, gap: '1.25rem' }}>

            {/* Header Section */}
            <div className="page-title-section">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
                    <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', fontFamily: 'Lora, serif' }}>
                        Announcements Center
                    </h1>
                    <span style={{
                        background: '#fff1f2',
                        color: '#e11d48',
                        fontSize: '0.6rem',
                        fontWeight: 800,
                        padding: '0.15rem 0.6rem',
                        borderRadius: '6px',
                        letterSpacing: '0.05em'
                    }}>REAL-TIME PUSH</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>
                    Broadcast real-time updates and emergency alerts to all devotees via the mobile application
                </p>
            </div>

            {/* Main Content Area */}
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 320px', gap: '2rem', flex: 1, minHeight: 0 }}>

                {/* Left: Message History & Tabs */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', minHeight: 0 }}>

                    {/* Tabs */}
                    <div style={{ display: 'flex', gap: '2rem', borderBottom: '1.5px solid #f1f5f9' }}>
                        {['Sent Broadcasts', 'Scheduled', 'Drafts'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                style={{
                                    padding: '0.75rem 0',
                                    fontSize: '0.85rem',
                                    fontWeight: 700,
                                    color: activeTab === tab ? '#e11d48' : '#94a3b8',
                                    background: 'none',
                                    border: 'none',
                                    borderBottom: activeTab === tab ? '2.5px solid #e11d48' : '2.5px solid transparent',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    marginBottom: '-1.5px'
                                }}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Search & New */}
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <div style={{ position: 'relative', flex: 1 }}>
                            <Search size={18} style={{
                                position: 'absolute',
                                left: '1.25rem',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: '#94a3b8'
                            }} />
                            <input
                                type="text"
                                placeholder="Search message history..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem 1.25rem 0.75rem 3.5rem',
                                    borderRadius: '14px',
                                    border: '1.5px solid #f1f5f9',
                                    background: 'white',
                                    fontSize: '0.85rem',
                                    color: '#1e293b',
                                    outline: 'none',
                                    fontWeight: 600
                                }}
                            />
                        </div>
                        <button
                            onClick={handleBroadcast}
                            style={{
                                padding: '0 2rem',
                                borderRadius: '14px',
                                border: 'none',
                                background: 'linear-gradient(135deg, #e11d48 0%, #be123c 100%)',
                                color: 'white',
                                fontWeight: 800,
                                fontSize: '0.85rem',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                boxShadow: '0 8px 20px -6px rgba(225, 29, 72, 0.4)'
                            }}
                        >
                            <Plus size={18} strokeWidth={3} /> Create Broadcast
                        </button>
                    </div>

                    {/* Scrollable List */}
                    <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', paddingRight: '0.5rem' }}>
                        {notifications.map(notif => (
                            <div key={notif.id} style={{
                                background: 'white',
                                padding: '1.5rem',
                                borderRadius: '24px',
                                border: '1.5px solid #f1f5f9',
                                display: 'flex',
                                gap: '1.5rem',
                                transition: 'all 0.2s',
                                position: 'relative'
                            }} className="notification-row">
                                {/* Type Icon */}
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '16px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0,
                                    background: notif.type === 'success' ? '#f0fdf4' : notif.type === 'warning' ? '#fffbeb' : '#f0f9ff',
                                    color: notif.type === 'success' ? '#22c55e' : notif.type === 'warning' ? '#f59e0b' : '#3b82f6'
                                }}>
                                    {notif.type === 'success' ? <CheckCircle2 size={24} /> : notif.type === 'warning' ? <AlertTriangle size={24} /> : <Info size={24} />}
                                </div>

                                {/* Content */}
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                        <div>
                                            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1e293b' }}>{notif.title}</h3>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.2rem' }}>
                                                <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#e11d48', background: '#fff1f2', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>{notif.sentTo}</span>
                                                <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                    <Clock size={12} /> {notif.time}
                                                </span>
                                            </div>
                                        </div>
                                        <button style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer' }}><MoreHorizontal size={20} /></button>
                                    </div>
                                    <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: '1.5', marginBottom: '1rem' }}>{notif.message}</p>

                                    {/* Stats Bar */}
                                    <div style={{ display: 'flex', gap: '2rem', borderTop: '1px solid #f8fafc', paddingTop: '1rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <Users size={14} color="#94a3b8" />
                                            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#475569' }}>{notif.reached}</span>
                                            <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 600 }}>Reached</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <Mail size={14} color="#94a3b8" />
                                            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#475569' }}>{notif.opened}</span>
                                            <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 600 }}>Opened</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Quick Actions & Content Tips */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

                    {/* Announcement Template Box */}
                    <div style={{
                        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                        padding: '1.5rem',
                        borderRadius: '24px',
                        color: 'white',
                        boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                            <Layout size={18} color="#e11d48" />
                            <h3 style={{ fontSize: '1rem', fontWeight: 800 }}>Quick Templates</h3>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {['Early Morning Call', 'Meal Time Alert', 'Route Deviation', 'Weather Warning'].map(t => (
                                <button key={t} style={{
                                    width: '100%',
                                    padding: '0.75rem 1rem',
                                    borderRadius: '12px',
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1.5px solid rgba(255,255,255,0.1)',
                                    color: 'rgba(255,255,255,0.8)',
                                    fontSize: '0.8rem',
                                    fontWeight: 700,
                                    textAlign: 'left',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    {t} <ChevronRight size={14} opacity={0.5} />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Delivery Stats Box */}
                    <div style={{
                        background: 'white',
                        padding: '1.5rem',
                        borderRadius: '24px',
                        border: '1.5px solid #f1f5f9',
                        boxShadow: 'var(--card-shadow)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                            <BarChart3 size={18} color="#e11d48" />
                            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#1e293b' }}>Monthly Reach</h3>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                                    <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#94a3b8' }}>AVG OPEN RATE</span>
                                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#16a34a' }}>+12%</span>
                                </div>
                                <div style={{ height: '6px', background: '#f1f5f9', borderRadius: '3px', overflow: 'hidden' }}>
                                    <div style={{ width: '78%', height: '100%', background: '#16a34a' }} />
                                </div>
                                <div style={{ textAlign: 'right', marginTop: '0.25rem', fontSize: '0.8rem', fontWeight: 800, color: '#1e293b' }}>78.4%</div>
                            </div>
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                                    <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#94a3b8' }}>DELIVERY SUCCESS</span>
                                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#16a34a' }}>Stable</span>
                                </div>
                                <div style={{ height: '6px', background: '#f1f5f9', borderRadius: '3px', overflow: 'hidden' }}>
                                    <div style={{ width: '99%', height: '100%', background: '#3b82f6' }} />
                                </div>
                                <div style={{ textAlign: 'right', marginTop: '0.25rem', fontSize: '0.8rem', fontWeight: 800, color: '#1e293b' }}>99.2%</div>
                            </div>
                        </div>
                    </div>

                    {/* Configuration Link */}
                    <div style={{
                        marginTop: 'auto',
                        padding: '1.25rem',
                        borderRadius: '20px',
                        background: '#f8fafc',
                        border: '1.5px solid #f1f5f9',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        cursor: 'pointer'
                    }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
                            <Settings size={20} />
                        </div>
                        <div>
                            <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#1e293b' }}>Push Settings</div>
                            <div style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 600 }}>Configure API keys</div>
                        </div>
                        <ChevronRight size={16} color="#cbd5e1" style={{ marginLeft: 'auto' }} />
                    </div>

                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .notification-row:hover {
                    border-color: #fecdd3 !important;
                    transform: translateX(8px);
                }
                `
            }} />
        </div>
    );
}
