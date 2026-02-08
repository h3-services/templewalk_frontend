import React, { useState, useEffect } from 'react';
import {
    MapPin, Users, AlertTriangle, UserCheck, Bell,
    Calendar, Clock, Plus, Minus, Maximize2, Search,
    Activity, TrendingUp, AlertCircle, CheckCircle2, Grid,
    Edit2, PersonStanding
} from 'lucide-react';

export function LiveDashboard() {
    const [timeRemaining, setTimeRemaining] = useState({ days: 5, hours: 2, minutes: 13, seconds: 36 });
    const [activeFilter, setActiveFilter] = useState('all');

    // Countdown timer
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeRemaining(prev => {
                let { days, hours, minutes, seconds } = prev;
                if (seconds > 0) {
                    seconds--;
                } else if (minutes > 0) {
                    minutes--;
                    seconds = 59;
                } else if (hours > 0) {
                    hours--;
                    minutes = 59;
                    seconds = 59;
                } else if (days > 0) {
                    days--;
                    hours = 23;
                    minutes = 59;
                    seconds = 59;
                }
                return { days, hours, minutes, seconds };
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const stats = [
        {
            label: "Walking Now",
            value: "981",
            icon: <PersonStanding size={24} />,
            color: "#10b981",
            bg: "#f0fdf4"
        },
        {
            label: "SOS Alerts",
            value: "3",
            icon: <Bell size={24} />,
            color: "#ef4444",
            bg: "#fef2f2"
        },
        {
            label: "Volunteers On Duty",
            value: "62",
            icon: <UserCheck size={24} />,
            color: "#3b82f6",
            bg: "#eff6ff"
        }
    ];

    const sosRequests = [
        {
            id: 1,
            name: "Meera V. (Child)",
            helpType: "Lost Person",
            location: "460m away • Main Entrance",
            time: "5 mins ago",
            attendedBy: "Volunteer Vikram",
            color: "#f59e0b"
        },
        {
            id: 2,
            name: "Suresh G.",
            helpType: "Water Shortage",
            location: "1.2km away • Rest Area B",
            time: "12 mins ago",
            attendedBy: null,
            color: "#3b82f6"
        },
        {
            id: 3,
            name: "Priya K.",
            helpType: "Medical Emergency",
            location: "800m away • Rest Stop 2",
            time: "18 mins ago",
            attendedBy: "Volunteer Ravi",
            color: "#ef4444"
        }
    ];

    const formatTime = (num) => String(num).padStart(2, '0');

    return (
        <div className="live-dashboard" style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            overflow: 'hidden',
            gap: '1rem'
        }}>
            {/* Header Section */}
            <div style={{
                background: 'white',
                padding: '0.50rem 2rem',
                borderRadius: '20px',
                marginBottom: '0rem',
                border: '1.5px solid #f1f5f9',
                boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '2rem'
                }}>
                    {/* Title */}
                    <div>
                        <p style={{
                            fontSize: '0.65rem',
                            fontWeight: 600,
                            color: '#94a3b8',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            marginBottom: '0.4rem'
                        }}>Current Walk</p>
                        <h1 style={{
                            fontSize: '1.5rem',
                            fontWeight: 700,
                            color: '#0f172a',
                            lineHeight: 1.2,
                            whiteSpace: 'nowrap'
                        }}>Panguni Uththiram Walk</h1>
                    </div>

                    {/* Countdown Timer */}
                    <div style={{
                        display: 'flex',
                        gap: '1rem',
                        alignItems: 'center'
                    }}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            background: '#fff7ed',
                            padding: '0.75rem',
                            borderRadius: '16px',
                            minWidth: '70px'
                        }}>
                            <span style={{
                                fontSize: '2rem',
                                fontWeight: 700,
                                color: '#f97316',
                                lineHeight: 1,
                                fontFamily: 'monospace'
                            }}>{formatTime(timeRemaining.days)}</span>
                            <span style={{
                                fontSize: '0.65rem',
                                fontWeight: 600,
                                color: '#cbd5e1',
                                textTransform: 'uppercase',
                                marginTop: '0.4rem',
                                letterSpacing: '0.05em'
                            }}>DAYS</span>
                        </div>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            background: '#fff7ed',
                            padding: '1rem 1.25rem',
                            borderRadius: '16px',
                            minWidth: '70px'
                        }}>
                            <span style={{
                                fontSize: '2rem',
                                fontWeight: 700,
                                color: '#f97316',
                                lineHeight: 1,
                                fontFamily: 'monospace'
                            }}>{formatTime(timeRemaining.hours)}</span>
                            <span style={{
                                fontSize: '0.65rem',
                                fontWeight: 600,
                                color: '#cbd5e1',
                                textTransform: 'uppercase',
                                marginTop: '0.4rem',
                                letterSpacing: '0.05em'
                            }}>HOURS</span>
                        </div>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            background: '#fff7ed',
                            padding: '1rem 1.25rem',
                            borderRadius: '16px',
                            minWidth: '70px'
                        }}>
                            <span style={{
                                fontSize: '2rem',
                                fontWeight: 700,
                                color: '#f97316',
                                lineHeight: 1,
                                fontFamily: 'monospace'
                            }}>{formatTime(timeRemaining.minutes)}</span>
                            <span style={{
                                fontSize: '0.65rem',
                                fontWeight: 600,
                                color: '#cbd5e1',
                                textTransform: 'uppercase',
                                marginTop: '0.4rem',
                                letterSpacing: '0.05em'
                            }}>MINS</span>
                        </div>
                    </div>

                    {/* Manage Button */}
                    <div style={{ marginLeft: 'auto' }}>
                        <button style={{
                            background: '#f97316',
                            color: 'white',
                            padding: '0.85rem 2rem',
                            borderRadius: '12px',
                            border: 'none',
                            fontWeight: 700,
                            fontSize: '0.9rem',
                            cursor: 'pointer',
                            boxShadow: '0 4px 12px rgba(249, 115, 22, 0.3)',
                            transition: 'all 0.2s',
                            whiteSpace: 'nowrap',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}>
                            <Edit2 size={16} /> Manage Walk
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats Cards Row */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1rem'
            }}>
                {stats.map((stat, idx) => (
                    <div key={idx} style={{
                        background: 'white',
                        padding: '0.5rem',
                        borderRadius: '16px',
                        border: '1.5px solid #f1f5f9',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem'
                    }}>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '12px',
                            background: stat.bg,
                            color: stat.color,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                        }}>
                            {stat.icon}
                        </div>
                        <div>
                            <p style={{
                                fontSize: '0.7rem',
                                fontWeight: 700,
                                color: '#94a3b8',
                                marginBottom: '0.25rem'
                            }}>{stat.label}</p>
                            <h3 style={{
                                fontSize: '1.75rem',
                                fontWeight: 700,
                                color: '#0f172a'
                            }}>{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Content: Map + SOS Requests */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 380px',
                gap: '1rem',
                flex: 1,
                minHeight: 0,
                overflow: 'hidden'
            }}>
                {/* Map Section */}
                <div style={{
                    background: 'white',
                    borderRadius: '20px',
                    border: '1.5px solid #f1f5f9',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%'
                }}>
                    {/* Map Filter Tabs */}
                    <div style={{
                        padding: '1rem 1.25rem',
                        borderBottom: '1.5px solid #f1f5f9',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem'
                    }}>
                        <button
                            onClick={() => setActiveFilter('all')}
                            style={{
                                padding: '0.5rem 1rem',
                                borderRadius: '10px',
                                border: 'none',
                                background: activeFilter === 'all' ? '#475569' : '#f1f5f9',
                                color: activeFilter === 'all' ? 'white' : '#64748b',
                                fontSize: '0.8rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                transition: 'all 0.2s'
                            }}>
                            <Grid size={14} />
                            All
                        </button>
                        <button
                            onClick={() => setActiveFilter('sos')}
                            style={{
                                padding: '0.5rem 1rem',
                                borderRadius: '10px',
                                border: 'none',
                                background: activeFilter === 'sos' ? '#ef4444' : '#f1f5f9',
                                color: activeFilter === 'sos' ? 'white' : '#64748b',
                                fontSize: '0.8rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}>SOS</button>
                        <button
                            onClick={() => setActiveFilter('volunteers')}
                            style={{
                                padding: '0.5rem 1rem',
                                borderRadius: '10px',
                                border: 'none',
                                background: activeFilter === 'volunteers' ? '#3b82f6' : '#f1f5f9',
                                color: activeFilter === 'volunteers' ? 'white' : '#64748b',
                                fontSize: '0.8rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}>Volunteers</button>
                        <button
                            onClick={() => setActiveFilter('users')}
                            style={{
                                padding: '0.5rem 1rem',
                                borderRadius: '10px',
                                border: 'none',
                                background: activeFilter === 'users' ? '#10b981' : '#f1f5f9',
                                color: activeFilter === 'users' ? 'white' : '#64748b',
                                fontSize: '0.8rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}>Users Walking</button>
                    </div>

                    {/* Map Area */}
                    <div style={{
                        flex: 1,
                        background: 'linear-gradient(135deg, #e0e7ff 0%, #fef3c7 50%, #fce7f3 100%)',
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        {/* Route Path */}
                        <svg style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            top: 0,
                            left: 0
                        }}>
                            <path
                                d="M 100 400 Q 200 350, 300 300 T 500 200 T 700 150"
                                stroke="#94a3b8"
                                strokeWidth="3"
                                fill="none"
                                strokeDasharray="8,4"
                            />
                        </svg>

                        {/* Start Marker */}
                        <div style={{
                            position: 'absolute',
                            left: '15%',
                            bottom: '25%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}>
                            <div style={{
                                width: '56px',
                                height: '56px',
                                background: 'white',
                                borderRadius: '50%',
                                border: '3px solid #ef4444',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.75rem',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                            }}>▶️</div>
                            <span style={{
                                background: 'white',
                                padding: '0.4rem 0.85rem',
                                borderRadius: '8px',
                                fontSize: '0.7rem',
                                fontWeight: 800,
                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                color: '#0f172a'
                            }}>Start</span>
                        </div>

                        {/* Temple Marker */}
                        <div style={{
                            position: 'absolute',
                            right: '15%',
                            top: '15%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}>
                            <div style={{
                                width: '56px',
                                height: '56px',
                                background: 'white',
                                borderRadius: '50%',
                                border: '3px solid #f59e0b',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.75rem',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                            }}>🛕</div>
                            <span style={{
                                background: 'white',
                                padding: '0.4rem 0.85rem',
                                borderRadius: '8px',
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                color: '#0f172a'
                            }}>Temple</span>
                        </div>

                        {/* SOS Alert Badge */}
                        <div style={{
                            position: 'absolute',
                            right: '22%',
                            top: '20%',
                            width: '36px',
                            height: '36px',
                            background: '#ef4444',
                            borderRadius: '50%',
                            border: '3px solid white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '0.8rem',
                            fontWeight: 800,
                            boxShadow: '0 4px 12px rgba(239, 68, 68, 0.4)'
                        }}>1</div>

                        {/* Volunteer Group Badge */}
                        <div style={{
                            position: 'absolute',
                            left: '35%',
                            top: '35%',
                            background: '#3b82f6',
                            color: 'white',
                            padding: '0.4rem 0.85rem',
                            borderRadius: '12px',
                            fontSize: '0.85rem',
                            fontWeight: 700,
                            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
                        }}>32</div>

                        {/* Pilgrim Dots */}
                        {[...Array(15)].map((_, i) => (
                            <div key={i} style={{
                                position: 'absolute',
                                left: `${20 + i * 4}%`,
                                top: `${60 - i * 2.5}%`,
                                width: '10px',
                                height: '10px',
                                background: i % 3 === 0 ? '#10b981' : '#3b82f6',
                                borderRadius: '50%',
                                border: '2px solid white',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                            }} />
                        ))}

                        {/* Map Controls */}
                        <div style={{
                            position: 'absolute',
                            bottom: '1.5rem',
                            right: '1.5rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.5rem'
                        }}>
                            <button style={{
                                width: '40px',
                                height: '40px',
                                background: 'white',
                                border: '1.5px solid #f1f5f9',
                                borderRadius: '10px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                            }}>
                                <Plus size={18} color="#64748b" />
                            </button>
                            <button style={{
                                width: '40px',
                                height: '40px',
                                background: 'white',
                                border: '1.5px solid #f1f5f9',
                                borderRadius: '10px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                            }}>
                                <Minus size={18} color="#64748b" />
                            </button>
                            <button style={{
                                width: '40px',
                                height: '40px',
                                background: 'white',
                                border: '1.5px solid #f1f5f9',
                                borderRadius: '10px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                            }}>
                                <Search size={18} color="#64748b" />
                            </button>
                            <button style={{
                                width: '40px',
                                height: '40px',
                                background: 'white',
                                border: '1.5px solid #f1f5f9',
                                borderRadius: '10px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                            }}>
                                <Maximize2 size={18} color="#64748b" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Sidebar: SOS Requests */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    overflow: 'hidden'
                }}>
                    {/* SOS Requests Card */}
                    <div style={{
                        background: 'white',
                        borderRadius: '20px',
                        border: '1.5px solid #f1f5f9',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                        padding: '1.5rem',
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        minHeight: 0,
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '1rem'
                        }}>
                            <h3 style={{
                                fontSize: '1rem',
                                fontWeight: 700,
                                color: '#0f172a',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}>
                                <AlertTriangle size={18} color="#ef4444" /> SOS Requests
                            </h3>
                        </div>

                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.75rem',
                            flex: 1,
                            overflowY: 'auto',
                            marginBottom: '1rem'
                        }}>
                            {sosRequests.map(request => (
                                <div key={request.id} style={{
                                    padding: '0.85rem',
                                    background: '#f8fafc',
                                    borderRadius: '10px',
                                    border: '1.5px solid #f1f5f9'
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'flex-start',
                                        marginBottom: '0.4rem'
                                    }}>
                                        <h4 style={{
                                            fontSize: '0.9rem',
                                            fontWeight: 800,
                                            color: '#0f172a'
                                        }}>{request.name}</h4>
                                        <span style={{
                                            fontSize: '0.7rem',
                                            color: '#94a3b8',
                                            fontWeight: 600
                                        }}>{request.time}</span>
                                    </div>

                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.4rem',
                                        marginBottom: '0.4rem'
                                    }}>
                                        <span style={{
                                            fontSize: '0.7rem',
                                            fontWeight: 800,
                                            color: request.color,
                                            background: `${request.color}15`,
                                            padding: '0.2rem 0.5rem',
                                            borderRadius: '6px'
                                        }}>{request.helpType}</span>
                                    </div>

                                    <p style={{
                                        fontSize: '0.7rem',
                                        color: '#64748b',
                                        fontWeight: 500,
                                        marginBottom: '0.5rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.25rem'
                                    }}>
                                        <MapPin size={11} /> {request.location}
                                    </p>

                                    {request.attendedBy ? (
                                        <div style={{
                                            fontSize: '0.7rem',
                                            color: '#059669',
                                            fontWeight: 600,
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.35rem'
                                        }}>
                                            <CheckCircle2 size={12} /> Attended by {request.attendedBy}
                                        </div>
                                    ) : (
                                        <div style={{
                                            fontSize: '0.7rem',
                                            color: '#f59e0b',
                                            fontWeight: 600,
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.35rem'
                                        }}>
                                            <Clock size={12} /> Requested
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <button style={{
                            width: '100%',
                            background: '#f97316',
                            color: 'white',
                            padding: '0.75rem',
                            borderRadius: '10px',
                            border: 'none',
                            fontWeight: 700,
                            fontSize: '0.85rem',
                            cursor: 'pointer',
                            boxShadow: '0 4px 12px rgba(249, 115, 22, 0.3)',
                            transition: 'all 0.2s'
                        }}>
                            See All Requests
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
