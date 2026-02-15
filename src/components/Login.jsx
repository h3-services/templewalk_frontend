import React, { useState } from 'react';
import { useConfig } from '../contexts/ConfigContext';
import { useNavigate } from '../simple-router';
import { Lock, User, Eye, EyeOff } from 'lucide-react';
import VelLogo from '../assets/Vel.svg';

export function Login() {
    const { login, appConfig } = useConfig();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberDevice, setRememberDevice] = useState(false);
    const [isUsernameFocused, setIsUsernameFocused] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);

    React.useEffect(() => {
        document.title = 'Login | Temple Walk Admin';
    }, []);

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
            minHeight: '100vh',
            background: '#f5e6d3',
            padding: '3rem 2rem',
            fontFamily: 'Outfit, sans-serif',
            overflowY: 'auto'
        }}>
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                maxWidth: '1000px',
                width: '100%',
                background: 'white',
                borderRadius: '32px',
                overflow: 'hidden',
                boxShadow: '0 20px 60px -12px rgba(0,0,0,0.15)',
                minHeight: '600px',
                margin: '0 auto'
            }} className="login-container">

                {/* Left Side - Login Form */}
                <div style={{
                    padding: '4rem 3.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}>
                    {/* Logo */}
                    <div style={{
                        width: '56px',
                        height: '56px',
                        background: '#fff7ed',
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '2rem',
                        padding: '0.75rem'
                    }}>
                        <img src={VelLogo} alt="Vel Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    </div>

                    {/* Heading */}
                    <h1 style={{
                        fontSize: '2rem',
                        fontWeight: 800,
                        color: '#1e293b',
                        marginBottom: '0.5rem',
                        fontFamily: 'Lora, serif'
                    }}>Welcome Admin</h1>

                    <p style={{
                        color: '#64748b',
                        fontSize: '0.95rem',
                        marginBottom: '2.5rem',
                        fontWeight: 500
                    }}>DFW Panguni Uthhtiram Walk Admin Portal</p>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                        {/* Username Field with Floating Label */}
                        <div style={{ position: 'relative' }}>
                            <label style={{
                                position: 'absolute',
                                left: '14px',
                                top: (isUsernameFocused || formData.username) ? '-8px' : '15px',
                                fontSize: (isUsernameFocused || formData.username) ? '12px' : '14px',
                                color: isUsernameFocused ? '#f97316' : '#9ca3af',
                                backgroundColor: 'white',
                                padding: '0 5px',
                                transition: 'all 0.2s ease',
                                pointerEvents: 'none',
                                fontWeight: (isUsernameFocused || formData.username) ? '700' : '500',
                                zIndex: 1
                            }}>
                                Username or Email
                            </label>
                            <User size={18} style={{
                                position: 'absolute',
                                right: '1rem',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: '#94a3b8',
                                zIndex: 1
                            }} />
                            <input
                                type="text"
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                onFocus={() => setIsUsernameFocused(true)}
                                onBlur={() => setIsUsernameFocused(false)}
                                style={{
                                    width: '100%',
                                    padding: isUsernameFocused ? '13px 17px' : '14px 18px',
                                    borderRadius: '12px',
                                    border: `${isUsernameFocused ? '2px' : '1px'} solid ${isUsernameFocused ? '#f97316' : '#e5e7eb'}`,
                                    fontSize: '14px',
                                    color: '#111827',
                                    outline: 'none',
                                    boxSizing: 'border-box',
                                    transition: 'all 0.2s ease'
                                }}
                            />
                        </div>

                        {/* Password Field with Floating Label */}
                        <div style={{ position: 'relative' }}>
                            <label style={{
                                position: 'absolute',
                                left: '14px',
                                top: (isPasswordFocused || formData.password) ? '-8px' : '15px',
                                fontSize: (isPasswordFocused || formData.password) ? '12px' : '14px',
                                color: isPasswordFocused ? '#f97316' : '#9ca3af',
                                backgroundColor: 'white',
                                padding: '0 5px',
                                transition: 'all 0.2s ease',
                                pointerEvents: 'none',
                                fontWeight: (isPasswordFocused || formData.password) ? '700' : '500',
                                zIndex: 1
                            }}>
                                Password
                            </label>
                            <Lock size={18} style={{
                                position: 'absolute',
                                right: '3rem',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: '#94a3b8',
                                zIndex: 1
                            }} />
                            <input
                                type={showPassword ? "text" : "password"}
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                onFocus={() => setIsPasswordFocused(true)}
                                onBlur={() => setIsPasswordFocused(false)}
                                style={{
                                    width: '100%',
                                    padding: isPasswordFocused ? '13px 17px' : '14px 18px',
                                    borderRadius: '12px',
                                    border: `${isPasswordFocused ? '2px' : '1px'} solid ${isPasswordFocused ? '#f97316' : '#e5e7eb'}`,
                                    fontSize: '14px',
                                    color: '#111827',
                                    outline: 'none',
                                    boxSizing: 'border-box',
                                    transition: 'all 0.2s ease'
                                }}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                    position: 'absolute',
                                    right: '1rem',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    color: '#94a3b8',
                                    padding: 0,
                                    display: 'flex',
                                    alignItems: 'center',
                                    zIndex: 1
                                }}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>

                        {/* Remember Device & Forgot Password */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <label style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                cursor: 'pointer',
                                fontSize: '0.85rem',
                                color: '#64748b',
                                fontWeight: 500
                            }}>
                                <input
                                    type="checkbox"
                                    checked={rememberDevice}
                                    onChange={(e) => setRememberDevice(e.target.checked)}
                                    style={{ cursor: 'pointer' }}
                                />
                                Remember this device
                            </label>
                            <a href="#" style={{
                                fontSize: '0.85rem',
                                color: '#f97316',
                                textDecoration: 'none',
                                fontWeight: 600
                            }}>Forgot Password?</a>
                        </div>

                        {error && <p style={{ color: '#ef4444', fontSize: '0.85rem', fontWeight: 600, margin: 0 }}>{error}</p>}

                        {/* Sign In Button */}
                        <button type="submit" style={{
                            background: '#f97316',
                            color: 'white',
                            padding: '1rem',
                            borderRadius: '14px',
                            border: 'none',
                            fontWeight: 700,
                            fontSize: '1rem',
                            cursor: 'pointer',
                            marginTop: '0.5rem',
                            boxShadow: '0 4px 14px rgba(249, 115, 22, 0.25)',
                            transition: 'all 0.2s'
                        }}
                            onMouseEnter={(e) => {
                                e.target.style.transform = 'translateY(-2px)';
                                e.target.style.boxShadow = '0 6px 20px rgba(249, 115, 22, 0.3)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = '0 4px 14px rgba(249, 115, 22, 0.25)';
                            }}
                        >
                            Sign In
                        </button>
                    </form>

                    {/* Footer */}
                    <p style={{
                        textAlign: 'center',
                        marginTop: '2rem',
                        fontSize: '0.85rem',
                        color: '#64748b',
                        fontWeight: 500
                    }}>
                        Need access? <a href="#" style={{ color: '#f97316', textDecoration: 'none', fontWeight: 700 }}>Contact Administrator</a>
                    </p>
                </div>

                {/* Right Side - Branding */}
                <div style={{
                    background: 'linear-gradient(135deg, #b87456 0%, #d49574 50%, #f4c09f 100%)',
                    padding: '4rem 3rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative'
                }}>
                    {/* Badge */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <div style={{
                            background: 'rgba(255, 255, 255, 0.2)',
                            backdropFilter: 'blur(10px)',
                            padding: '0.5rem 1.25rem',
                            borderRadius: '100px',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            fontSize: '0.7rem',
                            fontWeight: 800,
                            color: 'white',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase'
                        }}>
                            Patha Yatra Portal
                        </div>
                    </div>

                    {/* Main Content */}
                    <div style={{
                        background: 'rgba(139, 92, 71, 0.35)',
                        backdropFilter: 'blur(20px)',
                        padding: '2.5rem',
                        borderRadius: '24px',
                        border: '1px solid rgba(255, 255, 255, 0.2)'
                    }}>
                        <h2 style={{
                            fontSize: '2.25rem',
                            fontWeight: 800,
                            color: 'white',
                            marginBottom: '1rem',
                            lineHeight: 1.2,
                            fontFamily: 'Lora, serif'
                        }}>
                            Vetrivel Muruganukku Arokara
                        </h2>
                        <p style={{
                            color: 'rgba(255, 255, 255, 0.95)',
                            fontSize: '1rem',
                            lineHeight: 1.6,
                            fontWeight: 500
                        }}>
                            Managing the spiritual journey of devotees with modern efficiency and traditional values.
                        </p>
                    </div>
                </div>
            </div>

            {/* Responsive Styles */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @media (max-width: 900px) {
                    .login-container {
                        grid-template-columns: 1fr !important;
                        max-width: 500px !important;
                    }
                    .login-container > div:last-child {
                        display: none !important;
                    }
                }
            `
            }} />
        </div>
    );
}
