import React, { useState } from 'react';
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
    ArrowUpRight
} from 'lucide-react';

export function Volunteers() {
    const [activeTab, setActiveTab] = useState('Pending Approvals (12)');

    const [searchTerm, setSearchTerm] = useState('');

    const tabs = [
        'Pending Approvals (12)',
        'Active Volunteers (148)',
        'History'
    ];

    const activeVolunteersData = [
        {
            id: 1,
            name: "Priya Sharma",
            event: "Morning Puja",
            role: "Crowd Control",
            shift: "4h remaining",
            status: "online",
            onDuty: true,
            initials: "PS",
            color: "#fbbf24"
        },
        {
            id: 2,
            name: "Arjun Kumar",
            event: "Anna Dhanam",
            role: "Food Serving",
            shift: "1.5h remaining",
            status: "online",
            onDuty: true,
            initials: "AK",
            color: "#34d399"
        },
        {
            id: 3,
            name: "Ramesh Varma",
            previous: "Deepotsavam",
            role: "Logistics",
            lastActive: "2 days ago",
            status: "offline",
            onDuty: false,
            initials: "RV",
            color: "#f87171"
        }
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
            color: "#fbbf24"
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
            color: "#f1f5f9"
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
            color: "#34d399"
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
            color: "#ffedd5"
        }
    ];

    const pendingVolunteers = [
        {
            id: 1,
            name: "Priya Sharma",
            time: "Applied 2h ago",
            phone: "+91 98765 43210",
            interest: "Event Coordination",
            location: "Chennai, TN",
            initials: "PS",
            color: "#fbbf24",
            status: "online"
        },
        {
            id: 2,
            name: "Arjun Kumar",
            time: "Applied 5h ago",
            phone: "+91 99000 11223",
            interest: "Food Distribution",
            location: "Madurai, TN",
            initials: "AK",
            color: "#34d399",
            status: "offline"
        },
        {
            id: 3,
            name: "Ramesh Varma",
            time: "Applied Yesterday",
            phone: "+91 91234 56789",
            interest: "Crowd Control",
            location: "Trichy, TN",
            initials: "RV",
            color: "#f87171",
            status: "online"
        }
    ];

    const filteredActive = activeVolunteersData.filter(v =>
        v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.event.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredPending = pendingVolunteers.filter(v =>
        v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.interest.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredHistory = historyVolunteersData.filter(v =>
        v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.event.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="volunteers-page" style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, gap: '1.25rem' }}>

            {/* Header Section */}
            <div className="page-title-section">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
                    <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', fontFamily: 'Lora, serif' }}>
                        {activeTab === 'History' ? 'Volunteer Activity History' : (activeTab.includes('Active') ? 'Active Volunteers' : 'Manage Volunteers')}
                    </h1>
                    <span style={{
                        background: '#eff6ff',
                        color: '#3b82f6',
                        fontSize: '0.6rem',
                        fontWeight: 800,
                        padding: '0.15rem 0.6rem',
                        borderRadius: '6px',
                        letterSpacing: '0.05em'
                    }}>LIVE SESSION</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>
                    {activeTab === 'History'
                        ? 'Archive of past assignments, completed applications, and event outcomes.'
                        : (activeTab.includes('Active')
                            ? 'Monitor and message currently active temple volunteers'
                            : 'Review applications and coordinate active temple volunteers')}
                </p>
            </div>

            {/* Content Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 340px', gap: '2rem', flex: 1, minHeight: 0 }}>

                {/* Left Column: Tabs and List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', minHeight: 0 }}>
                    {/* Navigation Tabs */}
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
                                placeholder="Search volunteers by name, role or assignment..."
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

                    {/* Scrollable List Area */}
                    <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.25rem', paddingRight: '0.5rem' }}>
                        {activeTab === 'History' ? (
                            <div style={{ background: 'white', borderRadius: '24px', border: '1.5px solid #f1f5f9', overflow: 'hidden' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, 1.5fr) 1fr 1.5fr 1fr', padding: '1rem 1.5rem', borderBottom: '1.5px solid #f1f5f9', background: '#fcfcfc' }}>
                                    {['VOLUNTEER NAME', 'DATE', 'ACTIVITY/EVENT', 'OUTCOME'].map(h => (
                                        <span key={h} style={{ fontSize: '0.65rem', fontWeight: 800, color: '#94a3b8', letterSpacing: '0.05em' }}>{h}</span>
                                    ))}
                                </div>
                                {filteredHistory.map((v, i) => (
                                    <div key={v.id} style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'minmax(200px, 1.5fr) 1fr 1.5fr 1fr',
                                        padding: '1.25rem 1.5rem',
                                        borderBottom: i === historyVolunteersData.length - 1 ? 'none' : '1.5px solid #f8fafc',
                                        alignItems: 'center'
                                    }}>
                                        {/* Name */}
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: v.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#1e293b', fontSize: '0.85rem' }}>{v.initials}</div>
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#1e293b' }}>{v.name}</span>
                                                <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#94a3b8' }}>{v.subStatus}</span>
                                            </div>
                                        </div>
                                        {/* Date */}
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                                            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e293b' }}>{v.date}</span>
                                            <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#94a3b8' }}>{v.time}</span>
                                        </div>
                                        {/* Event */}
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: v.dotColor }} />
                                            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e293b' }}>{v.event}</span>
                                        </div>
                                        {/* Outcome */}
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
                                ))}
                            </div>
                        ) : activeTab.includes('Active') ? (
                            filteredActive.map(v => (
                                <div key={v.id} style={{
                                    background: 'white',
                                    padding: '1.25rem 1.5rem',
                                    borderRadius: '20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1.5rem',
                                    boxShadow: 'var(--card-shadow)',
                                    border: '1.5px solid #f8fafc',
                                    transition: 'transform 0.2s ease',
                                }} className="volunteer-row-card">
                                    {/* Avatar */}
                                    <div style={{
                                        width: '64px',
                                        height: '64px',
                                        borderRadius: '50%',
                                        background: '#f1f5f9',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '1.2rem',
                                        fontWeight: 800,
                                        color: v.color,
                                        position: 'relative',
                                        flexShrink: 0
                                    }}>
                                        {v.initials}
                                        <div style={{
                                            position: 'absolute',
                                            bottom: '2px',
                                            right: '2px',
                                            width: '14px',
                                            height: '14px',
                                            borderRadius: '50%',
                                            background: v.status === 'online' ? '#10b981' : '#cbd5e1',
                                            border: '2px solid white'
                                        }} />
                                    </div>

                                    {/* Info Grid */}
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                                            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1e293b' }}>{v.name}</h3>
                                            <span style={{
                                                fontSize: '0.65rem',
                                                fontWeight: 800,
                                                padding: '0.2rem 0.6rem',
                                                borderRadius: '6px',
                                                background: v.onDuty ? '#ecfdf5' : '#f1f5f9',
                                                color: v.onDuty ? '#10b981' : '#64748b',
                                                letterSpacing: '0.05em'
                                            }}>
                                                {v.onDuty ? 'ON DUTY' : 'OFF DUTY'}
                                            </span>
                                        </div>

                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#64748b', fontSize: '0.8rem', fontWeight: 600 }}>
                                                <Calendar size={14} style={{ color: '#f97316' }} />
                                                <span style={{ color: '#94a3b8' }}>Event:</span> {v.event || v.previous}
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#64748b', fontSize: '0.8rem', fontWeight: 600 }}>
                                                <Briefcase size={14} style={{ color: '#f97316' }} />
                                                <span style={{ color: '#94a3b8' }}>Role:</span> {v.role}
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#64748b', fontSize: '0.8rem', fontWeight: 600 }}>
                                                <TrendingUp size={14} style={{ color: '#94a3b8' }} />
                                                <span style={{ color: '#94a3b8' }}>{v.shift ? 'Shift:' : 'Last:'}</span> {v.shift || v.lastActive}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
                                        <button style={{
                                            padding: '0.5rem 1.5rem',
                                            borderRadius: '12px',
                                            border: 'none',
                                            background: v.onDuty ? 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)' : '#f1f5f9',
                                            color: v.onDuty ? 'white' : '#64748b',
                                            fontWeight: 800,
                                            fontSize: '0.85rem',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            width: '120px',
                                            justifyContent: 'center'
                                        }} className="action-btn">
                                            <MessageCircle size={16} />
                                            Message
                                        </button>
                                        <button style={{
                                            background: 'none',
                                            border: 'none',
                                            color: '#94a3b8',
                                            fontSize: '0.7rem',
                                            fontWeight: 700,
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.05em',
                                            cursor: 'pointer'
                                        }}>
                                            VIEW PROFILE
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            filteredPending.map(v => (
                                <div key={v.id} style={{
                                    background: 'white',
                                    padding: '1rem 1.25rem',
                                    borderRadius: '18px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    boxShadow: 'var(--card-shadow)',
                                    border: '1.5px solid #f8fafc',
                                    transition: 'transform 0.2s ease',
                                }} className="volunteer-row-card">
                                    {/* Avatar */}
                                    <div style={{
                                        width: '56px',
                                        height: '56px',
                                        borderRadius: '50%',
                                        background: '#f1f5f9',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '1.1rem',
                                        fontWeight: 800,
                                        color: v.color,
                                        position: 'relative',
                                        flexShrink: 0
                                    }}>
                                        {v.initials}
                                        <div style={{
                                            position: 'absolute',
                                            bottom: '2px',
                                            right: '2px',
                                            width: '12px',
                                            height: '12px',
                                            borderRadius: '50%',
                                            background: v.status === 'online' ? '#10b981' : '#cbd5e1',
                                            border: '2px solid white'
                                        }} />
                                    </div>

                                    {/* Info */}
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem' }}>
                                            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#1e293b' }}>{v.name}</h3>
                                            <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>{v.time}</span>
                                        </div>

                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#64748b', fontSize: '0.8rem', fontWeight: 600 }}>
                                                <Phone size={14} /> {v.phone}
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#64748b', fontSize: '0.8rem', fontWeight: 600 }}>
                                                <Briefcase size={14} /> {v.interest}
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#64748b', fontSize: '0.8rem', fontWeight: 600 }}>
                                                <MapPin size={14} /> {v.location}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <button style={{
                                            width: '36px',
                                            height: '36px',
                                            borderRadius: '12px',
                                            border: '1.5px solid #f1f5f9',
                                            background: 'transparent',
                                            color: '#ef4444',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s'
                                        }} className="action-btn">
                                            <X size={18} strokeWidth={3} />
                                        </button>
                                        <button style={{
                                            padding: '0.5rem 1.25rem',
                                            borderRadius: '12px',
                                            border: 'none',
                                            background: '#fff7ed',
                                            color: '#f97316',
                                            fontWeight: 800,
                                            fontSize: '0.85rem',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s'
                                        }} className="action-btn">
                                            Approve
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Right Column: Stats and Filters */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '-3rem', position: 'relative', zIndex: 10 }}>
                    {/* Stats Box */}
                    <div style={{
                        background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                        padding: '1.5rem',
                        borderRadius: '24px',
                        color: 'white',
                        boxShadow: '0 15px 30px -10px rgba(249, 115, 22, 0.4)',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem', position: 'relative', zIndex: 1 }}>
                            <TrendingUp size={18} />
                            <h3 style={{ fontSize: '1rem', fontWeight: 800, letterSpacing: '0.02em' }}>
                                {activeTab === 'History' ? 'History Stats' : 'Volunteer Stats'}
                            </h3>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem', position: 'relative', zIndex: 1 }}>
                            <div style={{ background: 'rgba(255,255,255,0.15)', padding: '1rem', borderRadius: '16px' }}>
                                <p style={{ fontSize: '0.6rem', fontWeight: 800, opacity: 0.8, textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                                    {activeTab === 'History' ? 'COMPLETED' : 'ACTIVE NOW'}
                                </p>
                                <h4 style={{ fontSize: '1.25rem', fontWeight: 800 }}>{activeTab === 'History' ? '1.2k' : '148'}</h4>
                            </div>
                            <div style={{ background: 'rgba(255,255,255,0.15)', padding: '1rem', borderRadius: '16px' }}>
                                <p style={{ fontSize: '0.6rem', fontWeight: 800, opacity: 0.8, textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                                    {activeTab === 'History' ? 'REJECTED' : 'ON DUTY'}
                                </p>
                                <h4 style={{ fontSize: '1.25rem', fontWeight: 800 }}>{activeTab === 'History' ? '48' : '42'}</h4>
                            </div>
                        </div>

                        <div style={{ background: 'rgba(255,255,255,0.15)', padding: '1.25rem', borderRadius: '20px', position: 'relative', zIndex: 1 }}>
                            <p style={{ fontSize: '0.6rem', fontWeight: 800, opacity: 0.8, textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                                {activeTab === 'History' ? 'TOTAL ACTIVITIES' : (activeTab.includes('Active') ? 'ENGAGEMENT RATE' : 'NEW APPLICATIONS')}
                            </p>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                                <h4 style={{ fontSize: '1.75rem', fontWeight: 800 }}>
                                    {activeTab === 'History' ? '14.5k' : (activeTab.includes('Active') ? '88%' : '12')}
                                </h4>
                                {activeTab === 'History' ? <CheckCircle2 size={16} style={{ opacity: 0.8 }} /> : <TrendingUp size={16} style={{ opacity: 0.8 }} />}
                            </div>
                        </div>

                        {/* Decor SVG */}
                        <svg style={{ position: 'absolute', bottom: '-20px', right: '-20px', opacity: 0.1 }} width="200" height="200" viewBox="0 0 200 200">
                            <path d="M0,100 C0,44.77 44.77,0 100,0 C155.23,0 200,44.77 200,100 C200,155.23 155.23,200 100,200 C44.77,200 0,155.23 0,100" fill="currentColor" />
                        </svg>
                    </div>

                    {/* Filters Box */}
                    <div style={{
                        background: 'white',
                        padding: '1.5rem',
                        borderRadius: '24px',
                        boxShadow: 'var(--card-shadow)',
                        border: '1.5px solid #f8fafc'
                    }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.25rem' }}>
                            {activeTab === 'History' ? 'Activity Quick Filter' : 'Quick Filters'}
                        </h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div className="filter-group">
                                <label style={{ fontSize: '0.6rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>
                                    {activeTab === 'History' ? 'OUTCOME TYPE' : (activeTab.includes('Active') ? 'DUTY STATUS' : 'INTEREST AREA')}
                                </label>
                                <div style={{
                                    background: '#f8fafc',
                                    padding: '0.75rem 1rem',
                                    borderRadius: '12px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    cursor: 'pointer'
                                }}>
                                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e293b' }}>
                                        {activeTab === 'History' ? 'All Outcomes' : (activeTab.includes('Active') ? 'All Status' : 'All Areas')}
                                    </span>
                                    <ChevronDown size={16} color="#94a3b8" />
                                </div>
                            </div>

                            <div className="filter-group">
                                <label style={{ fontSize: '0.6rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>
                                    {activeTab === 'History' ? 'EVENT CATEGORY' : (activeTab.includes('Active') ? 'ACTIVE EVENT' : 'LOCATION')}
                                </label>
                                <div style={{
                                    background: '#f8fafc',
                                    padding: '0.75rem 1rem',
                                    borderRadius: '12px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    cursor: 'pointer'
                                }}>
                                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e293b' }}>
                                        {activeTab === 'History' ? 'All Events' : (activeTab.includes('Active') ? 'All Events' : 'Any Location')}
                                    </span>
                                    <ChevronDown size={16} color="#94a3b8" />
                                </div>
                            </div>

                            <button style={{
                                width: '100%',
                                padding: '0.75rem',
                                borderRadius: '12px',
                                border: 'none',
                                background: '#f1f5f9',
                                color: '#475569',
                                fontWeight: 800,
                                fontSize: '0.85rem',
                                marginTop: '0.25rem',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem'
                            }}>
                                {activeTab === 'History' ? 'Clear Quick Filters' : (
                                    <>
                                        <RotateCcw size={16} />
                                        Reset Filters
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                </div>
            </div>

            {/* Bottom Bar */}
            <div style={{
                background: 'white',
                padding: '0.75rem 2rem',
                margin: '0 -1.5rem -0.75rem',
                borderTop: '1.5px solid #f1f5f9',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600 }}>
                    {activeTab === 'History' ? 'History synced: Today at 10:45 AM' : `Last updated: ${activeTab.includes('Active') ? 'Today at 11:20 AM' : 'Today at 10:45 AM'}`}
                </span>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button style={{
                        padding: '0.6rem 1.5rem',
                        borderRadius: '12px',
                        border: '1.5px solid #f1f5f9',
                        background: 'white',
                        color: '#475569',
                        fontWeight: 800,
                        fontSize: '0.85rem',
                        cursor: 'pointer'
                    }}>
                        {activeTab === 'History' ? 'Archive All' : (activeTab.includes('Active') ? 'Export Report' : 'Bulk Reject')}
                    </button>
                    <button style={{
                        padding: '0.6rem 2rem',
                        borderRadius: '12px',
                        border: 'none',
                        background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                        color: 'white',
                        fontWeight: 800,
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        boxShadow: '0 8px 16px -4px rgba(249, 115, 22, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem'
                    }}>
                        {activeTab === 'History' ? 'Download History CSV' : (activeTab.includes('Active') ? 'Message All Active (42)' : 'Review Next (12)')}
                        {activeTab === 'History' ? <TrendingUp size={16} style={{ transform: 'rotate(90deg)' }} /> : (activeTab.includes('Active') ? <ArrowUpRight size={16} /> : <RotateCcw size={16} style={{ transform: 'rotate(90deg)' }} />)}
                    </button>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .volunteer-row-card:hover {
                    transform: translateX(8px);
                    border-color: #fed7aa !important;
                }
                .action-btn:hover {
                    opacity: 0.8;
                    transform: scale(1.05);
                }
            `}} />
        </div>
    );
}
