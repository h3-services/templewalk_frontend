import React, { useState, useEffect, useMemo } from 'react';
import {
    Phone,
    Briefcase,
    MapPin,
    X,
    CheckCircle2,
    Filter,
    RotateCcw,
    ChevronDown,
    TrendingUp,
    HelpCircle,
    Calendar,
    MessageCircle,
    Search,
    ArrowUpRight,
    Mail
} from 'lucide-react';

export function Volunteers() {
    const [activeTab, setActiveTab] = useState('Pending Approvals (12)');

    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    React.useEffect(() => {
        setCurrentPage(1);
    }, [activeTab, searchTerm]);

    const tabs = [
        'Pending Approvals (12)',
        'Active Volunteers (148)',
        'History'
    ];

    const activeVolunteersData = [
        { id: 1, name: "Priya Sharma", event: "Morning Puja", role: "Crowd Control", shift: "4h remaining", status: "online", onDuty: true, initials: "PS", color: "#fbbf24", phone: "+91 98765 43210", email: "priya.s@email.com" },
        { id: 2, name: "Arjun Kumar", event: "Anna Dhanam", role: "Food Serving", shift: "1.5h remaining", status: "online", onDuty: true, initials: "AK", color: "#34d399", phone: "+91 98222 11100", email: "arjun.k@email.com" },
        { id: 3, name: "Ramesh Varma", previous: "Deepotsavam", role: "Logistics", lastActive: "2 days ago", status: "offline", onDuty: false, initials: "RV", color: "#f87171", phone: "+91 91234 56789", email: "ramesh@email.com" },
        { id: 4, name: "Suresh Raina", event: "Vahan Seva", role: "Security", shift: "2h remaining", status: "online", onDuty: true, initials: "SR", color: "#F3E5F5", phone: "+91 91234 56789", email: "suresh@email.com" },
        { id: 5, name: "Anjali Devi", event: "Prasadam", role: "Volunteer", shift: "Done", status: "offline", onDuty: false, initials: "AD", color: "#FCE4EC", phone: "+91 94567 12345", email: "anjali@email.com" },
        { id: 6, name: "Vikram Seth", event: "Evening Puja", role: "Coordination", shift: "5h remaining", status: "online", onDuty: true, initials: "VS", color: "#E0F2F1", phone: "+91 98761 23456", email: "vikram@email.com" },
        { id: 7, name: "Lakshmi Bai", event: "Flower Seva", role: "Decorator", shift: "1h remaining", status: "online", onDuty: true, initials: "LB", color: "#FFFDE7", phone: "+91 99887 76655", email: "lakshmi@email.com" }
    ];

    const historyVolunteersData = [
        {
            id: 1,
            name: "Priya Sharma",
            subStatus: "Application Approved",
            date: "Nov 12, 2023",
            time: "10:30 AM",
            event: "Diwali Prep Committee",
            outcome: "COMPLETED",
            dotColor: "#f97316",
            initials: "PS",
            color: "#fbbf24",
            phone: "+91 98765 43210",
            email: "priya.s@email.com"
        },
        {
            id: 2,
            name: "Suresh Kumar",
            subStatus: "New Application",
            date: "Nov 10, 2023",
            time: "02:15 PM",
            event: "Temple Kitchen Help",
            outcome: "REJECTED",
            dotColor: "#fbbf24",
            initials: "SK",
            color: "#f1f5f9",
            phone: "+91 98222 11100",
            email: "suresh@email.com"
        },
        {
            id: 3,
            name: "Arjun Kumar",
            subStatus: "Existing Volunteer",
            date: "Nov 08, 2023",
            time: "08:00 AM",
            event: "Weekly Satsang Support",
            outcome: "COMPLETED",
            dotColor: "#3b82f6",
            initials: "AK",
            color: "#34d399",
            phone: "+91 99000 88777",
            email: "arjun.k@email.com"
        },
        {
            id: 4,
            name: "Meera Nair",
            subStatus: "Application Cancelled",
            date: "Nov 05, 2023",
            time: "11:00 AM",
            event: "Maintenance Work",
            outcome: "WITHDRAWN",
            dotColor: "#94a3b8",
            initials: "MN",
            color: "#ffedd5",
            phone: "+91 94444 33333",
            email: "meera.n@email.com"
        }
    ];

    const [pendingVols, setPendingVols] = useState([
        { id: 1, name: "Priya Sharma", time: "Applied 2h ago", phone: "+91 98765 43210", interest: "Event Coordination", location: "Chennai, TN", initials: "PS", color: "#fbbf24", status: "online", email: "priya.s@email.com", decision: null },
        { id: 2, name: "Arjun Kumar", time: "Applied 5h ago", phone: "+91 99000 11223", interest: "Food Distribution", location: "Madurai, TN", initials: "AK", color: "#34d399", status: "offline", email: "arjun.k@email.com", decision: null },
        { id: 3, name: "Ramesh Varma", time: "Applied Yesterday", phone: "+91 91234 56789", interest: "Crowd Control", location: "Trichy, TN", initials: "RV", color: "#f87171", status: "online", email: "ramesh.v@email.com", decision: null },
        { id: 4, name: "Deepika P.", time: "Applied 1h ago", phone: "+91 94444 33333", interest: "Guest Management", location: "Coimbatore, TN", initials: "DP", color: "#F1F8E9", status: "online", email: "deepika@email.com", decision: null },
        { id: 5, name: "Kiran Bedi", time: "Applied 3h ago", phone: "+91 95555 66666", interest: "Public Safety", location: "Salem, TN", initials: "KB", color: "#E1F5FE", status: "offline", email: "kiran@email.com", decision: null }
    ]);

    const handleDecision = (id, decision) => {
        setPendingVols(prev => prev.map(v => v.id === id ? { ...v, decision } : v));
    };

    const filteredHistory = historyVolunteersData.filter(v =>
        v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.event.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const currentListData = activeTab === 'History' ? filteredHistory :
        activeTab.includes('Active') ? filteredActive : filteredPending;

    const totalPages = Math.ceil(currentListData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = currentListData.slice(startIndex, startIndex + itemsPerPage);

    const handlePrevious = () => setCurrentPage(p => Math.max(1, p - 1));
    const handleNext = () => setCurrentPage(p => Math.min(totalPages, p + 1));

    return (
        <div className="volunteers-page" style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, gap: '1rem' }}>

            {/* Content Section - Full Width */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1, minHeight: 0 }}>

                {/* Navigation & Search Row */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', borderBottom: '1.5px solid #f1f5f9' }}>
                        {tabs.map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                style={{
                                    padding: '0.75rem 1rem',
                                    fontSize: '0.85rem',
                                    fontWeight: 700,
                                    color: activeTab === tab ? '#f97316' : '#94a3b8',
                                    background: 'none',
                                    border: 'none',
                                    borderBottom: activeTab === tab ? '2.5px solid #f97316' : '2.5px solid transparent',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    marginBottom: '-1.5px'
                                }}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {activeTab === 'History' ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: '#f8fafc', padding: '0.75rem', borderRadius: '20px' }}>
                            <div style={{ flex: 1, display: 'flex', gap: '1rem' }}>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', fontSize: '0.65rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '0.4rem', marginLeft: '0.5rem' }}>FROM DATE</label>
                                    <div style={{ background: 'white', padding: '0.6rem 1rem', borderRadius: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1.5px solid #f1f5f9' }}>
                                        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e293b' }}>11/01/2023</span>
                                        <Calendar size={16} color="#94a3b8" />
                                    </div>
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', fontSize: '0.65rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '0.4rem', marginLeft: '0.5rem' }}>TO DATE</label>
                                    <div style={{ background: 'white', padding: '0.6rem 1rem', borderRadius: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1.5px solid #f1f5f9' }}>
                                        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e293b' }}>11/15/2023</span>
                                        <Calendar size={16} color="#94a3b8" />
                                    </div>
                                </div>
                            </div>
                            <button style={{
                                marginTop: '1.25rem',
                                padding: '0.75rem 2rem',
                                background: 'white',
                                border: '1.5px solid #f1f5f9',
                                borderRadius: '14px',
                                color: '#1e293b',
                                fontWeight: 800,
                                fontSize: '0.85rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.6rem',
                                cursor: 'pointer'
                            }}>
                                <Filter size={18} />
                                Apply Filter
                            </button>
                        </div>
                    ) : (
                        <div style={{ position: 'relative' }}>
                            <Search size={18} style={{
                                position: 'absolute',
                                left: '1.25rem',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: '#94a3b8'
                            }} />
                            <input
                                type="text"
                                placeholder={`Search ${activeTab.split(' ')[0]} volunteers...`}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '0.85rem 1.25rem 0.85rem 3.5rem',
                                    borderRadius: '16px',
                                    border: '1.5px solid #f1f5f9',
                                    background: 'white',
                                    fontSize: '0.85rem',
                                    color: '#1e293b',
                                    outline: 'none',
                                    fontWeight: 600
                                }}
                            />
                        </div>
                    )}
                </div>

                {/* Table Container - Devotee Page Style */}
                <div style={{
                    background: 'white',
                    borderRadius: '28px',
                    border: '1.5px solid #f1f5f9',
                    overflow: 'hidden',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: activeTab === 'History' ? '1.5fr 1fr 1.5fr 1fr' : '2.5fr 1.5fr 1fr',
                        padding: '1.25rem 2rem',
                        borderBottom: '1.5px solid #f1f5f9',
                        background: '#fcfcfc'
                    }}>
                        {(activeTab === 'History' ? ['VOLUNTEER', 'DATE', 'CONTACT INFO', 'STATUS'] : ['VOLUNTEER', 'CONTACT INFO', 'STATUS']).map(h => (
                            <span key={h} style={{ fontSize: '0.65rem', fontWeight: 800, color: '#94a3b8', letterSpacing: '0.05em' }}>{h}</span>
                        ))}
                    </div>

                    <div style={{
                        overflowY: 'auto',
                        flex: 1,
                        maxHeight: '500px',
                        scrollbarWidth: 'thin',
                        scrollbarColor: '#f1f5f9 transparent'
                    }}>
                        {activeTab === 'History' ? (
                            currentItems.map((v, i) => (
                                <div key={v.id} style={{
                                    display: 'grid',
                                    gridTemplateColumns: '1.5fr 1fr 1.5fr 1fr',
                                    padding: '1rem 2rem',
                                    borderBottom: i === currentItems.length - 1 ? 'none' : '1.5px solid #f8fafc',
                                    alignItems: 'center'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: v.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#1e293b', fontSize: '0.85rem' }}>{v.initials}</div>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#1e293b' }}>{v.name}</span>
                                            <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#94a3b8' }}>{v.subStatus}</span>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e293b' }}>{v.date}</span>
                                        <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#94a3b8' }}>{v.time}</span>
                                    </div>
                                    <div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#475569', fontSize: '0.85rem', fontWeight: 700 }}>
                                                <Phone size={14} color="#F97316" /> {v.phone}
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8', fontSize: '0.75rem', fontWeight: 600 }}>
                                                <Mail size={14} color="#F97316" /> {v.email}
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <span style={{
                                            fontSize: '0.6rem',
                                            fontWeight: 800,
                                            padding: '0.35rem 0.75rem',
                                            borderRadius: '8px',
                                            background: v.outcome === 'COMPLETED' ? '#ecfdf5' : (v.outcome === 'REJECTED' ? '#fff1f2' : '#f1f5f9'),
                                            color: v.outcome === 'COMPLETED' ? '#10b981' : (v.outcome === 'REJECTED' ? '#ef4444' : '#64748b'),
                                            letterSpacing: '0.05em'
                                        }}>{v.outcome}</span>
                                    </div>
                                </div>
                            ))
                        ) : activeTab.includes('Active') ? (
                            currentItems.map((v, i) => (
                                <div key={v.id} style={{
                                    display: 'grid', gridTemplateColumns: '2.5fr 1.5fr 1fr',
                                    padding: '1rem 2rem',
                                    borderBottom: i === currentItems.length - 1 ? 'none' : '1.5px solid #f8fafc',
                                    alignItems: 'center'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: v.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: v.color, fontSize: '1rem' }}>{v.initials}</div>
                                        <div>
                                            <div style={{ fontWeight: 800, color: '#1e293b', fontSize: '0.9rem' }}>{v.name}</div>
                                            <div style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 600 }}>{v.role} • {v.event}</div>
                                        </div>
                                    </div>
                                    <div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#475569', fontSize: '0.85rem', fontWeight: 700 }}>
                                                <Phone size={14} color="#F97316" /> {v.phone}
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8', fontSize: '0.75rem', fontWeight: 600 }}>
                                                <Mail size={14} color="#F97316" /> {v.email}
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <span style={{
                                            padding: '0.4rem 0.85rem',
                                            borderRadius: '10px',
                                            fontSize: '0.65rem',
                                            fontWeight: 800,
                                            background: v.onDuty ? '#f0fdf4' : '#f1f5f9',
                                            color: v.onDuty ? '#10b981' : '#64748b',
                                            letterSpacing: '0.05em',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '0.4rem'
                                        }}>
                                            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: v.onDuty ? '#10b981' : '#64748b' }}></span>
                                            {v.onDuty ? 'ON DUTY' : 'OFF DUTY'}
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            currentItems.map((v, i) => (
                                <div key={v.id} style={{
                                    display: 'grid', gridTemplateColumns: '2.5fr 1.5fr 1fr',
                                    padding: '1rem 2rem',
                                    borderBottom: i === currentItems.length - 1 ? 'none' : '1.5px solid #f8fafc',
                                    alignItems: 'center'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: v.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: v.color, fontSize: '1rem' }}>{v.initials}</div>
                                        <div>
                                            <div style={{ fontWeight: 800, color: '#1e293b', fontSize: '0.9rem' }}>{v.name}</div>
                                            <div style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 600 }}>{v.interest} • {v.location}</div>
                                        </div>
                                    </div>
                                    <div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#475569', fontSize: '0.85rem', fontWeight: 700 }}>
                                                <Phone size={14} color="#F97316" /> {v.phone}
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8', fontSize: '0.75rem', fontWeight: 600 }}>
                                                <Mail size={14} color="#F97316" /> {v.email}
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                                        {v.decision === 'approved' ? (
                                            <div style={{
                                                padding: '0.5rem 1.25rem',
                                                borderRadius: '12px',
                                                background: '#f0fdf4',
                                                color: '#10b981',
                                                fontSize: '0.7rem',
                                                fontWeight: 800,
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.4rem',
                                                border: '1.5px solid #dcfce7'
                                            }}>
                                                <CheckCircle2 size={16} /> APPROVED
                                            </div>
                                        ) : v.decision === 'rejected' ? (
                                            <div style={{
                                                padding: '0.5rem 1.25rem',
                                                borderRadius: '12px',
                                                background: '#fef2f2',
                                                color: '#ef4444',
                                                fontSize: '0.7rem',
                                                fontWeight: 800,
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.4rem',
                                                border: '1.5px solid #fee2e2'
                                            }}>
                                                <X size={16} /> REJECTED
                                            </div>
                                        ) : (
                                            <>
                                                <button style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.4rem',
                                                    padding: '0.5rem 1rem',
                                                    borderRadius: '12px',
                                                    border: '1.5px solid #fee2e2',
                                                    background: '#fef2f2',
                                                    color: '#ef4444',
                                                    fontSize: '0.7rem',
                                                    fontWeight: 800,
                                                    cursor: 'pointer',
                                                    transition: 'all 0.2s'
                                                }}
                                                    onClick={() => handleDecision(v.id, 'rejected')}
                                                    onMouseOver={(e) => {
                                                        e.currentTarget.style.background = '#fee2e2';
                                                        e.currentTarget.style.transform = 'translateY(-1px)';
                                                    }}
                                                    onMouseOut={(e) => {
                                                        e.currentTarget.style.background = '#fef2f2';
                                                        e.currentTarget.style.transform = 'translateY(0)';
                                                    }}
                                                    className="reject-btn">
                                                    <X size={14} strokeWidth={2.5} />
                                                    REJECT
                                                </button>
                                                <button style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.4rem',
                                                    padding: '0.5rem 1rem',
                                                    borderRadius: '12px',
                                                    border: 'none',
                                                    background: '#008000',
                                                    color: 'white',
                                                    fontSize: '0.7rem',
                                                    fontWeight: 800,
                                                    cursor: 'pointer',
                                                    transition: 'all 0.2s',
                                                    boxShadow: '0 4px 12px rgba(0, 128, 0, 0.2)'
                                                }}
                                                    onClick={() => handleDecision(v.id, 'approved')}
                                                    onMouseOver={(e) => {
                                                        e.currentTarget.style.background = '#006400';
                                                        e.currentTarget.style.transform = 'translateY(-1px)';
                                                        e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 128, 0, 0.3)';
                                                    }}
                                                    onMouseOut={(e) => {
                                                        e.currentTarget.style.background = '#008000';
                                                        e.currentTarget.style.transform = 'translateY(0)';
                                                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 128, 0, 0.2)';
                                                    }}
                                                    className="approve-btn">
                                                    <CheckCircle2 size={14} strokeWidth={2.5} />
                                                    APPROVE
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Global Bottom Bar */}
            <div style={{
                padding: '1.25rem 2rem',
                borderTop: '1.5px solid #f1f5f9',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'white',
                margin: '0 -1.5rem -1rem'
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
                        of {currentListData.length} entries
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
                    >Previous</button>
                    <button
                        onClick={handleNext}
                        disabled={currentPage === totalPages}
                        style={{
                            ...paginationBtnStyle,
                            opacity: currentPage === totalPages ? 0.5 : 1,
                            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
                        }}
                    >Next</button>
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
