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

export function RoutesAndStops({ startCoords, destCoords, stops = [], onUpdateStops, onUpdateCoords }) {
    const mapContainerRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const markersRef = useRef([]);
    const polylineRef = useRef(null);

    const [startAddr, setStartAddr] = useState("Cimarron Family Aquatic Cent");
    const [destAddr, setDestAddr] = useState("DFW Hindu Temple (Default)");
    const [selectionMode, setSelectionMode] = useState(null); // 'start' | 'dest' | null


    const [mapLoaded, setMapLoaded] = useState(false);

    const updateMap = useCallback(() => {
        const google = window.google;
        if (!google || !mapInstanceRef.current) return;

        markersRef.current.forEach(m => m.setMap(null));
        markersRef.current = [];

        const addMarker = (pos, color, title, iconType) => {
            const google = window.google;
            if (!google || !mapInstanceRef.current) return;

            // Try AdvancedMarkerElement (requires Map ID, but provides better performance/UX)
            if (google.maps.marker && google.maps.marker.AdvancedMarkerElement) {
                try {
                    const pinElement = new google.maps.marker.PinElement({
                        background: color,
                        borderColor: "#FFFFFF",
                        glyphColor: "#FFFFFF",
                        scale: 1.0
                    });

                    const marker = new google.maps.marker.AdvancedMarkerElement({
                        position: pos,
                        map: mapInstanceRef.current,
                        title: title,
                        content: pinElement.element
                    });
                    markersRef.current.push(marker);
                    return;
                } catch (e) {
                    console.warn("AdvancedMarkerElement failed, falling back to Marker:", e);
                }
            }

            // Fallback to legacy Marker
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

        const safeStart = { lat: Number(startCoords?.lat) || 9.9195, lng: Number(startCoords?.lng) || 78.1193 };
        const safeDest = { lat: Number(destCoords?.lat) || 9.8329, lng: Number(destCoords?.lng) || 78.0841 };

        addMarker(safeStart, "#f97316", "Start");
        addMarker(safeDest, "#1e293b", "End");
        (stops || []).forEach(s => {
            const safePos = { lat: Number(s.coords?.lat) || 0, lng: Number(s.coords?.lng) || 0 };
            if (safePos.lat !== 0) addMarker(safePos, s.color, s.name);
        });

        if (polylineRef.current) polylineRef.current.setMap(null);
        const pathPoints = [safeStart, ...(stops || []).map(s => ({
            lat: Number(s.coords?.lat) || 0,
            lng: Number(s.coords?.lng) || 0
        })).filter(p => p.lat !== 0), safeDest];

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

            // Add Click Listener
            mapInstanceRef.current.addListener('click', (e) => {
                const latLng = { lat: e.latLng.lat(), lng: e.latLng.lng() };

                // Logic to update based on selection mode
                // We use a ref-like approach or functional update to avoid stale state in listener
                // But since we want to handle address names, we'll use a direct geocoder check
                const geocoder = new google.maps.Geocoder();
                geocoder.geocode({ location: e.latLng }, (results, status) => {
                    let addr = "Custom Location";
                    if (status === 'OK' && results[0]) {
                        addr = results[1] ? results[1].formatted_address : results[0].formatted_address;
                    }

                    // We need to know which mode is active. 
                    // To handle this in a stable way inside a listener, we can use a window property or a ref
                    if (window._currentSelectionMode === 'start') {
                        onUpdateCoords('start', latLng);
                        setStartAddr(addr);
                        setSelectionMode(null);
                        window._currentSelectionMode = null;
                    } else if (window._currentSelectionMode === 'dest') {
                        onUpdateCoords('dest', latLng);
                        setDestAddr(addr);
                        setSelectionMode(null);
                        window._currentSelectionMode = null;
                    } else if (window._currentSelectionMode === 'stop') {
                        const nameInput = document.getElementById('new-stop-name');
                        if (nameInput) nameInput.value = addr;
                        window._tempStopCoords = latLng;
                        setSelectionMode(null);
                        window._currentSelectionMode = null;
                    }
                });
            });

        }

        updateMap();
    }, [mapLoaded, updateMap]);

    // Keep selection mode in a global ref for the map listener
    useEffect(() => {
        window._currentSelectionMode = selectionMode;
    }, [selectionMode]);


    const getStopStyles = (type) => {
        switch (type) {
            case 'Annathanam': return { icon: <Utensils size={14} />, color: '#10b981' };
            case 'Resting Place/Park': return { icon: <Trees size={14} />, color: '#f97316' };
            case 'Medical': return { icon: <Stethoscope size={14} />, color: '#ef4444' };
            default: return { icon: <MapPin size={14} />, color: '#3b82f6' };
        }
    };

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
                                style={{
                                    ...inputStyleSmall,
                                    border: selectionMode === 'start' ? '1.5px solid #f97316' : '1.5px solid #f1f5f9',
                                    boxShadow: selectionMode === 'start' ? '0 0 0 4px rgba(249, 115, 22, 0.1)' : 'none'
                                }}
                                value={startAddr}
                                onChange={(e) => setStartAddr(e.target.value)}
                                placeholder={selectionMode === 'start' ? "Click on map to set..." : ""}
                            />
                            <button
                                onClick={() => setSelectionMode(selectionMode === 'start' ? null : 'start')}
                                style={{
                                    position: 'absolute', right: '0.4rem', top: '50%', transform: 'translateY(-50%)',
                                    background: selectionMode === 'start' ? '#f97316' : '#fff7ed',
                                    border: 'none', borderRadius: '8px', padding: '6px', cursor: 'pointer', display: 'flex',
                                    transition: 'all 0.2s',
                                    boxShadow: selectionMode === 'start' ? '0 4px 10px rgba(249, 115, 22, 0.3)' : 'none'
                                }}
                                title="Pick from map"
                            >
                                <Target size={14} color={selectionMode === 'start' ? 'white' : '#f97316'} />
                            </button>
                        </div>
                    </div>

                    {/* Destination */}
                    <div>
                        <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1e293b', display: 'block', marginBottom: '0.4rem' }}>Destination <span style={{ color: '#f97316' }}>*</span></label>
                        <div style={{ position: 'relative' }}>
                            <input
                                style={{
                                    ...inputStyleSmall,
                                    border: selectionMode === 'dest' ? '1.5px solid #1e293b' : '1.5px solid #f1f5f9',
                                    boxShadow: selectionMode === 'dest' ? '0 0 0 4px rgba(30, 41, 59, 0.1)' : 'none'
                                }}
                                value={destAddr}
                                onChange={(e) => setDestAddr(e.target.value)}
                                placeholder={selectionMode === 'dest' ? "Click on map to set destination..." : ""}
                            />
                            <button
                                onClick={() => setSelectionMode(selectionMode === 'dest' ? null : 'dest')}
                                style={{
                                    position: 'absolute', right: '0.4rem', top: '50%', transform: 'translateY(-50%)',
                                    background: selectionMode === 'dest' ? '#1e293b' : '#f8fafc',
                                    border: 'none', borderRadius: '8px', padding: '6px', cursor: 'pointer', display: 'flex',
                                    transition: 'all 0.2s'
                                }}
                                title="Pick from map"
                            >
                                <Target size={14} color={selectionMode === 'dest' ? 'white' : '#64748b'} />
                            </button>
                        </div>
                    </div>

                    {/* Manage Stops */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                            <MapPin size={16} color="#f97316" fill="#f9731633" />
                            <h3 style={{ fontSize: '0.8rem', fontWeight: 800, color: '#1e293b', margin: 0 }}>Manage Stops</h3>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {stops.map(stop => {
                                const styles = getStopStyles(stop.type);
                                return (
                                    <div key={stop.id} style={stopCardStyleSmall}>
                                        <div style={{
                                            width: '32px',
                                            height: '32px',
                                            borderRadius: '50%',
                                            background: styles.color,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: 'white'
                                        }}>
                                            {styles.icon}
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1e293b' }}>{stop.name}</div>
                                            <div style={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: 600 }}>{stop.type}</div>
                                        </div>
                                        <button
                                            onClick={() => onUpdateStops(stops.filter(s => s.id !== stop.id))}
                                            style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '0.25rem' }}
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Add New Stop Card */}
                    <div style={addNewStopStyleSmall}>
                        <label style={{ fontSize: '0.6rem', fontWeight: 800, color: '#f97316', textTransform: 'uppercase', display: 'block', marginBottom: '0.75rem' }}>Add New Stop</label>

                        <div style={{ marginBottom: '0.75rem' }}>
                            <label style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748b', display: 'block', marginBottom: '0.35rem' }}>Stop Name / Address</label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    id="new-stop-name"
                                    style={{
                                        ...inputStyleSmall,
                                        background: 'white',
                                        border: selectionMode === 'stop' ? '1.5px solid #10b981' : '1.5px solid #f1f5f9',
                                        boxShadow: selectionMode === 'stop' ? '0 0 0 4px rgba(16, 185, 129, 0.1)' : 'none'
                                    }}
                                    placeholder={selectionMode === 'stop' ? "Click map to set stop..." : "Type to search address..."}
                                />
                                <button
                                    onClick={() => setSelectionMode(selectionMode === 'stop' ? null : 'stop')}
                                    style={{
                                        position: 'absolute', right: '0.4rem', top: '50%', transform: 'translateY(-50%)',
                                        background: selectionMode === 'stop' ? '#10b981' : '#f8fafc',
                                        border: 'none', borderRadius: '8px', padding: '6px', cursor: 'pointer', display: 'flex',
                                        transition: 'all 0.2s',
                                        zIndex: 5
                                    }}
                                    title="Pick from map"
                                >
                                    <Target size={14} color={selectionMode === 'stop' ? 'white' : '#94a3b8'} />
                                </button>
                            </div>
                        </div>

                        <div style={{ marginBottom: '0.75rem' }}>
                            <label style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748b', display: 'block', marginBottom: '0.35rem' }}>Category</label>
                            <div style={{ position: 'relative' }}>
                                <select id="new-stop-category" style={{ ...inputStyleSmall, background: 'white', WebkitAppearance: 'none' }}>
                                    <option>Select category</option>
                                    <option>Annathanam</option>
                                    <option>Resting Place/Park</option>
                                    <option>Medical</option>
                                </select>
                                <ChevronDown size={14} style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none' }} />
                            </div>
                        </div>

                        <button
                            onClick={() => {
                                const name = document.getElementById('new-stop-name').value;
                                const type = document.getElementById('new-stop-category').value;
                                if (name && type !== 'Select category') {
                                    onUpdateStops([...stops, {
                                        id: Date.now(),
                                        name,
                                        type,
                                        coords: window._tempStopCoords || { lat: 9.91 + Math.random() * 0.05, lng: 78.11 + Math.random() * 0.05 }
                                    }]);
                                    window._tempStopCoords = null;

                                    document.getElementById('new-stop-name').value = '';
                                    document.getElementById('new-stop-category').value = 'Select category';
                                }
                            }}
                            style={confirmBtnStyleSmall}
                        >
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
