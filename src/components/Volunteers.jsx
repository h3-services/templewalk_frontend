import React, { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
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
    const [activeTab, setActiveTab] = useState('Active Volunteers (0)');
    const [isAddVolunteerOpen, setIsAddVolunteerOpen] = useState(false);
    const [volunteerForm, setVolunteerForm] = useState({
        name: '',
        email: '',
        phone: '',
        area: '',
        specialization: 'General'
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

    const [activeVolunteersData, setActiveVolunteersData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch Volunteers and Users in parallel
                const [volunteersRes, usersRes] = await Promise.all([
                    fetch('/api/volunteers/'),
                    fetch('/api/users/')
                ]);

                if (volunteersRes.ok && usersRes.ok) {
                    const volunteers = await volunteersRes.json();
                    const users = await usersRes.json();

                    // Create a map of users for easy lookup by user_id
                    const usersMap = {};
                    users.forEach(u => {
                        usersMap[u.user_id] = u;
                    });

                    // Merge volunteer data with user data
                    const mergedData = volunteers.map((v, index) => {
                        const user = usersMap[v.user_id] || {};
                        return {
                            id: v.volunteer_id || v.id || index + 1,
                            user_id: v.user_id,
                            name: user.fullName || user.name || 'Unknown Volunteer',
                            event: "General Service",
                            role: v.skill || "Volunteer",
                            shift: "General",
                            status: v.approved ? "Approved" : "Pending",
                            onDuty: v.approved || false,
                            initials: (user.fullName || user.name || 'V').split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase(),
                            color: ['#fbbf24', '#34d399', '#f87171', '#818cf8', '#f472b6'][index % 5],
                            phone: user.phoneNumber || user.phone || 'N/A',
                            email: user.email || 'N/A'
                        };
                    });

                    setActiveVolunteersData(mergedData);
                } else {
                    console.error("Failed to fetch data");
                }
            } catch (error) {
                console.error("Error fetching volunteer data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const historyVolunteersData = [];

    const sentRequestsData = [];

    const [pendingVols, setPendingVols] = useState([]);

    // Define tabs with dynamic counts after all data is available
    const tabs = useMemo(() => [
        `Pending Approvals (${pendingVols.length})`,
        `Active Volunteers (${activeVolunteersData.length})`,
        `Sent Requests (${sentRequestsData.length})`,
        'History'
    ], [pendingVols.length, activeVolunteersData.length, sentRequestsData.length]);

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

    const totalPages = Math.ceil(filteredActive.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = filteredActive.slice(startIndex, startIndex + itemsPerPage);

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

                {/* Search Row */}
                <div style={{ display: 'flex', justifyContent: 'stretch', marginBottom: '1rem' }}>
                    <div className="filter-bar" style={{
                        background: 'white',
                        padding: '0.75rem 1rem',
                        borderRadius: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                        border: '1.5px solid #f1f5f9',
                        width: '100%'
                    }}>
                        <SearchBar
                            placeholder="Search volunteers..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ width: '100%' }}
                        />
                    </div>
                </div>

                {/* Table Container - Active Volunteer Only */}
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
                        gridTemplateColumns: '2.5fr 1.5fr 1fr',
                        padding: '1.25rem 2rem',
                        borderBottom: '1.5px solid #f1f5f9',
                        background: '#fcfcfc'
                    }}>
                        {['VOLUNTEER', 'CONTACT INFO', 'STATUS'].map(h => (
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
                        {loading ? (
                            <div style={{ padding: '4rem', textAlign: 'center', color: '#64748b' }}>
                                <p>Loading volunteers...</p>
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
                                    background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: '0.5rem'
                                }}>
                                    <Briefcase size={36} color="#3b82f6" />
                                </div>
                                <h3 style={{
                                    fontSize: '1.1rem',
                                    fontWeight: 700,
                                    color: '#1e293b',
                                    margin: 0
                                }}>No volunteers found</h3>
                                <p style={{
                                    fontSize: '0.9rem',
                                    color: '#64748b',
                                    textAlign: 'center',
                                    margin: 0,
                                    maxWidth: '400px'
                                }}>
                                    {searchTerm
                                        ? `No volunteers matching "${searchTerm}". Try a different search term.`
                                        : 'Get started by adding your first volunteer to the team.'
                                    }
                                </p>
                            </div>
                        ) : (
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
                        )}
                    </div>

                    <Pagination
                        currentPage={currentPage}
                        itemsPerPage={itemsPerPage}
                        totalEntries={filteredActive.length}
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
                    .page-header { flex-direction: column !important; align-items: stretch !important; gap: 0.75rem !important; margin-bottom: 1rem !important; }
                    .page-header h1 { font-size: 1.2rem !important; }
                    
                    .tab-container { padding-bottom: 0.5rem; overflow-x: auto; -webkit-overflow-scrolling: touch; }
                    
                    /* Card-view rows on mobile */
                    .volunteer-row {
                        display: flex !important;
                        flex-direction: column !important;
                        gap: 0.6rem !important;
                        padding: 1rem 1.25rem !important;
                        border-bottom: 1.5px solid #f8fafc !important;
                        min-width: unset !important;
                        grid-template-columns: unset !important;
                    }

                    .volunteer-row .col-volunteer {
                        display: flex !important;
                        align-items: center !important;
                        gap: 0.75rem !important;
                        width: 100% !important;
                    }

                    .volunteer-row .col-contact {
                        display: flex !important;
                        flex-direction: column !important;
                        gap: 0.2rem !important;
                    }

                    .volunteer-row .col-status {
                        display: inline-flex !important;
                        align-items: center !important;
                    }

                    .volunteer-drawer {
                        width: min(500px, 100vw) !important;
                        height: 100dvh !important;
                    }
                }
                `
            }} />
            {/* Overlay and Side Panel via Portal */}
            {isAddVolunteerOpen && createPortal(
                <>
                    <div style={{
                        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                        background: 'rgba(0,0,0,0.3)', zIndex: 9998
                    }} onClick={() => setIsAddVolunteerOpen(false)} />

                    <div className={`volunteer-drawer ${isAddVolunteerOpen ? 'open' : ''}`} style={{
                        backgroundColor: 'white',
                        boxShadow: '-4px 0 20px rgba(0,0,0,0.1)',
                        zIndex: 9999,
                        display: 'flex',
                        flexDirection: 'column',
                        borderTopLeftRadius: '24px',
                        borderBottomLeftRadius: '24px',
                        position: 'fixed',
                        top: 0,
                        right: 0,
                        width: 'min(500px, 100vw)',
                        height: '100dvh',
                        transition: 'transform 0.3s ease-in-out',
                        transform: isAddVolunteerOpen ? 'translateX(0)' : 'translateX(100%)'
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
                                <p style={{ fontSize: '13px', color: '#6b7280', margin: '4px 0 0 0' }}>Enter verify details to register new volunteer</p>
                            </div>
                            <button
                                onClick={() => setIsAddVolunteerOpen(false)}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af' }}
                            >
                                <X size={20} />
                            </button>
                        </div>

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
                                    Full Name <span style={{ color: '#f97316' }}>*</span>
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
                                    Email Address <span style={{ color: '#f97316' }}>*</span>
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
                                    Phone Number <span style={{ color: '#f97316' }}>*</span>
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
                                    options={['General', 'Food Serving', 'Medical', 'Emergency', 'Others']}
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
                                    Manually add a volunteer to the database. They can reset their password later.
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
                                onClick={async () => {
                                    try {
                                        const { name, email, phone, area, specialization } = volunteerForm;
                                        if (!name || !email || !phone) {
                                            alert("Please fill in all fields (Name, Email, Phone).");
                                            return;
                                        }

                                        // Basic Validation
                                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                                        if (!emailRegex.test(email)) {
                                            alert("Please enter a valid email address.");
                                            return;
                                        }

                                        if (phone.length < 10) {
                                            alert("Please enter a valid phone number (at least 10 digits).");
                                            return;
                                        }

                                        const payload = {
                                            fullName: name,
                                            email: email,
                                            phoneNumber: phone,
                                            area: area || "",
                                            specializedIn: (specialization || 'general').toLowerCase().replace(' ', '_')
                                        };

                                        console.log("Registering volunteer via Admin API...");
                                        const response = await fetch('/api/volunteers/register', {
                                            method: 'POST',
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify(payload)
                                        });

                                        if (!response.ok) {
                                            const errorData = await response.json().catch(() => ({ detail: "Request failed" }));
                                            const errorMsg = Array.isArray(errorData.detail)
                                                ? errorData.detail[0]?.msg
                                                : (errorData.detail || "Failed to register volunteer.");
                                            throw new Error(errorMsg);
                                        }

                                        const result = await response.json();

                                        // Add to local list immediately
                                        const newEntry = {
                                            id: result.volunteer_id || result.user_id || Math.random(),
                                            name: name,
                                            event: "Temple Service",
                                            role: result.skill || specialization,
                                            shift: "Active",
                                            status: "online",
                                            onDuty: true, // Force on duty for immediate visibility
                                            initials: name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase(),
                                            color: '#fbbf24',
                                            phone: phone,
                                            email: email
                                        };

                                        setActiveVolunteersData(prev => [newEntry, ...prev]);

                                        alert('Volunteer registered successfully!');
                                        setIsAddVolunteerOpen(false);
                                        setVolunteerForm({ name: '', email: '', phone: '', area: '', specialization: 'General' });

                                    } catch (error) {
                                        console.error("Error adding volunteer:", error);
                                        alert(`Failed to add volunteer: ${error.message}`);
                                    }
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
                                Add Volunteer <ArrowUpRight size={16} />
                            </button>
                        </div>
                    </div>
                </>,
                document.body
            )}
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
