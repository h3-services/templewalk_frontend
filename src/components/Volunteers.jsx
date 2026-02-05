import React, { useState } from 'react';
import { UserSquare2, Shield, Heart, Coffee, Truck, MoreHorizontal, Check, X } from 'lucide-react';

export function Volunteers() {
    const [volunteers, setVolunteers] = useState([
        { id: 1, name: "Karthik Subramanian", role: "Medical", icon: <Heart size={16} />, color: "#ef4444", status: "Active", phone: "98765 00001" },
        { id: 2, name: "Suresh Gopi", role: "Security", icon: <Shield size={16} />, color: "#3b82f6", status: "Active", phone: "98765 00002" },
        { id: 3, name: "Lakshmi Priya", role: "Food Distribution", icon: <Coffee size={16} />, color: "#f59e0b", status: "Pending Approval", phone: "98765 00003" },
        { id: 4, name: "Muthu Kumar", role: "Transport", icon: <Truck size={16} />, color: "#10b981", status: "Pending Approval", phone: "98765 00004" },
    ]);

    const handleApprove = (id) => {
        setVolunteers(prev => prev.map(v => v.id === id ? { ...v, status: 'Active' } : v));
    };

    const handleReject = (id) => {
        setVolunteers(prev => prev.filter(v => v.id !== id));
    };

    return (
        <div className="form-card">
            <div className="form-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ background: '#f0f9ff', padding: '0.75rem', borderRadius: '12px', color: '#0ea5e9' }}>
                        <UserSquare2 size={24} />
                    </div>
                    <div>
                        <h2 style={{ marginBottom: '0.25rem' }}>Volunteer Management</h2>
                        <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Approve new Seva volunteers and coordinate tasks.</p>
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
                            gap: '1rem',
                            position: 'relative'
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
                                    background: volunteer.status === 'Active' ? '#ecfdf5' : '#fff7ed',
                                    color: volunteer.status === 'Active' ? '#059669' : '#f59e0b'
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
                                {volunteer.status === 'Pending Approval' ? (
                                    <>
                                        <button
                                            onClick={() => handleApprove(volunteer.id)}
                                            className="btn btn-primary"
                                            style={{ flex: 1, padding: '0.4rem', fontSize: '0.8rem', background: '#22c55e', borderColor: '#22c55e' }}
                                        >
                                            <Check size={16} style={{ marginRight: '4px' }} /> Approve
                                        </button>
                                        <button
                                            onClick={() => handleReject(volunteer.id)}
                                            className="btn btn-outline"
                                            style={{ flex: 1, padding: '0.4rem', fontSize: '0.8rem', color: '#ef4444', borderColor: '#ef4444' }}
                                        >
                                            <X size={16} style={{ marginRight: '4px' }} /> Reject
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button className="btn btn-outline" style={{ flex: 1, padding: '0.4rem', fontSize: '0.8rem' }}>Message</button>
                                        <button className="btn btn-outline" style={{ padding: '0.4rem' }}>
                                            <MoreHorizontal size={18} />
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
