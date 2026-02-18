import React, { useState, useEffect } from 'react';
import {
    AlertTriangle, MapPin, Clock, UserCheck,
    Search, Filter, ChevronDown, CheckCircle2,
    AlertCircle, Clock3, MoreVertical, Bell, Phone
} from 'lucide-react';
import { SearchBar, Pagination } from './index';

export function SOSRequests() {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    useEffect(() => {
        document.title = 'SOS Requests | Temple Walk Admin';
    }, []);

    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await fetch(`/api/sos/list`);
                if (response.ok) {
                    const data = await response.json();
                    // Maps API data to UI structure using real schema fields
                    const formattedData = data.map(req => ({
                        id: req.id,
                        name: req.name || "Unknown User",
                        phoneNumber: req.phoneNumber || "N/A",
                        helpType: req.typeLabel || req.type || "SOS Alert",
                        location: req.distance ? `${req.distance} away` : "Nearby",
                        distance: req.distance || "0m",
                        time: req.time || "Just now",
                        status: req.status || (req.isCompleted ? "Closed" : (req.isAccepted ? "Accepted" : "Pending")),
                        isAccepted: req.isAccepted,
                        isCompleted: req.isCompleted,
                        priority: "High",
                        color: req.isAccepted ? "#3b82f6" : "#ef4444"
                    }));
                    setRequests(formattedData);
                } else {
                    // Mock data fallback
                    setRequests([
                        {
                            id: 1,
                            name: "Rahul Sharma",
                            phoneNumber: "+91 98345 67120",
                            helpType: "Medical Emergency",
                            location: "Near Temple Gate 2",
                            distance: "120m away",
                            time: "2 mins ago",
                            status: "Pending",
                            priority: "Critical",
                            color: "#ef4444"
                        },
                        {
                            id: 2,
                            name: "Anjali Devi",
                            phoneNumber: "+91 88234 11902",
                            helpType: "Lost Property",
                            location: "Main Bhawan Hall",
                            distance: "450m away",
                            time: "8 mins ago",
                            status: "Accepted",
                            acceptedBy: "Volunteer Raj",
                            priority: "Medium",
                            color: "#3b82f6"
                        },
                        {
                            id: 3,
                            name: "Suresh Mehra",
                            phoneNumber: "+91 77210 55432",
                            helpType: "Security Alert",
                            location: "Parking Lot B",
                            distance: "800m away",
                            time: "15 mins ago",
                            status: "Closed",
                            priority: "High",
                            color: "#f59e0b"
                        }
                    ]);
                }
            } catch (error) {
                console.error("Failed to fetch SOS requests", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, []);

    // Filter & Search Logic
    const filteredRequests = React.useMemo(() => {
        return requests.filter(req => {
            const matchesSearch = req.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                req.helpType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                req.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesFilter = activeFilter === 'All' ||
                (activeFilter === 'Pending' && !req.isAccepted && !req.isCompleted) ||
                (activeFilter === 'Accepted' && req.isAccepted && !req.isCompleted) ||
                (activeFilter === 'Closed' && req.isCompleted);

            return matchesSearch && matchesFilter;
        });
    }, [requests, searchTerm, activeFilter]);

    const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
    const currentItems = filteredRequests.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'Critical': return '#ef4444';
            case 'High': return '#f59e0b';
            case 'Medium': return '#3b82f6';
            default: return '#64748b';
        }
    };

    return (
        <div className="sos-requests-page" style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            flex: 1,
            minHeight: 0,
            paddingBottom: '1rem'
        }}>
            {/* Page Header */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '0.5rem'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                        width: '48px',
                        height: '48px',
                        background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                        borderRadius: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 12px rgba(239, 68, 68, 0.25)'
                    }}>
                        <AlertTriangle size={24} color="white" />
                    </div>
                    <div>
                        <h1 style={{
                            fontSize: '1.5rem',
                            fontWeight: 800,
                            color: '#0f172a',
                            marginBottom: '0.25rem'
                        }}>SOS Requests</h1>
                        <p style={{
                            fontSize: '0.85rem',
                            color: '#64748b',
                            fontWeight: 500
                        }}>Monitor and manage emergency help requests</p>
                    </div>
                </div>

                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    background: '#fef2f2',
                    padding: '0.75rem 1.25rem',
                    borderRadius: '12px',
                    border: '1px solid #fee2e2'
                }}>
                    <Bell size={18} color="#ef4444" />
                    <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#991b1b' }}>
                        {requests.filter(r => r.status === 'Pending').length} Pending Alerts
                    </span>
                </div>
            </div>

            {/* Filter Bar */}
            <div className="filter-bar" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'white',
                padding: '0.75rem 1rem',
                borderRadius: '20px',
                border: '1.5px solid #f1f5f9',
                boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        {['All', 'Pending', 'Accepted', 'Closed'].map(filter => {
                            const isActive = activeFilter === filter;
                            let activeBg = '#0f172a'; // Default Dark
                            if (filter === 'Pending') activeBg = '#f59e0b';
                            if (filter === 'Accepted') activeBg = '#3b82f6';
                            if (filter === 'Closed') activeBg = '#10b981';

                            return (
                                <button
                                    key={filter}
                                    onClick={() => { setActiveFilter(filter); setCurrentPage(1); }}
                                    style={{
                                        padding: '0.5rem 1.25rem',
                                        borderRadius: '50px',
                                        border: isActive ? 'none' : '1px solid transparent',
                                        background: isActive ? activeBg : 'transparent',
                                        color: isActive ? 'white' : '#64748b',
                                        fontSize: '0.85rem',
                                        fontWeight: isActive ? 700 : 600,
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        boxShadow: isActive ? '0 4px 12px rgba(0,0,0,0.15)' : 'none'
                                    }}
                                >
                                    {filter}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div style={{ width: '300px' }}>
                    <SearchBar
                        onSearch={setSearchTerm}
                        placeholder="Search by name, phone or help type..."
                    />
                </div>
            </div>

            {/* Content Area - Card-like Table */}
            <div className="table-card" style={{
                background: 'white',
                borderRadius: '28px',
                border: '1.5px solid #f1f5f9',
                boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                minHeight: 0,
                overflow: 'hidden'
            }}>
                {/* Table Header */}
                <div className="table-header" style={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 1.5fr 1.5fr',
                    padding: '1.25rem 2rem',
                    borderBottom: '1.5px solid #f1f5f9',
                    background: '#fcfcfc'
                }}>
                    {['REQUESTER', 'HELP TYPE & LOCATION', 'STATUS'].map(h => (
                        <span key={h} style={{
                            fontSize: '0.65rem',
                            fontWeight: 800,
                            color: '#94a3b8',
                            letterSpacing: '0.05em'
                        }}>{h}</span>
                    ))}
                </div>

                {/* List Content */}
                <div className="custom-scrollbar" style={{ flex: 1, overflowY: 'auto' }}>
                    {loading ? (
                        <div style={{ padding: '4rem', textAlign: 'center', color: '#64748b' }}>
                            <p>Loading requests...</p>
                        </div>
                    ) : currentItems.length > 0 ? currentItems.map((request, idx) => (
                        <div key={request.id} style={{
                            display: 'grid',
                            gridTemplateColumns: '2fr 1.5fr 1.5fr',
                            padding: '1rem 2rem',
                            borderBottom: idx === currentItems.length - 1 ? 'none' : '1.5px solid #f8fafc',
                            alignItems: 'center',
                            transition: 'all 0.2s',
                            cursor: 'default'
                        }} className="sos-row">
                            {/* Requester Info */}
                            <div className="col-requester" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '14px',
                                    background: '#f8fafc',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: getPriorityColor(request.priority),
                                    border: `1.5px solid ${getPriorityColor(request.priority)}20`,
                                    fontSize: '0.9rem',
                                    flexShrink: 0
                                }}>
                                    <AlertCircle size={22} />
                                </div>
                                <div>
                                    <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#1e293b', marginBottom: '0.2rem', margin: 0 }}>{request.name}</h4>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#64748b', fontSize: '0.75rem', fontWeight: 600 }}>
                                        <Phone size={12} color="#f97316" /> {request.phoneNumber}
                                    </div>
                                </div>
                            </div>

                            {/* Help Type & Location */}
                            <div className="col-help">
                                <h5 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.3rem' }}>{request.helpType}</h5>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#64748b', fontSize: '0.75rem', fontWeight: 600 }}>
                                        <MapPin size={12} /> {request.location}
                                    </div>
                                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600, marginLeft: '1rem' }}>
                                        {request.distance}
                                    </div>
                                </div>
                            </div>

                            {/* Status */}
                            <div className="col-status">
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '0.25rem'
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        color: request.status === 'Pending' ? '#f59e0b' : request.status === 'Accepted' ? '#3b82f6' : '#10b981'
                                    }}>
                                        {request.status === 'Pending' ? <Clock3 size={16} /> : <UserCheck size={16} />}
                                        <span style={{ fontSize: '0.85rem', fontWeight: 800 }}>{request.status}</span>
                                    </div>
                                    {request.acceptedBy && (
                                        <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>By {request.acceptedBy}</span>
                                    )}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#94a3b8', fontSize: '0.75rem', fontWeight: 500 }}>
                                        <Clock size={12} /> {request.time}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <div style={{ padding: '4rem', textAlign: 'center', color: '#94a3b8' }}>
                            <AlertCircle size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                            <p style={{ fontWeight: 600 }}>No SOS requests found matching your filters.</p>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {/* Pagination */}
                <Pagination
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    totalEntries={filteredRequests.length}
                    onPageChange={setCurrentPage}
                    onItemsPerPageChange={(val) => {
                        setItemsPerPage(val);
                        setCurrentPage(1);
                    }}
                />
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .sos-row:hover { background-color: #fcfcfc; }
                
                .sos-requests-page .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .sos-requests-page .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .sos-requests-page .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #e2e8f0;
                    border-radius: 10px;
                }
                .sos-requests-page .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #cbd5e1;
                }

                @media (max-width: 768px) {
                    .page-header { flex-direction: column; align-items: stretch !important; gap: 0.75rem !important; margin-bottom: 1rem !important; }
                    .filter-bar { flex-direction: column; align-items: stretch !important; padding: 1rem !important; }
                    .filter-bar > div { flex-direction: column; width: 100%; gap: 1rem !important; }
                    .filter-bar input { width: 100%; }
                    
                    /* Revert Card View - Enable Horizontal Scroll */
                    .table-card {
                        overflow-x: auto !important;
                        display: block !important;
                    }
                    
                    .table-header, .sos-row {
                        min-width: 900px !important;
                        display: grid !important;
                        grid-template-columns: 2fr 1.5fr 1.5fr !important;
                    }
                    
                    .table-header { display: grid !important; }
                    
                    .sos-row {
                        gap: 0 !important;
                        padding: 1rem 2rem !important;
                        border-bottom: 1.5px solid #f8fafc !important;
                    }
                    
                    .col-help, .col-status, .col-action {
                        display: flex !important;
                        flex-direction: column !important;
                        align-items: flex-start !important;
                        gap: 0.25rem !important;
                        width: auto !important;
                        justify-content: flex-start !important;
                    }
                    
                    /* Reset specific styles */
                    .col-action { margin-top: 0 !important; }
                    .col-requester { width: auto !important; border-bottom: none !important; padding-bottom: 0 !important; margin-bottom: 0 !important; }
                    
                    .col-help::before, .col-status::before { display: none !important; }
                    .col-action button { width: auto !important; padding: 0.5rem 1rem !important; }
                }
            ` }} />
        </div>
    );
}
