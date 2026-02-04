import React from 'react';
import { UserSquare2, Shield, Heart, Coffee, Truck, MoreHorizontal } from 'lucide-react';

export function Volunteers() {
    const volunteers = [
        { id: 1, name: "Karthik Subramanian", role: "Medical", icon: <Heart size={16} />, color: "#ef4444", status: "Active", phone: "98765 00001" },
        { id: 2, name: "Suresh Gopi", role: "Security", icon: <Shield size={16} />, color: "#3b82f6", status: "Active", phone: "98765 00002" },
        { id: 3, name: "Lakshmi Priya", role: "Food Distribution", icon: <Coffee size={16} />, color: "#f59e0b", status: "On Break", phone: "98765 00003" },
        { id: 4, name: "Muthu Kumar", role: "Transport", icon: <Truck size={16} />, color: "#10b981", status: "Active", phone: "98765 00004" },
    ];

    return (
        <div className="form-card">
            <div className="form-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ background: '#f0f9ff', padding: '0.75rem', borderRadius: '12px', color: '#0ea5e9' }}>
                        <UserSquare2 size={24} />
                    </div>
                    <div>
                        <h2 style={{ marginBottom: '0.25rem' }}>Volunteer Management</h2>
                        <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Coordinate and assign tasks to seva volunteers.</p>
                    </div>
                </div>
                <button className="btn btn-primary" style={{ padding: '0.5rem 1.5rem' }}>+ New Volunteer</button>
            </div>

            <div className="form-body">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                    {volunteers.map(volunteer => (
                        <div key={volunteer.id} style={{
                            padding: '1.25rem',
                            background: 'white',
                            border: '1px solid #f3f4f6',
                            borderRadius: '16px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '12px',
                                    background: '#f9fafb',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#9ca3af'
                                }}>
                                    <UserSquare2 size={24} />
                                </div>
                                <div style={{
                                    fontSize: '0.7rem',
                                    fontWeight: 700,
                                    padding: '0.2rem 0.6rem',
                                    borderRadius: '99px',
                                    background: volunteer.status === 'Active' ? '#ecfdf5' : '#f3f4f6',
                                    color: volunteer.status === 'Active' ? '#059669' : '#6b7280'
                                }}>
                                    {volunteer.status}
                                </div>
                            </div>

                            <div>
                                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.25rem' }}>{volunteer.name}</h3>
                                <p style={{ fontSize: '0.85rem', color: '#6b7280' }}>{volunteer.phone}</p>
                            </div>

                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.75rem',
                                background: '#f9fafb',
                                borderRadius: '10px'
                            }}>
                                <div style={{ color: volunteer.color }}>{volunteer.icon}</div>
                                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{volunteer.role} Team</span>
                            </div>

                            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                                <button className="btn btn-outline" style={{ flex: 1, padding: '0.4rem', fontSize: '0.8rem' }}>Message</button>
                                <button className="btn btn-outline" style={{ padding: '0.4rem' }}>
                                    <MoreHorizontal size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
