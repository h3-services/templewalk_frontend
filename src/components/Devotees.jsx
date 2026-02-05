import React, { useState, useMemo } from 'react';
import {
    Users, Search, Filter, Download, MoreVertical, MapPin,
    Calendar, TrendingUp, CheckCircle2, ChevronDown, RotateCcw,
    CreditCard, ShieldCheck, Mail, Phone, ChevronRight,
    Eye, Edit2, Plus, BarChart2, Info, Settings, Moon
} from 'lucide-react';

export function Devotees() {
    const [searchTerm, setSearchTerm] = useState('');
    const [locationFilter, setLocationFilter] = useState('All Locations');
    const [membershipFilter, setMembershipFilter] = useState('Membership Level');

    const devoteesData = [
        {
            id: "#TW-2023-089",
            name: "Priya Sharma",
            type: "Patron Member",
            email: "priya.s@email.com",
            phone: "+91 98765 43210",
            status: "ACTIVE",
            avatar: "PS",
            color: "#E3F2FD"
        },
        {
            id: "#TW-2023-142",
            name: "Arjun Kumar",
            type: "Life Member",
            email: "arjun.k@email.com",
            phone: "+91 98222 11100",
            status: "ACTIVE",
            avatar: "AK",
            color: "#FFF3E0"
        },
        {
            id: "#TW-2022-556",
            name: "Meera Nair",
            type: "Regular Member",
            email: "meera.n@email.com",
            phone: "+91 99000 88777",
            status: "INACTIVE",
            avatar: "MN",
            color: "#E8F5E9"
        },
    ];

    const filteredDevotees = useMemo(() => {
        return devoteesData.filter(d =>
            d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            d.id.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);

    return (
        <div className="devotee-directory-page" style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            minHeight: 0,
            gap: '1.5rem'
        }}>

            {/* Title Section */}
            <div>
                <h1 style={{
                    fontSize: '2.25rem',
                    fontWeight: 800,
                    color: '#1e293b',
                    fontFamily: 'Lora, serif',
                    marginBottom: '0.5rem'
                }}>Devotee Directory</h1>
                <p style={{ fontSize: '0.95rem', color: '#64748b', fontWeight: 600 }}>
                    Manage membership records, contact details, and spiritual involvement.
                </p>
            </div>

            {/* Layout Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '2rem', flex: 1, minHeight: 0 }}>

                {/* Main Content Area */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', minHeight: 0 }}>

                    {/* Filter Bar */}
                    <div style={{
                        background: 'white',
                        padding: '1rem 1.5rem',
                        borderRadius: '24px',
                        display: 'flex',
                        gap: '1rem',
                        alignItems: 'center',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                        border: '1.5px solid #f1f5f9'
                    }}>
                        <div style={{ position: 'relative', flex: 1.5 }}>
                            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                            <input
                                type="text"
                                placeholder="Search by name, ID..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem 1rem 0.75rem 2.75rem',
                                    borderRadius: '12px',
                                    border: '1.5px solid #f1f5f9',
                                    background: '#f8fafc',
                                    fontSize: '0.85rem',
                                    fontWeight: 600,
                                    outline: 'none'
                                }}
                            />
                        </div>
                        <div style={{ flex: 1, position: 'relative' }}>
                            <select
                                value={locationFilter}
                                onChange={(e) => setLocationFilter(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem 1rem',
                                    borderRadius: '12px',
                                    border: '1.5px solid #f1f5f9',
                                    background: '#f8fafc',
                                    fontSize: '0.85rem',
                                    fontWeight: 600,
                                    appearance: 'none',
                                    outline: 'none',
                                    color: '#64748b'
                                }}
                            >
                                <option>All Locations</option>
                            </select>
                            <ChevronDown size={16} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                        </div>
                        <div style={{ flex: 1, position: 'relative' }}>
                            <select
                                value={membershipFilter}
                                onChange={(e) => setMembershipFilter(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem 1rem',
                                    borderRadius: '12px',
                                    border: '1.5px solid #f1f5f9',
                                    background: '#f8fafc',
                                    fontSize: '0.85rem',
                                    fontWeight: 600,
                                    appearance: 'none',
                                    outline: 'none',
                                    color: '#64748b'
                                }}
                            >
                                <option>Membership Level</option>
                            </select>
                            <ChevronDown size={16} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                        </div>
                        <div style={{ flex: 1, position: 'relative' }}>
                            <input
                                type="date"
                                style={{
                                    width: '100%',
                                    padding: '0.75rem 1rem',
                                    borderRadius: '12px',
                                    border: '1.5px solid #f1f5f9',
                                    background: '#f8fafc',
                                    fontSize: '0.85rem',
                                    fontWeight: 600,
                                    color: '#64748b',
                                    outline: 'none'
                                }}
                            />
                        </div>
                    </div>

                    {/* Table Section */}
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
                            gridTemplateColumns: '2fr 1.2fr 1.8fr 1fr 1fr',
                            padding: '1.25rem 2rem',
                            borderBottom: '1.5px solid #f1f5f9',
                            background: '#fcfcfc'
                        }}>
                            {['DEVOTEE', 'MEMBER ID', 'CONTACT INFO', 'STATUS', 'ACTIONS'].map(h => (
                                <span key={h} style={{ fontSize: '0.65rem', fontWeight: 800, color: '#94a3b8', letterSpacing: '0.05em' }}>{h}</span>
                            ))}
                        </div>
                        <div style={{ overflowY: 'auto' }}>
                            {filteredDevotees.map((devotee, idx) => (
                                <div key={idx} style={{
                                    display: 'grid',
                                    gridTemplateColumns: '2fr 1.2fr 1.8fr 1fr 1fr',
                                    padding: '1.5rem 2rem',
                                    borderBottom: idx === filteredDevotees.length - 1 ? 'none' : '1.5px solid #f8fafc',
                                    alignItems: 'center',
                                    transition: 'all 0.2s'
                                }} className="devotee-row">
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
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
                                            fontSize: '0.9rem'
                                        }}>{devotee.avatar}</div>
                                        <div>
                                            <div style={{ fontWeight: 800, color: '#1e293b', fontSize: '1rem' }}>{devotee.name}</div>
                                            <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>{devotee.type}</div>
                                        </div>
                                    </div>
                                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#64748b' }}>{devotee.id}</div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#475569', fontSize: '0.85rem', fontWeight: 600 }}>
                                            <Mail size={14} color="#F97316" /> {devotee.email}
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#475569', fontSize: '0.85rem', fontWeight: 600 }}>
                                            <Phone size={14} color="#F97316" /> {devotee.phone}
                                        </div>
                                    </div>
                                    <div>
                                        <span style={{
                                            padding: '0.25rem 0.6rem',
                                            borderRadius: '6px',
                                            fontSize: '0.65rem',
                                            fontWeight: 800,
                                            background: devotee.status === 'ACTIVE' ? '#F0FDF4' : '#F1F5F9',
                                            color: devotee.status === 'ACTIVE' ? '#22C55E' : '#64748B',
                                            letterSpacing: '0.05em'
                                        }}>{devotee.status}</span>
                                    </div>
                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                        <button style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}><Eye size={18} /></button>
                                        <button style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}><Edit2 size={18} /></button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination Footer */}
                        <div style={{
                            padding: '1.25rem 2rem',
                            marginTop: 'auto',
                            borderTop: '1.5px solid #f1f5f9',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 600 }}>
                                Showing 1-10 of 4,821 devotees
                            </span>
                            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                <button className="p-btn"><ChevronRight size={16} style={{ transform: 'rotate(180deg)' }} /></button>
                                <button className="p-btn active">1</button>
                                <button className="p-btn">2</button>
                                <button className="p-btn"><ChevronRight size={16} /></button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Analytics Sidebar */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                    {/* Analytics Card */}
                    <div style={{
                        background: 'linear-gradient(135deg, #F97316 0%, #FA8E42 100%)',
                        padding: '2rem',
                        borderRadius: '32px',
                        color: 'white',
                        boxShadow: '0 20px 25px -5px rgba(249, 115, 22, 0.2)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <BarChart2 size={18} />
                            </div>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Devotee Analytics</h3>
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <p style={{ fontSize: '0.7rem', fontWeight: 800, opacity: 0.8, textTransform: 'uppercase', marginBottom: '0.5rem' }}>TOTAL REGISTERED</p>
                            <h4 style={{ fontSize: '2.5rem', fontWeight: 800 }}>4,821</h4>
                        </div>

                        <div style={{
                            background: 'rgba(255,255,255,0.15)',
                            padding: '1.25rem',
                            borderRadius: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <div>
                                <p style={{ fontSize: '0.65rem', fontWeight: 800, opacity: 0.8, marginBottom: '0.2rem' }}>NEW THIS MONTH</p>
                                <h4 style={{ fontSize: '1.75rem', fontWeight: 800 }}>+124</h4>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'white' }}>+12% vs</span>
                                <p style={{ fontSize: '0.65rem', fontWeight: 600, opacity: 0.8 }}>last month</p>
                            </div>
                        </div>
                    </div>

                    {/* Donation Distribution */}
                    <div style={{
                        background: 'white',
                        padding: '1.75rem',
                        borderRadius: '32px',
                        border: '1.5px solid #f1f5f9',
                        boxShadow: '0 10px 15px -3px rgba(0,0,0,0.02)'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#1e293b' }}>Donation Distribution</h3>
                            <Info size={16} color="#94a3b8" />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            {[
                                { label: 'Patrons', val: 15, amt: '$12k', color: '#F97316' },
                                { label: 'Life Members', val: 45, amt: '$34k', color: '#F97316' },
                                { label: 'Regular', val: 40, amt: '$22k', color: '#FCD34D' },
                            ].map((item, i) => (
                                <div key={i}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                                        <span style={{ color: '#64748b' }}>{item.label} ({item.val}%)</span>
                                        <span style={{ color: '#1e293b' }}>{item.amt}</span>
                                    </div>
                                    <div style={{ height: '6px', background: '#f1f5f9', borderRadius: '3px', overflow: 'hidden' }}>
                                        <div style={{ width: `${item.val}%`, height: '100%', background: item.color }} />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button style={{
                            width: '100%',
                            marginTop: '2rem',
                            padding: '0.85rem',
                            borderRadius: '14px',
                            border: '1.5px solid #f1f5f9',
                            background: 'white',
                            color: '#F97316',
                            fontSize: '0.8rem',
                            fontWeight: 800,
                            cursor: 'pointer'
                        }}>View Full Financial Report</button>
                    </div>

                </div>
            </div>

            {/* Global Bottom Bar */}
            <div style={{
                marginTop: '1.5rem',
                paddingTop: '1.5rem',
                borderTop: '1.5px solid #f1f5f9',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: '#94a3b8'
            }}>
                <span>Database last updated: 5 minutes ago</span>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <button style={{
                        padding: '0.75rem 1.5rem',
                        borderRadius: '12px',
                        border: '1.5px solid #f1f5f9',
                        background: 'white',
                        color: '#475569',
                        fontWeight: 800,
                        cursor: 'pointer'
                    }}>Data Settings</button>
                    <button style={{
                        padding: '0.75rem 2rem',
                        borderRadius: '12px',
                        border: 'none',
                        background: '#F97316',
                        color: 'white',
                        fontWeight: 800,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem'
                    }}>
                        Download Full Directory <Download size={16} />
                    </button>
                    <div style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '50%',
                        background: '#f8fafc',
                        color: '#64748b',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1.5px solid #f1f5f9'
                    }}>
                        <Moon size={20} />
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .devotee-row:hover { background-color: #fcfcfc; }
                .p-btn {
                    width: 36px; height: 36px; border-radius: 10px; border: 1.5px solid #f1f5f9;
                    background: white; color: #64748b; font-weight: 800; cursor: pointer;
                    display: flex; align-items: center; justify-content: center;
                }
                .p-btn.active { background: #F97316; color: white; border-color: #F97316; }
                `
            }} />
        </div>
    );
}
