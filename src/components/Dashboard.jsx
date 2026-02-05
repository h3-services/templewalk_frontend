import React from 'react';
import {
    Users,
    Calendar,
    UserSquare2,
    Wallet,
    TrendingUp,
    Bell,
    ArrowUpRight,
    ArrowDownRight,
    Clock,
    RefreshCw,
    Plus,
    Circle,
    CheckCircle2,
    Activity,
    MapPin,
    AlertCircle,
    ChevronRight,
    HeartHandshake
} from 'lucide-react';
import { Link } from '../simple-router';

export function Dashboard() {
    const stats = [
        {
            label: "TOTAL DEVOTEES",
            value: "12,482",
            change: "+12.5%",
            isPositive: true,
            icon: <Users size={22} />,
            color: "#6366f1",
            bg: "linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)"
        },
        {
            label: "ACTIVE EVENTS",
            value: "24",
            change: "+3 new",
            isPositive: true,
            icon: <Calendar size={22} />,
            color: "#f59e0b",
            bg: "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)"
        },
        {
            label: "VOLUNTEERS",
            value: "148",
            change: "8 pending",
            isPositive: false,
            icon: <HeartHandshake size={22} />,
            color: "#10b981",
            bg: "linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)"
        },
        {
            label: "COLLECTION",
            value: "₹42.8k",
            change: "+24%",
            isPositive: true,
            icon: <Wallet size={22} />,
            color: "#ec4899",
            bg: "linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)"
        },
    ];

    const activities = [
        { id: 1, title: "Registration Milestone", desc: "Batch #4 reaches 1,000 devotees", time: "5m ago", type: "milestone", color: "#6366f1" },
        { id: 2, title: "Emergency Broadcast", desc: "Weather alert sent to participants", time: "12m ago", type: "alert", color: "#e11d48" },
        { id: 3, title: "New Event Site", desc: "Added 'Madurai Meenakshi South' stop", time: "1h ago", type: "event", color: "#f59e0b" },
        { id: 4, title: "Donation Spike", desc: "Received ₹5,001 from anonymous donor", time: "3h ago", type: "finance", color: "#10b981" },
    ];

    const chartData = [40, 65, 45, 90, 55, 75, 60];

    return (
        <div className="dashboard-page" style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, gap: '1.25rem' }}>

            {/* Upper Banner Section */}
            <div style={{
                background: 'white',
                padding: '1.75rem 2.25rem',
                borderRadius: '28px',
                color: '#1e293b',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: 'var(--card-shadow)',
                border: '1.5px solid #f1f5f9',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                        <span style={{ background: '#f97316', padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.65rem', fontWeight: 800 }}>LIVE NOW</span>
                        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, fontFamily: 'Lora, serif' }}>Temple Walk Console</h1>
                    </div>
                    <p style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 600 }}>
                        Monitoring <span style={{ color: '#1e293b' }}>4,208</span> devotees across <span style={{ color: '#1e293b' }}>12</span> active routes.
                    </p>
                </div>

                <div style={{ display: 'flex', gap: '1rem', position: 'relative', zIndex: 1 }}>
                    <div style={{ background: '#f8fafc', padding: '0.75rem 1.25rem', borderRadius: '18px', border: '1.5px solid #f1f5f9' }}>
                        <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '0.2rem' }}>SYSTEM STATUS</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem', fontWeight: 800, color: '#10b981' }}>
                            <Circle size={8} fill="#10b981" /> Healthy
                        </div>
                    </div>
                    <Link to="/events" style={{
                        background: '#f97316',
                        color: 'white',
                        padding: '0.75rem 1.75rem',
                        borderRadius: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                        textDecoration: 'none',
                        fontWeight: 800,
                        fontSize: '0.9rem',
                        boxShadow: '0 8px 16px -4px rgba(249, 115, 22, 0.4)'
                    }}>
                        <Plus size={18} strokeWidth={3} /> Manage Events
                    </Link>
                </div>

                {/* Decorative SVG */}
                <svg style={{ position: 'absolute', right: '-50px', top: '-50px', opacity: 0.05 }} width="300" height="300" viewBox="0 0 200 200">
                    <circle cx="100" cy="100" r="100" fill="white" />
                </svg>
            </div>

            {/* Metrics Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem' }}>
                {stats.map((stat, idx) => (
                    <div key={idx} style={{
                        background: 'white',
                        padding: '1.5rem',
                        borderRadius: '24px',
                        border: '1.5px solid #f1f5f9',
                        boxShadow: '0 10px 15px -3px rgba(0,0,0,0.02)',
                        transition: 'transform 0.2s',
                        cursor: 'pointer'
                    }} className="metric-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '16px',
                                background: stat.bg,
                                color: stat.color,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                {stat.icon}
                            </div>
                            <span style={{
                                fontSize: '0.7rem',
                                fontWeight: 800,
                                padding: '0.2rem 0.5rem',
                                borderRadius: '6px',
                                background: stat.isPositive ? '#f0fdf4' : '#fef2f2',
                                color: stat.isPositive ? '#16a34a' : '#ef4444',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.2rem'
                            }}>
                                {stat.isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                                {stat.change}
                            </span>
                        </div>
                        <p style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>{stat.label}</p>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1e293b' }}>{stat.value}</h3>
                    </div>
                ))}
            </div>

            {/* Bottom Section: Trends & Activity */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '1.5rem', flex: 1, minHeight: 0 }}>

                {/* Trends Visualizer */}
                <div style={{
                    background: 'white',
                    padding: '1.75rem 2.25rem',
                    borderRadius: '28px',
                    border: '1.5px solid #f1f5f9',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                        <div>
                            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1e293b' }}>Traffic & Engagement</h2>
                            <p style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 600 }}>Daily active participants over the last 7 days</p>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            {['D', 'W', 'M'].map(p => (
                                <button key={p} style={{
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '8px',
                                    border: 'none',
                                    background: p === 'W' ? '#f1f5f9' : 'transparent',
                                    color: p === 'W' ? '#1e293b' : '#94a3b8',
                                    fontWeight: 800,
                                    fontSize: '0.75rem',
                                    cursor: 'pointer'
                                }}>{p}</button>
                            ))}
                        </div>
                    </div>

                    <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 1rem', position: 'relative' }}>
                        {/* Bars mimicking a chart */}
                        {chartData.map((val, idx) => (
                            <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', width: '40px' }}>
                                <div style={{
                                    width: '12px',
                                    height: `${val * 2}px`,
                                    background: idx === chartData.length - 1 ? '#f97316' : '#e2e8f0',
                                    borderRadius: '6px',
                                    transition: 'all 0.5s ease',
                                    position: 'relative'
                                }}>
                                    {idx === chartData.length - 1 && (
                                        <div style={{
                                            position: 'absolute',
                                            top: '-35px',
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                            background: '#1e293b',
                                            color: 'white',
                                            padding: '0.25rem 0.5rem',
                                            borderRadius: '6px',
                                            fontSize: '0.7rem',
                                            fontWeight: 800
                                        }}>750</div>
                                    )}
                                </div>
                                <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#94a3b8' }}>
                                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'][idx]}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Real-time Activity */}
                <div style={{
                    background: 'white',
                    padding: '1.75rem',
                    borderRadius: '28px',
                    border: '1.5px solid #f1f5f9',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1e293b', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Activity size={18} color="#f97316" /> Live Feed
                        </h2>
                        <button style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}>View All</button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        {activities.map(act => (
                            <div key={act.id} style={{ display: 'flex', gap: '1rem', position: 'relative' }}>
                                <div style={{
                                    width: '10px',
                                    height: '10px',
                                    borderRadius: '50%',
                                    background: act.color,
                                    marginTop: '5px',
                                    boxShadow: `0 0 10px ${act.color}40`
                                }} />
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                                        <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#1e293b' }}>{act.title}</h4>
                                        <span style={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: 600 }}>{act.time}</span>
                                    </div>
                                    <p style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, lineHeight: 1.4 }}>{act.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Quick Shortcuts */}
                    <div style={{ marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1.5px solid #f8fafc', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                        <button style={{
                            padding: '0.75rem',
                            borderRadius: '16px',
                            border: '1.5px solid #f1f5f9',
                            background: '#fcfcfc',
                            fontSize: '0.75rem',
                            fontWeight: 800,
                            color: '#475569',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.4rem',
                            cursor: 'pointer'
                        }}> <MapPin size={14} /> Routes </button>
                        <button style={{
                            padding: '0.75rem',
                            borderRadius: '16px',
                            border: '1.5px solid #f1f5f9',
                            background: '#fcfcfc',
                            fontSize: '0.75rem',
                            fontWeight: 800,
                            color: '#475569',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.4rem',
                            cursor: 'pointer'
                        }}> <Bell size={14} /> Alerts </button>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .metric-card:hover { transform: translateY(-5px); border-color: #cbd5e1 !important; }
                `
            }} />
        </div>
    );
}
