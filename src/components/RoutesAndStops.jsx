import React, { useState, useEffect, useRef } from 'react';
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

    const stops = [
        { id: 1, name: "McDonald's", type: "Annathanam", icon: <Check size={18} />, color: "#22c55e", coords: [9.9252, 78.1198] },
        { id: 2, name: "Bird's Fort Trail Park", type: "Resting Place/Park", icon: <Check size={18} />, color: "#f97316", coords: [9.9152, 78.1298] },
    ];

    const updateMap = () => {
        const google = window.google;
        if (!google || !mapInstanceRef.current) return;

        // Clear existing markers
        markersRef.current.forEach(m => m.setMap(null));
        markersRef.current = [];

        const addMarker = (pos, color, title) => {
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

        addMarker(startCoords, "#f59e0b", "Start Point");
        addMarker(destCoords, "#3b82f6", "Destination Point");
        stops.forEach(s => addMarker({ lat: s.coords[0], lng: s.coords[1] }, s.color, s.name));

        // Update Polyline
        if (polylineRef.current) polylineRef.current.setMap(null);

        const pathPoints = [
            startCoords,
            ...stops.map(s => ({ lat: s.coords[0], lng: s.coords[1] })),
            destCoords
        ];

        polylineRef.current = new google.maps.Polyline({
            path: pathPoints,
            geodesic: true,
            strokeColor: "#f59e0b",
            strokeOpacity: 0.8,
            strokeWeight: 4,
            icons: [{
                icon: { path: "M 0,-1 0,1", strokeOpacity: 1, scale: 4 },
                offset: "0",
                repeat: "20px"
            }]
        });
        polylineRef.current.setMap(mapInstanceRef.current);

        // Adjust bounds
        const bounds = new google.maps.LatLngBounds();
        pathPoints.forEach(p => bounds.extend(p));
        mapInstanceRef.current.fitBounds(bounds);
    };

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

                // Immediately pan to the new location to give feedback
                if (mapInstanceRef.current) {
                    mapInstanceRef.current.panTo(pos);
                    mapInstanceRef.current.setZoom(14);
                }
            } else {
                console.error("Geocode failed: " + status);
            }
        });
    };

    useEffect(() => {
        if (!mapContainerRef.current) return;
        const google = window.google;
        if (!google || !google.maps) return;

        if (!mapInstanceRef.current) {
            mapInstanceRef.current = new google.maps.Map(mapContainerRef.current, {
                center: startCoords,
                zoom: 13,
                disableDefaultUI: true,
                zoomControl: false,
                styles: [{ featureType: "all", elementType: "geometry", stylers: [{ color: "#f5f5f5" }] }]
            });

            // Set up Autocomplete for Start
            if (startInputRef.current) {
                const startAutocomp = new google.maps.places.Autocomplete(startInputRef.current);
                startAutocomp.addListener("place_changed", () => {
                    const place = startAutocomp.getPlace();
                    if (place.geometry && place.geometry.location) {
                        const pos = {
                            lat: place.geometry.location.lat(),
                            lng: place.geometry.location.lng()
                        };
                        setStartAddr(place.formatted_address || "");
                        setStartCoords(pos);
                    }
                });
            }

            // Set up Autocomplete for Destination
            if (destInputRef.current) {
                const destAutocomp = new google.maps.places.Autocomplete(destInputRef.current);
                destAutocomp.addListener("place_changed", () => {
                    const place = destAutocomp.getPlace();
                    if (place.geometry && place.geometry.location) {
                        const pos = {
                            lat: place.geometry.location.lat(),
                            lng: place.geometry.location.lng()
                        };
                        setDestAddr(place.formatted_address || "");
                        setDestCoords(pos);
                    }
                });
            }
        }
        updateMap();
    }, [startCoords, destCoords]);

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
                            placeholder="Type to search start location..."
                            value={startAddr}
                            onChange={(e) => setStartAddr(e.target.value)}
                            onBlur={() => handleManualGeocode(true)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleManualGeocode(true);
                                    e.target.blur();
                                }
                            }}
                        />
                        <Locate
                            size={18}
                            style={{
                                left: 'auto',
                                right: '1rem',
                                color: '#f59e0b',
                                cursor: 'pointer',
                                zIndex: 10,
                                pointerEvents: 'auto'
                            }}
                            onClick={() => handleManualGeocode(true)}
                        />
                    </div>

                    <label className="section-label">Destination</label>
                    <div className="input-with-icon" style={{ marginBottom: '1rem' }}>
                        <input
                            ref={destInputRef}
                            className="input"
                            style={{ paddingLeft: '1rem', paddingRight: '2.5rem' }}
                            placeholder="Type to search destination..."
                            value={destAddr}
                            onChange={(e) => setDestAddr(e.target.value)}
                            onBlur={() => handleManualGeocode(false)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleManualGeocode(false);
                                    e.target.blur();
                                }
                            }}
                        />
                        <Locate
                            size={18}
                            style={{
                                left: 'auto',
                                right: '1rem',
                                color: '#f59e0b',
                                cursor: 'pointer',
                                zIndex: 10,
                                pointerEvents: 'auto'
                            }}
                            onClick={() => handleManualGeocode(false)}
                        />
                    </div>

                    <div style={{ height: '1px', background: '#f3f4f6', margin: '1.5rem 0' }}></div>

                    <label className="section-label">
                        <MapPin size={16} /> Manage Stops
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
                            <button className="delete-btn">
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
                        <div className="form-group">
                            <label className="label" style={{ fontSize: '0.75rem' }}>Category</label>
                            <div style={{ position: 'relative' }}>
                                <select className="input" style={{ background: 'white', appearance: 'none' }}>
                                    <option>Select category</option>
                                </select>
                                <ChevronLeft size={18} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%) rotate(-90deg)', color: '#9ca3af', pointerEvents: 'none' }} />
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
                    Click map to pin a new stop or drag existing markers
                </div>

                <div
                    ref={mapContainerRef}
                    style={{ width: '100%', height: '100%', background: '#f0f2f5', zIndex: 1 }}
                />

                <div className="map-controls">
                    <button className="map-btn" onClick={() => {
                        const currentZoom = mapInstanceRef.current?.getZoom();
                        if (currentZoom !== undefined) mapInstanceRef.current.setZoom(currentZoom + 1);
                    }}><ZoomIn size={20} /></button>
                    <button className="map-btn" onClick={() => {
                        const currentZoom = mapInstanceRef.current?.getZoom();
                        if (currentZoom !== undefined) mapInstanceRef.current.setZoom(currentZoom - 1);
                    }}><ZoomOut size={20} /></button>
                    <button className="map-btn" style={{ marginTop: '0.5rem' }} onClick={() => {
                        if (navigator.geolocation) {
                            navigator.geolocation.getCurrentPosition((position) => {
                                const pos = {
                                    lat: position.coords.latitude,
                                    lng: position.coords.longitude,
                                };
                                mapInstanceRef.current.setCenter(pos);
                            });
                        }
                    }}><Navigation size={20} /></button>
                </div>
            </div>
        </div>
    );
}
