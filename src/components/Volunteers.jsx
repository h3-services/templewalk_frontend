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
    ArrowUpRight,
    Mail,
    Plus
} from 'lucide-react';
import { Dropdown } from './Dropdown';
import { SearchBar, Pagination } from './index';

export function Volunteers() {
    const [activeTab, setActiveTab] = useState('Pending Approvals (12)');
    const [isAddVolunteerOpen, setIsAddVolunteerOpen] = useState(false);
    const [volunteerForm, setVolunteerForm] = useState({
        name: '',
        email: '',
        phone: '',
        area: '',
        specialization: 'Food Serving'
    });

    // Focus states for floating labels
    const [focusedFields, setFocusedFields] = useState({
        name: false,
        email: false,
        phone: false,
        area: false,
        specialization: false
    });

    const handleFocus = (field) => {
        setFocusedFields(prev => ({ ...prev, [field]: true }));
    };

    const handleBlur = (field) => {
        setFocusedFields(prev => ({ ...prev, [field]: false }));
    };

    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    React.useEffect(() => {
        setCurrentPage(1);
    }, [activeTab, searchTerm]);

    React.useEffect(() => {
        document.title = 'Volunteers | Temple Walk Admin';
    }, []);

    const tabs = [
        'Pending Approvals (12)',
        'Active Volunteers (148)',
        'Sent Requests (5)',
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
            subStatus: "Volunteer Helper",
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
            subStatus: "Food Serving",
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
            subStatus: "Medical Assistant",
            date: "Nov 08, 2023",
            time: "08:00 AM",
            event: "Weekly Satsang Support",
            outcome: "COMPLETED",
            dotColor: "#3b82f6",
            initials: "AK",
            color: "#34d399",
            phone: "+91 99000 88777",
            email: "arjun.k@email.com"
        }
    ];

    const sentRequestsData = [
        { id: 1, name: "Manoj Tiwari", role: "Medical", sentOn: "2 days ago", status: "Invite Sent", initials: "MT", color: "#e0f2fe", phone: "+91 98888 77777", email: "manoj@email.com" },
        { id: 2, name: "Kavita R", role: "Food Serving", sentOn: "Yesterday", status: "Invite Sent", initials: "KR", color: "#fce7f3", phone: "+91 99999 66666", email: "kavita@email.com" },
        { id: 3, name: "Balaji S", role: "Emergency", sentOn: "Just now", status: "Sending...", initials: "BS", color: "#fef3c7", phone: "+91 97777 55555", email: "balaji@email.com" },
        { id: 4, name: "Swathi M", role: "Crowd Control", sentOn: "3 days ago", status: "Invite Sent", initials: "SM", color: "#dbeafe", phone: "+91 96666 44444", email: "swathi@email.com" },
        { id: 5, name: "Ganesh K", role: "Others", sentOn: "1 week ago", status: "Expired", initials: "GK", color: "#ffedd5", phone: "+91 95555 33333", email: "ganesh@email.com" }
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

    const filteredPending = useMemo(() => {
        return pendingVols.filter(v =>
            v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            v.interest.toLowerCase().includes(searchTerm.toLowerCase()) ||
            v.location.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [pendingVols, searchTerm]);

    const filteredActive = useMemo(() => {
        return activeVolunteersData.filter(v =>
            v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            v.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
            v.event.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [activeVolunteersData, searchTerm]);

    const filteredHistory = useMemo(() => {
        return historyVolunteersData.filter(v =>
            v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            v.event.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [historyVolunteersData, searchTerm]);

    const filteredSentRequests = useMemo(() => {
        return sentRequestsData.filter(v =>
            v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            v.role.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [sentRequestsData, searchTerm]);

    const currentListData = activeTab === 'History' ? filteredHistory :
        activeTab.includes('Active') ? filteredActive :
            activeTab.includes('Sent') ? filteredSentRequests : filteredPending;

    const totalPages = Math.ceil(currentListData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = currentListData.slice(startIndex, startIndex + itemsPerPage);

    const handlePrevious = () => setCurrentPage(p => Math.max(1, p - 1));
    const handleNext = () => setCurrentPage(p => Math.min(totalPages, p + 1));

    return (
        <div className="volunteers-page" style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, gap: '1rem' }}>

            {/* Page Title Header */}
            <div className="page-header" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '0.5rem',
                gap: '1rem'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                        width: '48px',
                        height: '48px',
                        background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                        borderRadius: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 12px rgba(59, 130, 246, 0.25)',
                        flexShrink: 0
                    }}>
                        <Briefcase size={24} color="white" />
                    </div>
                    <div>
                        <h1 style={{
                            fontSize: '1.5rem',
                            fontWeight: 800,
                            color: '#0f172a',
                            marginBottom: '0.25rem'
                        }}>Volunteer Force</h1>
                        <p style={{
                            fontSize: '0.85rem',
                            color: '#64748b',
                            fontWeight: 500
                        }}>Manage volunteer applications and assignments</p>
                    </div>
                </div>
                <button
                    className="primary-action-btn"
                    onClick={() => setIsAddVolunteerOpen(true)}
                >
                    <Plus size={18} /> <span className="btn-text">Add Volunteer</span>
                </button>
            </div>

            {/* Content Section - Full Width */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1, minHeight: 0 }}>

                {/* Navigation & Search Row */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {activeTab === 'History' ? (
                        <div className="filter-bar history-filters" style={{
                            background: 'white',
                            padding: '0.75rem 1rem',
                            borderRadius: '20px',
                            display: 'flex',
                            gap: '1rem',
                            alignItems: 'center',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                            border: '1.5px solid #f1f5f9',
                            flexWrap: 'wrap'
                        }}>
                            <div className="tab-container" style={{ display: 'flex', gap: '0.25rem', border: 'none', padding: 0 }}>
                                {tabs.map(tab => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        style={{
                                            padding: '0.5rem 1rem',
                                            borderRadius: '8px',
                                            border: 'none',
                                            background: activeTab === tab ? '#f1f5f9' : 'transparent',
                                            color: activeTab === tab ? '#1e293b' : '#94a3b8',
                                            fontWeight: 700,
                                            fontSize: '0.85rem',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s',
                                            whiteSpace: 'nowrap'
                                        }}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>

                            <div className="filter-actions" style={{ flex: 1, display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                                <div style={{ flex: 1, minWidth: '150px' }}>
                                    <div style={{ background: '#f8fafc', padding: '0.6rem 1rem', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1.5px solid #f1f5f9' }}>
                                        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e293b' }}>11/01/2023</span>
                                        <Calendar size={16} color="#F97316" />
                                    </div>
                                </div>
                                <div style={{ flex: 1, minWidth: '150px' }}>
                                    <div style={{ background: '#f8fafc', padding: '0.6rem 1rem', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1.5px solid #f1f5f9' }}>
                                        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e293b' }}>11/15/2023</span>
                                        <Calendar size={16} color="#F97316" />
                                    </div>
                                </div>
                                <SearchBar
                                    placeholder="Search history..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    style={{ flex: 1.5, minWidth: '200px' }}
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="filter-bar" style={{
                            background: 'white',
                            padding: '0.75rem 1rem',
                            borderRadius: '20px',
                            display: 'flex',
                            gap: '1rem',
                            alignItems: 'center',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                            border: '1.5px solid #f1f5f9',
                            flexWrap: 'wrap'
                        }}>
                            <div className="tab-container" style={{ display: 'flex', gap: '0.25rem' }}>
                                {tabs.map(tab => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        style={{
                                            padding: '0.5rem 1rem',
                                            borderRadius: '8px',
                                            border: 'none',
                                            background: activeTab === tab ? '#f1f5f9' : 'transparent',
                                            color: activeTab === tab ? '#1e293b' : '#94a3b8',
                                            fontWeight: 700,
                                            fontSize: '0.85rem',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s',
                                            whiteSpace: 'nowrap'
                                        }}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>

                            <SearchBar
                                placeholder={`Search ${activeTab.split(' ')[0]} volunteers...`}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{ flex: 1, minWidth: '200px' }}
                            />
                        </div>
                    )}
                </div>

                {/* Table Container - Devotee Page Style */}
                <div className="table-card" style={{
                    background: 'white',
                    borderRadius: '28px',
                    border: '1.5px solid #f1f5f9',
                    overflow: 'hidden',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <div className="table-header" style={{
                        display: 'grid',
                        gridTemplateColumns: activeTab === 'History' ? '1.5fr 1fr 1.5fr 1fr' :
                            activeTab.includes('Sent') ? '2fr 1.5fr 1fr 1fr' : '2.5fr 1.5fr 1fr',
                        padding: '1.25rem 2rem',
                        borderBottom: '1.5px solid #f1f5f9',
                        background: '#fcfcfc'
                    }}>
                        {(activeTab === 'History' ? ['VOLUNTEER', 'DATE', 'CONTACT INFO', 'STATUS'] :
                            activeTab.includes('Sent') ? ['VOLUNTEER', 'CONTACT INFO', 'SENT ON', 'STATUS'] :
                                ['VOLUNTEER', 'CONTACT INFO', 'STATUS']).map(h => (
                                    <span key={h} className={`header-${h.toLowerCase().replace(' ', '-')}`} style={{ fontSize: '0.65rem', fontWeight: 800, color: '#94a3b8', letterSpacing: '0.05em' }}>{h}</span>
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
                                }} className="volunteer-row history-row">
                                    <div className="col-volunteer" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: v.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#1e293b', fontSize: '0.85rem', flexShrink: 0 }}>{v.initials}</div>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#1e293b' }}>{v.name}</span>
                                            <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#94a3b8' }}>{v.subStatus}</span>
                                        </div>
                                    </div>
                                    <div className="col-date" style={{ display: 'flex', flexDirection: 'column' }}>
                                        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e293b' }}>{v.date}</span>
                                        <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#94a3b8' }}>{v.time}</span>
                                    </div>
                                    <div className="col-contact">
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#475569', fontSize: '0.85rem', fontWeight: 700 }}>
                                                <Phone size={14} color="#F97316" /> {v.phone}
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8', fontSize: '0.75rem', fontWeight: 600 }}>
                                                <Mail size={14} color="#F97316" /> {v.email}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-status">
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
                                    alignItems: 'center',
                                    transition: 'all 0.2s'
                                }} className="volunteer-row active-row">
                                    <div className="col-volunteer" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: v.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: v.color, fontSize: '1rem', flexShrink: 0 }}>{v.initials}</div>
                                        <div>
                                            <div style={{ fontWeight: 800, color: '#1e293b', fontSize: '0.9rem' }}>{v.name}</div>
                                            <div style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 600 }}>{v.role} • {v.event}</div>
                                        </div>
                                    </div>
                                    <div className="col-contact">
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#475569', fontSize: '0.85rem', fontWeight: 700 }}>
                                                <Phone size={14} color="#F97316" /> {v.phone}
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8', fontSize: '0.75rem', fontWeight: 600 }}>
                                                <Mail size={14} color="#F97316" /> {v.email}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-status">
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
                        ) : activeTab.includes('Sent') ? (
                            currentItems.map((v, i) => (
                                <div key={v.id} style={{
                                    display: 'grid',
                                    gridTemplateColumns: '2fr 1.5fr 1fr 1fr',
                                    padding: '1rem 2rem',
                                    borderBottom: i === currentItems.length - 1 ? 'none' : '1.5px solid #f8fafc',
                                    alignItems: 'center',
                                    transition: 'all 0.2s'
                                }} className="volunteer-row sent-row">
                                    <div className="col-volunteer" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: v.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#1e293b', fontSize: '1rem', flexShrink: 0 }}>{v.initials}</div>
                                        <div>
                                            <div style={{ fontWeight: 800, color: '#1e293b', fontSize: '0.9rem' }}>{v.name}</div>
                                            <div style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 600 }}>{v.role}</div>
                                        </div>
                                    </div>
                                    <div className="col-contact">
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#475569', fontSize: '0.85rem', fontWeight: 700 }}>
                                                <Phone size={14} color="#F97316" /> {v.phone}
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8', fontSize: '0.75rem', fontWeight: 600 }}>
                                                <Mail size={14} color="#F97316" /> {v.email}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sent">
                                        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#64748b' }}>{v.sentOn}</span>
                                    </div>
                                    <div className="col-status">
                                        <span style={{
                                            padding: '0.4rem 0.85rem',
                                            borderRadius: '10px',
                                            fontSize: '0.65rem',
                                            fontWeight: 800,
                                            background: '#f0f9ff',
                                            color: '#0ea5e9',
                                            letterSpacing: '0.05em',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '0.4rem'
                                        }}>
                                            {v.status}
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
                                    alignItems: 'center',
                                    transition: 'all 0.2s'
                                }} className="volunteer-row pending-row">
                                    <div className="col-volunteer" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: v.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: v.color, fontSize: '1rem', flexShrink: 0 }}>{v.initials}</div>
                                        <div>
                                            <div style={{ fontWeight: 800, color: '#1e293b', fontSize: '0.9rem' }}>{v.name}</div>
                                            <div style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 600 }}>{v.interest} • {v.location}</div>
                                        </div>
                                    </div>
                                    <div className="col-contact">
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#475569', fontSize: '0.85rem', fontWeight: 700 }}>
                                                <Phone size={14} color="#F97316" /> {v.phone}
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8', fontSize: '0.75rem', fontWeight: 600 }}>
                                                <Mail size={14} color="#F97316" /> {v.email}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-status" style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
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
                                                    <span className="btn-text">REJECT</span>
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
                                                    <span className="btn-text">APPROVE</span>
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <Pagination
                        currentPage={currentPage}
                        itemsPerPage={itemsPerPage}
                        totalEntries={currentListData.length}
                        onPageChange={setCurrentPage}
                        onItemsPerPageChange={(val) => {
                            setItemsPerPage(val);
                            setCurrentPage(1);
                        }}
                    />
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .volunteer-row:hover { background-color: #fcfcfc; }

                .volunteer-drawer {
                    position: fixed;
                    top: 0;
                    right: -500px;
                    width: 500px;
                    height: 100vh;
                    transition: right 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .volunteer-drawer.open {
                    right: 0;
                }
                
                @media (max-width: 768px) {
                    .page-header { flex-direction: column; align-items: stretch !important; gap: 0.75rem !important; margin-bottom: 1rem !important; }
                    .page-header h1 { font-size: 1.25rem !important; margin-bottom: 0.25rem !important; }
                    
                    .tab-container { padding-bottom: 0.5rem; overflow-x: auto; -webkit-overflow-scrolling: touch; }
                    .history-filters { flex-direction: column; align-items: stretch !important; padding: 1rem !important; }
                    .filter-bar { flex-direction: column; align-items: stretch !important; padding: 1rem !important; }
                    .filter-actions { width: 100%; flex-direction: column; gap: 0.75rem !important; }
                    
                    /* Revert Card View - Enable Horizontal Scroll */
                    .table-card {
                        overflow-x: auto !important;
                        display: block !important;
                    }
                    
                    /* Need different grid templates for different tabs - hard to do perfectly with one rule, 
                       so we'll target rows specifically if needed, or set a general min-width */
                    .table-header, .volunteer-row {
                        min-width: 900px !important;
                        display: grid !important;
                        /* We need to let the inline style grid-template-cols take effect? 
                           Inline styles override stylesheets unless !important used.
                           The inline styles are already grid. So we just need to NOT override them with flex.
                        */
                    }
                    
                    .table-header { display: grid !important; }
                    
                    .volunteer-row {
                        gap: 0 !important;
                        padding: 1rem 2rem !important;
                        border-bottom: 1.5px solid #f8fafc !important;
                    }
                    
                    .col-contact, .col-status, .col-date {
                        display: flex !important;
                        flex-direction: column !important;
                        align-items: flex-start !important;
                        gap: 0.25rem !important;
                        width: auto !important;
                        justify-content: flex-start !important;
                    }
                    
                    .col-contact::before, .col-status::before, .col-date::before { display: none !important; }

                    .pending-row .col-status {
                        flex-direction: row !important; /* Restore row for buttons */
                        align-items: center !important; 
                        width: auto !important;
                    }
                    .pending-row .col-status button { width: auto !important; justify-content: flex-start !important; padding: 0.5rem 1rem !important; }
                    
                    .pagination-footer { 
                        flex-direction: column; 
                        align-items: center !important; 
                        text-align: center;
                        padding: 1rem !important;
                    }
                    
                    .volunteer-drawer {
                        width: 100%;
                        right: -100%;
                    }
                }
                `
            }} />
            {/* Add Volunteer Sidebar */}
            {/* Add Volunteer Sidebar */}
            <div className={`volunteer-drawer ${isAddVolunteerOpen ? 'open' : ''}`} style={{
                backgroundColor: 'white',
                boxShadow: '-4px 0 20px rgba(0,0,0,0.1)',
                zIndex: 50,
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
                        <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#111827', margin: 0 }}>Add Volunteer</h2>
                        <p style={{ fontSize: '13px', color: '#6b7280', margin: '4px 0 0 0' }}>Invite a new volunteer to join the force</p>
                    </div>
                    <button
                        onClick={() => setIsAddVolunteerOpen(false)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af' }}
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Drawer Body */}
                <div style={{ padding: '28px', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '28px' }}>

                    {/* Full Name */}
                    <div style={{ position: 'relative' }}>
                        <label style={{
                            position: 'absolute',
                            left: '14px',
                            top: (focusedFields.name || volunteerForm.name) ? '-8px' : '15px',
                            fontSize: (focusedFields.name || volunteerForm.name) ? '12px' : '14px',
                            color: focusedFields.name ? '#f97316' : '#9ca3af',
                            backgroundColor: 'white',
                            padding: '0 5px',
                            transition: 'all 0.2s ease',
                            pointerEvents: 'none',
                            fontWeight: (focusedFields.name || volunteerForm.name) ? '700' : '500',
                            zIndex: 1
                        }}>
                            Full Name
                        </label>
                        <input
                            type="text"
                            value={volunteerForm.name}
                            onChange={(e) => setVolunteerForm({ ...volunteerForm, name: e.target.value })}
                            onFocus={() => handleFocus('name')}
                            onBlur={() => handleBlur('name')}
                            style={{
                                ...inputStyle,
                                borderColor: focusedFields.name ? '#f97316' : '#e5e7eb',
                                borderWidth: focusedFields.name ? '2px' : '1px',
                                padding: focusedFields.name ? '13px 17px' : '14px 18px'
                            }}
                        />
                    </div>

                    {/* Email Address */}
                    <div style={{ position: 'relative' }}>
                        <label style={{
                            position: 'absolute',
                            left: '14px',
                            top: (focusedFields.email || volunteerForm.email) ? '-8px' : '15px',
                            fontSize: (focusedFields.email || volunteerForm.email) ? '12px' : '14px',
                            color: focusedFields.email ? '#f97316' : '#9ca3af',
                            backgroundColor: 'white',
                            padding: '0 5px',
                            transition: 'all 0.2s ease',
                            pointerEvents: 'none',
                            fontWeight: (focusedFields.email || volunteerForm.email) ? '700' : '500',
                            zIndex: 1
                        }}>
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={volunteerForm.email}
                            onChange={(e) => setVolunteerForm({ ...volunteerForm, email: e.target.value })}
                            onFocus={() => handleFocus('email')}
                            onBlur={() => handleBlur('email')}
                            style={{
                                ...inputStyle,
                                borderColor: focusedFields.email ? '#f97316' : '#e5e7eb',
                                borderWidth: focusedFields.email ? '2px' : '1px',
                                padding: focusedFields.email ? '13px 17px' : '14px 18px'
                            }}
                        />
                    </div>

                    {/* Phone Number */}
                    <div style={{ position: 'relative' }}>
                        <label style={{
                            position: 'absolute',
                            left: '14px',
                            top: (focusedFields.phone || volunteerForm.phone) ? '-8px' : '15px',
                            fontSize: (focusedFields.phone || volunteerForm.phone) ? '12px' : '14px',
                            color: focusedFields.phone ? '#f97316' : '#9ca3af',
                            backgroundColor: 'white',
                            padding: '0 5px',
                            transition: 'all 0.2s ease',
                            pointerEvents: 'none',
                            fontWeight: (focusedFields.phone || volunteerForm.phone) ? '700' : '500',
                            zIndex: 1
                        }}>
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            value={volunteerForm.phone}
                            onChange={(e) => setVolunteerForm({ ...volunteerForm, phone: e.target.value })}
                            onFocus={() => handleFocus('phone')}
                            onBlur={() => handleBlur('phone')}
                            style={{
                                ...inputStyle,
                                borderColor: focusedFields.phone ? '#f97316' : '#e5e7eb',
                                borderWidth: focusedFields.phone ? '2px' : '1px',
                                padding: focusedFields.phone ? '13px 17px' : '14px 18px'
                            }}
                        />
                    </div>

                    {/* Area / Location */}
                    <div style={{ position: 'relative' }}>
                        <label style={{
                            position: 'absolute',
                            left: '14px',
                            top: (focusedFields.area || volunteerForm.area) ? '-8px' : '15px',
                            fontSize: (focusedFields.area || volunteerForm.area) ? '12px' : '14px',
                            color: focusedFields.area ? '#f97316' : '#9ca3af',
                            backgroundColor: 'white',
                            padding: '0 5px',
                            transition: 'all 0.2s ease',
                            pointerEvents: 'none',
                            fontWeight: (focusedFields.area || volunteerForm.area) ? '700' : '500',
                            zIndex: 1
                        }}>
                            Area / Location
                        </label>
                        <input
                            type="text"
                            value={volunteerForm.area}
                            onChange={(e) => setVolunteerForm({ ...volunteerForm, area: e.target.value })}
                            onFocus={() => handleFocus('area')}
                            onBlur={() => handleBlur('area')}
                            style={{
                                ...inputStyle,
                                borderColor: focusedFields.area ? '#f97316' : '#e5e7eb',
                                borderWidth: focusedFields.area ? '2px' : '1px',
                                padding: focusedFields.area ? '13px 17px' : '14px 18px'
                            }}
                        />
                    </div>

                    {/* Specialized In */}
                    <div>
                        <label style={{
                            fontSize: '11px',
                            fontWeight: '800',
                            color: '#9ca3af',
                            letterSpacing: '0.05em',
                            marginBottom: '10px',
                            display: 'block'
                        }}>SPECIALIZED IN</label>
                        <Dropdown
                            options={['Food Serving', 'Medical', 'Emergency', 'Others']}
                            value={volunteerForm.specialization}
                            onChange={(val) => setVolunteerForm({ ...volunteerForm, specialization: val })}
                            placeholder="Select Specialization"
                        />
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
                        <HelpCircle size={16} color="#94a3b8" style={{ marginTop: '2px' }} />
                        <p style={{ fontSize: '12px', color: '#64748b', margin: 0, lineHeight: '1.5', fontWeight: '500' }}>
                            Volunteers will receive an email invitation to set up their password and complete their profile.
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
                        onClick={() => setIsAddVolunteerOpen(false)}
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
                        onClick={() => {
                            console.log("Sending request to:", volunteerForm);
                            setIsAddVolunteerOpen(false);
                        }}
                        style={{
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
                        }}
                    >
                        Send Request <ArrowUpRight size={16} />
                    </button>
                </div>
            </div>

            {/* Backdrop */}
            {isAddVolunteerOpen && (
                <div
                    onClick={() => setIsAddVolunteerOpen(false)}
                    style={{
                        position: 'fixed',
                        top: 0, left: 0, right: 0, bottom: 0,
                        background: 'rgba(0,0,0,0.2)',
                        zIndex: 40,
                        backdropFilter: 'blur(2px)',
                        transition: 'all 0.3s'
                    }}
                />
            )}
        </div >
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
