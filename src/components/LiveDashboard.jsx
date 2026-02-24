import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from '../simple-router';
import { apiFetch } from '../api';

import {
    MapPin, Users, AlertTriangle, UserCheck, Bell,
    Calendar, Clock, Plus, Minus, Maximize2, Search,
    Activity, TrendingUp, AlertCircle, CheckCircle2, Grid,
    Edit2, PersonStanding
} from 'lucide-react';
import velIcon from '../assets/Vel.svg';

export function LiveDashboard() {
    const navigate = useNavigate();
    const mapContainerRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const routeLayerRef = useRef(null);
    const [timeRemaining, setTimeRemaining] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

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

    // Page Title
    useEffect(() => {
        document.title = 'Live Dashboard | Temple Walk Admin';
    }, []);

    const [counts, setCounts] = useState({ walking: 0, sos: 0, volunteers: 0 });
    const [sosList, setSosList] = useState([]);
    const [loading, setLoading] = useState(true);

    // Initialize Leaflet Map
    useEffect(() => {
        if (!mapContainerRef.current || mapInstanceRef.current) return;

        // Default to Pollachi/Palani area coords (~10.6, 77.2)
        const map = L.map(mapContainerRef.current, {
            center: [10.6620, 77.0065],
            zoom: 12,
            minZoom: 10, // Lock zoom-out
            zoomControl: false,
            attributionControl: false
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
        }).addTo(map);

        // Optional: Hard-lock bounds to Pollachi/Palani area to prevent wandering off
        const southWest = L.latLng(10.2, 76.5);
        const northEast = L.latLng(11.1, 77.5);
        const bounds = L.latLngBounds(southWest, northEast);
        map.setMaxBounds(bounds);
        map.on('drag', function () {
            map.panInsideBounds(bounds, { animate: false });
        });

        // Add Zoom control at top right
        L.control.zoom({ position: 'topright' }).addTo(map);

        mapInstanceRef.current = map;

        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, []);

    // Fetch and Draw Route Stops (Using OSRM for Real Roads)
    useEffect(() => {
        const fetchRouteStops = async () => {
            if (!mapInstanceRef.current) return;
            try {
                const res = await apiFetch('/api/events/stops/?skip=0&limit=100');
                if (res.ok) {
                    const stops = await res.json();

                    if (routeLayerRef.current) {
                        mapInstanceRef.current.removeLayer(routeLayerRef.current);
                    }

                    const layerGroup = L.layerGroup();
                    const markerCoords = [];

                    stops.forEach(stop => {
                        const lat = parseFloat(stop.lat);
                        const lng = parseFloat(stop.lng);

                        if (!isNaN(lat) && !isNaN(lng) && lat !== 0 && lng !== 0) {
                            markerCoords.push({ lat, lng });

                            L.marker([lat, lng], {
                                icon: L.divIcon({
                                    className: 'custom-stop-marker',
                                    html: `<div style="background: white; border: 2.5px solid #3b82f6; border-radius: 50%; width: 14px; height: 14px; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);"></div>`,
                                    iconSize: [14, 14],
                                    iconAnchor: [7, 7]
                                })
                            }).bindPopup(`<strong>${stop.name || 'Stop'}</strong><br/>${stop.stop_type || ''}`)
                                .addTo(layerGroup);
                        }
                    });

                    if (markerCoords.length > 1) {
                        // Use OSRM API to get road-mapped geometry
                        // Format: lng,lat;lng,lat...
                        const osrmCoords = markerCoords.map(c => `${c.lng},${c.lat}`).join(';');
                        const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${osrmCoords}?overview=full&geometries=geojson`;

                        try {
                            const osrmRes = await fetch(osrmUrl);
                            const osrmData = await osrmRes.json();

                            if (osrmData.code === 'Ok' && osrmData.routes.length > 0) {
                                // Draw the real road path
                                const routeCoords = osrmData.routes[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);

                                L.polyline(routeCoords, {
                                    color: '#2563eb', // Navigation Blue
                                    weight: 6,
                                    opacity: 0.9,
                                    lineJoin: 'round'
                                }).addTo(layerGroup);

                                layerGroup.addTo(mapInstanceRef.current);
                                routeLayerRef.current = layerGroup;

                                // Fit bound to the ROAD route
                                const bounds = L.latLngBounds(routeCoords);
                                mapInstanceRef.current.fitBounds(bounds, { padding: [40, 40] });

                                // After fitting, lock zoom out so they don't wander off
                                const currentZoom = mapInstanceRef.current.getZoom();
                                mapInstanceRef.current.setMinZoom(Math.max(10, currentZoom - 1));
                                // Set max bounds to the route area specifically
                                mapInstanceRef.current.setMaxBounds(bounds.pad(0.3));
                            } else {
                                throw new Error('OSRM routing failed');
                            }
                        } catch (routingErr) {
                            console.warn("Routing failed, falling back to straight lines", routingErr);
                            // Fallback to straight lines if OSRM fails
                            const fallbackLatLngs = markerCoords.map(c => [c.lat, c.lng]);
                            L.polyline(fallbackLatLngs, { color: '#2563eb', weight: 4 }).addTo(layerGroup);
                            layerGroup.addTo(mapInstanceRef.current);
                            routeLayerRef.current = layerGroup;
                        }
                    } else if (markerCoords.length === 1) {
                        // Just one point, show it
                        layerGroup.addTo(mapInstanceRef.current);
                        routeLayerRef.current = layerGroup;
                        mapInstanceRef.current.setView([markerCoords[0].lat, markerCoords[0].lng], 14);
                    }
                }
            } catch (err) {
                console.error("Failed to fetch route stops", err);
            }
        };

        // Standard refs don't trigger re-renders, so we'll poll briefly 
        // until initialized, then start the regular 30s interval.
        const initialCheck = setInterval(() => {
            if (mapInstanceRef.current) {
                fetchRouteStops();
                clearInterval(initialCheck);
            }
        }, 100);

        const stopInterval = setInterval(fetchRouteStops, 30000);
        return () => {
            clearInterval(initialCheck);
            clearInterval(stopInterval);
        };
    }, []);
    // Fetch real stats data
    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [usersRes, volunteersRes, sosRes] = await Promise.all([
                    apiFetch('/api/users/?skip=0&limit=2000'),
                    apiFetch('/api/volunteers/?skip=0&limit=2000'),
                    apiFetch('/api/sos/list')
                ]);

                let walkingCount = 0;
                let activeVolunteers = 0;
                let pendingSos = 0;
                let formattedSos = [];

                if (usersRes.ok) {
                    const users = await usersRes.json();
                    walkingCount = users.filter(u => u.role === 'devotee').length;
                } else {
                    walkingCount = 0;
                }

                if (volunteersRes.ok) {
                    const volunteers = await volunteersRes.json();
                    activeVolunteers = volunteers.length;
                } else {
                    activeVolunteers = 0;
                }

                if (sosRes.ok) {
                    const sos = await sosRes.json();
                    // Filter out "Guest User" and specific test IDs
                    const realSos = sos.filter(s =>
                        s.name !== "Guest User" &&
                        s.name !== "vv" &&
                        !String(s.id).startsWith('g_') &&
                        s.id !== 666636
                    );

                    pendingSos = realSos.filter(s => !s.isCompleted).length;
                    formattedSos = realSos.map(req => ({
                        id: req.id,
                        name: req.name || "Unknown User",
                        helpType: req.typeLabel || req.type || "SOS Alert",
                        location: req.distance ? `${req.distance} away` : "Nearby",
                        time: req.time || "Just now",
                        attendedBy: req.isAccepted ? "Accepted" : null,
                        status: req.status || (req.isCompleted ? "Closed" : req.isAccepted ? "Accepted" : "Pending"),
                        color: req.isAccepted ? "#3b82f6" : "#ef4444"
                    })).slice(0, 5);
                } else {
                    pendingSos = 0;
                    formattedSos = [];
                }

                setCounts({
                    walking: walkingCount,
                    sos: pendingSos,
                    volunteers: activeVolunteers
                });
                setSosList(formattedSos);
            } catch (error) {
                console.error("Dashboard error, using mock data", error);
                setCounts({ walking: 0, sos: 0, volunteers: 0 });
                setSosList([]);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
        const interval = setInterval(fetchDashboardData, 15000); // Refresh every 15s
        return () => clearInterval(interval);
    }, []);

    const stats = [
        {
            label: "Total Devotees",
            value: counts.walking,
            icon: <PersonStanding size={24} />,
            color: "#10b981",
            bg: "#f0fdf4"
        },
        {
            label: "SOS Alerts",
            value: counts.sos,
            icon: <Bell size={24} />,
            color: "#ef4444",
            bg: "#fef2f2"
        },
        {
            label: "Volunteers On Duty",
            value: counts.volunteers,
            icon: <UserCheck size={24} />,
            color: "#3b82f6",
            bg: "#eff6ff"
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
            {/* Page Title Header */}
            <div className="dashboard-header" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '0.5rem',
                gap: '1rem',
                flexShrink: 0
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                        width: '48px',
                        height: '48px',
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        borderRadius: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 12px rgba(16, 185, 129, 0.25)'
                    }}>
                        <Activity size={24} color="white" />
                    </div>
                    <div>
                        <h1 style={{
                            fontSize: '1.5rem',
                            fontWeight: 800,
                            color: '#0f172a',
                            marginBottom: '0.25rem'
                        }}>Panguni Uthiram Walk Dashboard</h1>
                        <p style={{
                            fontSize: '0.85rem',
                            color: '#64748b',
                            fontWeight: 500
                        }}>Real-time monitoring and event management</p>
                    </div>
                </div>

                <button
                    className="primary-action-btn"
                    onClick={() => navigate('/events')}
                >
                    <Edit2 size={18} /> <span className="btn-text">Manage this Walk</span>
                </button>
            </div>


            {/* Stats Cards Row */}
            <div className="stats-grid" style={{
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
            <div className="main-dashboard-grid" style={{
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
                            }}>Total Devotees</button>
                    </div>

                    {/* Map Area */}
                    <div
                        ref={mapContainerRef}
                        style={{
                            flex: 1,
                            background: '#f8fafc',
                            position: 'relative',
                            zIndex: 1
                        }}
                    >
                        {/* Map Overlay info */}
                        <div style={{
                            position: 'absolute',
                            bottom: '1rem',
                            left: '1rem',
                            zIndex: 1000,
                            background: 'rgba(255,255,255,0.9)',
                            padding: '0.4rem 0.8rem',
                            borderRadius: '8px',
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                            pointerEvents: 'none',
                            color: '#0f172a',
                            border: '1px solid #e2e8f0'
                        }}>
                            Interactive Live Tracking Map
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

                        <div className="custom-scrollbar" style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.75rem',
                            flex: 1,
                            overflowY: 'auto',
                            marginBottom: '1rem',
                            paddingRight: '4px',
                            scrollbarWidth: 'thin',
                            scrollbarColor: '#e5e7eb transparent'
                        }}>
                            {sosList.length > 0 ? sosList.map(request => (
                                <div key={request.id} style={{
                                    padding: '0.6rem 0.75rem',
                                    background: '#f8fafc',
                                    borderRadius: '8px',
                                    border: '1.25px solid #f1f5f9',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '0.3rem'
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <h4 style={{
                                            fontSize: '0.8rem',
                                            fontWeight: 800,
                                            color: '#0f172a',
                                            margin: 0
                                        }}>{request.name}</h4>
                                        <span style={{
                                            fontSize: '0.65rem',
                                            color: '#94a3b8',
                                            fontWeight: 600
                                        }}>{request.time}</span>
                                    </div>

                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.4rem'
                                    }}>
                                        <span style={{
                                            fontSize: '0.65rem',
                                            fontWeight: 800,
                                            color: request.color,
                                            background: `${request.color}12`,
                                            padding: '0.15rem 0.4rem',
                                            borderRadius: '4px',
                                            border: `1px solid ${request.color}20`
                                        }}>{request.helpType}</span>
                                        <p style={{
                                            fontSize: '0.65rem',
                                            color: '#64748b',
                                            fontWeight: 600,
                                            margin: 0,
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.2rem'
                                        }}>
                                            <MapPin size={10} /> {request.location}
                                        </p>
                                    </div>

                                    {request.attendedBy ? (
                                        <div style={{
                                            fontSize: '0.65rem',
                                            color: '#059669',
                                            fontWeight: 700,
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.25rem',
                                            paddingTop: '0.2rem',
                                            borderTop: '1px dashed #e2e8f0'
                                        }}>
                                            <CheckCircle2 size={11} /> {request.attendedBy}
                                        </div>
                                    ) : (
                                        <div style={{
                                            fontSize: '0.65rem',
                                            color: '#f59e0b',
                                            fontWeight: 700,
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.25rem',
                                            paddingTop: '0.2rem',
                                            borderTop: '1px dashed #e2e8f0'
                                        }}>
                                            <Clock size={11} /> Requested
                                        </div>
                                    )}
                                </div>
                            )) : (
                                <div style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8', fontSize: '0.8rem' }}>
                                    No active SOS requests
                                </div>
                            )}
                        </div>

                        <button
                            onClick={() => navigate('/sos-requests')}
                            style={{
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

            <style dangerouslySetInnerHTML={{
                __html: `
                .custom-scrollbar::-webkit-scrollbar {
                    width: 5px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #e2e8f0;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #cbd5e1;
                }

                @media (max-width: 1024px) {
                    .stats-grid {
                        grid-template-columns: repeat(3, 1fr) !important;
                    }
                    .main-dashboard-grid {
                        grid-template-columns: 1fr 320px !important;
                    }
                }

                @media (max-width: 768px) {
                    .dashboard-header {
                        flex-direction: column !important;
                        align-items: flex-start !important;
                        gap: 0.75rem !important;
                        margin-bottom: 1rem !important;
                    }

                    .dashboard-header h1 {
                        font-size: 1.2rem !important;
                    }

                    .dashboard-header p {
                        font-size: 0.75rem !important;
                    }
                    
                    .dashboard-header .primary-action-btn {
                        width: 100% !important;
                        font-size: 0.85rem !important;
                        padding: 0.65rem 1rem !important;
                        margin-top: 0 !important;
                    }

                    /* Stats: 2 columns on mobile for better fit */
                    .stats-grid {
                        grid-template-columns: repeat(2, 1fr) !important;
                        gap: 0.75rem !important;
                    }

                    .stats-grid > div {
                        padding: 1rem 0.75rem !important;
                        flex-direction: column !important;
                        align-items: center !important;
                        text-align: center !important;
                        gap: 0.5rem !important;
                    }

                    .stats-grid > div > div:first-child {
                        width: 36px !important;
                        height: 36px !important;
                    }

                    .stats-grid p {
                        font-size: 0.6rem !important;
                        margin-bottom: 0.1rem !important;
                    }

                    .stats-grid h3 {
                        font-size: 1.25rem !important;
                    }

                    /* Main grid stacks vertically */
                    .main-dashboard-grid {
                        display: flex !important;
                        flex-direction: column !important;
                        overflow-y: visible !important;
                        height: auto !important;
                        min-height: 0 !important;
                        gap: 1rem !important;
                    }
                    
                    /* Map container compact height */
                    .main-dashboard-grid > div:first-child {
                        height: 260px !important;
                        flex: none !important;
                    }

                    /* SOS list auto height */
                    .main-dashboard-grid > div:last-child {
                        height: auto !important;
                        flex: none !important;
                        padding: 1rem !important;
                    }
                    
                    .live-dashboard {
                        height: auto !important;
                        overflow: visible !important;
                    }
                }
                `
            }} />
        </div>
    );
}
