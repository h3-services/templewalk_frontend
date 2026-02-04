import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    Check,
    MapPin,
    Trash2,
    Locate,
    ChevronLeft,
    ZoomIn,
    ZoomOut,
    Navigation
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
        { id: 1, name: "McDonald's", type: "Annathanam", icon: <Check size={18} />, color: "#22c55e", coords: { lat: 9.9252, lng: 78.1198 } },
        { id: 2, name: "Bird's Fort Trail Park", type: "Resting Place/Park", icon: <Check size={18} />, color: "#f97316", coords: { lat: 9.9152, lng: 78.1298 } },
    ]);

    const [mapLoaded, setMapLoaded] = useState(false);
    const [mapError, setMapError] = useState(null);

    // Reverse Geocoding Helper
    const reverseGeocode = useCallback((pos, type) => {
        const google = window.google;
        if (!google) return;
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ location: pos }, (results, status) => {
            if (status === "OK" && results[0]) {
                if (type === 'start') setStartAddr(results[0].formatted_address);
                else if (type === 'dest') setDestAddr(results[0].formatted_address);
            }
        });
    }, []);

    const updateMap = useCallback(() => {
        const google = window.google;
        if (!google || !mapInstanceRef.current) return;

        // Clear existing markers
        markersRef.current.forEach(m => m.setMap(null));
        markersRef.current = [];

        const addMarker = (pos, color, title, type, draggable = false) => {
            const marker = new google.maps.Marker({
                position: pos,
                map: mapInstanceRef.current,
                title: title,
                draggable: draggable,
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    fillColor: color,
                    fillOpacity: 1,
                    strokeWeight: 2,
                    strokeColor: "#FFFFFF",
                    scale: 10
                }
            });

            if (draggable) {
                marker.addListener('dragend', () => {
                    const newPos = {
                        lat: marker.getPosition().lat(),
                        lng: marker.getPosition().lng()
                    };
                    if (type === 'start') setStartCoords(newPos);
                    else if (type === 'dest') setDestCoords(newPos);
                    reverseGeocode(newPos, type);
                });
            }

            markersRef.current.push(marker);
        };

        addMarker(startCoords, "#f59e0b", "Start Point", 'start', true);
        addMarker(destCoords, "#3b82f6", "Destination Point", 'dest', true);
        stops.forEach(s => addMarker(s.coords, s.color, s.name, 'stop'));

        // Update Polyline
        if (polylineRef.current) polylineRef.current.setMap(null);

        const pathPoints = [
            startCoords,
            ...stops.map(s => s.coords),
            destCoords
        ];

        polylineRef.current = new google.maps.Polyline({
            path: pathPoints,
            geodesic: true,
            strokeColor: "#f59e0b",
            strokeOpacity: 0.8,
            strokeWeight: 4
        });
        polylineRef.current.setMap(mapInstanceRef.current);

        // Adjust bounds to fit all markers
        const bounds = new google.maps.LatLngBounds();
        pathPoints.forEach(p => bounds.extend(p));
        mapInstanceRef.current.fitBounds(bounds, { padding: 50 });
    }, [startCoords, destCoords, stops, reverseGeocode]);

    const handleManualGeocode = (isStart) => {
        const google = window.google;
        if (!google) return;

        const address = isStart ? startAddr : destAddr;
        if (!address || address.length < 3) return;

        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address }, (results, status) => {
            if (status === "OK" && results[0]) {
                const pos = {
                    lat: results[0].geometry.location.lat(),
                    lng: results[0].geometry.location.lng()
                };
                if (isStart) {
                    setStartAddr(results[0].formatted_address);
                    setStartCoords(pos);
                } else {
                    setDestAddr(results[0].formatted_address);
                    setDestCoords(pos);
                }
                mapInstanceRef.current?.panTo(pos);
            }
        });
    };

    useEffect(() => {
        const checkGoogle = () => {
            if (window.google && window.google.maps) {
                setMapLoaded(true);
            } else if (!window.google) {
                setTimeout(checkGoogle, 500);
            }
        };
        checkGoogle();
    }, []);

    useEffect(() => {
        if (!mapLoaded || !mapContainerRef.current) return;
        const google = window.google;

        try {
            if (!mapInstanceRef.current) {
                mapInstanceRef.current = new google.maps.Map(mapContainerRef.current, {
                    center: startCoords,
                    zoom: 13,
                    disableDefaultUI: true,
                    zoomControl: false,
                    styles: [{ featureType: "all", elementType: "geometry", stylers: [{ color: "#f5f5f5" }] }]
                });

                // Autocomplete setup
                const setupAutocomplete = (inputRef, setter, coordSetter, type) => {
                    if (!inputRef.current) return;
                    const autocomp = new google.maps.places.Autocomplete(inputRef.current);
                    autocomp.addListener("place_changed", () => {
                        const place = autocomp.getPlace();
                        if (place.geometry?.location) {
                            const pos = {
                                lat: place.geometry.location.lat(),
                                lng: place.geometry.location.lng()
                            };
                            setter(place.formatted_address || "");
                            coordSetter(pos);
                        }
                    });
                };

                setupAutocomplete(startInputRef, setStartAddr, setStartCoords, 'start');
                setupAutocomplete(destInputRef, setDestAddr, setDestCoords, 'dest');
            }
            updateMap();
        } catch (err) {
            console.error("Map initialization failed:", err);
            setMapError(err.message);
        }
    }, [mapLoaded, updateMap]);

    return (
        <div className="route-container">
            <div className="route-controls">
                <div className="controls-body">
                    <label className="section-label first">Start Point</label>
                    <div className="input-with-icon" style={{ marginBottom: '1.5rem' }}>
                        <input
                            ref={startInputRef}
                            className="input"
                            style={{ paddingLeft: '1rem', paddingRight: '2.5rem' }}
                            placeholder="Type start location..."
                            value={startAddr}
                            onChange={(e) => setStartAddr(e.target.value)}
                            onBlur={() => handleManualGeocode(true)}
                            onKeyDown={(e) => e.key === 'Enter' && handleManualGeocode(true)}
                        />
                        <Locate size={18} style={{ left: 'auto', right: '1rem', color: '#f59e0b', cursor: 'pointer' }} onClick={() => handleManualGeocode(true)} />
                    </div>

                    <label className="section-label">Destination</label>
                    <div className="input-with-icon" style={{ marginBottom: '1rem' }}>
                        <input
                            ref={destInputRef}
                            className="input"
                            style={{ paddingLeft: '1rem', paddingRight: '2.5rem' }}
                            placeholder="Type destination..."
                            value={destAddr}
                            onChange={(e) => setDestAddr(e.target.value)}
                            onBlur={() => handleManualGeocode(false)}
                            onKeyDown={(e) => e.key === 'Enter' && handleManualGeocode(false)}
                        />
                        <Locate size={18} style={{ left: 'auto', right: '1rem', color: '#f59e0b', cursor: 'pointer' }} onClick={() => handleManualGeocode(false)} />
                    </div>

                    <div style={{ height: '1px', background: '#f3f4f6', margin: '1.5rem 0' }}></div>

                    <label className="section-label">
                        <MapPin size={16} /> Manage Stops ({stops.length})
                    </label>

                    {stops.map(stop => (
                        <div key={stop.id} className="stop-card">
                            <div className="stop-icon-box" style={{ background: stop.color }}>
                                {stop.icon}
                            </div>
                            <div className="stop-info">
                                <span className="stop-name">{stop.name}</span>
                                <span className="stop-type">{stop.type}</span>
                            </div>
                            <button className="delete-btn" onClick={() => setStops(prev => prev.filter(s => s.id !== stop.id))}>
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))}

                    <div className="add-stop-panel">
                        <span className="add-stop-title">Add New Stop</span>
                        <div className="form-group">
                            <label className="label" style={{ fontSize: '0.75rem' }}>Stop Name / Address</label>
                            <div className="input-with-icon">
                                <input className="input" style={{ background: 'white', paddingLeft: '1rem' }} placeholder="Type to search address..." />
                                <Locate size={18} style={{ left: 'auto', right: '1rem', color: '#f59e0b' }} />
                            </div>
                        </div>
                        <button className="btn btn-outline" style={{ width: '100%', background: '#fff7ed', border: '1px solid #ffedd5', color: '#f59e0b', fontSize: '0.85rem' }}>
                            + Confirm Stop
                        </button>
                    </div>
                </div>
            </div>

            <div className="map-view">
                <div className="map-overlay-msg">
                    <div style={{ width: '10px', height: '10px', background: '#f59e0b', borderRadius: '50%' }}></div>
                    Drag markers or search to update the route
                </div>

                <div
                    ref={mapContainerRef}
                    style={{ width: '100%', height: '100%', background: '#f0f2f5', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    {!mapLoaded && !mapError && <div style={{ color: '#6b7280' }}>Loading Google Maps...</div>}
                    {mapError && <div style={{ color: '#ef4444', textAlign: 'center', padding: '1rem' }}>Map Load Error: {mapError}</div>}
                </div>

                <div className="map-controls">
                    <button className="map-btn" onClick={() => mapInstanceRef.current?.setZoom(mapInstanceRef.current.getZoom() + 1)}><ZoomIn size={20} /></button>
                    <button className="map-btn" onClick={() => mapInstanceRef.current?.setZoom(mapInstanceRef.current.getZoom() - 1)}><ZoomOut size={20} /></button>
                    <button className="map-btn" style={{ marginTop: '0.5rem' }} onClick={() => {
                        if (navigator.geolocation) {
                            navigator.geolocation.getCurrentPosition((position) => {
                                const pos = { lat: position.coords.latitude, lng: position.coords.longitude };
                                mapInstanceRef.current.setCenter(pos);
                            });
                        }
                    }}><Navigation size={20} /></button>
                </div>
            </div>
        </div>
    );
}
