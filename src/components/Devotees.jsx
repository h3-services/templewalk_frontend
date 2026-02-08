import React, { useState, useMemo } from 'react';
import {
    Users, Search, Filter, Download, MoreVertical, MapPin,
    Calendar, TrendingUp, CheckCircle2, ChevronDown, RotateCcw,
    CreditCard, ShieldCheck, Mail, Phone, ChevronRight,
    Eye, Edit2, Plus, BarChart2, Info, Settings, Moon
} from 'lucide-react';

export function Devotees() {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const devoteesData = [
        { id: "#TW-2023-089", name: "Priya Sharma", type: "Patron Member", email: "priya.s@email.com", phone: "+91 98765 43210", status: "ACTIVE", avatar: "PS", color: "#E3F2FD" },
        { id: "#TW-2023-142", name: "Arjun Kumar", type: "Life Member", email: "arjun.k@email.com", phone: "+91 98222 11100", status: "ACTIVE", avatar: "AK", color: "#FFF3E0" },
        { id: "#TW-2022-556", name: "Meera Nair", type: "Regular Member", email: "meera.n@email.com", phone: "+91 99000 88777", status: "INACTIVE", avatar: "MN", color: "#E8F5E9" },
        { id: "#TW-2023-901", name: "Suresh Raina", type: "Life Member", email: "suresh@email.com", phone: "+91 91234 56789", status: "ACTIVE", avatar: "SR", color: "#F3E5F5" },
        { id: "#TW-2023-902", name: "Anjali Devi", type: "Regular Member", email: "anjali@email.com", phone: "+91 94567 12345", status: "INACTIVE", avatar: "AD", color: "#FCE4EC" },
        { id: "#TW-2023-903", name: "Vikram Seth", type: "Patron Member", email: "vikram@email.com", phone: "+91 98761 23456", status: "ACTIVE", avatar: "VS", color: "#E0F2F1" },
        { id: "#TW-2023-904", name: "Lakshmi Bai", type: "Life Member", email: "lakshmi@email.com", phone: "+91 99887 76655", status: "ACTIVE", avatar: "LB", color: "#FFFDE7" },
        { id: "#TW-2023-905", name: "Rahul Dravid", type: "Regular Member", email: "rahul@email.com", phone: "+91 98765 43211", status: "INACTIVE", avatar: "RD", color: "#EFEBE9" },
        { id: "#TW-2023-906", name: "Deepika P.", type: "Patron Member", email: "deepika@email.com", phone: "+91 94444 33333", status: "ACTIVE", avatar: "DP", color: "#F1F8E9" },
        { id: "#TW-2023-907", name: "Kiran Bedi", type: "Life Member", email: "kiran@email.com", phone: "+91 95555 66666", status: "ACTIVE", avatar: "KB", color: "#E1F5FE" },
    ];

    React.useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

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

            {/* Filter Bar */}
            <div style={{
                background: 'white',
                padding: '0.75rem 1rem',
                borderRadius: '20px',
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

            {/* Table Section - Full Width */}
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
                    gridTemplateColumns: '2.5fr 1.5fr 1fr',
                    padding: '1.25rem 2rem',
                    borderBottom: '1.5px solid #f1f5f9',
                    background: '#fcfcfc'
                }}>
                    {['DEVOTEE', 'CONTACT INFO', 'STATUS'].map(h => (
                        <span key={h} style={{ fontSize: '0.65rem', fontWeight: 800, color: '#94a3b8', letterSpacing: '0.05em' }}>{h}</span>
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
                            gridTemplateColumns: '2.5fr 1.5fr 1fr',
                            padding: '1rem 2rem',
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
                                    <div style={{ fontWeight: 800, color: '#1e293b', fontSize: '0.9rem' }}>{devotee.name}</div>
                                    <div style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 600 }}>{devotee.type}</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#475569', fontSize: '0.85rem', fontWeight: 700 }}>
                                    <Phone size={14} color="#F97316" /> {devotee.phone}
                                </div>
                            </div>
                            <div>
                                <span style={{
                                    padding: '0.4rem 0.85rem',
                                    borderRadius: '10px',
                                    fontSize: '0.7rem',
                                    fontWeight: 800,
                                    background: devotee.status === 'ACTIVE' ? '#f0fdf4' : '#fef2f2',
                                    color: devotee.status === 'ACTIVE' ? '#10b981' : '#ef4444',
                                    letterSpacing: '0.05em',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.4rem',
                                    textTransform: 'uppercase'
                                }}>
                                    <span style={{
                                        width: '6px',
                                        height: '6px',
                                        borderRadius: '50%',
                                        background: devotee.status === 'ACTIVE' ? '#10b981' : '#ef4444'
                                    }}></span>
                                    {devotee.status === 'ACTIVE' ? 'Walking' : 'Not Walking'}
                                </span>
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#9ca3af', fontWeight: '600' }}>
                            Show
                            <select
                                value={itemsPerPage}
                                onChange={(e) => {
                                    setItemsPerPage(parseInt(e.target.value));
                                    setCurrentPage(1);
                                }}
                                style={{
                                    fontSize: '11px',
                                    fontWeight: '700',
                                    color: '#111827',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '6px',
                                    padding: '2px 6px',
                                    outline: 'none',
                                    cursor: 'pointer',
                                    backgroundColor: '#f8fafc'
                                }}
                            >
                                {[5, 10, 20, 50].map(val => (
                                    <option key={val} value={val}>{val}</option>
                                ))}
                            </select>
                            of {filteredDevotees.length} entries
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                            onClick={handlePrevious}
                            disabled={currentPage === 1}
                            style={{
                                ...paginationBtnStyle,
                                opacity: currentPage === 1 ? 0.5 : 1,
                                cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
                            }}
                        >Previous</button>
                        <button
                            onClick={handleNext}
                            disabled={currentPage === totalPages}
                            style={{
                                ...paginationBtnStyle,
                                opacity: currentPage === totalPages ? 0.5 : 1,
                                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
                            }}
                        >Next</button>
                    </div>
                </div>
            </div>

            {/* Global Bottom Bar */}
            <div style={{
                marginBottom: '1.5rem',
                paddingTop: '1.5rem',
                paddingLeft: '2rem',
                borderTop: '1.5px solid #f1f5f9',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: '#94a3b8'
            }}>
                <span>Database last updated: 5 minutes ago</span>

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
