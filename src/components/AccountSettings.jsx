import React, { useState } from 'react';
import {
    User,
    Mail,
    Phone,
    Shield,
    Camera,
    Save,
    Bell,
    Eye,
    EyeOff,
    ChevronRight,
    Lock,
    Globe,
    Palette
} from 'lucide-react';

export function AccountSettings() {
    const [activeTab, setActiveTab] = useState('profile');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [saveAnimation, setSaveAnimation] = useState(false);

    const [profileData, setProfileData] = useState({
        firstName: 'Alex',
        lastName: 'Rivera',
        email: 'alex.rivera@templeadmin.org',
        phone: '+1 (555) 123-4567',
        role: 'Temple Admin',
        bio: 'Managing temple walks and community events for the DFW area.'
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [preferences, setPreferences] = useState({
        emailNotifications: true,
        smsAlerts: false,
        darkMode: false,
        language: 'English'
    });

    const handleProfileChange = (field, value) => {
        setProfileData(prev => ({ ...prev, [field]: value }));
    };

    const handlePasswordChange = (field, value) => {
        setPasswordData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        setSaveAnimation(true);
        console.log('Profile saved:', profileData);
        setTimeout(() => setSaveAnimation(false), 1500);
    };

    const handlePasswordSave = () => {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        setSaveAnimation(true);
        console.log('Password updated');
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        setTimeout(() => setSaveAnimation(false), 1500);
    };

    const tabs = [
        { id: 'profile', label: 'Profile', icon: <User size={18} /> },
        { id: 'security', label: 'Security', icon: <Shield size={18} /> },
        { id: 'preferences', label: 'Preferences', icon: <Palette size={18} /> },
    ];

    return (
        <div style={{
            flex: 1,
            overflow: 'auto',
            padding: '0 0.5rem 1rem 0.5rem',
        }}>
            {/* Hero Section */}
            <div style={{
                background: 'linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 50%, #FED7AA 100%)',
                borderRadius: '24px',
                padding: '2rem 2.5rem',
                marginBottom: '1.5rem',
                position: 'relative',
                overflow: 'hidden',
                border: '1.5px solid rgba(249, 115, 22, 0.1)',
            }}>
                {/* Decorative circles */}
                <div style={{
                    position: 'absolute', top: '-30px', right: '-30px',
                    width: '120px', height: '120px', borderRadius: '50%',
                    background: 'rgba(249, 115, 22, 0.08)',
                }} />
                <div style={{
                    position: 'absolute', bottom: '-20px', right: '80px',
                    width: '80px', height: '80px', borderRadius: '50%',
                    background: 'rgba(249, 115, 22, 0.06)',
                }} />

                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', position: 'relative', zIndex: 1 }}>
                    {/* Avatar */}
                    <div style={{ position: 'relative' }}>
                        <div style={{
                            width: '80px', height: '80px', borderRadius: '50%',
                            background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '1.75rem', fontWeight: 800, color: 'white',
                            boxShadow: '0 8px 24px rgba(249, 115, 22, 0.3)',
                            border: '3px solid white',
                        }}>
                            AR
                        </div>
                        <button style={{
                            position: 'absolute', bottom: '-2px', right: '-2px',
                            width: '28px', height: '28px', borderRadius: '50%',
                            background: 'white', border: '2px solid #f97316',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer', color: '#f97316',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                            transition: 'transform 0.2s ease',
                        }}
                            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            <Camera size={13} strokeWidth={2.5} />
                        </button>
                    </div>

                    {/* User Info */}
                    <div>
                        <h2 style={{
                            fontSize: '1.5rem', fontWeight: 800, color: '#1e293b',
                            fontFamily: "'Outfit', sans-serif", marginBottom: '0.25rem',
                        }}>
                            {profileData.firstName} {profileData.lastName}
                        </h2>
                        <p style={{
                            fontSize: '0.85rem', color: '#64748b', fontWeight: 600,
                            display: 'flex', alignItems: 'center', gap: '0.5rem',
                        }}>
                            <span style={{
                                background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                                color: 'white', padding: '0.15rem 0.65rem',
                                borderRadius: '99px', fontSize: '0.7rem', fontWeight: 700,
                            }}>
                                {profileData.role}
                            </span>
                            <span style={{ color: '#94a3b8' }}>•</span>
                            {profileData.email}
                        </p>
                    </div>
                </div>
            </div>

            {/* Tab Navigation */}
            <div style={{
                display: 'flex', gap: '0.5rem', marginBottom: '1.5rem',
                background: 'white', borderRadius: '16px', padding: '0.4rem',
                border: '1.5px solid #f1f5f9',
                boxShadow: '0 2px 12px rgba(0,0,0,0.02)',
            }}>
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        style={{
                            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
                            gap: '0.5rem', padding: '0.75rem 1rem', borderRadius: '12px',
                            border: 'none', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 700,
                            fontFamily: "'Outfit', sans-serif",
                            background: activeTab === tab.id
                                ? 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)'
                                : 'transparent',
                            color: activeTab === tab.id ? 'white' : '#64748b',
                            boxShadow: activeTab === tab.id ? '0 4px 12px rgba(249, 115, 22, 0.25)' : 'none',
                            transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                        }}
                        onMouseEnter={e => {
                            if (activeTab !== tab.id) e.currentTarget.style.background = '#f8fafc';
                        }}
                        onMouseLeave={e => {
                            if (activeTab !== tab.id) e.currentTarget.style.background = 'transparent';
                        }}
                    >
                        {tab.icon}
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Profile Tab */}
            {activeTab === 'profile' && (
                <div style={{
                    background: 'white', borderRadius: '24px', padding: '2rem',
                    border: '1.5px solid #f1f5f9',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem' }}>
                        <div style={{
                            width: '36px', height: '36px', borderRadius: '12px',
                            background: '#FFF7ED', display: 'flex', alignItems: 'center',
                            justifyContent: 'center', color: '#f97316',
                        }}>
                            <User size={18} />
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1e293b', fontFamily: "'Outfit', sans-serif" }}>
                                Personal Information
                            </h3>
                            <p style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>
                                Update your profile details
                            </p>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                        {/* First Name */}
                        <div style={{ position: 'relative' }}>
                            <label style={{
                                display: 'block', fontSize: '0.78rem', fontWeight: 700,
                                color: '#475569', marginBottom: '0.5rem',
                            }}>First Name</label>
                            <div style={{ position: 'relative' }}>
                                <User size={16} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                                <input
                                    type="text"
                                    value={profileData.firstName}
                                    onChange={e => handleProfileChange('firstName', e.target.value)}
                                    style={{
                                        width: '100%', padding: '0.8rem 1rem 0.8rem 2.5rem',
                                        border: '1.5px solid #e2e8f0', borderRadius: '14px',
                                        fontSize: '0.9rem', fontFamily: "'Outfit', sans-serif",
                                        fontWeight: 600, color: '#1e293b', outline: 'none',
                                        transition: 'border-color 0.2s, box-shadow 0.2s',
                                        background: '#fafbfc',
                                    }}
                                    onFocus={e => {
                                        e.target.style.borderColor = '#f97316';
                                        e.target.style.boxShadow = '0 0 0 3px rgba(249, 115, 22, 0.1)';
                                        e.target.style.background = 'white';
                                    }}
                                    onBlur={e => {
                                        e.target.style.borderColor = '#e2e8f0';
                                        e.target.style.boxShadow = 'none';
                                        e.target.style.background = '#fafbfc';
                                    }}
                                />
                            </div>
                        </div>

                        {/* Last Name */}
                        <div>
                            <label style={{
                                display: 'block', fontSize: '0.78rem', fontWeight: 700,
                                color: '#475569', marginBottom: '0.5rem',
                            }}>Last Name</label>
                            <div style={{ position: 'relative' }}>
                                <User size={16} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                                <input
                                    type="text"
                                    value={profileData.lastName}
                                    onChange={e => handleProfileChange('lastName', e.target.value)}
                                    style={{
                                        width: '100%', padding: '0.8rem 1rem 0.8rem 2.5rem',
                                        border: '1.5px solid #e2e8f0', borderRadius: '14px',
                                        fontSize: '0.9rem', fontFamily: "'Outfit', sans-serif",
                                        fontWeight: 600, color: '#1e293b', outline: 'none',
                                        transition: 'border-color 0.2s, box-shadow 0.2s',
                                        background: '#fafbfc',
                                    }}
                                    onFocus={e => {
                                        e.target.style.borderColor = '#f97316';
                                        e.target.style.boxShadow = '0 0 0 3px rgba(249, 115, 22, 0.1)';
                                        e.target.style.background = 'white';
                                    }}
                                    onBlur={e => {
                                        e.target.style.borderColor = '#e2e8f0';
                                        e.target.style.boxShadow = 'none';
                                        e.target.style.background = '#fafbfc';
                                    }}
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label style={{
                                display: 'block', fontSize: '0.78rem', fontWeight: 700,
                                color: '#475569', marginBottom: '0.5rem',
                            }}>Email Address</label>
                            <div style={{ position: 'relative' }}>
                                <Mail size={16} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                                <input
                                    type="email"
                                    value={profileData.email}
                                    readOnly
                                    style={{
                                        width: '100%', padding: '0.8rem 1rem 0.8rem 2.5rem',
                                        border: '1.5px solid #e2e8f0', borderRadius: '14px',
                                        fontSize: '0.9rem', fontFamily: "'Outfit', sans-serif",
                                        fontWeight: 600, color: '#94a3b8', outline: 'none',
                                        background: '#f1f5f9', cursor: 'not-allowed',
                                    }}
                                />
                            </div>
                            <p style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '0.35rem', fontWeight: 600 }}>
                                Contact your administrator to update email
                            </p>
                        </div>

                        {/* Phone */}
                        <div>
                            <label style={{
                                display: 'block', fontSize: '0.78rem', fontWeight: 700,
                                color: '#475569', marginBottom: '0.5rem',
                            }}>Phone Number</label>
                            <div style={{ position: 'relative' }}>
                                <Phone size={16} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                                <input
                                    type="tel"
                                    value={profileData.phone}
                                    onChange={e => handleProfileChange('phone', e.target.value)}
                                    style={{
                                        width: '100%', padding: '0.8rem 1rem 0.8rem 2.5rem',
                                        border: '1.5px solid #e2e8f0', borderRadius: '14px',
                                        fontSize: '0.9rem', fontFamily: "'Outfit', sans-serif",
                                        fontWeight: 600, color: '#1e293b', outline: 'none',
                                        transition: 'border-color 0.2s, box-shadow 0.2s',
                                        background: '#fafbfc',
                                    }}
                                    onFocus={e => {
                                        e.target.style.borderColor = '#f97316';
                                        e.target.style.boxShadow = '0 0 0 3px rgba(249, 115, 22, 0.1)';
                                        e.target.style.background = 'white';
                                    }}
                                    onBlur={e => {
                                        e.target.style.borderColor = '#e2e8f0';
                                        e.target.style.boxShadow = 'none';
                                        e.target.style.background = '#fafbfc';
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Bio */}
                    <div style={{ marginTop: '1.25rem' }}>
                        <label style={{
                            display: 'block', fontSize: '0.78rem', fontWeight: 700,
                            color: '#475569', marginBottom: '0.5rem',
                        }}>Bio</label>
                        <textarea
                            value={profileData.bio}
                            onChange={e => handleProfileChange('bio', e.target.value)}
                            rows={3}
                            style={{
                                width: '100%', padding: '0.8rem 1rem',
                                border: '1.5px solid #e2e8f0', borderRadius: '14px',
                                fontSize: '0.9rem', fontFamily: "'Outfit', sans-serif",
                                fontWeight: 600, color: '#1e293b', outline: 'none',
                                transition: 'border-color 0.2s, box-shadow 0.2s',
                                background: '#fafbfc', resize: 'vertical',
                            }}
                            onFocus={e => {
                                e.target.style.borderColor = '#f97316';
                                e.target.style.boxShadow = '0 0 0 3px rgba(249, 115, 22, 0.1)';
                                e.target.style.background = 'white';
                            }}
                            onBlur={e => {
                                e.target.style.borderColor = '#e2e8f0';
                                e.target.style.boxShadow = 'none';
                                e.target.style.background = '#fafbfc';
                            }}
                        />
                    </div>

                    {/* Save Button */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.75rem' }}>
                        <button
                            onClick={handleSave}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '0.6rem',
                                padding: '0.8rem 2rem', borderRadius: '14px', border: 'none',
                                background: saveAnimation
                                    ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)'
                                    : 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                                color: 'white', fontSize: '0.9rem', fontWeight: 700,
                                fontFamily: "'Outfit', sans-serif", cursor: 'pointer',
                                boxShadow: saveAnimation
                                    ? '0 6px 16px -4px rgba(34, 197, 94, 0.4)'
                                    : '0 6px 16px -4px rgba(249, 115, 22, 0.4)',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                transform: saveAnimation ? 'scale(1.02)' : 'scale(1)',
                            }}
                        >
                            <Save size={18} strokeWidth={2.5} />
                            {saveAnimation ? 'Saved!' : 'Save Changes'}
                        </button>
                    </div>
                </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
                <div style={{
                    background: 'white', borderRadius: '24px', padding: '2rem',
                    border: '1.5px solid #f1f5f9',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem' }}>
                        <div style={{
                            width: '36px', height: '36px', borderRadius: '12px',
                            background: '#FFF7ED', display: 'flex', alignItems: 'center',
                            justifyContent: 'center', color: '#f97316',
                        }}>
                            <Lock size={18} />
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1e293b', fontFamily: "'Outfit', sans-serif" }}>
                                Change Password
                            </h3>
                            <p style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>
                                Update your password to keep your account secure
                            </p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '500px' }}>
                        {/* Current Password */}
                        <div>
                            <label style={{
                                display: 'block', fontSize: '0.78rem', fontWeight: 700,
                                color: '#475569', marginBottom: '0.5rem',
                            }}>Current Password</label>
                            <div style={{ position: 'relative' }}>
                                <Lock size={16} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                                <input
                                    type={showCurrentPassword ? 'text' : 'password'}
                                    value={passwordData.currentPassword}
                                    onChange={e => handlePasswordChange('currentPassword', e.target.value)}
                                    placeholder="Enter current password"
                                    style={{
                                        width: '100%', padding: '0.8rem 2.75rem 0.8rem 2.5rem',
                                        border: '1.5px solid #e2e8f0', borderRadius: '14px',
                                        fontSize: '0.9rem', fontFamily: "'Outfit', sans-serif",
                                        fontWeight: 600, color: '#1e293b', outline: 'none',
                                        transition: 'border-color 0.2s, box-shadow 0.2s',
                                        background: '#fafbfc',
                                    }}
                                    onFocus={e => {
                                        e.target.style.borderColor = '#f97316';
                                        e.target.style.boxShadow = '0 0 0 3px rgba(249, 115, 22, 0.1)';
                                        e.target.style.background = 'white';
                                    }}
                                    onBlur={e => {
                                        e.target.style.borderColor = '#e2e8f0';
                                        e.target.style.boxShadow = 'none';
                                        e.target.style.background = '#fafbfc';
                                    }}
                                />
                                <button
                                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                    style={{
                                        position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)',
                                        background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8',
                                        padding: '2px', display: 'flex',
                                    }}>
                                    {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        {/* New Password */}
                        <div>
                            <label style={{
                                display: 'block', fontSize: '0.78rem', fontWeight: 700,
                                color: '#475569', marginBottom: '0.5rem',
                            }}>New Password</label>
                            <div style={{ position: 'relative' }}>
                                <Lock size={16} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                                <input
                                    type={showNewPassword ? 'text' : 'password'}
                                    value={passwordData.newPassword}
                                    onChange={e => handlePasswordChange('newPassword', e.target.value)}
                                    placeholder="Enter new password"
                                    style={{
                                        width: '100%', padding: '0.8rem 2.75rem 0.8rem 2.5rem',
                                        border: '1.5px solid #e2e8f0', borderRadius: '14px',
                                        fontSize: '0.9rem', fontFamily: "'Outfit', sans-serif",
                                        fontWeight: 600, color: '#1e293b', outline: 'none',
                                        transition: 'border-color 0.2s, box-shadow 0.2s',
                                        background: '#fafbfc',
                                    }}
                                    onFocus={e => {
                                        e.target.style.borderColor = '#f97316';
                                        e.target.style.boxShadow = '0 0 0 3px rgba(249, 115, 22, 0.1)';
                                        e.target.style.background = 'white';
                                    }}
                                    onBlur={e => {
                                        e.target.style.borderColor = '#e2e8f0';
                                        e.target.style.boxShadow = 'none';
                                        e.target.style.background = '#fafbfc';
                                    }}
                                />
                                <button
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    style={{
                                        position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)',
                                        background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8',
                                        padding: '2px', display: 'flex',
                                    }}>
                                    {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label style={{
                                display: 'block', fontSize: '0.78rem', fontWeight: 700,
                                color: '#475569', marginBottom: '0.5rem',
                            }}>Confirm New Password</label>
                            <div style={{ position: 'relative' }}>
                                <Lock size={16} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={passwordData.confirmPassword}
                                    onChange={e => handlePasswordChange('confirmPassword', e.target.value)}
                                    placeholder="Confirm new password"
                                    style={{
                                        width: '100%', padding: '0.8rem 2.75rem 0.8rem 2.5rem',
                                        border: '1.5px solid #e2e8f0', borderRadius: '14px',
                                        fontSize: '0.9rem', fontFamily: "'Outfit', sans-serif",
                                        fontWeight: 600, color: '#1e293b', outline: 'none',
                                        transition: 'border-color 0.2s, box-shadow 0.2s',
                                        background: '#fafbfc',
                                    }}
                                    onFocus={e => {
                                        e.target.style.borderColor = '#f97316';
                                        e.target.style.boxShadow = '0 0 0 3px rgba(249, 115, 22, 0.1)';
                                        e.target.style.background = 'white';
                                    }}
                                    onBlur={e => {
                                        e.target.style.borderColor = '#e2e8f0';
                                        e.target.style.boxShadow = 'none';
                                        e.target.style.background = '#fafbfc';
                                    }}
                                />
                                <button
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    style={{
                                        position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)',
                                        background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8',
                                        padding: '2px', display: 'flex',
                                    }}>
                                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Password Requirements */}
                    <div style={{
                        marginTop: '1.25rem', padding: '1rem 1.25rem',
                        background: '#FFFBEB', borderRadius: '14px',
                        border: '1px solid #FEF3C7', maxWidth: '500px',
                    }}>
                        <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#92400E', marginBottom: '0.5rem' }}>
                            Password Requirements
                        </p>
                        <ul style={{ fontSize: '0.73rem', color: '#A16207', fontWeight: 600, paddingLeft: '1rem', lineHeight: 1.8 }}>
                            <li>At least 8 characters long</li>
                            <li>Include uppercase and lowercase letters</li>
                            <li>Include at least one number</li>
                            <li>Include at least one special character</li>
                        </ul>
                    </div>

                    {/* Save Button */}
                    <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '1.75rem' }}>
                        <button
                            onClick={handlePasswordSave}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '0.6rem',
                                padding: '0.8rem 2rem', borderRadius: '14px', border: 'none',
                                background: saveAnimation
                                    ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)'
                                    : 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                                color: 'white', fontSize: '0.9rem', fontWeight: 700,
                                fontFamily: "'Outfit', sans-serif", cursor: 'pointer',
                                boxShadow: saveAnimation
                                    ? '0 6px 16px -4px rgba(34, 197, 94, 0.4)'
                                    : '0 6px 16px -4px rgba(249, 115, 22, 0.4)',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            }}
                        >
                            <Shield size={18} strokeWidth={2.5} />
                            {saveAnimation ? 'Updated!' : 'Update Password'}
                        </button>
                    </div>
                </div>
            )}

            {/* Preferences Tab */}
            {activeTab === 'preferences' && (
                <div style={{
                    background: 'white', borderRadius: '24px', padding: '2rem',
                    border: '1.5px solid #f1f5f9',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem' }}>
                        <div style={{
                            width: '36px', height: '36px', borderRadius: '12px',
                            background: '#FFF7ED', display: 'flex', alignItems: 'center',
                            justifyContent: 'center', color: '#f97316',
                        }}>
                            <Bell size={18} />
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1e293b', fontFamily: "'Outfit', sans-serif" }}>
                                Notification & Display Preferences
                            </h3>
                            <p style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>
                                Manage how you receive updates
                            </p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '500px' }}>
                        {/* Email Notifications */}
                        <div style={{
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                            padding: '1rem 1.25rem', background: '#fafbfc', borderRadius: '16px',
                            border: '1.5px solid #f1f5f9',
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <Mail size={18} style={{ color: '#f97316' }} />
                                <div>
                                    <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#1e293b', display: 'block' }}>
                                        Email Notifications
                                    </span>
                                    <span style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 600 }}>
                                        Receive event updates via email
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={() => setPreferences(p => ({ ...p, emailNotifications: !p.emailNotifications }))}
                                style={{
                                    width: '48px', height: '26px', borderRadius: '13px',
                                    border: 'none', cursor: 'pointer', position: 'relative',
                                    background: preferences.emailNotifications
                                        ? 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)'
                                        : '#e2e8f0',
                                    transition: 'background 0.3s ease',
                                }}>
                                <div style={{
                                    width: '20px', height: '20px', borderRadius: '50%',
                                    background: 'white', position: 'absolute', top: '3px',
                                    left: preferences.emailNotifications ? '25px' : '3px',
                                    transition: 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
                                }} />
                            </button>
                        </div>

                        {/* SMS Alerts */}
                        <div style={{
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                            padding: '1rem 1.25rem', background: '#fafbfc', borderRadius: '16px',
                            border: '1.5px solid #f1f5f9',
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <Phone size={18} style={{ color: '#f97316' }} />
                                <div>
                                    <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#1e293b', display: 'block' }}>
                                        SMS Alerts
                                    </span>
                                    <span style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 600 }}>
                                        Get critical alerts via text message
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={() => setPreferences(p => ({ ...p, smsAlerts: !p.smsAlerts }))}
                                style={{
                                    width: '48px', height: '26px', borderRadius: '13px',
                                    border: 'none', cursor: 'pointer', position: 'relative',
                                    background: preferences.smsAlerts
                                        ? 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)'
                                        : '#e2e8f0',
                                    transition: 'background 0.3s ease',
                                }}>
                                <div style={{
                                    width: '20px', height: '20px', borderRadius: '50%',
                                    background: 'white', position: 'absolute', top: '3px',
                                    left: preferences.smsAlerts ? '25px' : '3px',
                                    transition: 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
                                }} />
                            </button>
                        </div>

                        {/* Language */}
                        <div style={{
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                            padding: '1rem 1.25rem', background: '#fafbfc', borderRadius: '16px',
                            border: '1.5px solid #f1f5f9',
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <Globe size={18} style={{ color: '#f97316' }} />
                                <div>
                                    <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#1e293b', display: 'block' }}>
                                        Language
                                    </span>
                                    <span style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 600 }}>
                                        Select your preferred language
                                    </span>
                                </div>
                            </div>
                            <div style={{
                                display: 'flex', alignItems: 'center', gap: '0.5rem',
                                color: '#64748b', fontSize: '0.85rem', fontWeight: 600,
                            }}>
                                {preferences.language}
                                <ChevronRight size={16} style={{ color: '#94a3b8' }} />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Responsive styles */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @media (max-width: 768px) {
                    .account-settings-grid {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}} />
        </div>
    );
}
