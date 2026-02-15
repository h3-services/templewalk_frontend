import React, { useState, useMemo } from 'react';
import {
    Plus, ChevronDown, Search, X, MessageSquare, Mic, Info, Send, Calendar, Users, User, ShieldCheck
} from 'lucide-react';
import { Dropdown } from './Dropdown';
import { SearchBar, Pagination } from './index';

export function Notifications() {
    const [searchTerm, setSearchTerm] = useState('');
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [notifType, setNotifType] = useState('text');
    const [sendTo, setSendTo] = useState('all');

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

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

    const broadcastData = [
        { id: 1, title: "Evening Puja Timings Updated", description: "Aarti will start 15 minutes earlier today...", dateSent: "Oct 24, 2023", timeSent: "05:30 PM", audience: "DEVOTEES", audienceBg: "#eff6ff", audienceColor: "#3b82f6", reach: "4,280", deliveryRate: "92% Delivery" },
        { id: 2, title: "New Volunteer Registration", description: "Join our task force for the upcoming festival...", dateSent: "Oct 22, 2023", timeSent: "10:15 AM", audience: "VOLUNTEERS", audienceBg: "#f0fdf4", audienceColor: "#22c55e", reach: "850", deliveryRate: "98% Delivery" },
        { id: 3, title: "Weekly Spiritual Newsletter", description: "Read about the significance of Kartik month...", dateSent: "Oct 20, 2023", timeSent: "08:00 AM", audience: "ALL USERS", audienceBg: "#fff7ed", audienceColor: "#f97316", reach: "12,402", deliveryRate: "88% Delivery" },
        { id: 4, title: "System Maintenance Alert", description: "The app will be down for 2 hours on Sunday...", dateSent: "Oct 18, 2023", timeSent: "11:45 PM", audience: "ALL USERS", audienceBg: "#fff7ed", audienceColor: "#f97316", reach: "15,000", deliveryRate: "99% Delivery" },
        { id: 5, title: "Temple Cleanliness Drive", description: "Join us this Saturday for a community cleanup...", dateSent: "Oct 15, 2023", timeSent: "07:00 AM", audience: "VOLUNTEERS", audienceBg: "#f0fdf4", audienceColor: "#22c55e", reach: "1,200", deliveryRate: "95% Delivery" },
        { id: 6, title: "Special Bhajan Session", description: "Maestro Ramesh will be leading the session...", dateSent: "Oct 12, 2023", timeSent: "06:00 PM", audience: "ALL USERS", audienceBg: "#fff7ed", audienceColor: "#f97316", reach: "8,500", deliveryRate: "91% Delivery" },
        { id: 7, title: "Prasadam Distribution", description: "Lunch will be served to all devotees...", dateSent: "Oct 10, 2023", timeSent: "12:30 PM", audience: "DEVOTEES", audienceBg: "#eff6ff", audienceColor: "#3b82f6", reach: "5,000", deliveryRate: "94% Delivery" },
        { id: 8, title: "Yoga & Meditation Camp", description: "A 3-day health camp starting Monday...", dateSent: "Oct 08, 2023", timeSent: "05:00 AM", audience: "ALL USERS", audienceBg: "#fff7ed", audienceColor: "#f97316", reach: "10,200", deliveryRate: "89% Delivery" },
        { id: 9, title: "Festival Decoration Help", description: "Volunteers needed for floral arrangements...", dateSent: "Oct 05, 2023", timeSent: "09:00 AM", audience: "VOLUNTEERS", audienceBg: "#f0fdf4", audienceColor: "#22c55e", reach: "600", deliveryRate: "97% Delivery" },
        { id: 10, title: "Donation Drive Success", description: "Thank you for supporting the educational fund...", dateSent: "Oct 02, 2023", timeSent: "04:30 PM", audience: "ALL USERS", audienceBg: "#fff7ed", audienceColor: "#f97316", reach: "20,000", deliveryRate: "99% Delivery" }
    ];

    const filteredBroadcasts = useMemo(() => {
        return broadcastData.filter(b =>
            b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            b.audience.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);

    const totalPages = Math.ceil(filteredBroadcasts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = filteredBroadcasts.slice(startIndex, startIndex + itemsPerPage);

    const handlePrevious = () => setCurrentPage(p => Math.max(1, p - 1));
    const handleNext = () => setCurrentPage(p => Math.min(totalPages, p + 1));

    return (
        <div className="notifications-page-container" style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            minHeight: 0,
            overflow: 'hidden'
        }}>
            {/* Overlay */}
            {isDrawerOpen && (
                <div
                    onClick={() => setIsDrawerOpen(false)}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.1)',
                        backdropFilter: 'blur(2px)',
                        zIndex: 40,
                        transition: 'all 0.3s'
                    }}
                />
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
                        gridTemplateColumns: '2.5fr 1.5fr 1fr',
                        padding: '1.25rem 2rem',
                        backgroundColor: '#fcfcfc',
                        borderBottom: '1.5px solid #f1f5f9',
                        flexShrink: 0
                    }}>
                        {['BROADCAST', 'AUDIENCE', 'REACH'].map((header, i) => (
                            <span key={header} style={{
                                fontSize: '0.65rem',
                                fontWeight: 800,
                                color: '#94a3b8',
                                letterSpacing: '0.05em',
                                textAlign: i === 2 ? 'right' : 'left'
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
                        {currentItems.map((item, idx) => (
                            <div key={item.id} style={{
                                display: 'grid',
                                gridTemplateColumns: '2.5fr 1.5fr 1fr',
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
                            </div>
                        ))}
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

            {/* Create New Broadcast Drawer */}
            <div style={{
                position: 'fixed',
                top: 0,
                right: isDrawerOpen ? 0 : '-500px',
                width: '500px',
                height: '100vh',
                backgroundColor: 'white',
                boxShadow: '-4px 0 20px rgba(0,0,0,0.1)',
                zIndex: 50,
                transition: 'right 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'flex',
                flexDirection: 'column'
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
                            Broadcast Title
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
                            Message
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
                            <span style={{ fontSize: '11px', color: '#9ca3af', fontWeight: '600' }}>Markdown supported</span>
                            <span style={{ fontSize: '11px', color: '#9ca3af', fontWeight: '600' }}>{message.length} / 500 characters</span>
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
                        <div style={{ display: 'flex', gap: '7px', marginTop: '10px' }}>
                            {['All App Users', 'Devotees Only', 'Volunteers Only'].map((opt) => (
                                <button
                                    key={opt}
                                    onClick={() => setSendTo(opt.toLowerCase().split(' ')[0])}
                                    style={sendTo === opt.toLowerCase().split(' ')[0] ? selectedCapsuleStyle : capsuleStyle}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>

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
                            Selecting 'All App Users' will trigger a notification to 15,420 registered accounts.
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
                    <button style={{
                        flex: 1.5,
                        padding: '12px',
                        borderRadius: '10px',
                        border: 'none',
                        backgroundColor: '#f97316',
                        color: 'white',
                        fontSize: '14px',
                        fontWeight: '700',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        cursor: 'pointer'
                    }}>
                        Send Broadcast <Send size={16} />
                    </button>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .broadcast-row:hover { background-color: #fcfcfc; }
                
                @media (max-width: 768px) {
                    .page-header { flex-direction: column; align-items: stretch !important; }
                    .create-btn { width: 100%; margin-top: 0.5rem; }
                    
                    .filter-bar { flex-direction: column; align-items: stretch !important; padding: 1rem !important; }
                    .filter-actions { width: 100%; }
                    
                    .table-header { display: none !important; }
                    .broadcast-row { 
                        display: flex !important; 
                        flex-direction: column; 
                        gap: 1rem; 
                        padding: 1.5rem 2rem !important;
                        align-items: flex-start !important;
                    }
                    
                    .col-audience, .col-reach {
                        display: flex;
                        align-items: center;
                        gap: 1rem;
                    }
                    
                    .col-audience::before { content: 'Audience:'; font-size: 0.75rem; font-weight: 700; color: #94a3b8; width: 70px; }
                    .col-reach::before { content: 'Reach:'; font-size: 0.75rem; font-weight: 700; color: #94a3b8; width: 70px; }
                    .col-reach { text-align: left !important; }

                    /* Drawer Adjustments */
                    div[style*="width: 500px"] {
                        width: 100% !important;
                        right: \${isDrawerOpen ? '0' : '-100%'} !important;
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

