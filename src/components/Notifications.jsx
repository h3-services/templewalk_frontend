import React from 'react';
import { Bell, Send, CheckCircle2, AlertTriangle, Info, Clock } from 'lucide-react';

export function Notifications() {
    const notifications = [
        { id: 1, title: "Morning Padhayatra Update", message: "Devotees starting from Meenakshi Temple at 5:00 AM. Please gather at East Gate.", time: "10 mins ago", type: "info", sentTo: "All Devotees" },
        { id: 2, title: "Breakfast Served", message: "Food distribution counter is now open at Vadapalanji stop.", time: "2 hours ago", type: "success", sentTo: "Nagarkoil Batch" },
        { id: 3, title: "Weather Alert", message: "Moderate rain expected between 11 AM - 1 PM. Please carry raincoats.", time: "5 hours ago", type: "warning", sentTo: "All Participants" },
    ];

    return (
        <div className="form-card">
            <div className="form-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ background: '#fef2f2', padding: '0.75rem', borderRadius: '12px', color: '#ef4444' }}>
                        <Bell size={24} />
                    </div>
                    <div>
                        <h2 style={{ marginBottom: '0.25rem' }}>Announcements & Notifications</h2>
                        <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Send real-time updates to devotees via the mobile app.</p>
                    </div>
                </div>
                <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Send size={18} /> New Broadcast
                </button>
            </div>

            <div className="form-body">
                <div style={{ maxWidth: '800px' }}>
                    <h4 style={{ fontWeight: 600, color: '#374151', marginBottom: '1rem' }}>Recent Broadcasts</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {notifications.map(notif => (
                            <div key={notif.id} style={{
                                padding: '1.25rem',
                                background: 'white',
                                border: '1px solid #f3f4f6',
                                borderRadius: '16px',
                                display: 'flex',
                                gap: '1.25rem'
                            }}>
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: notif.type === 'success' ? '#f0fdf4' : notif.type === 'warning' ? '#fffbeb' : '#f0f9ff',
                                    color: notif.type === 'success' ? '#22c55e' : notif.type === 'warning' ? '#f59e0b' : '#3b82f6'
                                }}>
                                    {notif.type === 'success' ? <CheckCircle2 size={20} /> : notif.type === 'warning' ? <AlertTriangle size={20} /> : <Info size={20} />}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                                        <h5 style={{ fontWeight: 700, color: '#111827' }}>{notif.title}</h5>
                                        <span style={{ fontSize: '0.75rem', color: '#9ca3af', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                            <Clock size={12} /> {notif.time}
                                        </span>
                                    </div>
                                    <p style={{ fontSize: '0.9rem', color: '#4b5563', marginBottom: '0.75rem' }}>{notif.message}</p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase' }}>Sent to:</span>
                                        <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#f59e0b', background: '#fffbeb', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>{notif.sentTo}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
