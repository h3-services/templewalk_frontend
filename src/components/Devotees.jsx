import React, { useState, useMemo } from 'react';
import {
    Users, Search, Filter, Download, MoreVertical, MapPin,
    Calendar, TrendingUp, CheckCircle2, RotateCcw,
    CreditCard, ShieldCheck, Mail, Phone, ChevronRight,
    Eye, Edit2, Plus, BarChart2, Info, Settings, Moon, User, ChevronDown
} from 'lucide-react';
import { Dropdown } from './Dropdown';
import { SearchBar, Pagination } from './index';

export function Devotees() {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const devoteesData = [
        { id: "#TW-2023-089", name: "Priya Sharma", joinedDate: "Aug 15, 2023", email: "priya.s@email.com", phone: "+91 98765 43210", isRegistered: true, isWalking: true, avatar: "PS", color: "#E3F2FD" },
        { id: "#TW-2023-142", name: "Arjun Kumar", joinedDate: "Sep 02, 2023", email: "arjun.k@email.com", phone: "+91 98222 11100", isRegistered: true, isWalking: true, avatar: "AK", color: "#FFF3E0" },
        { id: "#TW-2022-556", name: "Meera Nair", joinedDate: "Jan 20, 2024", email: "meera.n@email.com", phone: "+91 99000 88777", isRegistered: true, isWalking: false, avatar: "MN", color: "#E8F5E9" },
        { id: "#TW-2023-901", name: "Suresh Raina", joinedDate: "Feb 10, 2024", email: "suresh@email.com", phone: "+91 91234 56789", isRegistered: true, isWalking: true, avatar: "SR", color: "#F3E5F5" },
        { id: "#TW-2023-902", name: "Anjali Devi", joinedDate: "Mar 05, 2024", email: "anjali@email.com", phone: "+91 94567 12345", isRegistered: false, isWalking: false, avatar: "AD", color: "#FCE4EC" },
        { id: "#TW-2023-903", name: "Vikram Seth", joinedDate: "Mar 12, 2024", email: "vikram@email.com", phone: "+91 98761 23456", isRegistered: true, isWalking: true, avatar: "VS", color: "#E0F2F1" },
        { id: "#TW-2023-904", name: "Lakshmi Bai", joinedDate: "Mar 18, 2024", email: "lakshmi@email.com", phone: "+91 99887 76655", isRegistered: true, isWalking: true, avatar: "LB", color: "#FFFDE7" },
        { id: "#TW-2023-905", name: "Rahul Dravid", joinedDate: "Mar 22, 2024", email: "rahul@email.com", phone: "+91 98765 43211", isRegistered: false, isWalking: false, avatar: "RD", color: "#EFEBE9" },
        { id: "#TW-2023-906", name: "Deepika P.", joinedDate: "Mar 25, 2024", email: "deepika@email.com", phone: "+91 94444 33333", isRegistered: true, isWalking: true, avatar: "DP", color: "#F1F8E9" },
        { id: "#TW-2023-907", name: "Kiran Bedi", joinedDate: "Mar 28, 2024", email: "kiran@email.com", phone: "+91 95555 66666", isRegistered: true, isWalking: true, avatar: "KB", color: "#E1F5FE" },
    ];

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
    }, [searchTerm]);

    const totalPages = Math.ceil(filteredDevotees.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = filteredDevotees.slice(startIndex, startIndex + itemsPerPage);

    const handlePrevious = () => setCurrentPage(p => Math.max(1, p - 1));
    const handleNext = () => setCurrentPage(p => Math.min(totalPages, p + 1));

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
                    gridTemplateColumns: '2fr 1.5fr 1fr 2fr',
                    padding: '1.25rem 2rem',
                    borderBottom: '1.5px solid #f1f5f9',
                    background: '#fcfcfc'
                }}>
                    {['DEVOTEE', 'CONTACT INFO', 'JOINED ON', 'STATUS'].map(h => (
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
                    {currentItems.map((devotee, idx) => (
                        <div key={idx} style={{
                            display: 'grid',
                            gridTemplateColumns: '2fr 1.5fr 1fr 2fr',
                            padding: '1rem 2rem',
                            borderBottom: idx === filteredDevotees.length - 1 ? 'none' : '1.5px solid #f8fafc',
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
                            </div>
                            <div className="col-joined">
                                <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>{devotee.joinedDate}</span>
                            </div>
                            <div className="col-status" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                {/* Registration Status */}
                                <span style={{
                                    padding: '0.4rem 0.75rem',
                                    borderRadius: '10px',
                                    fontSize: '0.65rem',
                                    fontWeight: 800,
                                    background: devotee.isRegistered ? '#f0fdf4' : '#fef2f2',
                                    color: devotee.isRegistered ? '#10b981' : '#ef4444',
                                    letterSpacing: '0.02em',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.4rem',
                                    textTransform: 'uppercase',
                                    border: `1px solid ${devotee.isRegistered ? '#dcfce7' : '#fee2e2'}`
                                }}>
                                    {devotee.isRegistered ? 'Registered' : 'Not Registered'}
                                </span>

                                {/* Walking Status */}
                                <span style={{
                                    padding: '0.4rem 0.75rem',
                                    borderRadius: '10px',
                                    fontSize: '0.65rem',
                                    fontWeight: 800,
                                    background: devotee.isWalking ? '#eff6ff' : '#f8fafc',
                                    color: devotee.isWalking ? '#3b82f6' : '#94a3b8',
                                    letterSpacing: '0.02em',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.4rem',
                                    textTransform: 'uppercase',
                                    border: `1px solid ${devotee.isWalking ? '#dbeafe' : '#f1f5f9'}`
                                }}>
                                    <span style={{
                                        width: '6px',
                                        height: '6px',
                                        borderRadius: '50%',
                                        background: devotee.isWalking ? '#3b82f6' : '#94a3b8'
                                    }}></span>
                                    {devotee.isWalking ? 'Walking' : 'Not Walking'}
                                </span>
                            </div>
                        </div>
                    ))}
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



            <style dangerouslySetInnerHTML={{
                __html: `
                .devotee-row:hover { background-color: #fcfcfc; }
                
                @media (max-width: 768px) {
                    .page-header { flex-direction: column; align-items: stretch !important; gap: 0.75rem !important; margin-bottom: 1rem !important; }
                    .page-header h1 { font-size: 1.25rem !important; margin-bottom: 0.25rem !important; }
                    
                    .filter-bar { flex-direction: column; align-items: stretch !important; padding: 1rem !important; }
                    .filter-actions { width: 100%; flex-direction: column; gap: 0.75rem !important; }
                    
                    /* Revert Card View - Enable Horizontal Scroll */
                    .table-card {
                        overflow-x: auto !important;
                        display: block !important;
                    }
                    
                    .table-header, .devotee-row {
                        min-width: 900px !important;
                        display: grid !important;
                        grid-template-columns: 2fr 1.5fr 1fr 2fr !important;
                    }
                    
                    .table-header { display: grid !important; }
                    
                    /* Remove card stacking */
                    .devotee-row {
                        gap: 0 !important;
                        padding: 1rem 2rem !important;
                        border-bottom: 1.5px solid #f8fafc !important;
                    }
                    
                    .col-contact, .col-status {
                        display: flex !important;
                        flex-direction: column !important; /* Keep contact stacked vertically */
                        align-items: flex-start !important;
                        gap: 0.25rem !important;
                        width: auto !important;
                        justify-content: flex-start !important;
                    }
                    
                    .col-contact::before, .col-status::before { display: none !important; }
                    
                `
            }} />
        </div>
    );
}
