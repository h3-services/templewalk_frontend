import React, { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import {
    Users, Search, Filter, Download, MoreVertical, MapPin,
    Calendar, TrendingUp, CheckCircle2, RotateCcw,
    CreditCard, ShieldCheck, Mail, Phone, ChevronRight,
    Eye, Edit2, Plus, BarChart2, Info, Settings, Moon, User, ChevronDown, AlertTriangle,
    UserCheck, X, Briefcase, CheckCircle, XCircle
} from 'lucide-react';
import { Dropdown } from './Dropdown';
import { SearchBar, Pagination } from './index';

export function Devotees() {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const [devoteesData, setDevoteesData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Volunteer assignment panel state
    const [assignPanel, setAssignPanel] = useState(null); // devotee object or null
    const [assignSkill, setAssignSkill] = useState('General');
    const [assigningId, setAssigningId] = useState(null); // which devotee is being assigned (loading)
    const [assignedIds, setAssignedIds] = useState(new Set()); // already assigned devotees

    // Toast notification state
    const [toast, setToast] = useState(null); // { type: 'success'|'error', message }

    const showToast = (type, message) => {
        setToast({ type, message });
        setTimeout(() => setToast(null), 3500);
    };

    React.useEffect(() => {
        const fetchDevotees = async () => {
            try {
                // Fetch users and volunteers in parallel to know who is already a volunteer
                const [usersRes, volunteersRes] = await Promise.all([
                    fetch('/api/users/?skip=0&limit=100'),
                    fetch('/api/volunteers/?skip=0&limit=100')
                ]);

                if (usersRes.ok) {
                    const data = await usersRes.json();
                    const mappedData = data.map((user, index) => ({
                        id: user.user_id || `dev-${index}`,
                        name: user.name || 'Unknown',
                        joinedDate: user.created_at ? new Date(user.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A',
                        email: user.email || 'N/A',
                        phone: user.phone || 'N/A',
                        emergencyPhone: user.emergency_phone || null,
                        role: user.role || 'devotee',
                        isRegistered: true,
                        isWalking: false,
                        avatar: (user.name || 'U').split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase(),
                        color: ['#E3F2FD', '#FFF3E0', '#E8F5E9', '#F3E5F5', '#FCE4EC'][index % 5]
                    }));
                    setDevoteesData(mappedData);

                    // Mark already-volunteer devotees
                    if (volunteersRes.ok) {
                        const volunteers = await volunteersRes.json();
                        const volunteerUserIds = new Set(volunteers.map(v => v.user_id));
                        setAssignedIds(volunteerUserIds);
                    }
                } else if (usersRes.status === 422) {
                    const errorData = await usersRes.json();
                    console.error('Validation Error:', errorData.detail);
                } else {
                    console.error('Failed to fetch devotees');
                }
            } catch (error) {
                console.error('Error fetching devotees:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDevotees();
    }, []);

    React.useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    React.useEffect(() => {
        document.title = 'Devotees | Temple Walk Admin';
    }, []);

    const filteredDevotees = useMemo(() => {
        return devoteesData.filter(d =>
            d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            d.id.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [devoteesData, searchTerm]);

    const totalPages = Math.ceil(filteredDevotees.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = filteredDevotees.slice(startIndex, startIndex + itemsPerPage);

    const handlePrevious = () => setCurrentPage(p => Math.max(1, p - 1));
    const handleNext = () => setCurrentPage(p => Math.min(totalPages, p + 1));

    const handleAssignVolunteer = async () => {
        if (!assignPanel) return;
        const devotee = assignPanel;
        setAssigningId(devotee.id);

        try {
            const volunteerPayload = {
                user_id: devotee.id,
                skill: assignSkill.toLowerCase().replace(/ /g, '_'),
                approved: true
            };

            const res = await fetch('/api/volunteers/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(volunteerPayload)
            });

            if (res.ok) {
                setAssignedIds(prev => new Set([...prev, devotee.id]));
                setAssignPanel(null);
                showToast('success', `${devotee.name} has been assigned as a volunteer!`);
            } else {
                const errData = await res.json().catch(() => ({}));
                if (res.status === 400 && (errData.detail?.includes('already') || errData.detail?.includes('exists'))) {
                    setAssignedIds(prev => new Set([...prev, devotee.id]));
                    setAssignPanel(null);
                    showToast('success', `${devotee.name} is already a volunteer.`);
                } else {
                    throw new Error(errData.detail || 'Failed to assign volunteer.');
                }
            }
        } catch (err) {
            console.error('Assign volunteer error:', err);
            showToast('error', `Failed to assign: ${err.message}`);
        } finally {
            setAssigningId(null);
        }
    };

    return (
        <div className="devotee-directory-page" style={{
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
                        <Users size={24} color="white" />
                    </div>
                    <div>
                        <h1 style={{
                            fontSize: '1.5rem',
                            fontWeight: 800,
                            color: '#0f172a',
                            marginBottom: '0.25rem'
                        }}>Devotee Directory</h1>
                        <p style={{
                            fontSize: '0.85rem',
                            color: '#64748b',
                            fontWeight: 500
                        }}>Manage and view all registered devotees</p>
                    </div>
                </div>
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
                flexWrap: 'wrap'
            }}>
                <SearchBar
                    placeholder="Search by name, ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ flex: 1.5, minWidth: '200px' }}
                />

                <div className="filter-actions" style={{ flex: 1, display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ flex: 1, minWidth: '200px' }}>
                        <Dropdown
                            options={['Latest', 'Oldest', 'Alphabetical']}
                            placeholder="Sort By"
                            value="Latest"
                            onChange={(val) => console.log(val)}
                        />
                    </div>
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

            {/* Table Section - Full Width */}
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
                    gridTemplateColumns: '2fr 1.5fr 1fr 1.5fr 1.5fr',
                    padding: '1.25rem 2rem',
                    borderBottom: '1.5px solid #f1f5f9',
                    background: '#fcfcfc'
                }}>
                    {['DEVOTEE', 'CONTACT INFO', 'JOINED ON', 'STATUS', 'ACTION'].map(h => (
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
                            <p>Loading devotees...</p>
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
                                background: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '0.5rem'
                            }}>
                                <Users size={36} color="#f97316" />
                            </div>
                            <h3 style={{
                                fontSize: '1.1rem',
                                fontWeight: 700,
                                color: '#1e293b',
                                margin: 0
                            }}>No devotees found</h3>
                            <p style={{
                                fontSize: '0.9rem',
                                color: '#64748b',
                                textAlign: 'center',
                                margin: 0,
                                maxWidth: '400px'
                            }}>
                                {searchTerm
                                    ? `No devotees matching "${searchTerm}". Try a different search term.`
                                    : 'The devotee directory is currently empty.'
                                }
                            </p>
                        </div>
                    ) : (
                        currentItems.map((devotee, idx) => {
                            const isVolunteer = assignedIds.has(devotee.id);
                            const isAssigning = assigningId === devotee.id;
                            return (
                                <div key={idx} style={{
                                    display: 'grid',
                                    gridTemplateColumns: '2fr 1.5fr 1fr 1.5fr 1.5fr',
                                    padding: '1rem 2rem',
                                    borderBottom: idx === currentItems.length - 1 ? 'none' : '1.5px solid #f8fafc',
                                    alignItems: 'center',
                                    transition: 'all 0.2s'
                                }} className="devotee-row">
                                    <div className="col-devotee" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{
                                            width: '48px',
                                            height: '48px',
                                            borderRadius: '14px',
                                            background: devotee.color,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontWeight: 800,
                                            color: '#1e293b',
                                            fontSize: '0.9rem',
                                            flexShrink: 0
                                        }}>{devotee.avatar}</div>
                                        <div>
                                            <div style={{ fontWeight: 800, color: '#1e293b', fontSize: '0.9rem' }}>{devotee.name}</div>
                                            <div style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 600 }}>{devotee.id}</div>
                                        </div>
                                    </div>
                                    <div className="col-contact" style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#475569', fontSize: '0.85rem', fontWeight: 700 }}>
                                            <Phone size={14} color="#F97316" /> {devotee.phone}
                                        </div>
                                        {devotee.emergencyPhone && (
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ef4444', fontSize: '0.7rem', fontWeight: 600 }}>
                                                <AlertTriangle size={12} /> E-Contact: {devotee.emergencyPhone}
                                            </div>
                                        )}
                                    </div>
                                    <div className="col-joined">
                                        <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>{devotee.joinedDate}</span>
                                    </div>
                                    <div className="col-status">
                                        {/* Walking Status */}
                                        <span style={{
                                            padding: '0.5rem 1rem',
                                            borderRadius: '12px',
                                            fontSize: '0.7rem',
                                            fontWeight: 800,
                                            background: devotee.isWalking ? '#f0fdf4' : '#f8fafc',
                                            color: devotee.isWalking ? '#10b981' : '#64748b',
                                            letterSpacing: '0.02em',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            textTransform: 'uppercase',
                                            border: `1.5px solid ${devotee.isWalking ? '#dcfce7' : '#e2e8f0'}`,
                                            transition: 'all 0.2s'
                                        }}>
                                            <span style={{
                                                width: '8px',
                                                height: '8px',
                                                borderRadius: '50%',
                                                background: devotee.isWalking ? '#10b981' : '#94a3b8',
                                                boxShadow: devotee.isWalking ? '0 0 8px rgba(16, 185, 129, 0.4)' : 'none'
                                            }}></span>
                                            {devotee.isWalking ? 'Walk' : 'Not Walk'}
                                        </span>
                                    </div>
                                    <div className="col-action">
                                        {isVolunteer ? (
                                            <span style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '0.4rem',
                                                padding: '0.45rem 0.9rem',
                                                borderRadius: '10px',
                                                fontSize: '0.7rem',
                                                fontWeight: 800,
                                                background: '#f0fdf4',
                                                color: '#10b981',
                                                border: '1.5px solid #dcfce7',
                                                letterSpacing: '0.02em'
                                            }}>
                                                <CheckCircle size={13} /> Volunteer
                                            </span>
                                        ) : (
                                            <button
                                                className="assign-vol-btn"
                                                disabled={isAssigning}
                                                onClick={() => {
                                                    setAssignSkill('General');
                                                    setAssignPanel(devotee);
                                                }}
                                                style={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '0.4rem',
                                                    padding: '0.5rem 1rem',
                                                    borderRadius: '10px',
                                                    fontSize: '0.72rem',
                                                    fontWeight: 800,
                                                    background: isAssigning
                                                        ? '#f1f5f9'
                                                        : 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                                                    color: isAssigning ? '#94a3b8' : 'white',
                                                    border: 'none',
                                                    cursor: isAssigning ? 'not-allowed' : 'pointer',
                                                    letterSpacing: '0.02em',
                                                    boxShadow: isAssigning ? 'none' : '0 2px 8px rgba(249,115,22,0.25)',
                                                    transition: 'all 0.2s',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                <UserCheck size={13} />
                                                {isAssigning ? 'Assigning...' : 'Assign Volunteer'}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                <Pagination
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    totalEntries={filteredDevotees.length}
                    onPageChange={setCurrentPage}
                    onItemsPerPageChange={(val) => {
                        setItemsPerPage(val);
                        setCurrentPage(1);
                    }}
                />
            </div>

            {/* Toast Notification */}
            {toast && createPortal(
                <div style={{
                    position: 'fixed',
                    bottom: '5.5rem',
                    right: '1rem',
                    zIndex: 99999,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '1rem 1.5rem',
                    borderRadius: '16px',
                    background: toast.type === 'success'
                        ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                        : 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                    color: 'white',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    animation: 'slideInToast 0.3s ease',
                    maxWidth: 'calc(100vw - 2rem)'
                }}>
                    {toast.type === 'success'
                        ? <CheckCircle size={20} />
                        : <XCircle size={20} />
                    }
                    {toast.message}
                </div>,
                document.body
            )}

            {/* Assign Volunteer Side Panel */}
            {assignPanel && createPortal(
                <>
                    {/* Overlay */}
                    <div
                        onClick={() => setAssignPanel(null)}
                        style={{
                            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                            background: 'rgba(0,0,0,0.3)',
                            zIndex: 9998,
                            backdropFilter: 'blur(2px)'
                        }}
                    />

                    {/* Panel */}
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        right: 0,
                        width: 'min(420px, 100vw)',
                        height: '100dvh',
                        backgroundColor: 'white',
                        boxShadow: '-4px 0 32px rgba(0,0,0,0.12)',
                        zIndex: 9999,
                        display: 'flex',
                        flexDirection: 'column',
                        borderTopLeftRadius: '24px',
                        borderBottomLeftRadius: '24px',
                        animation: 'slideInPanel 0.3s cubic-bezier(0.4,0,0.2,1)'
                    }}>
                        {/* Panel Header */}
                        <div style={{
                            padding: '24px 28px',
                            borderBottom: '1px solid #f3f4f6',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{
                                    width: '44px', height: '44px',
                                    background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                                    borderRadius: '12px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    boxShadow: '0 4px 12px rgba(249,115,22,0.25)'
                                }}>
                                    <UserCheck size={22} color="white" />
                                </div>
                                <div>
                                    <h2 style={{ fontSize: '17px', fontWeight: 800, color: '#111827', margin: 0 }}>Assign as Volunteer</h2>
                                    <p style={{ fontSize: '12px', color: '#6b7280', margin: '3px 0 0 0', fontWeight: 500 }}>Promote this devotee to volunteer role</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setAssignPanel(null)}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', padding: '4px' }}
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Panel Body */}
                        <div style={{ padding: '28px', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>

                            {/* Devotee Info Card */}
                            <div style={{
                                background: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)',
                                borderRadius: '16px',
                                padding: '20px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '16px',
                                border: '1.5px solid #fed7aa'
                            }}>
                                <div style={{
                                    width: '56px', height: '56px',
                                    borderRadius: '16px',
                                    background: assignPanel.color,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontWeight: 800, color: '#1e293b', fontSize: '1.1rem',
                                    flexShrink: 0
                                }}>
                                    {assignPanel.avatar}
                                </div>
                                <div>
                                    <div style={{ fontWeight: 800, color: '#1e293b', fontSize: '1rem' }}>{assignPanel.name}</div>
                                    <div style={{ fontSize: '0.75rem', color: '#78716c', fontWeight: 600, marginTop: '2px' }}>{assignPanel.phone}</div>
                                    <div style={{ fontSize: '0.72rem', color: '#a78bfa', fontWeight: 600, marginTop: '2px' }}>{assignPanel.email}</div>
                                </div>
                            </div>

                            {/* Skill Selection */}
                            <div>
                                <label style={{
                                    fontSize: '11px',
                                    fontWeight: 800,
                                    color: '#9ca3af',
                                    letterSpacing: '0.06em',
                                    marginBottom: '10px',
                                    display: 'block'
                                }}>VOLUNTEER SPECIALIZATION</label>
                                <Dropdown
                                    options={['General', 'Food Serving', 'Medical', 'Emergency', 'Others']}
                                    value={assignSkill}
                                    onChange={(val) => setAssignSkill(val)}
                                    placeholder="Select Specialization"
                                />
                            </div>

                            {/* Info note */}
                            <div style={{
                                background: '#f8fafc',
                                borderRadius: '12px',
                                padding: '16px',
                                display: 'flex',
                                gap: '12px',
                                alignItems: 'flex-start',
                                border: '1.5px solid #e2e8f0'
                            }}>
                                <Briefcase size={16} color="#94a3b8" style={{ marginTop: '2px', flexShrink: 0 }} />
                                <p style={{ fontSize: '12px', color: '#64748b', margin: 0, lineHeight: '1.6', fontWeight: 500 }}>
                                    This devotee will be immediately registered as an <strong style={{ color: '#f97316' }}>approved volunteer</strong> and will appear in the Volunteer Force section and on the mobile app.
                                </p>
                            </div>
                        </div>

                        {/* Panel Footer */}
                        <div style={{
                            padding: '20px 28px',
                            borderTop: '1px solid #f3f4f6',
                            display: 'flex',
                            gap: '12px'
                        }}>
                            <button
                                onClick={() => setAssignPanel(null)}
                                style={{
                                    flex: 1,
                                    padding: '12px',
                                    borderRadius: '10px',
                                    border: '1.5px solid #e5e7eb',
                                    backgroundColor: 'white',
                                    color: '#374151',
                                    fontSize: '14px',
                                    fontWeight: 700,
                                    cursor: 'pointer'
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAssignVolunteer}
                                disabled={assigningId === assignPanel?.id}
                                style={{
                                    flex: 1.5,
                                    padding: '12px',
                                    borderRadius: '10px',
                                    border: 'none',
                                    background: assigningId === assignPanel?.id
                                        ? '#f1f5f9'
                                        : 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                                    color: assigningId === assignPanel?.id ? '#94a3b8' : 'white',
                                    fontSize: '14px',
                                    fontWeight: 700,
                                    cursor: assigningId === assignPanel?.id ? 'not-allowed' : 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px',
                                    boxShadow: assigningId === assignPanel?.id ? 'none' : '0 4px 12px rgba(249,115,22,0.3)',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <UserCheck size={16} />
                                {assigningId === assignPanel?.id ? 'Assigning...' : 'Confirm & Assign'}
                            </button>
                        </div>
                    </div>
                </>,
                document.body
            )}

            <style dangerouslySetInnerHTML={{
                __html: `
                .devotee-row:hover { background-color: #fcfcfc; }
                .assign-vol-btn:hover:not(:disabled) {
                    transform: translateY(-1px);
                    box-shadow: 0 4px 16px rgba(249,115,22,0.35) !important;
                }
                @keyframes slideInPanel {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideInToast {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                
                @media (max-width: 768px) {
                    .page-header { flex-direction: column !important; align-items: stretch !important; gap: 0.75rem !important; margin-bottom: 1rem !important; }
                    .page-header h1 { font-size: 1.2rem !important; }
                    
                    .filter-bar {
                        flex-direction: column !important;
                        align-items: stretch !important;
                        gap: 0.75rem !important;
                        padding: 1rem !important;
                    }

                    .filter-actions {
                        flex-direction: column !important;
                        width: 100% !important;
                        gap: 0.75rem !important;
                    }

                    .filter-actions > div {
                        width: 100% !important;
                        min-width: unset !important;
                    }

                    /* Card-view rows on mobile */
                    .devotee-row {
                        display: flex !important;
                        flex-direction: column !important;
                        gap: 0.6rem !important;
                        padding: 1rem 1.25rem !important;
                        border-bottom: 1.5px solid #f8fafc !important;
                        min-width: unset !important;
                        grid-template-columns: unset !important;
                    }

                    .devotee-row .col-devotee {
                        display: flex !important;
                        align-items: center !important;
                        gap: 0.75rem !important;
                        width: 100% !important;
                    }

                    .devotee-row .col-contact {
                        display: flex !important;
                        flex-direction: column !important;
                        gap: 0.2rem !important;
                    }

                    .devotee-row .col-action {
                        width: 100% !important;
                    }

                    .assign-vol-btn {
                        width: 100% !important;
                        justify-content: center !important;
                    }
                }
                `
            }} />
        </div>
    );
}
