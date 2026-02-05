import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    Check,
    MapPin,
    Trash2,
    Locate,
    ChevronLeft,
    ZoomIn,
    ZoomOut,
    Navigation,
    Navigation2,
    Plus,
    MoreVertical,
    Layers,
    Coffee,
    Hotel,
    Stethoscope
} from 'lucide-react';

export function RoutesAndStops() {
    const mapContainerRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const startInputRef = useRef(null);
    const destInputRef = useRef(null);
    const markersRef = useRef([]);
    const polylineRef = useRef(null);

    const [startAddr, setStartAddr] = useState("Madurai Meenakshi Temple");
    const [destAddr, setDestAddr] = useState("Madurai Airport");
    const [startCoords, setStartCoords] = useState({ lat: 9.9195, lng: 78.1193 });
    const [destCoords, setDestCoords] = useState({ lat: 9.8329, lng: 78.0841 });

    const [stops, setStops] = useState([
        { id: 1, name: "Annapoorna Hall", type: "Annathanam", icon: <Coffee size={18} />, color: "#f59e0b", coords: { lat: 9.9252, lng: 78.1198 } },
        { id: 2, name: "Pilgrims Rest Stop", type: "Resting Area", icon: <Hotel size={18} />, color: "#3b82f6", coords: { lat: 9.9152, lng: 78.1298 } },
        { id: 3, name: "Medical Camp #1", type: "First Aid", icon: <Stethoscope size={18} />, color: "#ef4444", coords: { lat: 9.8852, lng: 78.1098 } },
    ]);

    const [mapLoaded, setMapLoaded] = useState(false);
    const [mapError, setMapError] = useState(null);

    const updateMap = useCallback(() => {
        const google = window.google;
        if (!google || !mapInstanceRef.current) return;

        markersRef.current.forEach(m => m.setMap(null));
        markersRef.current = [];

        const addMarker = (pos, color, title, type) => {
            const marker = new google.maps.Marker({
                position: pos,
                map: mapInstanceRef.current,
                title: title,
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    fillColor: color,
                    fillOpacity: 1,
                    strokeWeight: 2,
                    strokeColor: "#FFFFFF",
                    scale: 8
                }
            });
            markersRef.current.push(marker);
        };

        addMarker(startCoords, "#10b981", "Start");
        addMarker(destCoords, "#1e293b", "End");
        stops.forEach(s => addMarker(s.coords, s.color, s.name));

        if (polylineRef.current) polylineRef.current.setMap(null);
        const pathPoints = [startCoords, ...stops.map(s => s.coords), destCoords];
        polylineRef.current = new google.maps.Polyline({
            path: pathPoints,
            geodesic: true,
            strokeColor: "#f97316",
            strokeOpacity: 0.8,
            strokeWeight: 4
        });
        polylineRef.current.setMap(mapInstanceRef.current);

        const bounds = new google.maps.LatLngBounds();
        pathPoints.forEach(p => bounds.extend(p));
        mapInstanceRef.current.fitBounds(bounds, { padding: 50 });
    }, [startCoords, destCoords, stops]);

    useEffect(() => {
        const checkGoogle = () => {
            if (window.google && window.google.maps) setMapLoaded(true);
            else setTimeout(checkGoogle, 500);
        };
        checkGoogle();
    }, []);

    useEffect(() => {
        if (!mapLoaded || !mapContainerRef.current) return;
        const google = window.google;
        if (!mapInstanceRef.current) {
            mapInstanceRef.current = new google.maps.Map(mapContainerRef.current, {
                center: startCoords,
                zoom: 13,
                disableDefaultUI: true,
                styles: [{ featureType: "water", elementType: "geometry", stylers: [{ color: "#e9e9e9" }] }]
            });
        }
        updateMap();
    }, [mapLoaded, updateMap]);

    return (
        <div className="routes-page" style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, gap: '1.25rem' }}>

            {/* Header Section */}
            <div className="page-title-section">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
                    <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', fontFamily: 'Lora, serif' }}>
                        Route & Logistics Planner
                    </h1>
                    <span style={{
                        background: '#e0f2fe',
                        color: '#0284c7',
                        fontSize: '0.6rem',
                        fontWeight: 800,
                        padding: '0.15rem 0.6rem',
                        borderRadius: '6px',
                        letterSpacing: '0.05em'
                    }}>PRECISION GPS</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>
                    Map out the pilgrimage path, define mandatory stops, and mark essential facilities for devotees.
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 360px', gap: '2rem', flex: 1, minHeight: 0 }}>

                {/* Left: Map Viewer */}
                <div style={{
                    position: 'relative',
                    borderRadius: '28px',
                    overflow: 'hidden',
                    border: '1.5px solid #f1f5f9',
                    boxShadow: '0 20px 25px -5px rgba(0,0,0,0.05)',
                    background: '#f8fafc'
                }}>
                    <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }}>
                        {!mapLoaded && <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontWeight: 700 }}>Initializing Interactive Maps...</div>}
                    </div>

                    {/* Map Overlays */}
                    <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', display: 'flex', gap: '1rem', zIndex: 1 }}>
                        <div style={{ background: 'white', padding: '0.5rem 1rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Navigation2 size={16} color="#f97316" />
                            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#1e293b' }}>Total Distance: 12.4 km</span>
                        </div>
                    </div>

                    <div style={{ position: 'absolute', bottom: '1.5rem', right: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', zIndex: 1 }}>
                        <button className="map-util-btn"><ZoomIn size={20} /></button>
                        <button className="map-util-btn"><ZoomOut size={20} /></button>
                        <button className="map-util-btn" style={{ background: '#0f172a', color: 'white' }}><Layers size={20} /></button>
                    </div>
                </div>

                {/* Right: Controls & Stops */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', overflowY: 'auto', paddingRight: '0.5rem' }}>

                    {/* Points Configuration */}
                    <div style={{ background: 'white', padding: '1.5rem', borderRadius: '24px', border: '1.5px solid #f1f5f9' }}>
                        <label style={{ fontSize: '0.6rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', display: 'block', marginBottom: '1rem' }}>Destination Routing</label>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ position: 'relative' }}>
                                <div style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} />
                                <input style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 1.75rem', borderRadius: '12px', border: '1.5px solid #f1f5f9', fontSize: '0.85rem', fontWeight: 700, outline: 'none' }} value={startAddr} readOnly />
                            </div>
                            <div style={{ position: 'relative' }}>
                                <div style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', width: '8px', height: '8px', borderRadius: '50%', background: '#1e293b' }} />
                                <input style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 1.75rem', borderRadius: '12px', border: '1.5px solid #f1f5f9', fontSize: '0.85rem', fontWeight: 700, outline: 'none' }} value={destAddr} readOnly />
                            </div>
                        </div>
                        <button style={{ width: '100%', marginTop: '1rem', padding: '0.75rem', borderRadius: '12px', border: 'none', background: '#f1f5f9', color: '#475569', fontWeight: 800, fontSize: '0.8rem', cursor: 'pointer' }}>Edit Coordinates</button>
                    </div>

                    {/* Stops List */}
                    <div style={{ flex: 1 }}>
                        <h3 style={{ fontSize: '0.6rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between' }}>
                            Intermediate Stops ({stops.length})
                            <span style={{ color: '#f97316', cursor: 'pointer' }}>+ Add Stop</span>
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {stops.map(stop => (
                                <div key={stop.id} style={{
                                    background: 'white',
                                    padding: '1rem',
                                    borderRadius: '18px',
                                    border: '1.5px solid #f1f5f9',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    transition: 'all 0.2s'
                                }} className="stop-row">
                                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: stop.color + '15', color: stop.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {stop.icon}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#1e293b' }}>{stop.name}</div>
                                        <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>{stop.type}</div>
                                    </div>
                                    <button style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer' }}><Trash2 size={16} /></button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Legend Box */}
                    <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '20px', border: '1.5px solid #f1f5f9' }}>
                        <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#94a3b8', marginBottom: '0.75rem' }}>MAP LEGEND</div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', fontWeight: 700 }}> <Circle size={8} fill="#f59e0b" color="#f59e0b" /> Food Point </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', fontWeight: 700 }}> <Circle size={8} fill="#ef4444" color="#ef4444" /> Medical </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', fontWeight: 700 }}> <Circle size={8} fill="#3b82f6" color="#3b82f6" /> Rest Stop </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', fontWeight: 700 }}> <Circle size={8} fill="#10b981" color="#10b981" /> Start Point </div>
                        </div>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .map-util-btn {
                    width: 40px; height: 40px; border-radius: 10px; border: none; background: white; 
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1); color: #64748b; cursor: pointer;
                    display: flex; alignItems: center; justifyContent: center;
                }
                .stop-row:hover { border-color: #f1f5f9 !important; background: #fffaf5; }
                `
            }} />
        </div>
    );
}
