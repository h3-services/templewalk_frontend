import React from 'react';
import { Calendar as CalendarIcon, Clock, Sparkles } from 'lucide-react';

export function EventForm({ formData, setFormData }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div style={{
            background: 'white',
            borderRadius: '32px',
            border: '1.5px solid #f1f5f9',
            boxShadow: '0 8px 30px -10px rgba(0,0,0,0.06)',
            padding: '2.5rem 3rem',
            display: 'flex',
            flexDirection: 'column',
            flex: 1
        }}>
            {/* Premium Header */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingBottom: '1.5rem',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '16px',
                        background: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Sparkles size={24} color="#f97316" />
                    </div>
                    <div>
                        <h2 style={{ fontSize: '1.5rem', fontFamily: 'Lora, serif', fontWeight: 700, color: '#0f172a', margin: 0 }}>Event Information</h2>
                        <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: '0.25rem 0 0 0', fontWeight: 500 }}>Setup core details for your walk event</p>
                    </div>
                </div>

            </div>

            {/* Form Grid - 2 Column Layout */}
            <div className="event-form-grid" style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '2rem',
                flex: 1
            }}>
                {/* Left Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                    {/* Event Name */}
                    <div>
                        <label style={labelStyle}>Event Name <span style={{ color: '#f97316' }}>*</span></label>
                        <input
                            type="text"
                            name="eventName"
                            value={formData.eventName}
                            onChange={handleChange}
                            style={inputStyle}
                            placeholder="e.g. Annual Arulmigu Kapaleeshwarar Padhayatra"
                        />
                        <p style={hintStyle}>This name will be visible to all devotees on the mobile app.</p>
                    </div>

                    {/* Date & Time */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={labelStyle}>Event Date <span style={{ color: '#f97316' }}>*</span></label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type="date"
                                    name="eventDate"
                                    value={formData.eventDate}
                                    onChange={handleChange}
                                    style={inputStyle}
                                />
                                <CalendarIcon size={18} style={iconStyle} />
                            </div>
                        </div>
                        <div>
                            <label style={labelStyle}>Start Time <span style={{ color: '#f97316' }}>*</span></label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type="time"
                                    name="startTime"
                                    value={formData.startTime}
                                    onChange={handleChange}
                                    style={inputStyle}
                                />
                                <Clock size={18} style={iconStyle} />
                            </div>
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <label style={labelStyle}>Emergency Helpline</label>
                        <div style={{ position: 'relative' }}>
                            <span style={{
                                position: 'absolute',
                                left: '1rem',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: '#64748b',
                                fontWeight: 700,
                                fontSize: '0.9rem',
                                background: '#f1f5f9',
                                padding: '0.25rem 0.5rem',
                                borderRadius: '6px'
                            }}>+91</span>
                            <input
                                type="text"
                                name="contact"
                                value={formData.contact}
                                onChange={handleChange}
                                style={{ ...inputStyle, paddingLeft: '4rem' }}
                                placeholder="98765 43210"
                            />
                        </div>
                        <p style={hintStyle}>A dedicated helpline for emergencies and devotee queries.</p>
                    </div>
                </div>

                {/* Right Column */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label style={labelStyle}>Event Description <span style={{ color: '#f97316' }}>*</span></label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        style={{
                            ...inputStyle,
                            flex: 1,
                            resize: 'none',
                            minHeight: '180px'
                        }}
                        placeholder="Enter a brief summary of the spiritual significance, pilgrimage rules, and what devotees can expect during this sacred walk..."
                    ></textarea>
                    <p style={hintStyle}>This description will appear on the event detail page in the mobile app.</p>
                </div>
            </div>

            {/* Responsive Styles */}
            <style dangerouslySetInnerHTML={{
                __html: `
                    @media (max-width: 768px) {
                        .event-form-grid {
                            grid-template-columns: 1fr !important;
                        }
                    }
                    
                    input[type="date"]::-webkit-calendar-picker-indicator,
                    input[type="time"]::-webkit-calendar-picker-indicator {
                        display: none;
                    }
                `
            }} />
        </div>
    );
}

const labelStyle = {
    fontSize: '0.85rem',
    fontWeight: 700,
    color: '#1e293b',
    marginBottom: '0.6rem',
    display: 'block'
};

const inputStyle = {
    width: '100%',
    padding: '1rem 1.25rem',
    fontSize: '0.95rem',
    backgroundColor: '#f8fafc',
    border: '1.5px solid #e2e8f0',
    borderRadius: '14px',
    color: '#1e293b',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s'
};

const iconStyle = {
    position: 'absolute',
    right: '1rem',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#94a3b8',
    pointerEvents: 'none'
};

const hintStyle = {
    fontSize: '0.75rem',
    color: '#94a3b8',
    marginTop: '0.5rem',
    fontWeight: 500,
    fontStyle: 'italic',
    margin: '0.5rem 0 0 0'
};
