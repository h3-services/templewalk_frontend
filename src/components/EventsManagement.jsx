import React, { useState } from 'react';
import {
    Search, Plus, ChevronDown, Calendar,
    MoreVertical, Edit2, Eye, BarChart2,
    Trash2, ChevronRight, Play, CheckCircle2, Clock
} from 'lucide-react';

export function EventsManagement({ onCreateNew }) {
    const [activeTab, setActiveTab] = useState('Live Events');
    const [searchTerm, setSearchTerm] = useState('');

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

    const tabs = ['Live Events', 'Drafts', 'Archived'];

    return (
        <div className="events-management" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            {/* Header section handled by App's PageHeader but we add custom title here if needed, 
                however the mockup shows the title in the main content area */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 style={{
                    fontSize: '2.5rem',
                    fontWeight: 800,
                    color: '#1e293b',
                    fontFamily: 'Lora, serif'
                }}>Event Management</h1>
                <button
                    onClick={onCreateNew}
                    style={{
                        background: '#f97316',
                        color: 'white',
                        padding: '0.85rem 1.75rem',
                        borderRadius: '16px',
                        border: 'none',
                        fontWeight: 800,
                        fontSize: '0.95rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        cursor: 'pointer',
                        boxShadow: '0 8px 20px -6px rgba(249, 115, 22, 0.4)'
                    }}
                >
                    <Plus size={20} strokeWidth={3} /> Create New Event
                </button>
            </div>

            {/* List Container */}
            <div style={{
                background: 'white',
                borderRadius: '32px',
                border: '1.5px solid #f1f5f9',
                boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                padding: '2rem'
            }}>

                {/* Filters Row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                    <div style={{ display: 'flex', background: '#f8fafc', padding: '0.4rem', borderRadius: '14px', border: '1.5px solid #f1f5f9' }}>
                        {tabs.map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                style={{
                                    padding: '0.6rem 1.25rem',
                                    borderRadius: '10px',
                                    border: 'none',
                                    background: activeTab === tab ? 'white' : 'transparent',
                                    color: activeTab === tab ? '#1e293b' : '#94a3b8',
                                    fontWeight: activeTab === tab ? 800 : 700,
                                    fontSize: '0.85rem',
                                    cursor: 'pointer',
                                    boxShadow: activeTab === tab ? '0 2px 8px rgba(0,0,0,0.05)' : 'none',
                                    transition: 'all 0.2s'
                                }}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <div style={{ position: 'relative' }}>
                            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                            <input
                                type="text"
                                placeholder="Search by event name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{
                                    padding: '0.75rem 1rem 0.75rem 2.75rem',
                                    borderRadius: '12px',
                                    border: '1.5px solid #f1f5f9',
                                    background: '#f8fafc',
                                    fontSize: '0.85rem',
                                    fontWeight: 600,
                                    outline: 'none',
                                    width: '240px'
                                }}
                            />
                        </div>

                        <div style={{
                            display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1.25rem',
                            borderRadius: '12px', border: '1.5px solid #f1f5f9', background: '#f8fafc',
                            fontSize: '0.85rem', fontWeight: 700, color: '#475569', cursor: 'pointer'
                        }}>
                            Category <ChevronDown size={14} />
                        </div>

                        <div style={{
                            display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1.25rem',
                            borderRadius: '12px', border: '1.5px solid #f1f5f9', background: '#f8fafc',
                            fontSize: '0.85rem', fontWeight: 700, color: '#475569', cursor: 'pointer'
                        }}>
                            Date Range <Calendar size={14} />
                        </div>
                    </div>
                </div>

                {/* Table Header */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '2.5fr 1fr 1fr 1.2fr 1fr',
                    padding: '0 1rem 1rem',
                    borderBottom: '1.5px solid #f1f5f9',
                    marginBottom: '1rem'
                }}>
                    {['EVENT DETAILS', 'CATEGORY', 'STATUS', 'PARTICIPANTS', 'ACTIONS'].map(h => (
                        <span key={h} style={{ fontSize: '0.65rem', fontWeight: 800, color: '#94a3b8', letterSpacing: '0.05em' }}>{h}</span>
                    ))}
                </div>

                {/* Event List */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {events.map((event, idx) => (
                        <div key={event.id} style={{
                            display: 'grid',
                            gridTemplateColumns: '2.5fr 1fr 1fr 1.2fr 1fr',
                            padding: '1.5rem 1rem',
                            alignItems: 'center',
                            borderBottom: idx === events.length - 1 ? 'none' : '1.5px solid #f8fafc',
                            transition: 'all 0.2s'
                        }} className="event-row">

                            {/* Details */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
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
                                    <div style={{ fontWeight: 800, color: '#1e293b', fontSize: '1.05rem', marginBottom: '0.2rem' }}>{event.title}</div>
                                    <div style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 600 }}>{event.schedule}</div>
                                </div>
                            </div>

                            {/* Category */}
                            <div>
                                <span style={{
                                    padding: '0.4rem 0.85rem',
                                    borderRadius: '10px',
                                    fontSize: '0.75rem',
                                    fontWeight: 800,
                                    background: '#f1f5f9',
                                    color: '#3b82f6', // Use status specific category colors if needed, but mockup shows blueish/purpleish
                                    background: event.iconBg
                                }}>{event.category}</span>
                            </div>

                            {/* Status */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: event.statusColor }} />
                                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: event.statusColor }}>{event.status}</span>
                            </div>

                            {/* Participants */}
                            <div>
                                <div style={{ fontWeight: 800, color: '#1e293b', fontSize: '1rem' }}>{event.participants}</div>
                                <div style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 600 }}>{event.participantsLabel}</div>
                            </div>

                            {/* Actions */}
                            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-start', alignItems: 'center' }}>
                                {event.isDraft ? (
                                    <>
                                        <button style={{
                                            background: '#475569',
                                            color: 'white',
                                            padding: '0.5rem 1rem',
                                            borderRadius: '8px',
                                            border: 'none',
                                            fontWeight: 700,
                                            fontSize: '0.75rem',
                                            cursor: 'pointer'
                                        }}>RESUME</button>
                                        <button style={{ color: '#94a3b8', background: 'none', border: 'none', cursor: 'pointer' }}><Trash2 size={18} /></button>
                                    </>
                                ) : (
                                    <>
                                        <button style={{ color: '#94a3b8', background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem' }}><Edit2 size={18} /></button>
                                        <button style={{ color: '#94a3b8', background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem' }}>
                                            {event.status === 'Completed' ? <BarChart2 size={18} /> : <Eye size={18} />}
                                        </button>
                                        <button style={{ color: '#94a3b8', background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem' }}><MoreVertical size={18} /></button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer / Pagination */}
                <div style={{
                    marginTop: '2rem',
                    paddingTop: '1.5rem',
                    borderTop: '1.5px solid #f1f5f9',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <span style={{ fontSize: '0.9rem', color: '#94a3b8', fontWeight: 600 }}>
                        Showing <strong style={{ color: '#1e293b' }}>1-10</strong> of <strong style={{ color: '#1e293b' }}>24</strong> events
                    </span>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button className="page-btn"><ChevronRight size={18} style={{ transform: 'rotate(180deg)' }} /></button>
                        <button className="page-btn active">1</button>
                        <button className="page-btn">2</button>
                        <button className="page-btn">3</button>
                        <button className="page-btn"><ChevronRight size={18} /></button>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .event-row:hover { background: #fcfcfc; }
                .page-btn {
                    width: 36px; height: 36px; border-radius: 12px; border: 1.5px solid #f1f5f9;
                    background: white; color: #64748b; display: flex; alignItems: center; justifyContent: center;
                    cursor: pointer; font-weight: 700; transition: all 0.2s;
                }
                .page-btn:hover { border-color: #cbd5e1; color: #1e293b; }
                .page-btn.active { background: #f97316; color: white; border-color: #f97316; }
            `}} />
        </div>
    );
}
