import React, { useState } from 'react';
import { useConfig } from '../contexts/ConfigContext';
import {
    Settings as SettingsIcon,
    CreditCard,
    Music,
    Image as ImageIcon,
    Save,
    Upload,
    Check,
    Globe,
    FileText,
    Shield
} from 'lucide-react';

export function Settings() {
    const { appConfig, updateConfig } = useConfig();
    const [activeTab, setActiveTab] = useState('Basic Info');

    // Local state for forms
    const [basicInfo, setBasicInfo] = useState({
        title: appConfig?.title || '',
        subtitle: appConfig?.subtitle || '',
        logo: appConfig?.logo || null
    });

    const [paymentConfig, setPaymentConfig] = useState({
        strikeCode: '',
        apiKey: '****************',
        currency: 'USD'
    });

    const [mediaItems, setMediaItems] = useState([
        { id: 1, name: 'Morning_Prayer.mp3', type: 'audio', size: '4.2 MB' },
        { id: 2, name: 'Temple_Banner_Main.jpg', type: 'image', size: '2.8 MB' }
    ]);

    const handleSaveBasicInfo = () => {
        updateConfig({
            title: basicInfo.title,
            subtitle: basicInfo.subtitle,
            logo: basicInfo.logo
        });
        alert('Configuration saved successfully!');
    };

    const handleLogoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Create a fake local URL for preview
            const url = URL.createObjectURL(file);
            setBasicInfo(prev => ({ ...prev, logo: url }));
        }
    };

    const tabs = [
        { id: 'Basic Info', icon: <FileText size={18} /> },
        { id: 'Payment Config', icon: <CreditCard size={18} /> },
        { id: 'Medias', icon: <Music size={18} /> },
    ];

    return (
        <div className="settings-page" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', flex: 1, minHeight: 0 }}>
            {/* Header */}
            <div>
                <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1e293b', fontFamily: 'Lora, serif', marginBottom: '0.25rem' }}>
                    Settings
                </h1>
                <p style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 600 }}>
                    Manage application preferences and configurations.
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: '2rem' }}>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {/* Tabs */}
                    <div style={{
                        display: 'flex',
                        gap: '0.75rem',
                        padding: '0.5rem',
                        background: '#f8fafc',
                        borderRadius: '16px',
                        width: 'fit-content',
                        border: '1px solid #f1f5f9'
                    }}>
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    borderRadius: '12px',
                                    background: activeTab === tab.id ? 'white' : 'transparent',
                                    color: activeTab === tab.id ? '#f97316' : '#64748b',
                                    fontWeight: 800,
                                    fontSize: '0.9rem',
                                    border: 'none',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.6rem',
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    boxShadow: activeTab === tab.id ? '0 4px 12px -2px rgba(0,0,0,0.08)' : 'none'
                                }}
                            >
                                {tab.icon}
                                {tab.id}
                            </button>
                        ))}
                    </div>

                    {/* Content Area */}
                    <div style={{
                        background: 'white',
                        borderRadius: '24px',
                        padding: '2.5rem',
                        border: '1px solid rgba(226, 232, 240, 0.8)',
                        boxShadow: '0 20px 40px -12px rgba(0,0,0,0.05)'
                    }}>

                        {/* BASIC INFO TAB */}
                        {activeTab === 'Basic Info' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div className="form-group">
                                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.5rem' }}>App Title</label>
                                    <input
                                        type="text"
                                        value={basicInfo.title}
                                        onChange={(e) => setBasicInfo({ ...basicInfo, title: e.target.value })}
                                        style={{ width: '100%', padding: '1rem', borderRadius: '14px', border: '1.5px solid #e2e8f0', outline: 'none', fontWeight: 600, color: '#1e293b', fontSize: '0.95rem', transition: 'border-color 0.2s', background: '#f8fafc' }}
                                    />
                                </div>
                                <div className="form-group">
                                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.5rem' }}>Subtitle</label>
                                    <input
                                        type="text"
                                        value={basicInfo.subtitle}
                                        onChange={(e) => setBasicInfo({ ...basicInfo, subtitle: e.target.value })}
                                        style={{ width: '100%', padding: '0.85rem', borderRadius: '12px', border: '1.5px solid #e2e8f0', outline: 'none', fontWeight: 600, color: '#1e293b', fontSize: '0.9rem' }}
                                    />
                                </div>
                                <div className="form-group">
                                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.5rem' }}>App Logo</label>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                        <div style={{ width: '80px', height: '80px', borderRadius: '20px', background: '#f8fafc', border: '2px dashed #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                                            {basicInfo.logo ? (
                                                <img src={basicInfo.logo} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                            ) : (
                                                <ImageIcon size={32} color="#cbd5e1" />
                                            )}
                                        </div>
                                        <input type="file" onChange={handleLogoUpload} accept="image/*" />
                                    </div>
                                </div>
                                <button
                                    onClick={handleSaveBasicInfo}
                                    style={{ alignSelf: 'flex-start', padding: '0.75rem 2rem', background: '#f97316', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem' }}
                                >
                                    <Save size={18} /> Save Changes
                                </button>
                            </div>
                        )}

                        {/* PAYMENT CONFIG TAB */}
                        {activeTab === 'Payment Config' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div style={{ background: '#f0fdf4', padding: '1rem', borderRadius: '16px', border: '1px solid #bbf7d0', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <div style={{ background: '#dcfce7', padding: '0.5rem', borderRadius: '8px', color: '#15803d' }}>
                                        <Shield size={24} />
                                    </div>
                                    <div>
                                        <h4 style={{ color: '#15803d', fontWeight: 800, fontSize: '0.9rem' }}>Secure Payment Gateway</h4>
                                        <p style={{ color: '#166534', fontSize: '0.8rem', fontWeight: 600 }}>All transactions are encrypted and secured.</p>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.5rem' }}>Stripe API Code</label>
                                    <input
                                        type="text"
                                        value={paymentConfig.strikeCode}
                                        placeholder="sk_live_..."
                                        onChange={(e) => setPaymentConfig({ ...paymentConfig, strikeCode: e.target.value })}
                                        style={{ width: '100%', padding: '1rem', borderRadius: '14px', border: '1.5px solid #e2e8f0', outline: 'none', fontWeight: 600, color: '#1e293b', fontSize: '0.95rem', fontFamily: 'monospace', background: '#f8fafc' }}
                                    />
                                </div>
                                <div className="form-group">
                                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.5rem' }}>Currency</label>
                                    <select
                                        style={{ width: '100%', padding: '0.85rem', borderRadius: '12px', border: '1.5px solid #e2e8f0', outline: 'none', fontWeight: 600, color: '#1e293b', fontSize: '0.9rem' }}
                                    >
                                        <option>USD ($)</option>
                                        <option>INR (₹)</option>
                                    </select>
                                </div>
                                <button
                                    onClick={() => alert("Payment config saved!")}
                                    style={{ alignSelf: 'flex-start', padding: '0.75rem 2rem', background: '#f97316', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem' }}
                                >
                                    <Save size={18} /> Update Configuration
                                </button>
                            </div>
                        )}

                        {/* MEDIAS TAB */}
                        {activeTab === 'Medias' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div style={{ border: '2px dashed #cbd5e1', borderRadius: '20px', padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', background: '#f8fafc', cursor: 'pointer' }}>
                                    <div style={{ background: '#e2e8f0', padding: '1rem', borderRadius: '50%', color: '#64748b' }}>
                                        <Upload size={24} />
                                    </div>
                                    <div style={{ textAlign: 'center' }}>
                                        <h4 style={{ color: '#1e293b', fontWeight: 800 }}>Click to Upload Files</h4>
                                        <p style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: 600 }}>Support for .mp3, .jpg, .png</p>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#1e293b' }}>Media Library</h4>
                                    {mediaItems.map(item => (
                                        <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: '#f8fafc', borderRadius: '16px', border: '1.5px solid #f1f5f9' }}>
                                            <div style={{ padding: '0.75rem', borderRadius: '12px', background: item.type === 'audio' ? '#e0f2fe' : '#fce7f3', color: item.type === 'audio' ? '#0284c7' : '#db2777' }}>
                                                {item.type === 'audio' ? <Music size={20} /> : <ImageIcon size={20} />}
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <h5 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#1e293b' }}>{item.name}</h5>
                                                <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>{item.size}</span>
                                            </div>
                                            <button style={{ padding: '0.5rem', borderRadius: '8px', border: '1px solid #cbd5e1', background: 'white', color: '#64748b', cursor: 'pointer' }}>View</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>
                </div>

                {/* Side Info */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)', padding: '1.5rem', borderRadius: '24px', color: 'white', boxShadow: '0 20px 25px -5px rgba(249, 115, 22, 0.3)' }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.5rem' }}>Admin Status</h3>
                        <p style={{ fontSize: '0.85rem', opacity: 0.8, marginBottom: '1.5rem' }}>You have full access to all settings.</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.1)', padding: '0.75rem', borderRadius: '12px' }}>
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e' }} />
                            <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>System Active</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
