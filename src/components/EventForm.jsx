import React from 'react';
import { Phone, Calendar as CalendarIcon, Clock } from 'lucide-react';

export function EventForm({ formData, setFormData }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className="form-card" style={{
            padding: '2.5rem',
            background: 'white',
            borderRadius: '32px',
            boxShadow: 'var(--card-shadow)',
            border: '1.5px solid #f1f5f9'
        }}>
            <div className="form-header" style={{ marginBottom: '2.5rem', padding: 0 }}>
                <h2 style={{ fontSize: '1.5rem', fontFamily: 'Lora, serif', fontWeight: 700, color: '#0f172a' }}>Event Information</h2>
                <span style={{
                    fontSize: '0.65rem',
                    fontWeight: 800,
                    color: '#f97316',
                    background: '#fff7ed',
                    padding: '0.4rem 1rem',
                    borderRadius: '99px',
                    letterSpacing: '0.05em'
                }}>STEP 1 OF 4</span>
            </div>

            <div className="form-body" style={{ padding: 0, overflow: 'visible' }}>
                <div className="form-group" style={{ marginBottom: '2rem' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.75rem', display: 'block' }}>Event Name</label>
                    <input
                        type="text"
                        name="eventName"
                        value={formData.eventName}
                        onChange={handleChange}
                        className="input"
                        style={{
                            padding: '1rem 1.25rem',
                            fontSize: '0.95rem',
                            backgroundColor: '#f8fafc',
                            border: '1.5px solid #f1f5f9',
                            borderRadius: '14px',
                            color: '#1e293b',
                            width: '100%'
                        }}
                        placeholder="e.g. Annual Arulmigu Kapaleeshwarar Padhayatra"
                    />
                    <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.6rem', fontWeight: 500, fontStyle: 'italic' }}>Visible to all devotees on the mobile app.</p>
                </div>

                <div className="input-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                    <div className="form-group">
                        <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.75rem', display: 'block' }}>Event Date</label>
                        <div style={{ position: 'relative' }}>
                            <CalendarIcon size={18} style={{ position: 'absolute', right: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                            <input
                                type="date"
                                name="eventDate"
                                value={formData.eventDate}
                                onChange={handleChange}
                                className="input"
                                style={{
                                    padding: '1rem 1.25rem',
                                    fontSize: '0.95rem',
                                    backgroundColor: '#f8fafc',
                                    border: '1.5px solid #f1f5f9',
                                    borderRadius: '14px',
                                    color: '#1e293b',
                                    width: '100%'
                                }}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.75rem', display: 'block' }}>Start Time</label>
                        <div style={{ position: 'relative' }}>
                            <Clock size={18} style={{ position: 'absolute', right: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                            <input
                                type="time"
                                name="startTime"
                                value={formData.startTime}
                                onChange={handleChange}
                                className="input"
                                style={{
                                    padding: '1rem 1.25rem',
                                    fontSize: '0.95rem',
                                    backgroundColor: '#f8fafc',
                                    border: '1.5px solid #f1f5f9',
                                    borderRadius: '14px',
                                    color: '#1e293b',
                                    width: '100%'
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div className="form-group" style={{ marginBottom: '2rem' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.75rem', display: 'block' }}>Event Contact & Helpline</label>
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                        <span style={{ position: 'absolute', left: '1.25rem', color: '#94a3b8', fontSize: '1rem', fontWeight: 600 }}>+91</span>
                        <input
                            type="text"
                            name="contact"
                            value={formData.contact}
                            onChange={handleChange}
                            className="input"
                            style={{
                                padding: '1rem 1.25rem 1rem 3.5rem',
                                fontSize: '0.95rem',
                                backgroundColor: '#f8fafc',
                                border: '1.5px solid #f1f5f9',
                                borderRadius: '14px',
                                color: '#1e293b',
                                width: '100%'
                            }}
                            placeholder="00000 00000"
                        />
                    </div>
                    <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.6rem', fontWeight: 500, fontStyle: 'italic' }}>A dedicated helpline number for emergencies and queries.</p>
                </div>

                <div className="form-group">
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.75rem', display: 'block' }}>Short Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="textarea"
                        style={{
                            padding: '1.25rem',
                            fontSize: '0.95rem',
                            backgroundColor: '#f8fafc',
                            border: '1.5px solid #f1f5f9',
                            borderRadius: '16px',
                            color: '#1e293b',
                            width: '100%',
                            minHeight: '140px',
                            resize: 'none',
                            fontFamily: 'inherit'
                        }}
                        placeholder="Enter a brief summary of the spiritual significance and pilgrimage rules..."
                    ></textarea>
                </div>
            </div>
        </div>
    );
}
