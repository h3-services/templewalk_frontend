import React, { useState, useMemo } from 'react';
import { apiFetch } from '../api';
import { createPortal } from 'react-dom';
import {
    Plus, ChevronDown, Search, X, MessageSquare, Mic, Info, Send, Calendar, Users, User, ShieldCheck, Trash2
} from 'lucide-react';
import { Dropdown } from './Dropdown';
import { SearchBar, Pagination } from './index';

export function Notifications() {
    const [searchTerm, setSearchTerm] = useState('');
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [notifType, setNotifType] = useState('text');
    const [sendTo, setSendTo] = useState('all');
    const [roleFilter, setRoleFilter] = useState('all');

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [isSending, setIsSending] = useState(false);
    const [toast, setToast] = useState(null); // { message, type: 'success' | 'error' }

    const [broadcasts, setBroadcasts] = useState([]);
    const [loading, setLoading] = useState(true);

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    React.useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    React.useEffect(() => {
        document.title = 'Notifications | Temple Walk Admin';
    }, []);

    // Form State
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [isTitleFocused, setIsTitleFocused] = useState(false);
    const [isMessageFocused, setIsMessageFocused] = useState(false);

    const [targetUserId, setTargetUserId] = useState('');

    const fetchBroadcasts = async () => {
        try {
            let url = '/api/notifications/';
            const params = new URLSearchParams();
            if (roleFilter !== 'all') {
                params.append('role', roleFilter);
            }
            if (params.toString()) {
                url += `?${params.toString()}`;
            }

            const response = await apiFetch(url);
            if (response.ok) {
                const data = await response.json();
                const mappedData = Array.isArray(data) ? data.map(item => {
                    const role = item.target_role ? item.target_role.toLowerCase() : 'all';
                    let audienceLabel = 'ALL USERS';
                    let audienceBg = "#fff7ed";
                    let audienceColor = "#f97316";

                    if (item.user_id) {
                        audienceLabel = `USER: ${item.user_id}`;
                        audienceBg = "#f5f3ff";
                        audienceColor = "#8b5cf6";
                    } else if (role === 'volunteer') {
                        audienceLabel = 'VOLUNTEERS';
                        audienceBg = "#f0fdf4";
                        audienceColor = "#22c55e";
                    } else if (role === 'devotee') {
                        audienceLabel = 'DEVOTEES';
                        audienceBg = "#eff6ff";
                        audienceColor = "#3b82f6";
                    }

                    return {
                        id: item.notification_id || item.id,
                        title: item.title,
                        description: item.message,
                        dateSent: item.created_at ? new Date(item.created_at).toLocaleDateString() : 'Unknown',
                        timeSent: item.created_at ? new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '',
                        audience: audienceLabel,
                        audienceBg: audienceBg,
                        audienceColor: audienceColor,
                        reach: "-",
                        deliveryRate: "-"
                    };
                }) : [];
                setBroadcasts(mappedData);
            } else {
                setBroadcasts([]);
            }
        } catch (error) {
            console.error("Error loading broadcasts", error);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        fetchBroadcasts();
    }, [roleFilter]);

    const filteredBroadcasts = useMemo(() => {
        return broadcasts.filter(b =>
            b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            b.audience.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [broadcasts, searchTerm]);

    const totalPages = Math.ceil(filteredBroadcasts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = filteredBroadcasts.slice(startIndex, startIndex + itemsPerPage);

    const handlePrevious = () => setCurrentPage(p => Math.max(1, p - 1));
    const handleNext = () => setCurrentPage(p => Math.min(totalPages, p + 1));

    const handleDelete = async (id) => {
        // Remove from UI immediately
        setBroadcasts(prev => prev.filter(b => b.id !== id));
        try {
            await apiFetch(`/api/notifications/${id}/`, { method: 'DELETE' });
        } catch (e) {
            // Silently ignore — already removed from UI
        }
    };

    return (
        <div className="notifications-page-container" style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            minHeight: 0,
            overflow: 'hidden'
        }}>
            {/* Overlay via Portal */}
            {isDrawerOpen && createPortal(
                <div
                    onClick={() => setIsDrawerOpen(false)}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.3)',
                        zIndex: 9998,
                        transition: 'all 0.3s'
                    }}
                />,
                document.body
            )}

            <div className="notifications-page" style={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                minHeight: 0,
                gap: '1rem'
            }}>
                {/* Page Title Header */}
                <div className="page-header" style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '0.5rem',
                    gap: '1rem',
                    flexShrink: 0
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                            borderRadius: '14px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 4px 12px rgba(139, 92, 246, 0.25)',
                            flexShrink: 0
                        }}>
                            <MessageSquare size={24} color="white" />
                        </div>
                        <div>
                            <h1 style={{
                                fontSize: '1.5rem',
                                fontWeight: 800,
                                color: '#0f172a',
                                marginBottom: '0.25rem'
                            }}>Broadcast Notifications</h1>
                            <p style={{
                                fontSize: '0.85rem',
                                color: '#64748b',
                                fontWeight: 500
                            }}>Manage and send announcements to your community</p>
                        </div>
                    </div>
                    <button
                        className="primary-action-btn"
                        onClick={() => setIsDrawerOpen(true)}
                    >
                        <Plus size={18} /> <span className="btn-text">Create New</span>
                    </button>
                </div>

                {/* Filter Bar */}
                <div className="filter-bar" style={{
                    background: 'white',
                    padding: '0.75rem 1rem',
                    borderRadius: '20px',
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'center',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                    border: '1.5px solid #f1f5f9',
                    flexWrap: 'wrap',
                    flexShrink: 0
                }}>
                    <SearchBar
                        placeholder="Search broadcasts..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ flex: 1.5, minWidth: '200px' }}
                    />

                    <div className="filter-actions" style={{ flex: 1, display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <div style={{ flex: 1 }}>
                            <Dropdown
                                options={['All', 'Admin', 'Devotee', 'Volunteer']}
                                placeholder="Filter by Role"
                                value={roleFilter.charAt(0).toUpperCase() + roleFilter.slice(1)}
                                onChange={(val) => setRoleFilter(val.toLowerCase())}
                            />
                        </div>
                        <div style={{ flex: 1, position: 'relative' }}>
                            <div style={{
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                <Calendar size={18} style={{
                                    position: 'absolute',
                                    left: '1rem',
                                    color: '#F97316'
                                }} />
                                <input
                                    type="date"
                                    defaultValue="2024-03-24"
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem 1rem 0.75rem 2.75rem',
                                        borderRadius: '12px',
                                        border: '1.5px solid #f1f5f9',
                                        background: '#f8fafc',
                                        fontSize: '0.85rem',
                                        fontWeight: 600,
                                        color: '#1e293b',
                                        outline: 'none',
                                        cursor: 'pointer',
                                        fontFamily: 'inherit'
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Broadcast Table Card */}
                <div style={{
                    backgroundColor: 'white',
                    border: '1.5px solid #f1f5f9',
                    borderRadius: '28px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: 0
                }}>
                    {/* Table Headers */}
                    <div className="table-header" style={{
                        display: 'grid',
                        gridTemplateColumns: '2.5fr 1.5fr 1fr 60px',
                        padding: '1.25rem 2rem',
                        backgroundColor: '#fcfcfc',
                        borderBottom: '1.5px solid #f1f5f9',
                        flexShrink: 0
                    }}>
                        {['BROADCAST', 'AUDIENCE', 'REACH', ''].map((header, i) => (
                            <span key={header || 'action'} style={{
                                fontSize: '0.65rem',
                                fontWeight: 800,
                                color: '#94a3b8',
                                letterSpacing: '0.05em',
                                textAlign: i === 2 ? 'right' : i === 3 ? 'center' : 'left'
                            }}>{header}</span>
                        ))}
                    </div>

                    {/* Card List Content */}
                    <div style={{
                        overflowY: 'auto',
                        flex: 1,
                        scrollbarWidth: 'thin',
                        scrollbarColor: '#f1f5f9 transparent'
                    }}>
                        {loading ? (
                            <div style={{ padding: '4rem', textAlign: 'center', color: '#64748b' }}>
                                <p>Loading broadcasts...</p>
                            </div>
                        ) : currentItems.length === 0 ? (
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '4rem 2rem',
                                gap: '1rem'
                            }}>
                                <div style={{
                                    width: '80px',
                                    height: '80px',
                                    borderRadius: '20px',
                                    background: 'linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: '0.5rem'
                                }}>
                                    <MessageSquare size={36} color="#8b5cf6" />
                                </div>
                                <h3 style={{
                                    fontSize: '1.1rem',
                                    fontWeight: 700,
                                    color: '#1e293b',
                                    margin: 0
                                }}>No broadcasts found</h3>
                                <p style={{
                                    fontSize: '0.9rem',
                                    color: '#64748b',
                                    textAlign: 'center',
                                    margin: 0,
                                    maxWidth: '400px'
                                }}>
                                    {searchTerm
                                        ? `No broadcasts matching "${searchTerm}". Try a different search term.`
                                        : 'Get started by creating your first broadcast notification.'
                                    }
                                </p>
                            </div>
                        ) : (
                            currentItems.map((item, idx) => (
                                <div key={item.id} style={{
                                    display: 'grid',
                                    gridTemplateColumns: '2.5fr 1.5fr 1fr 60px',
                                    padding: '1rem 2rem',
                                    borderBottom: idx === currentItems.length - 1 ? 'none' : '1.5px solid #f8fafc',
                                    alignItems: 'center',
                                    transition: 'all 0.2s'
                                }} className="broadcast-row">
                                    {/* Broadcast Info with Icon */}
                                    <div className="col-broadcast" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{
                                            width: '48px',
                                            height: '48px',
                                            borderRadius: '14px',
                                            background: item.audienceBg,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexShrink: 0
                                        }}>
                                            <MessageSquare size={20} color={item.audienceColor} />
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: 800, color: '#1e293b', fontSize: '0.9rem' }}>{item.title}</div>
                                            <div style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 600, marginTop: '0.2rem' }}>
                                                {item.dateSent} • {item.timeSent}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Audience Badge */}
                                    <div className="col-audience">
                                        <span style={{
                                            padding: '0.4rem 0.85rem',
                                            borderRadius: '10px',
                                            fontSize: '0.7rem',
                                            fontWeight: 800,
                                            background: item.audienceBg,
                                            color: item.audienceColor,
                                            letterSpacing: '0.02em',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '0.4rem'
                                        }}>
                                            <span style={{
                                                width: '6px',
                                                height: '6px',
                                                borderRadius: '50%',
                                                background: item.audienceColor
                                            }}></span>
                                            {item.audience}
                                        </span>
                                    </div>

                                    {/* Reach Stats */}
                                    <div className="col-reach" style={{ textAlign: 'right' }}>
                                        <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#1e293b' }}>{item.reach}</div>
                                        <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#10b981' }}>{item.deliveryRate}</div>
                                    </div>

                                    {/* Delete Button */}
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            title="Delete notification"
                                            style={{
                                                background: '#fff1f2',
                                                border: 'none',
                                                borderRadius: '10px',
                                                width: '36px',
                                                height: '36px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                cursor: 'pointer',
                                                transition: 'background 0.2s'
                                            }}
                                            onMouseEnter={e => e.currentTarget.style.background = '#fecdd3'}
                                            onMouseLeave={e => e.currentTarget.style.background = '#fff1f2'}
                                        >
                                            <Trash2 size={15} color="#ef4444" />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <Pagination
                        currentPage={currentPage}
                        itemsPerPage={itemsPerPage}
                        totalEntries={filteredBroadcasts.length}
                        onPageChange={setCurrentPage}
                        onItemsPerPageChange={(val) => {
                            setItemsPerPage(val);
                            setCurrentPage(1);
                        }}
                    />
                </div>
            </div>

            {/* Create New Broadcast Drawer via Portal */}
            {createPortal(
                <div className={`broadcast-drawer ${isDrawerOpen ? 'open' : ''}`} style={{
                    position: 'fixed',
                    top: 0,
                    right: 0,
                    width: '500px',
                    height: '100vh',
                    backgroundColor: 'white',
                    boxShadow: '-4px 0 20px rgba(0,0,0,0.1)',
                    zIndex: 9999,
                    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    display: 'flex',
                    flexDirection: 'column',
                    borderTopLeftRadius: '24px',
                    borderBottomLeftRadius: '24px',
                    transform: isDrawerOpen ? 'translateX(0)' : 'translateX(100%)'
                }}>
                    {/* Drawer Header */}
                    <div style={{
                        padding: '24px 28px',
                        borderBottom: '1px solid #f3f4f6',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start'
                    }}>
                        <div>
                            <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#111827', margin: 0 }}>Create New Broadcast</h2>
                            <p style={{ fontSize: '13px', color: '#6b7280', margin: '4px 0 0 0' }}>Compose a message to send to your community</p>
                        </div>
                        <button
                            onClick={() => setIsDrawerOpen(false)}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af' }}
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Drawer Body */}
                    <div style={{ padding: '28px', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '28px' }}>
                        {/* Title Input */}
                        <div style={{ position: 'relative' }}>
                            <label style={{
                                position: 'absolute',
                                left: '14px',
                                top: (isTitleFocused || title) ? '-8px' : '15px',
                                fontSize: (isTitleFocused || title) ? '12px' : '14px',
                                color: isTitleFocused ? '#f97316' : '#9ca3af',
                                backgroundColor: 'white',
                                padding: '0 5px',
                                transition: 'all 0.2s ease',
                                pointerEvents: 'none',
                                fontWeight: (isTitleFocused || title) ? '700' : '500',
                                zIndex: 1
                            }}>
                                Broadcast Title <span style={{ color: '#f97316' }}>*</span>
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                onFocus={() => setIsTitleFocused(true)}
                                onBlur={() => setIsTitleFocused(false)}
                                style={{
                                    ...inputStyle,
                                    borderColor: isTitleFocused ? '#f97316' : '#e5e7eb',
                                    borderWidth: isTitleFocused ? '2px' : '1px',
                                    padding: isTitleFocused ? '13px 17px' : '14px 18px' // Adjust for border width
                                }}
                            />
                        </div>

                        {/* Message Input */}
                        <div style={{ position: 'relative' }}>
                            <label style={{
                                position: 'absolute',
                                left: '14px',
                                top: (isMessageFocused || message) ? '-8px' : '15px',
                                fontSize: (isMessageFocused || message) ? '12px' : '14px',
                                color: isMessageFocused ? '#f97316' : '#9ca3af',
                                backgroundColor: 'white',
                                padding: '0 5px',
                                transition: 'all 0.2s ease',
                                pointerEvents: 'none',
                                fontWeight: (isMessageFocused || message) ? '700' : '500',
                                zIndex: 1
                            }}>
                                Message <span style={{ color: '#f97316' }}>*</span>
                            </label>
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onFocus={() => setIsMessageFocused(true)}
                                onBlur={() => setIsMessageFocused(false)}
                                style={{
                                    ...inputStyle,
                                    height: '180px',
                                    resize: 'none',
                                    borderColor: isMessageFocused ? '#f97316' : '#e5e7eb',
                                    borderWidth: isMessageFocused ? '2px' : '1px',
                                    padding: isMessageFocused ? '13px 17px' : '14px 18px'
                                }}
                            />
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                                <span style={{ fontSize: '11px', color: '#9ca3af', fontWeight: '600' }}>Markdown supported • ✨ Be Concise</span>
                                <span style={{ fontSize: '11px', color: message.length > 450 ? '#ef4444' : '#9ca3af', fontWeight: '600' }}>{message.length} / 500 characters</span>
                            </div>
                        </div>

                        {/* Notification Type */}
                        <div>
                            <label style={labelStyle}>NOTIFICATION TYPE</label>
                            <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
                                <button
                                    onClick={() => setNotifType('text')}
                                    style={notifType === 'text' ? selectedOptionStyle : optionStyle}
                                >
                                    <MessageSquare size={16} /> Text Notification
                                </button>
                                <button
                                    onClick={() => setNotifType('voice')}
                                    style={notifType === 'voice' ? selectedOptionStyle : optionStyle}
                                >
                                    <Mic size={16} /> Voice Notification
                                </button>
                            </div>
                        </div>

                        {/* Send To */}
                        <div>
                            <label style={labelStyle}>SEND TO</label>
                            <div style={{ display: 'flex', gap: '7px', marginTop: '10px', flexWrap: 'wrap' }}>
                                {['All App Users', 'Devotees Only', 'Volunteers Only', 'Specific User'].map((opt) => (
                                    <button
                                        key={opt}
                                        onClick={() => setSendTo(opt.toLowerCase().split(' ').join('_'))}
                                        style={sendTo === opt.toLowerCase().split(' ').join('_') ? selectedCapsuleStyle : capsuleStyle}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Specific User ID Input */}
                        {sendTo === 'specific_user' && (
                            <div style={{ position: 'relative' }}>
                                <label style={{
                                    position: 'absolute',
                                    left: '14px',
                                    top: targetUserId ? '-8px' : '15px',
                                    fontSize: targetUserId ? '12px' : '14px',
                                    color: '#f97316',
                                    backgroundColor: 'white',
                                    padding: '0 5px',
                                    transition: 'all 0.2s ease',
                                    pointerEvents: 'none',
                                    fontWeight: '700',
                                    zIndex: 1
                                }}>
                                    Target User ID <span style={{ color: '#f97316' }}>*</span>
                                </label>
                                <input
                                    type="text"
                                    value={targetUserId}
                                    onChange={(e) => setTargetUserId(e.target.value)}
                                    placeholder="Enter user_id"
                                    style={{
                                        ...inputStyle,
                                        borderColor: '#f97316',
                                        borderWidth: '2px',
                                        padding: '13px 17px'
                                    }}
                                />
                            </div>
                        )}

                        {/* Info Alert */}
                        <div style={{
                            backgroundColor: '#f8fafc',
                            padding: '16px',
                            borderRadius: '12px',
                            display: 'flex',
                            gap: '12px',
                            alignItems: 'flex-start'
                        }}>
                            <Info size={16} color="#94a3b8" style={{ marginTop: '2px' }} />
                            <p style={{ fontSize: '12px', color: '#64748b', margin: 0, lineHeight: '1.5', fontWeight: '500' }}>
                                Selecting 'All App Users' will trigger a notification to all registered accounts.
                            </p>
                        </div>
                    </div>

                    {/* Drawer Footer */}
                    <div style={{
                        padding: '24px 28px',
                        borderTop: '1px solid #f3f4f6',
                        display: 'flex',
                        gap: '12px'
                    }}>
                        <button
                            onClick={() => setIsDrawerOpen(false)}
                            style={{
                                flex: 1,
                                padding: '12px',
                                borderRadius: '10px',
                                border: '1px solid #e5e7eb',
                                backgroundColor: 'white',
                                color: '#111827',
                                fontSize: '14px',
                                fontWeight: '700',
                                cursor: 'pointer'
                            }}
                        >
                            Discard
                        </button>
                        <button
                            onClick={async () => {
                                try {
                                    if (!title || !message) {
                                        showToast('Please enter both title and message.', 'error');
                                        return;
                                    }

                                    if (sendTo === 'specific_user' && !targetUserId) {
                                        showToast('Please enter a target User ID.', 'error');
                                        return;
                                    }

                                    setIsSending(true);

                                    let payload = {
                                        title: title,
                                        message: message,
                                        type: "admin"
                                    };

                                    let endpoint = '/api/notifications/broadcast';

                                    if (sendTo === 'specific_user') {
                                        payload.user_id = targetUserId;
                                        endpoint = '/api/notifications/user';
                                    } else {
                                        // Map UI 'sendTo' to API 'target_role'
                                        let targetRole = "devotee";
                                        if (sendTo === "volunteers_only") targetRole = "volunteer";
                                        if (sendTo === "all_app") targetRole = "all";

                                        payload.target_role = targetRole;
                                        payload.is_admin_sent = false;
                                    }

                                    const response = await apiFetch(endpoint, {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'Accept': 'application/json'
                                        },
                                        body: JSON.stringify(payload)
                                    });

                                    const buildEntry = (src) => {
                                        const now = new Date();
                                        const role = payload.target_role || 'all';
                                        return {
                                            id: src?.notification_id || Math.random(),
                                            title: src?.title || title,
                                            description: src?.message || message,
                                            dateSent: now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                                            timeSent: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                                            audience: payload.user_id ? `USER: ${payload.user_id}` : (role === 'volunteer' ? 'VOLUNTEERS' : (role === 'devotee' ? 'DEVOTEES' : 'ALL USERS')),
                                            audienceBg: payload.user_id ? "#f5f3ff" : (role === 'volunteer' ? "#f0fdf4" : (role === 'devotee' ? "#eff6ff" : "#fff7ed")),
                                            audienceColor: payload.user_id ? "#8b5cf6" : (role === 'volunteer' ? "#22c55e" : (role === 'devotee' ? "#3b82f6" : "#f97316")),
                                            reach: "0",
                                            deliveryRate: "100%"
                                        };
                                    };

                                    if (response.ok) {
                                        const newNotif = await response.json();
                                        setBroadcasts(prev => [buildEntry(newNotif), ...prev]);
                                        setIsDrawerOpen(false);
                                        setTitle('');
                                        setMessage('');
                                        setTargetUserId('');
                                        showToast('Notification sent successfully! 🎉');
                                    } else {
                                        let errorMessage = "Failed to send notification";
                                        try {
                                            const errorData = await response.json();
                                            if (errorData.detail) {
                                                if (Array.isArray(errorData.detail)) {
                                                    errorMessage = errorData.detail.map(d => `${d.loc.join('.')}: ${d.msg}`).join('\n');
                                                } else {
                                                    errorMessage = errorData.detail;
                                                }
                                            }
                                        } catch (e) { }
                                        showToast(errorMessage, 'error');
                                    }
                                } catch (error) {
                                    console.error("Error creating notification:", error);
                                    showToast(`Error: ${error.message}`, 'error');
                                } finally {
                                    setIsSending(false);
                                }
                            }}
                            disabled={isSending}
                            style={{
                                flex: 1.5,
                                padding: '12px',
                                borderRadius: '10px',
                                border: 'none',
                                backgroundColor: isSending ? '#fdba74' : '#f97316',
                                color: 'white',
                                fontSize: '14px',
                                fontWeight: '700',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                cursor: isSending ? 'not-allowed' : 'pointer',
                                transition: 'background-color 0.2s'
                            }}>
                            {isSending ? (
                                <>
                                    <span style={{ width: 16, height: 16, border: '2px solid white', borderTopColor: 'transparent', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.7s linear infinite' }} />
                                    Sending...
                                </>
                            ) : (
                                <>Send Notification <Send size={16} /></>
                            )}
                        </button>
                    </div>
                </div >,
                document.body
            )}

            {/* Toast Notification */}
            {toast && (
                <div style={{
                    position: 'fixed',
                    top: '24px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: toast.type === 'error' ? '#ef4444' : '#22c55e',
                    color: 'white',
                    padding: '14px 28px',
                    borderRadius: '12px',
                    fontSize: '14px',
                    fontWeight: '600',
                    zIndex: 99999,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
                    animation: 'slideDown 0.3s ease',
                    whiteSpace: 'nowrap'
                }}>
                    {toast.message}
                </div>
            )}

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes slideDown {
                    from { opacity: 0; transform: translateX(-50%) translateY(-16px); }
                    to   { opacity: 1; transform: translateX(-50%) translateY(0); }
                }
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
                .broadcast-row:hover { background-color: #fcfcfc; }
                
                @media (max-width: 768px) {
                    .page-header { flex-direction: column !important; align-items: stretch !important; gap: 0.75rem !important; margin-bottom: 1rem !important; }
                    .page-header h1 { font-size: 1.2rem !important; }
                    
                    .filter-bar { flex-direction: column !important; align-items: stretch !important; padding: 1rem !important; gap: 1rem !important; }
                    .filter-actions { width: 100% !important; flex-direction: column !important; gap: 1rem !important; }
                    
                    .table-header { display: none !important; }
                    
                    .broadcast-row { 
                        display: flex !important; 
                        flex-direction: column !important; 
                        gap: 1rem !important; 
                        padding: 1.25rem 1rem !important;
                        align-items: flex-start !important;
                        border-bottom: 1.5px solid #f8fafc !important;
                        grid-template-columns: unset !important;
                    }
                    
                    .col-broadcast { 
                        width: 100% !important; 
                        border-bottom: 1px solid #f1f5f9 !important;
                        padding-bottom: 0.75rem !important;
                    }

                    .col-audience, .col-reach {
                        display: flex !important;
                        align-items: center !important;
                        gap: 1rem !important;
                        width: 100% !important;
                    }
                    
                    .col-reach { text-align: left !important; }

                    .pagination-footer {
                        flex-direction: column !important;
                        gap: 1rem !important;
                        padding: 1.25rem 1rem !important;
                        align-items: center !important;
                        text-align: center !important;
                    }

                    .broadcast-drawer {
                        width: min(500px, 100vw) !important;
                        height: 100dvh !important;
                    }
                }
                `
            }} />
        </div>
    );
}

const inputStyle = {
    width: '100%',
    padding: '14px 18px',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    fontSize: '14px',
    color: '#111827',
    outline: 'none',
    boxSizing: 'border-box'
};

const labelStyle = {
    fontSize: '11px',
    fontWeight: '800',
    color: '#9ca3af',
    letterSpacing: '0.05em'
};

const optionStyle = {
    flex: 1,
    padding: '12px',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    backgroundColor: 'white',
    color: '#64748b',
    fontSize: '13px',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    cursor: 'pointer'
};

const selectedOptionStyle = {
    ...optionStyle,
    border: '1px solid #f97316',
    color: '#f97316'
};

const capsuleStyle = {
    padding: '8px 16px',
    borderRadius: '20px',
    border: '1px solid #e5e7eb',
    backgroundColor: 'white',
    color: '#64748b',
    fontSize: '12px',
    fontWeight: '700',
    cursor: 'pointer'
};

const selectedCapsuleStyle = {
    ...capsuleStyle,
    border: '1px solid #f97316',
    backgroundColor: '#fff7ed',
    color: '#f97316'
};

