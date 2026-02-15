import React, { useState } from 'react';
import {
    Trash2, ChevronRight, Play, CheckCircle2, Clock,
    Plus, ChevronDown, Calendar, MoreVertical, TrendingUp, Edit2
} from 'lucide-react';
import { Dropdown } from './Dropdown';
import { SearchBar, Pagination } from './index';

export function EventsManagement({ onCreateNew, onEdit }) {
    const events = [
        {
            id: 1,
            title: "Arulmigu Kapaleeshwarar Padhayatra",
            schedule: "Oct 24, 2024 • 06:00 AM",
            category: "Padhayatra",
            status: "Live Now",
            statusColor: "#22c55e",
            participants: "1,240",
            participantsLabel: "Enrolled Devotees",
            icon: <Play size={18} />,
            iconBg: "#fff7ed",
            iconColor: "#f97316"
        },
        {
            id: 2,
            title: "Maha Shivaratri Night Walk",
            schedule: "Mar 08, 2024 • 10:00 PM",
            category: "Spiritual Walk",
            status: "Completed",
            statusColor: "#94a3b8",
            participants: "4,850",
            participantsLabel: "Total Participants",
            icon: <Calendar size={18} />,
            iconBg: "#f5f3ff",
            iconColor: "#8b5cf6"
        },
        {
            id: 3,
            title: "Annual Brahmotsavam Procession",
            schedule: "Nov 12, 2024 • 04:30 AM",
            category: "Festival",
            status: "Upcoming",
            statusColor: "#3b82f6",
            participants: "842",
            participantsLabel: "Registrations Open",
            icon: <CheckCircle2 size={18} />,
            iconBg: "#fefce8",
            iconColor: "#eab308"
        },
        {
            id: 4,
            title: "Thiruvannamalai Girivalam Special",
            schedule: "Draft • Last edited 2 days ago",
            category: "Pilgrimage",
            status: "Draft",
            statusColor: "#64748b",
            participants: "—",
            participantsLabel: "Not Published",
            icon: <Clock size={18} />,
            iconBg: "#f8fafc",
            iconColor: "#94a3b8",
            isDraft: true
        }
    ];

    const liveCount = events.filter(e => !e.isDraft).length;
    const draftCount = events.filter(e => e.isDraft).length;
    const tabs = [`Walks(${liveCount})`, `Drafts(${draftCount})`];

    const [activeTab, setActiveTab] = useState(tabs[0]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const filteredEvents = events.filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
        if (activeTab.includes('Drafts')) return event.isDraft && matchesSearch;
        if (activeTab.includes('Walks')) return !event.isDraft && matchesSearch;
        return matchesSearch;
    });

    const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentListData = filteredEvents.slice(startIndex, startIndex + itemsPerPage);

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePrevious = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    React.useEffect(() => {
        setCurrentPage(1);
    }, [activeTab, searchTerm, itemsPerPage]);

    React.useEffect(() => {
        document.title = 'Events | Temple Walk Admin';
    }, []);



    return (
        <div className="events-management" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1, minHeight: 0 }}>

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
                        background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                        borderRadius: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 12px rgba(249, 115, 22, 0.25)',
                        flexShrink: 0
                    }}>
                        <Calendar size={24} color="white" />
                    </div>
                    <div>
                        <h1 style={{
                            fontSize: '1.5rem',
                            fontWeight: 800,
                            color: '#0f172a',
                            marginBottom: '0.25rem'
                        }}>Walks Management</h1>
                        <p style={{
                            fontSize: '0.85rem',
                            color: '#64748b',
                            fontWeight: 500
                        }}>Create and manage temple walks and events</p>
                    </div>
                </div>
                <button
                    className="primary-action-btn"
                    onClick={onCreateNew}
                >
                    <Plus size={20} strokeWidth={3} /> <span className="btn-text">Create New Event</span>
                </button>
            </div>

            {/* Filter Bar - Same as Devotees */}
            <div className="filter-bar" style={{
                background: 'white',
                padding: '0.75rem 1rem',
                borderRadius: '20px',
                display: 'flex',
                gap: '1rem',
                alignItems: 'center',
                boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                border: '1.5px solid #f1f5f9',
                marginBottom: '1rem',
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
                                transition: 'all 0.2s'
                            }}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="filter-actions" style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', flex: 1 }}>
                    <SearchBar
                        placeholder="Search by event name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ flex: 1, minWidth: '200px' }}
                    />



                    <div style={{ flex: 1, minWidth: '200px' }}>
                        <Dropdown
                            options={['Latest', 'Oldest', 'Upcoming']}
                            placeholder="Sort By"
                            value="Latest"
                            onChange={(val) => console.log(val)}
                        />
                    </div>

                    <div style={{ flex: 1, minWidth: '200px' }}>
                        <Dropdown
                            placeholder="Date Range"
                            options={['This Week', 'This Month', 'Last Month']}
                            icon={Calendar}
                            onChange={(val) => console.log(val)}
                        />
                    </div>
                </div>
            </div>

            {/* List Container - Same as Devotees */}
            <div className="table-card" style={{
                background: 'white',
                borderRadius: '28px',
                border: '1.5px solid #f1f5f9',
                boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                overflow: 'hidden',
                flex: 1,
                display: 'flex',
                flexDirection: 'column'
            }}>


                {/* Table Header */}
                <div className="table-header" style={{
                    display: 'grid',
                    gridTemplateColumns: '2.5fr 1fr 1.2fr 1fr',
                    padding: '1.25rem 2rem',
                    borderBottom: '1.5px solid #f1f5f9',
                    background: '#fcfcfc'
                }}>
                    {['EVENT DETAILS', 'STATUS', 'PARTICIPANTS', 'ACTIONS'].map(h => (
                        <span key={h} className={`header - ${h.toLowerCase().replace(' ', '-')} `} style={{ fontSize: '0.65rem', fontWeight: 800, color: '#94a3b8', letterSpacing: '0.05em' }}>{h}</span>
                    ))}
                </div>

                {/* Event List */}
                <div style={{ display: 'flex', flexDirection: 'column', overflowY: 'auto', flex: 1, maxHeight: '500px', scrollbarWidth: 'thin', scrollbarColor: '#f1f5f9 transparent' }}>
                    {currentListData.map((event, idx) => (
                        <div key={event.id} style={{
                            display: 'grid',
                            display: 'grid',
                            gridTemplateColumns: '2.5fr 1fr 1.2fr 1fr',
                            padding: '1rem 2rem',
                            alignItems: 'center',
                            borderBottom: idx === events.length - 1 ? 'none' : '1.5px solid #f8fafc',
                            transition: 'all 0.2s'
                        }} className="event-row">

                            {/* Details */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '14px',
                                    background: event.iconBg,
                                    color: event.iconColor,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0
                                }}>
                                    {event.icon}
                                </div>
                                <div>
                                    <div style={{ fontWeight: 800, color: '#1e293b', fontSize: '0.9rem', marginBottom: '0.15rem' }}>{event.title}</div>
                                    <div style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 600 }}>{event.schedule}</div>
                                </div>
                            </div>

                            {/* Status */}
                            <div className="col-status" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: event.statusColor }} />
                                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: event.statusColor }}>{event.status}</span>
                            </div>

                            {/* Participants */}
                            <div className="col-participants">
                                <div style={{ fontWeight: 800, color: '#1e293b', fontSize: '0.9rem' }}>{event.participants}</div>
                                <div style={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: 600 }}>{event.participantsLabel}</div>
                            </div>

                            {/* Actions */}
                            <div className="col-actions" style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-start', alignItems: 'center' }}>
                                {event.isDraft ? (
                                    <>
                                        <button style={{ color: '#94a3b8', background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem' }} onClick={() => onEdit(event)}><Edit2 size={18} /></button>
                                        <button style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem' }}><Trash2 size={18} /></button>
                                    </>
                                ) : (
                                    <>
                                        <button style={{ color: '#94a3b8', background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem' }} onClick={() => onEdit(event)}><Edit2 size={18} /></button>
                                        <button style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem' }}><Trash2 size={18} /></button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <Pagination
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    totalEntries={filteredEvents.length}
                    onPageChange={setCurrentPage}
                    onItemsPerPageChange={(val) => {
                        setItemsPerPage(val);
                        setCurrentPage(1);
                    }}
                />
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
    .event-row:hover { background: #fcfcfc; }

    @media (max-width: 768px) {
        .page-header { flex-direction: column; align-items: stretch !important; gap: 0.75rem !important; margin-bottom: 1rem !important; }
        
        .filter-bar { flex-direction: column; align-items: stretch !important; padding: 1rem !important; }
        .filter-actions { flex-direction: column; align-items: stretch !important; gap: 0.75rem !important; }
        
        /* Revert Card View - Enable Horizontal Scroll */
        .table-card {
            overflow-x: auto !important;
            display: block !important; /* Override flex to allow scrolling block */
        }
        
        .table-header, .event-row {
            min-width: 900px !important; /* Force desktop width to trigger scroll */
            display: grid !important; /* Restore grid layout */
            /* Ensure grid template matches inline styles */
            grid-template-columns: 2fr 1.5fr 1.5fr 1fr !important;
        }
        
        .table-header { display: grid !important; } /* Unhide header */
        
        /* Remove card-view specific styles */
        .event-row {
            gap: 0 !important;
            padding: 1rem 2rem !important;
            border-bottom: 1.5px solid #f8fafc !important;
        }
        
        .col-status, .col-participants { width: auto !important; justify-content: flex-start !important; gap: 1rem !important; }
        .col-status::before, .col-participants::before { display: none !important; }
        
        .col-actions {
            margin-top: 0 !important;
            padding-top: 0 !important;
            border-top: none !important;
            width: auto !important;
            justify-content: flex-start !important;
        }
    }
`}} />
        </div>
    );
}
