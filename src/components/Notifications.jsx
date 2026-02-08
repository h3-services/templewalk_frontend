import React, { useState } from 'react';
import {
    Plus, ChevronDown, Search, X, MessageSquare, Mic, Info, Send
} from 'lucide-react';

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

    const totalPages = Math.ceil(broadcastData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = broadcastData.slice(startIndex, startIndex + itemsPerPage);

    const handlePrevious = () => setCurrentPage(p => Math.max(1, p - 1));
    const handleNext = () => setCurrentPage(p => Math.min(totalPages, p + 1));

    return (
        <div style={{ position: 'relative', minHeight: '100vh', overflowX: 'hidden' }}>
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

            <div style={{
                fontFamily: "'Inter', sans-serif",
                padding: '24px 32px',
                background: '#ffffff',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px'
            }}>
                {/* Page Header */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <div>
                        <h1 style={{
                            fontSize: '20px',
                            fontWeight: '700',
                            color: '#111827',
                            margin: 0,
                            letterSpacing: '-0.01em'
                        }}>Broadcast Notifications</h1>
                        <p style={{
                            fontSize: '14px',
                            color: '#6b7280',
                            margin: '4px 0 0 0'
                        }}>Manage and send announcements to your community</p>
                    </div>
                    <button
                        onClick={() => setIsDrawerOpen(true)}
                        style={{
                            backgroundColor: '#f97316',
                            color: 'white',
                            padding: '10px 20px',
                            borderRadius: '10px',
                            border: 'none',
                            fontSize: '14px',
                            fontWeight: '700',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            cursor: 'pointer',
                            boxShadow: '0 4px 12px rgba(249, 115, 22, 0.2)'
                        }}>
                        <div style={{
                            width: '18px',
                            height: '18px',
                            borderRadius: '50%',
                            border: '2px solid white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Plus size={12} strokeWidth={4} />
                        </div>
                        Create New
                    </button>
                </div>

                {/* Broadcast Table Card */}
                <div style={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                }}>
                    {/* Section Title Bar */}
                    <div style={{
                        padding: '20px 24px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderBottom: '1px solid #f3f4f6'
                    }}>
                        <h2 style={{
                            fontSize: '13px',
                            fontWeight: '700',
                            color: '#374151',
                            margin: 0,
                            letterSpacing: '0.05em'
                        }}>SENT BROADCASTS</h2>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#9ca3af' }}>
                            <span>Sort by:</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#111827', fontWeight: '700', cursor: 'pointer' }}>
                                Recent First <ChevronDown size={14} />
                            </div>
                        </div>
                    </div>

                    {/* Table Headers */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1.8fr 1.2fr 1fr 0.6fr',
                        padding: '12px 24px',
                        backgroundColor: '#ffffff',
                        borderBottom: '1px solid #f3f4f6'
                    }}>
                        {['BROADCAST TITLE', 'DATE SENT', 'AUDIENCE', 'REACH'].map((header, i) => (
                            <div key={header} style={{
                                fontSize: '11px',
                                fontWeight: '700',
                                color: '#9ca3af',
                                letterSpacing: '0.05em',
                                textAlign: i === 3 ? 'right' : 'left'
                            }}>{header}</div>
                        ))}
                    </div>

                    {/* Table Content */}
                    <div style={{
                        maxHeight: '500px',
                        overflowY: 'auto',
                        scrollbarWidth: 'thin',
                        scrollbarColor: '#f1f5f9 transparent'
                    }}>
                        {currentItems.map((item, idx) => (
                            <div key={item.id} style={{
                                display: 'grid',
                                gridTemplateColumns: '1.8fr 1.2fr 1fr 0.6fr',
                                padding: '16px 24px',
                                borderBottom: idx === currentItems.length - 1 ? 'none' : '1px solid #f3f4f6',
                                alignItems: 'center'
                            }}>
                                {/* Broadcast Title */}
                                <div>
                                    <div style={{ fontSize: '0.9rem', fontWeight: '800', color: '#111827' }}>{item.title}</div>
                                    <div style={{ fontSize: '0.7rem', color: '#9ca3af', marginTop: '2px', fontWeight: '600' }}>{item.description}</div>
                                </div>

                                {/* Date Sent */}
                                <div style={{ fontSize: '0.8rem', fontWeight: '600', color: '#6b7280' }}>
                                    {item.dateSent} <span style={{ color: '#d1d5db', margin: '0 4px' }}>•</span> {item.timeSent}
                                </div>

                                {/* Audience Label */}
                                <div>
                                    <span style={{
                                        fontSize: '0.7rem',
                                        fontWeight: '800',
                                        padding: '4px 8px',
                                        borderRadius: '6px',
                                        backgroundColor: item.audienceBg,
                                        color: item.audienceColor,
                                        letterSpacing: '0.02em'
                                    }}>{item.audience}</span>
                                </div>

                                {/* Reach */}
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: '0.9rem', fontWeight: '800', color: '#111827' }}>{item.reach}</div>
                                    <div style={{ fontSize: '0.7rem', fontWeight: '700', color: '#10b981' }}>{item.deliveryRate}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination Bar */}
                    <div style={{
                        padding: '16px 24px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: '#ffffff',
                        borderTop: '1px solid #f3f4f6'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#9ca3af', fontWeight: '600' }}>
                                Show
                                <select
                                    value={itemsPerPage}
                                    onChange={(e) => {
                                        setItemsPerPage(parseInt(e.target.value));
                                        setCurrentPage(1);
                                    }}
                                    style={{
                                        fontSize: '11px',
                                        fontWeight: '700',
                                        color: '#111827',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '6px',
                                        padding: '2px 6px',
                                        outline: 'none',
                                        cursor: 'pointer',
                                        backgroundColor: '#f8fafc'
                                    }}
                                >
                                    {[5, 10, 20, 50].map(val => (
                                        <option key={val} value={val}>{val}</option>
                                    ))}
                                </select>
                                of {broadcastData.length} entries
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <span style={{ fontSize: '12px', color: '#9ca3af', fontWeight: '600' }}>Page:</span>
                                <select
                                    value={currentPage}
                                    onChange={(e) => setCurrentPage(parseInt(e.target.value))}
                                    style={{
                                        fontSize: '12px',
                                        fontWeight: '700',
                                        color: '#111827',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '4px',
                                        padding: '2px 4px',
                                        outline: 'none',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {[...Array(totalPages)].map((_, i) => (
                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button
                                onClick={handlePrevious}
                                disabled={currentPage === 1}
                                style={{
                                    ...paginationBtnStyle,
                                    opacity: currentPage === 1 ? 0.5 : 1,
                                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
                                }}
                            >
                                Previous
                            </button>
                            <button
                                onClick={handleNext}
                                disabled={currentPage === totalPages}
                                style={{
                                    ...paginationBtnStyle,
                                    opacity: currentPage === totalPages ? 0.5 : 1,
                                    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
                                }}
                            >
                                Next
                            </button>
                        </div>
                    </div>
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
        </div>
    );
}

const paginationBtnStyle = {
    padding: '6px 14px',
    fontSize: '12px',
    fontWeight: '700',
    color: '#6b7280',
    backgroundColor: 'white',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    cursor: 'pointer'
};

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
