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
    Stethoscope,
    Circle,
    Search,
    ChevronDown,
    Target,
    Utensils,
    Trees,
    Home
} from 'lucide-react';

export function RoutesAndStops() {
    const mapContainerRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const markersRef = useRef([]);
    const polylineRef = useRef(null);

    const [startAddr, setStartAddr] = useState("Cimarron Family Aquatic Cent");
    const [destAddr, setDestAddr] = useState("DFW Hindu Temple (Default)");
    const [startCoords, setStartCoords] = useState({ lat: 9.9195, lng: 78.1193 });
    const [destCoords, setDestCoords] = useState({ lat: 9.8329, lng: 78.0841 });

    const [stops, setStops] = useState([
        { id: 1, name: "McDonald's", type: "Annathanam", icon: <Utensils size={18} />, color: "#10b981", coords: { lat: 9.9252, lng: 78.1198 } },
        { id: 2, name: "Bird's Fort Trail Park", type: "Resting Place/Park", icon: <Trees size={18} />, color: "#f97316", coords: { lat: 9.9152, lng: 78.1298 } },
    ]);

    const [mapLoaded, setMapLoaded] = useState(false);

    const updateMap = useCallback(() => {
        const google = window.google;
        if (!google || !mapInstanceRef.current) return;

        markersRef.current.forEach(m => m.setMap(null));
        markersRef.current = [];

        const addMarker = (pos, color, title, iconType) => {
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
                    scale: 10
                }
            });
            markersRef.current.push(marker);
        };

        addMarker(startCoords, "#f97316", "Start");
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
                styles: [
                    { featureType: "all", elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
                    { featureType: "water", elementType: "geometry", stylers: [{ color: "#c9e3f1" }] },
                    { featureType: "landscape", elementType: "geometry", stylers: [{ color: "#f5f5f5" }] }
                ]
            });
        }
        updateMap();
    }, [mapLoaded, updateMap]);

    return (
        <div style={{
            background: 'white',
            borderRadius: '32px',
            border: '1.5px solid #f1f5f9',
            boxShadow: '0 8px 30px -10px rgba(0,0,0,0.06)',
            padding: '0',
            display: 'flex',
            flex: 1,
            height: '100%',
            minHeight: 0,
            overflow: 'hidden'
        }}>
            {/* Content Grid - 2 Column Layout */}
            <div className="routes-content-grid" style={{
                display: 'grid',
                gridTemplateColumns: '420px 1fr',
                flex: 1,
                minHeight: 0,
                overflow: 'hidden'
            }}>
                {/* Left: Configuration Panel */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    overflowY: 'auto',
                    padding: '2.5rem 2rem 2.5rem 3rem',
                    borderRight: '1.5px solid #f1f5f9',
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#f1f5f9 transparent'
                }}>
                    {/* Header inside left column - Same as EventForm */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingBottom: '1.5rem' }}>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '16px',
                            background: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <MapPin size={24} color="#f97316" />
                        </div>
                        <div>
                            <h2 style={{ fontSize: '1.5rem', fontFamily: 'Lora, serif', fontWeight: 700, color: '#0f172a', margin: 0 }}>Routes & Stops</h2>
                            <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: '0.25rem 0 0 0', fontWeight: 500 }}>Configure the path and Stops</p>
                        </div>
                    </div>
                    {/* Start Point */}
                    <div>
                        <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1e293b', display: 'block', marginBottom: '0.4rem' }}>Start Point <span style={{ color: '#f97316' }}>*</span></label>
                        <div style={{ position: 'relative' }}>
                            <Search size={14} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                            <input
                                style={inputStyleSmall}
                                value={startAddr}
                                onChange={(e) => setStartAddr(e.target.value)}
                            />
                            <MapPin size={14} style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#f97316' }} fill="#f9731633" />
                        </div>
                    </div>

                    {/* Destination */}
                    <div>
                        <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1e293b', display: 'block', marginBottom: '0.4rem' }}>Destination <span style={{ color: '#f97316' }}>*</span></label>
                        <div style={{ position: 'relative' }}>
                            <input
                                style={inputStyleSmall}
                                value={destAddr}
                                onChange={(e) => setDestAddr(e.target.value)}
                            />
                            <ChevronDown size={14} style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                        </div>
                    </div>

                    {/* Manage Stops */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                            <MapPin size={16} color="#f97316" fill="#f9731633" />
                            <h3 style={{ fontSize: '0.8rem', fontWeight: 800, color: '#1e293b', margin: 0 }}>Manage Stops</h3>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {stops.map(stop => (
                                <div key={stop.id} style={stopCardStyleSmall}>
                                    <div style={{
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '50%',
                                        background: stop.color,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white'
                                    }}>
                                        {React.cloneElement(stop.icon, { size: 14 })}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1e293b' }}>{stop.name}</div>
                                        <div style={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: 600 }}>{stop.type}</div>
                                    </div>
                                    <button style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '0.25rem' }}>
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Add New Stop Card */}
                    <div style={addNewStopStyleSmall}>
                        <label style={{ fontSize: '0.6rem', fontWeight: 800, color: '#f97316', textTransform: 'uppercase', display: 'block', marginBottom: '0.75rem' }}>Add New Stop</label>

                        <div style={{ marginBottom: '0.75rem' }}>
                            <label style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748b', display: 'block', marginBottom: '0.35rem' }}>Stop Name / Address</label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    style={{ ...inputStyleSmall, background: 'white' }}
                                    placeholder="Type to search address..."
                                />
                                <Target size={14} style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                            </div>
                        </div>

                        <div style={{ marginBottom: '0.75rem' }}>
                            <label style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748b', display: 'block', marginBottom: '0.35rem' }}>Category</label>
                            <div style={{ position: 'relative' }}>
                                <select style={{ ...inputStyleSmall, background: 'white', WebkitAppearance: 'none' }}>
                                    <option>Select category</option>
                                    <option>Annathanam</option>
                                    <option>Resting Place/Park</option>
                                    <option>Medical</option>
                                </select>
                                <ChevronDown size={14} style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none' }} />
                            </div>
                        </div>

                        <button style={confirmBtnStyleSmall}>
                            <Plus size={14} /> Confirm Stop
                        </button>
                    </div>
                </div>

                {/* Right: Map Viewer with padding */}
                <div style={{
                    padding: '2.5rem 3rem 2.5rem 2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: 0
                }}>
                    <div style={{
                        position: 'relative',
                        overflow: 'hidden',
                        borderRadius: '20px',
                        background: '#e5e7eb',
                        flex: 1
                    }}>
                        <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }}>
                            {!mapLoaded && <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontWeight: 700 }}>Loading Map Environment...</div>}
                        </div>


                        {/* Bottom Right Controls */}
                        <div style={{ position: 'absolute', bottom: '1.5rem', right: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', zIndex: 1 }}>
                            <button className="map-util-btn"><ZoomIn size={22} /></button>
                            <button className="map-util-btn"><ZoomOut size={22} /></button>
                            <button className="map-util-btn" style={{ background: '#f97316', color: 'white' }}><Target size={22} /></button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Responsive Styles */}
            <style dangerouslySetInnerHTML={{
                __html: `
                .map-util-btn {
                    width: 48px; height: 48px; border-radius: 12px; border: none; background: white; 
                    box-shadow: 0 4px 12px rgba(0,0,0,0.1); color: #1e293b; cursor: pointer;
                    display: flex; align-items: center; justify-content: center;
                    transition: all 0.2s;
                }
                .map-util-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 15px rgba(0,0,0,0.15); }
                @media (max-width: 768px) {
                    .routes-content-grid {
                        grid-template-columns: 1fr !important;
                    }
                }
                `
            }} />
        </div>
    );
}

