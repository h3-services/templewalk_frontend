import React from 'react';
import { Phone } from 'lucide-react';

export function EventForm({ formData, setFormData }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className="form-card">
            <div className="form-header">
                <h2>Event Information</h2>
                <span className="step-indicator">STEP 1 OF 4</span>
            </div>

            <div className="form-body">
                <div className="form-group">
                    <label className="label">Event Name</label>
                    <input
                        type="text"
                        name="eventName"
                        value={formData.eventName}
                        onChange={handleChange}
                        className="input"
                        placeholder="e.g. Annual Arulmigu Kapaleeshwarar Padhayatra"
                    />
                    <p className="help-text">Visible to all devotees on the mobile app.</p>
                </div>

                <div className="input-row">
                    <div className="form-group">
                        <label className="label">Event Date</label>
                        <input
                            type="date"
                            name="eventDate"
                            value={formData.eventDate}
                            onChange={handleChange}
                            className="input"
                        />
                    </div>
                    <div className="form-group">
                        <label className="label">Start Time</label>
                        <input
                            type="time"
                            name="startTime"
                            value={formData.startTime}
                            onChange={handleChange}
                            className="input"
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label className="label">Event Contact & Helpline</label>
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                        <Phone size={18} style={{ position: 'absolute', left: '1rem', color: 'var(--text-muted)' }} />
                        <input
                            type="text"
                            name="contact"
                            value={formData.contact}
                            onChange={handleChange}
                            className="input"
                            style={{ paddingLeft: '3rem' }}
                            placeholder="+91 00000 00000"
                        />
                    </div>
                    <p className="help-text">A dedicated helpline number for emergencies and queries.</p>
                </div>

                <div className="form-group">
                    <label className="label">Short Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="textarea"
                        placeholder="Enter a brief summary of the spiritual significance and pilgrimage rules..."
                    ></textarea>
                </div>
            </div>
        </div>
    );
}
