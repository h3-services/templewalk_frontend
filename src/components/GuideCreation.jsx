import React, { useState } from 'react';
import {
    Upload,
    Plus,
    Trash2,
    GripVertical,
    Image as ImageIcon,
    Music,
    Type,
    Link as LinkIcon,
    Save,
    Eye,
    EyeOff,
    Check,
    AlertCircle,
    MoveUp,
    MoveDown
} from 'lucide-react';

export function GuideCreation() {


    // Categories State
    const [categories, setCategories] = useState([
        {
            id: 1,
            title: 'Vratham Rules',
            description: 'Essential discipline guidelines and behavioral codes.',
            content: '',
            icon: null,
            audio: null,
            active: true
        },
        {
            id: 2,
            title: 'Fasting Types',
            description: 'Levels of dietary observances for spiritual purification.',
            content: '',
            icon: null,
            audio: null,
            active: true
        },
        {
            id: 3,
            title: 'Daily Pooja',
            description: 'Step-by-step ritual instructions for your morning/evening.',
            content: '',
            icon: null,
            audio: null,
            active: true
        },
        {
            id: 4,
            title: 'Chant List',
            description: 'Library of Shlokas & Mantras with audio guidance.',
            content: '',
            icon: null,
            audio: null,
            active: true
        }
    ]);

    // Pro-Tips State
    const [proTip, setProTip] = useState({
        title: 'Hydration is Key',
        description: 'Drink mostly water and electrolytes. Avoid sugary sodas.',
        visible: true
    });



    // Drag-and-Drop / Reorder Handlers
    const moveCategory = (index, direction) => {
        const newCategories = [...categories];
        if (direction === 'up' && index > 0) {
            [newCategories[index], newCategories[index - 1]] = [newCategories[index - 1], newCategories[index]];
        } else if (direction === 'down' && index < newCategories.length - 1) {
            [newCategories[index], newCategories[index + 1]] = [newCategories[index + 1], newCategories[index]];
        }
        setCategories(newCategories);
    };

    // Category Handlers
    const addCategory = () => {
        const newId = Math.max(...categories.map(c => c.id), 0) + 1;
        setCategories([...categories, {
            id: newId,
            title: 'New Category',
            description: '',
            content: '',
            icon: null,
            audio: null,
            active: true
        }]);
    };

    const updateCategory = (id, field, value) => {
        setCategories(categories.map(c => c.id === id ? { ...c, [field]: value } : c));
    };

    const deleteCategory = (id) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            setCategories(categories.filter(c => c.id !== id));
        }
    };

    // Toast Notification (Simple Implementation)
    const [toast, setToast] = useState(null);
    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const handleSave = () => {
        // Logic to save to backend would go here
        console.log({ categories, proTip });
        showToast('Changes saved successfully!');
    };

    // File Upload Handler (Generic)
    const handleFileUpload = (e, callback) => {
        const file = e.target.files[0];
        if (file) {
            // In a real app, upload to server/storage and get URL. 
            // Here we use local object URL for preview.
            const url = URL.createObjectURL(file);
            callback(url);
        }
    };

    return (
        <div style={{
            flex: 1,
            overflowY: 'auto',
            paddingBottom: '2rem',
            paddingRight: '0.5rem'
        }}>
            {/* Toast Notification */}
            {toast && (
                <div style={{
                    position: 'fixed',
                    top: '2rem',
                    right: '2rem',
                    background: toast.type === 'success' ? '#fff7ed' : '#fee2e2',
                    border: `1px solid ${toast.type === 'success' ? '#f97316' : '#ef4444'}`,
                    color: toast.type === 'success' ? '#c2410c' : '#b91c1c',
                    padding: '1rem 1.5rem',
                    borderRadius: '12px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                    zIndex: 2000,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    animation: 'slideIn 0.3s ease-out'
                }}>
                    {toast.type === 'success' ? <Check size={20} /> : <AlertCircle size={20} />}
                    <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{toast.message}</span>
                </div>
            )}

            {/* Header Actions */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '2rem' }}>
                <button
                    onClick={handleSave}
                    style={{
                        padding: '0.75rem 1.5rem',
                        background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '12px',
                        fontSize: '0.9rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        boxShadow: '0 4px 12px rgba(249, 115, 22, 0.2)'
                    }}
                >
                    <Save size={18} /> Save All Changes
                </button>
            </div>



            {/* 2. Preparation Categories Management */}
            <SectionCard
                title="Preparation Categories"
                icon={<GripVertical size={20} color="#f97316" />}
                action={
                    <button style={outlineBtnStyle} onClick={addCategory}>
                        <Plus size={16} /> Add Category
                    </button>
                }
            >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {categories.map((cat, index) => (
                        <div key={cat.id} style={{
                            border: '1px solid #e2e8f0',
                            borderRadius: '16px',
                            padding: '1.5rem',
                            background: '#fff',
                            position: 'relative',
                            transition: 'all 0.2s'
                        }}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: '1.5rem',
                                borderBottom: '1px solid #f1f5f9',
                                paddingBottom: '1rem'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                        <button
                                            onClick={() => moveCategory(index, 'up')}
                                            disabled={index === 0}
                                            style={moveBtnStyle}
                                        >
                                            <MoveUp size={14} />
                                        </button>
                                        <button
                                            onClick={() => moveCategory(index, 'down')}
                                            disabled={index === categories.length - 1}
                                            style={moveBtnStyle}
                                        >
                                            <MoveDown size={14} />
                                        </button>
                                    </div>
                                    <span style={{ fontWeight: 700, color: '#64748b' }}>#{index + 1}</span>
                                    <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>{cat.title}</h3>
                                </div>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <Toggle
                                        active={cat.active}
                                        onToggle={() => updateCategory(cat.id, 'active', !cat.active)}
                                    />
                                    <button
                                        onClick={() => deleteCategory(cat.id)}
                                        style={{ ...iconBtnStyle, color: '#ef4444' }}
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>

                            <div style={gridStyle}>
                                <div>
                                    <label style={labelStyle}>Category Icon</label>
                                    <div style={{
                                        width: '80px',
                                        height: '80px',
                                        borderRadius: '12px',
                                        border: '1px dashed #cbd5e1',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        background: cat.icon ? `url(${cat.icon}) center/cover` : '#f8fafc',
                                        overflow: 'hidden'
                                    }}
                                        onClick={() => document.getElementById(`icon-upload-${cat.id}`).click()}
                                    >
                                        {!cat.icon && <Upload size={20} color="#94a3b8" />}
                                    </div>
                                    <input
                                        id={`icon-upload-${cat.id}`}
                                        type="file"
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        onChange={(e) => handleFileUpload(e, (url) => updateCategory(cat.id, 'icon', url))}
                                    />
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <div>
                                        <label style={labelStyle}>Category Title</label>
                                        <input
                                            type="text"
                                            style={inputStyle}
                                            value={cat.title}
                                            onChange={(e) => updateCategory(cat.id, 'title', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label style={labelStyle}>Short Description</label>
                                        <input
                                            type="text"
                                            style={inputStyle}
                                            value={cat.description}
                                            onChange={(e) => updateCategory(cat.id, 'description', e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div style={{ gridColumn: '1 / -1' }}>
                                    <label style={labelStyle}>Detailed Content (Rich Text)</label>
                                    <textarea
                                        style={{ ...inputStyle, minHeight: '150px', resize: 'vertical' }}
                                        value={cat.content}
                                        onChange={(e) => updateCategory(cat.id, 'content', e.target.value)}
                                        placeholder="Write detailed instructions here..."
                                    />
                                </div>

                                <div style={{ gridColumn: '1 / -1' }}>
                                    <label style={labelStyle}>Audio Upload (Optional)</label>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <button
                                            style={outlineBtnStyle}
                                            onClick={() => document.getElementById(`audio-upload-${cat.id}`).click()}
                                        >
                                            <Music size={16} /> {cat.audio ? 'Change Audio' : 'Upload Chant/Audio'}
                                        </button>
                                        <input
                                            id={`audio-upload-${cat.id}`}
                                            type="file"
                                            accept="audio/*"
                                            style={{ display: 'none' }}
                                            onChange={(e) => handleFileUpload(e, (url) => updateCategory(cat.id, 'audio', url))}
                                        />
                                        {cat.audio && (
                                            <audio controls src={cat.audio} style={{ height: '32px' }} />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </SectionCard>

            {/* 3. Pro-Tip Section Management */}
            <SectionCard title="Pro-Tip Section" icon={<Type size={20} color="#f97316" />}>
                <div style={gridStyle}>
                    <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <label style={labelStyle}>Pro-Tip Visibility</label>
                        <Toggle
                            active={proTip.visible}
                            onToggle={() => setProTip({ ...proTip, visible: !proTip.visible })}
                        />
                    </div>
                    <div>
                        <label style={labelStyle}>Pro-Tip Title</label>
                        <input
                            type="text"
                            style={inputStyle}
                            value={proTip.title}
                            onChange={(e) => setProTip({ ...proTip, title: e.target.value })}
                        />
                    </div>
                    <div>
                        <label style={labelStyle}>Description</label>
                        <input
                            type="text"
                            style={inputStyle}
                            value={proTip.description}
                            onChange={(e) => setProTip({ ...proTip, description: e.target.value })}
                        />
                    </div>
                </div>
            </SectionCard>
        </div>
    );
}

// Reusable Components
function SectionCard({ title, icon, children, action }) {
    return (
        <div style={{
            background: 'white',
            borderRadius: '24px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
            border: '1px solid rgba(0,0,0,0.03)',
            overflow: 'hidden',
            marginBottom: '2rem'
        }}>
            <div style={{
                padding: '1.5rem 2rem',
                borderBottom: '1px solid #f1f5f9',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '12px',
                        background: '#fff7ed',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        {icon}
                    </div>
                    <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1e293b', margin: 0 }}>{title}</h2>
                </div>
                {action}
            </div>
            <div style={{ padding: '2rem' }}>
                {children}
            </div>
        </div>
    );
}

function Toggle({ active, onToggle }) {
    return (
        <div
            onClick={onToggle}
            style={{
                width: '48px',
                height: '26px',
                background: active ? '#f97316' : '#cbd5e1',
                borderRadius: '99px',
                position: 'relative',
                cursor: 'pointer',
                transition: 'background 0.3s'
            }}
        >
            <div style={{
                width: '20px',
                height: '20px',
                background: 'white',
                borderRadius: '50%',
                position: 'absolute',
                top: '3px',
                left: active ? '25px' : '3px',
                transition: 'left 0.3s',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }} />
        </div>
    );
}

// Styles
const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1.5rem',
    alignItems: 'start'
};

const labelStyle = {
    display: 'block',
    fontSize: '0.85rem',
    fontWeight: 700,
    color: '#475569',
    marginBottom: '0.5rem'
};

const inputStyle = {
    width: '100%',
    padding: '0.8rem 1rem',
    borderRadius: '12px',
    border: '1.5px solid #e2e8f0',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'border-color 0.2s',
    background: '#f8fafc',
    color: '#1e293b'
};

const outlineBtnStyle = {
    padding: '0.6rem 1.2rem',
    borderRadius: '10px',
    border: '1.5px solid #e2e8f0',
    background: 'white',
    color: '#64748b',
    fontWeight: 600,
    fontSize: '0.85rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
};

const iconBtnStyle = {
    padding: '0.5rem',
    borderRadius: '8px',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background 0.2s'
};

const moveBtnStyle = {
    ...iconBtnStyle,
    color: '#94a3b8',
    padding: '2px'
};
