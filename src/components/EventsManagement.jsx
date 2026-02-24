import React, { useState, useEffect, useRef } from 'react';
import { apiFetch } from '../api';
import {
    Trash2, ChevronRight, Play, CheckCircle2, Clock,
    Plus, ChevronDown, Calendar, MoreVertical, TrendingUp, Edit2
} from 'lucide-react';
import { Dropdown } from './Dropdown';
import { SearchBar, Pagination } from './index';

export function EventsManagement({ onCreateNew, onEdit }) {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('Walks');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    // Fetch Events
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await apiFetch('/api/events/');
                if (response.ok) {
                    const data = await response.json();
                    const formatted = data
                        .filter(e => {
                            const name = (e.name || '').toLowerCase();
                            const excludeNames = ['walk', 'vd', 'muthumariamman temple walk', 'fghjkl', 'morning fitness walk', 'asdf'];
                            return !excludeNames.includes(name);
                        })
                        .map((e, index) => {
                            const eventDate = new Date(e.event_date);
                            const isValidDate = !isNaN(eventDate.getTime());

                            return {
                                id: e.id || `event-${index}`,
                                title: e.name || 'Untitled Event',
                                schedule: isValidDate
                                    ? eventDate.toLocaleDateString() + ' • ' + eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                    : 'Schedule TBD',
                                status: isValidDate && eventDate > new Date() ? 'Upcoming' : 'Ongoing',
                                statusColor: isValidDate && eventDate > new Date() ? '#3b82f6' : '#10b981',
                                participants: '0',
                                participantsLabel: 'Registered',
                                icon: <TrendingUp size={20} />,
                                iconBg: '#eff6ff',
                                iconColor: '#3b82f6',
                                isDraft: false,
                                coords: {
                                    lat: parseFloat(e.start_lat) || 9.9195,
                                    lng: parseFloat(e.start_lng) || 78.1193
                                }
                            };
                        });
                    setEvents(formatted);
                }
            } catch (err) {
                console.error("Error fetching events:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);



    const tabs = ['Walks', 'Drafts'];

    const filteredEvents = events.filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
        if (activeTab.includes('Drafts')) return event.isDraft && matchesSearch;
        return !event.isDraft && matchesSearch;
    });

    const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentListData = filteredEvents.slice(startIndex, startIndex + itemsPerPage);

    useEffect(() => {
        setCurrentPage(1);
    }, [activeTab, searchTerm, itemsPerPage]);

    useEffect(() => {
        document.title = 'Events | Temple Walk Admin';
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            // Check if it's a temporary client-side ID
            if (String(id).startsWith('event-')) {
                setEvents(events.filter(e => e.id !== id));
                return;
            }

            try {
                const response = await apiFetch(`/api/events/${id}/`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    setEvents(events.filter(e => e.id !== id));
                } else {
                    const error = await response.json();
                    alert(`Failed to delete event: ${error.detail || 'Unknown error'}`);
                }
            } catch (err) {
                console.error('Error deleting event:', err);
                alert('An error occurred while deleting the event.');
            }
        }
    };

    return (
        <div className="events-management" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1, minHeight: 0 }}>
            {/* Page Title Header */}
            <div className="page-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: '48px', height: '48px', background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(249, 115, 22, 0.25)', flexShrink: 0 }}>
                        <Calendar size={24} color="white" />
                    </div>
                    <div>
                        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.25rem' }}>Walks Management</h1>
                        <p style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 500 }}>Create and manage temple walks and events</p>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button className="primary-action-btn" onClick={onCreateNew}>
                        <Plus size={20} strokeWidth={3} /> <span className="btn-text">Create Event</span>
                    </button>
                </div>
            </div>

            {/* Filter Bar */}
            <div className="filter-bar" style={{ background: 'white', padding: '0.75rem 1rem', borderRadius: '20px', display: 'flex', gap: '1rem', alignItems: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', border: '1.5px solid #f1f5f9', marginBottom: '1rem', flexWrap: 'wrap' }}>
                <div className="tab-container" style={{ display: 'flex', gap: '0.25rem' }}>
                    {tabs.map((tab, idx) => (
                        <button key={`tab-${idx}`} onClick={() => setActiveTab(tab)} style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: 'none', background: activeTab.includes(tab.split('(')[0]) ? '#f1f5f9' : 'transparent', color: activeTab.includes(tab.split('(')[0]) ? '#1e293b' : '#94a3b8', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}>
                            {tab}
                        </button>
                    ))}
                </div>
                <div className="filter-actions" style={{ display: 'flex', gap: '1rem', alignItems: 'center', flex: 1 }}>
                    <SearchBar placeholder="Search by event name..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ flex: 1 }} />
                    <Dropdown options={['Latest', 'Oldest', 'Upcoming']} placeholder="Sort By" value="Latest" onChange={() => { }} />
                </div>
            </div>

            {/* List Container */}
            <div className="table-card" style={{ background: 'white', borderRadius: '28px', border: '1.5px solid #f1f5f9', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', overflow: 'hidden', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div className="table-header" style={{ display: 'grid', gridTemplateColumns: '2.5fr 1fr 1.2fr 1fr', padding: '1.25rem 2rem', borderBottom: '1.5px solid #f1f5f9', background: '#fcfcfc' }}>
                    {['EVENT DETAILS', 'STATUS', 'PARTICIPANTS', 'ACTIONS'].map(h => (
                        <span key={h} style={{ fontSize: '0.65rem', fontWeight: 800, color: '#94a3b8', letterSpacing: '0.05em' }}>{h}</span>
                    ))}
                </div>

                <div className="custom-scrollbar" style={{ flex: 1, overflowY: 'auto' }}>
                    {loading ? (
                        <div style={{ padding: '4rem', textAlign: 'center', color: '#94a3b8' }}>Loading events...</div>
                    ) : currentListData.length === 0 ? (
                        <div style={{ padding: '4rem', textAlign: 'center' }}>
                            <div style={{ width: '60px', height: '60px', borderRadius: '20px', background: '#fff7ed', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                                <Calendar size={30} color="#f97316" />
                            </div>
                            <h3 style={{ fontWeight: 700, color: '#1e293b' }}>No walks found</h3>
                        </div>
                    ) : (
                        currentListData.map((event, idx) => (
                            <div key={event.id} style={{ display: 'grid', gridTemplateColumns: '2.5fr 1fr 1.2fr 1fr', padding: '1rem 2rem', alignItems: 'center', borderBottom: idx === currentListData.length - 1 ? 'none' : '1.25px solid #f8fafc' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: event.iconBg, color: event.iconColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{event.icon}</div>
                                    <div>
                                        <div style={{ fontWeight: 800, color: '#1e293b', fontSize: '0.85rem' }}>{event.title}</div>
                                        <div style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 600 }}>{event.schedule}</div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: event.statusColor }} />
                                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: event.statusColor }}>{event.status}</span>
                                </div>
                                <div style={{ fontWeight: 800, color: '#1e293b', fontSize: '0.85rem' }}>{event.participants} <span style={{ color: '#94a3b8', fontSize: '0.65rem' }}>{event.participantsLabel}</span></div>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <button style={{ color: '#94a3b8', background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => onEdit(event)}><Edit2 size={16} /></button>
                                    <button style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => handleDelete(event.id)}><Trash2 size={16} /></button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} totalEntries={filteredEvents.length} onPageChange={setCurrentPage} onItemsPerPageChange={setItemsPerPage} />
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @media (max-width: 768px) {
                    .page-header { flex-direction: column !important; align-items: stretch !important; gap: 0.75rem !important; margin-bottom: 1rem !important; }
                    .page-header h1 { font-size: 1.2rem !important; }
                    
                    .filter-bar { flex-direction: column !important; align-items: stretch !important; padding: 1rem !important; gap: 1rem !important; }
                    .filter-actions { flex-direction: column !important; width: 100% !important; gap: 1rem !important; }
                    
                    .table-header { display: none !important; }
                    
                    /* Card stacking for event rows */
                    .events-management .custom-scrollbar > div {
                        display: flex !important;
                        flex-direction: column !important;
                        gap: 0.75rem !important;
                        padding: 1.25rem 1rem !important;
                        border-bottom: 1.5px solid #f8fafc !important;
                        grid-template-columns: unset !important;
                    }
                    
                    /* Aligning column contents for mobile */
                    .events-management .custom-scrollbar > div > div {
                        width: 100% !important;
                    }
                    
                    /* Action buttons row */
                    .events-management .custom-scrollbar > div > div:last-child {
                        flex-direction: row !important;
                        justify-content: flex-start !important;
                        padding-top: 0.5rem;
                        border-top: 1px solid #f1f5f9;
                    }
                }
            ` }} />
        </div>
    );
}
