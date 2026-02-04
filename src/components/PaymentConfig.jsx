import React, { useState } from 'react';
import {
    Settings,
    CreditCard,
    Smartphone,
    Banknote,
    QrCode,
    Info,
    CheckCircle2,
    ToggleRight as Toggle,
    Plus
} from 'lucide-react';

export function PaymentConfig() {
    const [isEnabled, setIsEnabled] = useState(true);
    const [paymentMethods, setPaymentMethods] = useState([
        { id: 1, name: 'Google Pay / PhonePe (UPI)', status: 'Active', icon: <Smartphone size={20} /> },
        { id: 2, name: 'Bank Transfer (NEFT/IMPS)', status: 'Active', icon: <Banknote size={20} /> },
        { id: 3, name: 'Razorpay Gateway', status: 'Coming Soon', icon: <CreditCard size={20} />, disabled: true },
    ]);

    return (
        <div className="form-card">
            <div className="form-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ background: '#ecfdf5', padding: '0.75rem', borderRadius: '12px', color: '#059669' }}>
                        <Settings size={24} />
                    </div>
                    <div>
                        <h2 style={{ marginBottom: '0.25rem' }}>Payment Configuration</h2>
                        <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Configure how devotees pay for the padhayatra registration.</p>
                    </div>
                </div>
                <span className="step-indicator">STEP 4 OF 4</span>
            </div>

            <div className="form-body">
                {/* Master Toggle */}
                <div style={{
                    background: '#f9fafb',
                    padding: '1.5rem',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '2rem',
                    border: '1px solid #f3f4f6'
                }}>
                    <div>
                        <h4 style={{ fontWeight: 600, color: '#111827', marginBottom: '0.25rem' }}>Enable Registration Payments</h4>
                        <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Only registered and paid devotees will receive the mobile app login.</p>
                    </div>
                    <button
                        onClick={() => setIsEnabled(!isEnabled)}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: isEnabled ? '#f59e0b' : '#d1d5db',
                            cursor: 'pointer',
                            transition: 'color 0.2s ease'
                        }}
                    >
                        <Toggle size={40} style={{ transform: isEnabled ? 'none' : 'rotate(180deg)' }} />
                    </button>
                </div>

                <div style={{ opacity: isEnabled ? 1 : 0.5, pointerEvents: isEnabled ? 'auto' : 'none' }}>
                    {/* Amount Setup */}
                    <div className="form-group" style={{ marginBottom: '2rem' }}>
                        <label className="label">Registration Fee (Per Devotee)</label>
                        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                            <span style={{ position: 'absolute', left: '1rem', color: '#6b7280', fontWeight: 600 }}>₹</span>
                            <input
                                type="number"
                                className="input"
                                defaultValue="500"
                                style={{ paddingLeft: '2rem', fontSize: '1.25rem', fontWeight: 700 }}
                            />
                        </div>
                        <p className="help-text">This amount will be shown to devotees during registration.</p>
                    </div>

                    {/* Payment Methods */}
                    <h4 style={{ fontWeight: 600, color: '#374151', marginBottom: '1rem' }}>Active Payment Methods</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {paymentMethods.map(method => (
                            <div key={method.id} style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '1.25rem',
                                background: 'white',
                                border: '1px solid #f3f4f6',
                                borderRadius: '16px',
                                gap: '1rem',
                                transition: 'all 0.2s ease'
                            }}>
                                <div style={{
                                    background: method.disabled ? '#f3f4f6' : '#fffbeb',
                                    padding: '0.75rem',
                                    borderRadius: '12px',
                                    color: method.disabled ? '#9ca3af' : '#f59e0b'
                                }}>
                                    {method.icon}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <h5 style={{ fontWeight: 600, color: method.disabled ? '#9ca3af' : '#111827' }}>{method.name}</h5>
                                    <span style={{
                                        fontSize: '0.75rem',
                                        color: method.disabled ? '#9ca3af' : '#059669',
                                        fontWeight: 600
                                    }}>{method.status}</span>
                                </div>
                                {!method.disabled && (
                                    <button className="btn btn-ghost" style={{ fontSize: '0.85rem', color: '#f59e0b' }}>Configure</button>
                                )}
                            </div>
                        ))}
                        <button className="btn btn-outline" style={{
                            padding: '1rem',
                            borderStyle: 'dashed',
                            borderColor: '#d1d5db',
                            color: '#6b7280',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem'
                        }}>
                            <Plus size={18} /> Add New Method
                        </button>
                    </div>

                    {/* Info Box */}
                    <div style={{
                        marginTop: '2rem',
                        padding: '1.25rem',
                        background: '#eff6ff',
                        borderRadius: '12px',
                        display: 'flex',
                        gap: '1rem',
                        border: '1px solid #dbeafe'
                    }}>
                        <Info size={20} style={{ color: '#3b82f6', flexShrink: 0 }} />
                        <p style={{ fontSize: '0.875rem', color: '#1e40af', lineHeight: 1.5 }}>
                            <strong>Security Note:</strong> All payments are processed directly to your temple trust bank account. We do not store any sensitive financial data on our servers.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