const inputStyle = {
    width: '100%',
    padding: '0.85rem 2.75rem 0.85rem 2.75rem',
    borderRadius: '14px',
    border: '1.5px solid #f1f5f9',
    background: '#f8fafc',
    fontSize: '0.9rem',
    fontWeight: 700,
    outline: 'none',
    color: '#1e293b',
    boxSizing: 'border-box',
    fontFamily: 'inherit'
};

const inputStyleSmall = {
    width: '100%',
    padding: '0.6rem 2rem 0.6rem 2rem',
    borderRadius: '10px',
    border: '1.5px solid #f1f5f9',
    background: '#f8fafc',
    fontSize: '0.75rem',
    fontWeight: 600,
    outline: 'none',
    color: '#1e293b',
    boxSizing: 'border-box',
    fontFamily: 'inherit'
};

const stopCardStyle = {
    background: 'white',
    padding: '1rem',
    borderRadius: '16px',
    border: '1.5px solid #f1f5f9',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
};

const stopCardStyleSmall = {
    background: 'white',
    padding: '0.6rem 0.75rem',
    borderRadius: '12px',
    border: '1.5px solid #f1f5f9',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
};

const addNewStopStyle = {
    background: '#fffbf5',
    padding: '1.5rem',
    borderRadius: '20px',
    border: '1.5px solid #f9731633',
    marginTop: 'auto'
};

const addNewStopStyleSmall = {
    background: '#fffbf5',
    padding: '1rem',
    borderRadius: '14px',
    border: '1.5px solid #f9731633',
    marginTop: 'auto'
};

const confirmBtnStyle = {
    width: '100%',
    padding: '0.85rem',
    borderRadius: '12px',
    border: 'none',
    background: '#fff2e0',
    color: '#f97316',
    fontWeight: 800,
    fontSize: '0.9rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    transition: 'all 0.2s'
};

const confirmBtnStyleSmall = {
    width: '100%',
    padding: '0.6rem',
    borderRadius: '10px',
    border: 'none',
    background: '#fff2e0',
    color: '#f97316',
    fontWeight: 700,
    fontSize: '0.75rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.35rem',
    transition: 'all 0.2s'
};
