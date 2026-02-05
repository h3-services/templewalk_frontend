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
    Plus,
    ChevronRight,
    Lock,
    Zap,
    History
} from 'lucide-react';

export function PaymentConfig() {
    const [isEnabled, setIsEnabled] = useState(true);
    const [paymentMethods, setPaymentMethods] = useState([
        { id: 1, name: 'Google Pay / PhonePe (UPI)', status: 'Active', icon: <Smartphone size={20} />, subtext: 'Direct UPI bank transfer' },
        { id: 2, name: 'Bank Transfer (NEFT/IMPS)', status: 'Active', icon: <Banknote size={20} />, subtext: 'Manual verification required' },
        { id: 3, name: 'Razorpay Gateway', status: 'Coming Soon', icon: <CreditCard size={20} />, disabled: true, subtext: 'Auto-verification enabled' },
    ]);

    return (
        <div className="payment-config-page" style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, gap: '1.25rem' }}>

            {/* Header Section */}
            <div className="page-title-section">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
                    <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', fontFamily: 'Lora, serif' }}>
                        Financial Setup
                    </h1>
                    <span style={{
                        background: '#f0fdf4',
                        color: '#16a34a',
                        fontSize: '0.6rem',
                        fontWeight: 800,
                        padding: '0.15rem 0.6rem',
                        borderRadius: '6px',
                        letterSpacing: '0.05em'
                    }}>SECURE ENCRYPTION</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>
                    Configure registration fees, collection methods and automated receipt generation
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 340px', gap: '2rem', flex: 1, minHeight: 0 }}>

                {/* Left: Main Configuration */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', minHeight: 0 }}>

                    {/* Master Switch Card */}
                    <div style={{
                        background: isEnabled ? 'linear-gradient(135deg, #059669 0%, #10b981 100%)' : '#f1f5f9',
                        padding: '1.5rem 2rem',
                        borderRadius: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        color: isEnabled ? 'white' : '#64748b',
                        transition: 'all 0.3s ease',
                        boxShadow: isEnabled ? '0 15px 30px -10px rgba(16, 185, 129, 0.4)' : 'none'
                    }}>
                        <div>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.25rem' }}>Registration Payments</h3>
                            <p style={{ fontSize: '0.85rem', fontWeight: 600, opacity: 0.9 }}>
                                {isEnabled ? 'Currently accepting digital payments for padhayatra registrations.' : 'Payments are currently disabled. Registrations will be free.'}
                            </p>
                        </div>
                        <button
                            onClick={() => setIsEnabled(!isEnabled)}
                            style={{
                                width: '64px',
                                height: '32px',
                                borderRadius: '16px',
                                background: 'rgba(255,255,255,0.2)',
                                border: '2px solid white',
                                position: 'relative',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <div style={{
                                width: '24px',
                                height: '24px',
                                background: 'white',
                                borderRadius: '50%',
                                position: 'absolute',
                                top: '2px',
                                left: isEnabled ? '34px' : '2px',
                                transition: 'all 0.3s ease'
                            }} />
                        </button>
                    </div>

                    {/* Form Body - Conditional Opacity */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.5rem',
                        opacity: isEnabled ? 1 : 0.5,
                        pointerEvents: isEnabled ? 'auto' : 'none',
                        transition: 'opacity 0.3s ease'
                    }}>

                        {/* Amount Entry Card */}
                        <div style={{
                            background: 'white',
                            padding: '1.75rem',
                            borderRadius: '24px',
                            border: '1.5px solid #f1f5f9',
                            boxShadow: 'var(--card-shadow)'
                        }}>
                            <label style={{ fontSize: '0.7rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', display: 'block', marginBottom: '1rem' }}>Registration Fee Structure</label>
                            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                <div style={{ position: 'relative', flex: 1 }}>
                                    <span style={{ position: 'absolute', left: '1.5rem', top: '50%', transform: 'translateY(-50%)', fontWeight: 800, fontSize: '1.5rem', color: '#1e293b' }}>₹</span>
                                    <input
                                        type="number"
                                        defaultValue="500"
                                        style={{
                                            width: '100%',
                                            padding: '1rem 1.5rem 1rem 3rem',
                                            borderRadius: '18px',
                                            border: '2px solid #f1f5f9',
                                            background: '#f8fafc',
                                            fontSize: '1.75rem',
                                            fontWeight: 800,
                                            color: '#1e293b',
                                            outline: 'none'
                                        }}
                                    />
                                </div>
                                <div style={{ flex: 1.5 }}>
                                    <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#1e293b', marginBottom: '0.25rem' }}>Standard Participant Fee</div>
                                    <p style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>This amount will be automatically calculated during checkout for all devotees.</p>
                                </div>
                            </div>
                        </div>

                        {/* Payment Methods Grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            {paymentMethods.map(method => (
                                <div key={method.id} style={{
                                    background: 'white',
                                    padding: '1.25rem',
                                    borderRadius: '20px',
                                    border: '1.5px solid' + (method.disabled ? '#f1f5f9' : '#e2e8f0'),
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '1rem',
                                    position: 'relative'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '12px',
                                            background: method.disabled ? '#f1f5f9' : '#fff7ed',
                                            color: method.disabled ? '#94a3b8' : '#f97316',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            {method.icon}
                                        </div>
                                        <span style={{
                                            fontSize: '0.6rem',
                                            fontWeight: 800,
                                            padding: '0.2rem 0.5rem',
                                            borderRadius: '6px',
                                            background: method.disabled ? '#f1f5f9' : '#ecfdf5',
                                            color: method.disabled ? '#94a3b8' : '#10b981'
                                        }}>{method.status}</span>
                                    </div>
                                    <div>
                                        <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: method.disabled ? '#94a3b8' : '#1e293b' }}>{method.name}</h4>
                                        <p style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>{method.subtext}</p>
                                    </div>
                                    {!method.disabled && (
                                        <button style={{
                                            padding: '0.5rem',
                                            borderRadius: '10px',
                                            border: '1.5px solid #f1f5f9',
                                            background: 'white',
                                            color: '#64748b',
                                            fontSize: '0.75rem',
                                            fontWeight: 800,
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '0.4rem'
                                        }}>Configure Integration <ChevronRight size={14} /></button>
                                    )}
                                </div>
                            ))}
                            <button style={{
                                borderRadius: '20px',
                                border: '2px dashed #e2e8f0',
                                background: 'transparent',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem',
                                padding: '1.5rem',
                                color: '#94a3b8',
                                cursor: 'pointer'
                            }}>
                                <Plus size={24} />
                                <span style={{ fontSize: '0.8rem', fontWeight: 800 }}>Add New Method</span>
                            </button>
                        </div>

                    </div>
                </div>

                {/* Right: Security & History */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

                    {/* Security Trust Box */}
                    <div style={{
                        background: '#f8fafc',
                        padding: '1.5rem',
                        borderRadius: '24px',
                        border: '1.5px solid #e2e8f0'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                            <Lock size={18} color="#10b981" />
                            <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#1e293b' }}>Security Standards</h3>
                        </div>
                        <p style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600, lineHeight: 1.5, marginBottom: '1.25rem' }}>
                            All transactions are processed through 256-bit SSL encrypted channels directly to the Trust account.
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.75rem', color: '#1e293b', fontWeight: 700 }}>
                                <CheckCircle2 size={14} color="#10b981" /> PCI DSS Compliant
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.75rem', color: '#1e293b', fontWeight: 700 }}>
                                <CheckCircle2 size={14} color="#10b981" /> No data storage
                            </div>
                        </div>
                    </div>

                    {/* Stats/Quick Info */}
                    <div style={{
                        background: 'white',
                        padding: '1.5rem',
                        borderRadius: '24px',
                        border: '1.5px solid #f1f5f9',
                        boxShadow: 'var(--card-shadow)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                            <Zap size={18} color="#f97316" />
                            <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#1e293b' }}>Auto-Verification</h3>
                        </div>
                        <div style={{
                            padding: '1rem',
                            background: '#fff7ed',
                            borderRadius: '16px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#c2410c' }}>UPI Match Rate</span>
                            <span style={{ fontSize: '1rem', fontWeight: 800, color: '#f97316' }}>98.2%</span>
                        </div>
                    </div>

                    {/* Action Logs Link */}
                    <div style={{
                        background: '#f1f5f9',
                        padding: '1.25rem',
                        borderRadius: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        cursor: 'pointer'
                    }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
                            <History size={20} />
                        </div>
                        <div>
                            <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#1e293b' }}>Audit Logs</div>
                            <div style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 600 }}>Track configuration changes</div>
                        </div>
                        <ChevronRight size={16} color="#cbd5e1" style={{ marginLeft: 'auto' }} />
                    </div>

                </div>
            </div>

            {/* Bottom Finalize Bar */}
            <div style={{
                background: 'white',
                padding: '0.75rem 2rem',
                margin: '0 -1.5rem -0.75rem',
                borderTop: '1.5px solid #f1f5f9',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600 }}>
                    Changes reflect immediately after saving
                </span>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button style={{
                        padding: '0.6rem 2rem',
                        borderRadius: '12px',
                        border: 'none',
                        background: 'linear-gradient(135deg, #0f172a 0%, #334155 100%)',
                        color: 'white',
                        fontWeight: 800,
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        boxShadow: '0 8px 16px -4px rgba(15, 23, 42, 0.3)'
                    }}>
                        Save Configuration
                    </button>
                </div>
            </div>

        </div>
    );
}
