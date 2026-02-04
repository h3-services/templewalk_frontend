import React, { useState } from 'react';
import { Users, Search, Filter, Download, MoreVertical, BadgeCheck, Clock } from 'lucide-react';

export function Devotees() {
    const [searchTerm, setSearchTerm] = useState('');

    const devotees = [
        { id: 1, name: "Ramesh Kumar", location: "Madurai", status: "Paid", registrationId: "TW2024-001", phone: "98765 43210" },
        { id: 2, name: "Meena Swaminathan", location: "Trichy", status: "Pending", registrationId: "TW2024-002", phone: "98765 43211" },
        { id: 3, name: "Suresh Raina", location: "Chennai", status: "Paid", registrationId: "TW2024-003", phone: "98765 43212" },
        { id: 4, name: "Anitha Raj", location: "Coimbatore", status: "Paid", registrationId: "TW2024-004", phone: "98765 43213" },
        { id: 5, name: "Vijay Sethupathi", location: "Madurai", status: "Paid", registrationId: "TW2024-005", phone: "98765 43214" },
    ];

    return (
        <div className="form-card" style={{ height: 'auto' }}>
            <div className="form-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ background: '#fffbeb', padding: '0.75rem', borderRadius: '12px', color: '#f59e0b' }}>
                        <Users size={24} />
                    </div>
                    <div>
                        <h2 style={{ marginBottom: '0.25rem' }}>Devotees Registration</h2>
                        <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Manage and track registered devotees for the padhayatra.</p>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem' }}>
                        <Download size={16} /> Export
                    </button>
                    <button className="btn btn-primary" style={{ padding: '0.5rem 1.5rem' }}>+ Add Devotee</button>
                </div>
            </div>

            <div className="form-body" style={{ overflow: 'visible' }}>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div className="input-with-icon" style={{ flex: 1 }}>
                        <input
                            className="input"
                            placeholder="Search by name, ID or phone..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ paddingLeft: '2.5rem' }}
                        />
                        <Search size={18} style={{ left: '1rem' }} />
                    </div>
                    <button className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Filter size={18} /> Filters
                    </button>
                </div>

                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ background: '#f9fafb', borderBottom: '1px solid #f3f4f6' }}>
                                <th style={{ padding: '1rem', fontSize: '0.8rem', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase' }}>Devotee</th>
                                <th style={{ padding: '1rem', fontSize: '0.8rem', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase' }}>Reg ID</th>
                                <th style={{ padding: '1rem', fontSize: '0.8rem', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase' }}>Phone</th>
                                <th style={{ padding: '1rem', fontSize: '0.8rem', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase' }}>Location</th>
                                <th style={{ padding: '1rem', fontSize: '0.8rem', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase' }}>Status</th>
                                <th style={{ padding: '1rem', fontSize: '0.8rem', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase' }}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {devotees.map(devotee => (
                                <tr key={devotee.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                                    <td style={{ padding: '1rem' }}>
                                        <div style={{ fontWeight: 600 }}>{devotee.name}</div>
                                    </td>
                                    <td style={{ padding: '1rem', color: '#6b7280', fontSize: '0.85rem' }}>{devotee.registrationId}</td>
                                    <td style={{ padding: '1rem', color: '#6b7280', fontSize: '0.85rem' }}>{devotee.phone}</td>
                                    <td style={{ padding: '1rem', color: '#6b7280', fontSize: '0.85rem' }}>{devotee.location}</td>
                                    <td style={{ padding: '1rem' }}>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.4rem',
                                            fontSize: '0.75rem',
                                            fontWeight: 600,
                                            padding: '0.25rem 0.6rem',
                                            borderRadius: '99px',
                                            width: 'fit-content',
                                            background: devotee.status === 'Paid' ? '#ecfdf5' : '#fff7ed',
                                            color: devotee.status === 'Paid' ? '#059669' : '#f59e0b'
                                        }}>
                                            {devotee.status === 'Paid' ? <BadgeCheck size={14} /> : <Clock size={14} />}
                                            {devotee.status}
                                        </div>
                                    </td>
                                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                                        <button style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer' }}>
                                            <MoreVertical size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
