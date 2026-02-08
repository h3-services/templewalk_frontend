import React, { useState } from 'react';
import { useConfig } from '../contexts/ConfigContext';
import { useNavigate } from '../simple-router';
import { Lock, User, ArrowRight } from 'lucide-react';

export function Login() {
    const { login, appConfig } = useConfig();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const success = login(formData.username, formData.password);
        if (success) {
            navigate('/');
        } else {
            setError('Invalid credentials');
        }
    };

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            background: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6)), url('/temple img.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            fontFamily: 'Outfit, sans-serif'
        }}>
            <div style={{
                background: 'rgba(255, 255, 255, 0.75)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                padding: '3rem',
                borderRadius: '32px',
                boxShadow: '0 20px 50px -12px rgba(0,0,0,0.5)',
                width: '100%',
                maxWidth: '420px',
                border: '1px solid rgba(255, 255, 255, 0.5)'
            }}>
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <div style={{
                        width: '64px',
                        height: '64px',
                        background: '#f97316',
                        borderRadius: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        margin: '0 auto 1.5rem'
                    }}>
                        {appConfig?.logo ? (
                            <img src={appConfig.logo} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '20px' }} />
                        ) : (
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                <polyline points="9 22 9 12 15 12 15 22" />
                            </svg>
                        )}
                    </div>
                    <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1e293b', fontFamily: 'Lora, serif', marginBottom: '0.5rem' }}>Welcome Back</h1>
                    <p style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: 600 }}>Please sign in to continue to {appConfig?.title || 'Admin Console'}</p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569' }}>USERNAME</label>
                        <div style={{ position: 'relative' }}>
                            <User size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                            <input
                                type="text"
                                placeholder="Enter your username"
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                style={{
                                    width: '100%',
                                    padding: '0.85rem 1rem 0.85rem 2.85rem',
                                    borderRadius: '14px',
                                    border: '1.5px solid #f1f5f9',
                                    background: '#f8fafc',
                                    fontWeight: 600,
                                    outline: 'none',
                                    color: '#1e293b'
                                }}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569' }}>PASSWORD</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                style={{
                                    width: '100%',
                                    padding: '0.85rem 1rem 0.85rem 2.85rem',
                                    borderRadius: '14px',
                                    border: '1.5px solid #f1f5f9',
                                    background: '#f8fafc',
                                    fontWeight: 600,
                                    outline: 'none',
                                    color: '#1e293b'
                                }}
                            />
                        </div>
                    </div>

                    {error && <p style={{ color: '#ef4444', fontSize: '0.85rem', fontWeight: 600, textAlign: 'center' }}>{error}</p>}

                    <button type="submit" style={{
                        background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                        color: 'white',
                        padding: '1rem',
                        borderRadius: '14px',
                        border: 'none',
                        fontWeight: 800,
                        fontSize: '1rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.75rem',
                        marginTop: '1rem',
                        boxShadow: '0 10px 20px -5px rgba(249, 115, 22, 0.4)'
                    }}>
                        Sign In <ArrowRight size={20} strokeWidth={2.5} />
                    </button>

                </form>
            </div>
        </div>
    );
}
