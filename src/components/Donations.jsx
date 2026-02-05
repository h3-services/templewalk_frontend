import React, { useState } from 'react';
import {
    Wallet, Search, ArrowUpRight, ArrowDownRight,
    Calendar, Download, Filter, MoreHorizontal,
    CreditCard, Banknote, Landmark, Gift, TrendingUp
} from 'lucide-react';

export function Donations() {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('All Transactions');

    const transactions = [
        { id: 1, donor: "Rajesh Kumar", amount: "₹5,001", method: "UPI", date: "Today, 10:24 AM", category: "Padhayatra Support", status: "Success", color: "#6366f1" },
        { id: 2, donor: "Meena Swaminathan", amount: "₹1,000", method: "Card", date: "Today, 09:15 AM", category: "General Fund", status: "Success", color: "#ec4899" },
        { id: 3, donor: "Anonymous", amount: "₹10,000", method: "Bank Transfer", date: "Yesterday", category: "Annathanam", status: "Pending", color: "#f59e0b" },
        { id: 4, donor: "Venkatesh R.", amount: "₹2,500", method: "UPI", date: "Yesterday", category: "Medical Camp", status: "Success", color: "#10b981" },
        { id: 5, donor: "Lakshmi Narayanan", amount: "₹500", method: "UPI", date: "02 Feb 2024", category: "General Fund", status: "Success", color: "#6366f1" },
    ];

    const stats = [
        { label: "TOTAL RECEIVED", value: "₹4.2L", change: "+14%", icon: <Wallet size={20} />, color: "#6366f1" },
        { label: "THIS MONTH", value: "₹82.5k", change: "+8%", icon: <TrendingUp size={20} />, color: "#10b981" },
        { label: "AVG DONATION", value: "₹1,240", change: "-2%", icon: <Gift size={20} />, color: "#f59e0b" },
    ];

    return (
        <div className="donations-page" style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, gap: '1.25rem' }}>

            {/* Header Section */}
            <div className="page-title-section">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
                    <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', fontFamily: 'Lora, serif' }}>
                        Donations & Contributions
                    </h1>
                    <span style={{
                        background: '#ecfdf5',
                        color: '#10b981',
                        fontSize: '0.6rem',
                        fontWeight: 800,
                        padding: '0.15rem 0.6rem',
                        borderRadius: '6px',
                        letterSpacing: '0.05em'
                    }}>TAX EXEMPT READY</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>
                    Monitor all incoming contributions, manage donor receipts and track fund allocation for the temple walk.
                </p>
            </div>

            {/* Stats Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
                {stats.map((stat, i) => (
                    <div key={i} style={{
                        background: 'white',
                        padding: '1.5rem',
                        borderRadius: '24px',
                        border: '1.5px solid #f1f5f9',
                        boxShadow: 'var(--card-shadow)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1.25rem'
                    }}>
                        <div style={{
                            width: '52px',
                            height: '52px',
                            borderRadius: '16px',
                            background: stat.color + '15',
                            color: stat.color,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            {stat.icon}
                        </div>
                        <div>
                            <p style={{ fontSize: '0.7rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>{stat.label}</p>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1e293b' }}>{stat.value}</h3>
                        </div>
                        <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: stat.change.startsWith('+') ? '#10b981' : '#ef4444' }}>{stat.change}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Content Area */}
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, gap: '1.5rem' }}>

                {/* Tabs & Search */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '2rem' }}>
                    <div style={{ display: 'flex', gap: '2rem', borderBottom: '1.5px solid #f1f5f9', alignSelf: 'stretch' }}>
                        {['All Transactions', 'General Fund', 'Annathanam', 'Medical'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                style={{
                                    padding: '0.75rem 0',
                                    fontSize: '0.85rem',
                                    fontWeight: 700,
                                    color: activeTab === tab ? '#1e293b' : '#94a3b8',
                                    background: 'none',
                                    border: 'none',
                                    borderBottom: activeTab === tab ? '2.5px solid #1e293b' : '2.5px solid transparent',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    marginBottom: '-1.5px'
                                }}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <div style={{ position: 'relative' }}>
                            <Search size={18} style={{
                                position: 'absolute',
                                left: '1rem',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: '#94a3b8'
                            }} />
                            <input
                                type="text"
                                placeholder="Search by donor name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{
                                    padding: '0.65rem 1rem 0.65rem 2.75rem',
                                    borderRadius: '12px',
                                    border: '1.5px solid #f1f5f9',
                                    background: 'white',
                                    fontSize: '0.85rem',
                                    color: '#1e293b',
                                    outline: 'none',
                                    fontWeight: 600,
                                    width: '260px'
                                }}
                            />
                        </div>
                        <button style={{
                            padding: '0 1.25rem',
                            borderRadius: '12px',
                            border: '1.5px solid #f1f5f9',
                            background: 'white',
                            color: '#475569',
                            fontWeight: 800,
                            fontSize: '0.8rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            cursor: 'pointer'
                        }}>
                            <Filter size={14} /> Export CSV
                        </button>
                    </div>
                </div>

                {/* Transaction List */}
                <div style={{
                    flex: 1,
                    overflowY: 'auto',
                    background: 'white',
                    borderRadius: '24px',
                    border: '1.5px solid #f1f5f9',
                    boxShadow: 'var(--card-shadow)'
                }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: '#fcfcfc', borderBottom: '1.5px solid #f1f5f9' }}>
                                <th style={{ padding: '1rem 1.5rem', textAlign: 'left', fontSize: '0.65rem', fontWeight: 800, color: '#94a3b8', letterSpacing: '0.05em' }}>DONOR</th>
                                <th style={{ padding: '1rem 1.5rem', textAlign: 'left', fontSize: '0.65rem', fontWeight: 800, color: '#94a3b8', letterSpacing: '0.05em' }}>AMOUNT & DATE</th>
                                <th style={{ padding: '1rem 1.5rem', textAlign: 'left', fontSize: '0.65rem', fontWeight: 800, color: '#94a3b8', letterSpacing: '0.05em' }}>METHOD</th>
                                <th style={{ padding: '1rem 1.5rem', textAlign: 'left', fontSize: '0.65rem', fontWeight: 800, color: '#94a3b8', letterSpacing: '0.05em' }}>CATEGORY</th>
                                <th style={{ padding: '1rem 1.5rem', textAlign: 'left', fontSize: '0.65rem', fontWeight: 800, color: '#94a3b8', letterSpacing: '0.05em' }}>STATUS</th>
                                <th style={{ padding: '1rem 1.5rem', textAlign: 'right', fontSize: '0.65rem', fontWeight: 800, color: '#94a3b8', letterSpacing: '0.05em' }}>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((tx, idx) => (
                                <tr key={tx.id} style={{
                                    borderBottom: idx === transactions.length - 1 ? 'none' : '1.5px solid #f8fafc',
                                    transition: 'all 0.2s'
                                }} className="tx-row">
                                    <td style={{ padding: '1.25rem 1.5rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <div style={{
                                                width: '36px',
                                                height: '36px',
                                                borderRadius: '10px',
                                                background: tx.color + '15',
                                                color: tx.color,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontWeight: 800,
                                                fontSize: '0.8rem'
                                            }}>{tx.donor.charAt(0)}</div>
                                            <span style={{ fontWeight: 800, color: '#1e293b', fontSize: '0.9rem' }}>{tx.donor}</span>
                                        </div>
                                    </td>
                                    <td style={{ padding: '1.25rem 1.5rem' }}>
                                        <div style={{ fontWeight: 800, color: '#1e293b', fontSize: '0.95rem' }}>{tx.amount}</div>
                                        <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>{tx.date}</div>
                                    </td>
                                    <td style={{ padding: '1.25rem 1.5rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#475569', fontSize: '0.8rem', fontWeight: 700 }}>
                                            {tx.method === 'UPI' ? <Smartphone size={14} /> : tx.method === 'Card' ? <CreditCard size={14} /> : <Landmark size={14} />}
                                            {tx.method}
                                        </div>
                                    </td>
                                    <td style={{ padding: '1.25rem 1.5rem' }}>
                                        <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 700 }}>{tx.category}</span>
                                    </td>
                                    <td style={{ padding: '1.25rem 1.5rem' }}>
                                        <span style={{
                                            padding: '0.3rem 0.6rem',
                                            borderRadius: '6px',
                                            fontSize: '0.65rem',
                                            fontWeight: 800,
                                            background: tx.status === 'Success' ? '#f0fdf4' : '#fffbeb',
                                            color: tx.status === 'Success' ? '#16a34a' : '#f59e0b',
                                            textTransform: 'uppercase'
                                        }}>{tx.status}</span>
                                    </td>
                                    <td style={{ padding: '1.25rem 1.5rem', textAlign: 'right' }}>
                                        <button style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer' }}>
                                            <MoreHorizontal size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .tx-row:hover { background-color: #f8fafc; }
                `
            }} />
        </div>
    );
}
