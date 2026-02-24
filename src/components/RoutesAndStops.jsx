import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    MapPin, Trash2, Plus, ChevronDown,
    Utensils, Trees, Stethoscope,
    ZoomIn, ZoomOut, Locate, Navigation,
    RotateCcw, Check, Loader
} from 'lucide-react';

// ─── Safe Leaflet accessor ────────────────────────────────────────────────────
const getL = () => window.L;

// ─── Defaults ─────────────────────────────────────────────────────────────────
const DEFAULT_CENTER = [9.9195, 78.1193];
const DEFAULT_ZOOM = 13;
const ROUTE_COLOR = '#f97316';

// ─── Nominatim reverse geocode (free, no API key) ────────────────────────────
async function reverseGeocode(lat, lng) {
    try {
        const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1`,
            { headers: { 'Accept-Language': 'en' } }
        );
        if (!res.ok) throw new Error('Nominatim error');
        const data = await res.json();
        // Build a short, readable name
        const a = data.address || {};
        const short =
            a.amenity ||
            a.shop ||
            a.tourism ||
            a.building ||
            a.leisure ||
            a.road ||
            a.suburb ||
            a.neighbourhood ||
            a.village ||
            a.town ||
            a.city ||
            data.display_name?.split(',')[0];
        const area = a.suburb || a.neighbourhood || a.town || a.city || '';
        return area ? `${short}, ${area}` : short || data.display_name;
    } catch {
        return null;
    }
}

export function RoutesAndStops({
    startCoords,
    destCoords,
    stops = [],
    onUpdateStops,
    onUpdateCoords,
    geoJson = null
}) {
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);
    const markersRef = useRef([]);
    const polylineRef = useRef(null);
    const geoJsonLayerRef = useRef(null);
    const pendingMarkerRef = useRef(null);
    const phaseRef = useRef('start');

    const [mapReady, setMapReady] = useState(false);
    const [clickPhase, setClickPhase] = useState('start');  // 'start' | 'dest' | 'stop'

    // Editable address fields
    const [startAddr, setStartAddr] = useState('');
    const [destAddr, setDestAddr] = useState('');

    // Geocoding loading states
    const [loadingStart, setLoadingStart] = useState(false);
    const [loadingDest, setLoadingDest] = useState(false);
    const [loadingStop, setLoadingStop] = useState(false);

    // Pending stop waiting for name/category confirmation
    const [pendingStop, setPendingStop] = useState(null);  // { lat, lng, name }

    // Keep phase ref in sync
    useEffect(() => { phaseRef.current = clickPhase; }, [clickPhase]);

    // ── Phase hint config ───────────────────────────────────────────────────
    const phaseConfig = {
        start: { text: 'Click on the map to set the Start Point', color: '#f97316', bg: '#fff7ed', border: '#fed7aa' },
        dest: { text: 'Click on the map to set the Destination', color: '#1e293b', bg: '#f8fafc', border: '#cbd5e1' },
        stop: { text: 'Click between Start & Destination to add a Stop', color: '#10b981', bg: '#f0fdf4', border: '#86efac' }
    };
    const { text: phaseText, color: phaseColor, bg: phaseBg, border: phaseBorder } = phaseConfig[clickPhase];

    // ── Init Leaflet map once ───────────────────────────────────────────────
    useEffect(() => {
        const tryInit = () => {
            const L = getL();
            if (!L || !mapContainerRef.current) { setTimeout(tryInit, 300); return; }
            if (mapRef.current) return;

            const centre = startCoords
                ? [Number(startCoords.lat), Number(startCoords.lng)]
                : DEFAULT_CENTER;

            const map = L.map(mapContainerRef.current, {
                center: centre, zoom: DEFAULT_ZOOM,
                zoomControl: false, attributionControl: true
            });

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                maxZoom: 19
            }).addTo(map);

            // ── Click → reverse‑geocode → fill input ───────────────────────
            map.on('click', async (e) => {
                const { lat, lng } = e.latlng;
                const phase = phaseRef.current;

                if (phase === 'start') {
                    onUpdateCoords?.('start', { lat, lng });
                    setClickPhase('dest');
                    setLoadingStart(true);
                    const name = await reverseGeocode(lat, lng);
                    setStartAddr(name || `${lat.toFixed(5)}, ${lng.toFixed(5)}`);
                    setLoadingStart(false);

                } else if (phase === 'dest') {
                    onUpdateCoords?.('dest', { lat, lng });
                    setClickPhase('stop');
                    setLoadingDest(true);
                    const name = await reverseGeocode(lat, lng);
                    setDestAddr(name || `${lat.toFixed(5)}, ${lng.toFixed(5)}`);
                    setLoadingDest(false);

                } else {
                    // Stop phase – reverse‑geocode and pre‑fill the stop name
                    setLoadingStop(true);
                    const name = await reverseGeocode(lat, lng);
                    setLoadingStop(false);
                    setPendingStop({ lat, lng, name: name || `${lat.toFixed(5)}, ${lng.toFixed(5)}` });
                }
            });

            mapRef.current = map;
            setMapReady(true);
        };

        tryInit();
        return () => { if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; } };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // ── Marker factory ──────────────────────────────────────────────────────
    const makeMarker = useCallback((latlng, color, label) => {
        const L = getL();
        if (!L) return null;
        const icon = L.divIcon({
            className: '',
            html: `<div style="
                width:32px;height:32px;border-radius:50%;
                background:${color};border:3px solid white;
                box-shadow:0 3px 10px rgba(0,0,0,0.3);
                display:flex;align-items:center;justify-content:center;
                color:white;font-size:11px;font-weight:800;
            ">${label}</div>`,
            iconSize: [32, 32], iconAnchor: [16, 16]
        });
        return L.marker(latlng, { icon });
    }, []);

    // ── Pending-stop pulse marker ───────────────────────────────────────────
    useEffect(() => {
        const L = getL();
        if (!L || !mapRef.current) return;
        if (pendingMarkerRef.current) { pendingMarkerRef.current.remove(); pendingMarkerRef.current = null; }
        if (pendingStop) {
            const icon = L.divIcon({
                className: '',
                html: `<div style="
                    width:26px;height:26px;border-radius:50%;
                    background:#10b981;border:3px solid white;
                    box-shadow:0 0 0 5px rgba(16,185,129,0.25);
                    animation:pulse-ring 1.2s ease-out infinite;
                "></div>`,
                iconSize: [26, 26], iconAnchor: [13, 13]
            });
            pendingMarkerRef.current = L.marker(
                [pendingStop.lat, pendingStop.lng], { icon }
            ).bindTooltip(pendingStop.name || 'New Stop', { permanent: false, direction: 'top' })
                .addTo(mapRef.current);
        }
    }, [pendingStop]);

    // ── Redraw markers + route whenever data changes ────────────────────────
    useEffect(() => {
        const L = getL();
        if (!L || !mapRef.current || !mapReady) return;
        const map = mapRef.current;

        markersRef.current.forEach(m => m.remove());
        markersRef.current = [];
        if (polylineRef.current) { polylineRef.current.remove(); polylineRef.current = null; }
        if (geoJsonLayerRef.current) { geoJsonLayerRef.current.remove(); geoJsonLayerRef.current = null; }

        const hasStart = startCoords?.lat && startCoords?.lng;
        const hasDest = destCoords?.lat && destCoords?.lng;

        if (hasStart) {
            const m = makeMarker([Number(startCoords.lat), Number(startCoords.lng)], '#f97316', 'S');
            m?.bindTooltip(startAddr || 'Start', { direction: 'top' }).addTo(map);
            if (m) markersRef.current.push(m);
        }

        (stops || []).forEach((s, i) => {
            const lat = Number(s.coords?.lat), lng = Number(s.coords?.lng);
            if (!lat || !lng) return;
            const m = makeMarker([lat, lng], getStopColor(s.type), i + 1);
            m?.bindTooltip(s.name || `Stop ${i + 1}`, { direction: 'top' }).addTo(map);
            if (m) markersRef.current.push(m);
        });

        if (hasDest) {
            const m = makeMarker([Number(destCoords.lat), Number(destCoords.lng)], '#1e293b', 'D');
            m?.bindTooltip(destAddr || 'Destination', { direction: 'top' }).addTo(map);
            if (m) markersRef.current.push(m);
        }

        if (geoJson) {
            geoJsonLayerRef.current = getL().geoJSON(geoJson, {
                style: () => ({ color: ROUTE_COLOR, weight: 5, opacity: 0.85, lineJoin: 'round', lineCap: 'round' }),
                pointToLayer: (_, ll) => getL().circleMarker(ll, {
                    radius: 7, fillColor: ROUTE_COLOR, color: '#fff', weight: 2, fillOpacity: 1
                }),
                onEachFeature: (f, l) => f.properties?.name && l.bindTooltip(f.properties.name)
            }).addTo(map);
            try {
                const b = geoJsonLayerRef.current.getBounds();
                if (b.isValid()) map.fitBounds(b, { padding: [50, 50] });
            } catch (_) { }
        } else if (hasStart || hasDest) {
            const pts = [
                ...(hasStart ? [[Number(startCoords.lat), Number(startCoords.lng)]] : []),
                ...(stops || []).map(s => [Number(s.coords?.lat), Number(s.coords?.lng)]).filter(([a, b]) => a && b),
                ...(hasDest ? [[Number(destCoords.lat), Number(destCoords.lng)]] : [])
            ];
            if (pts.length >= 2) {
                polylineRef.current = getL().polyline(pts, {
                    color: ROUTE_COLOR, weight: 5, opacity: 0.85,
                    lineJoin: 'round', lineCap: 'round',
                    dashArray: hasDest ? null : '10, 8'
                }).addTo(map);
                const b = getL().latLngBounds(pts);
                if (b.isValid()) map.fitBounds(b, { padding: [60, 60] });
            }
        }
    }, [mapReady, startCoords, destCoords, stops, geoJson, makeMarker, startAddr, destAddr]);

    // ── Map controls ────────────────────────────────────────────────────────
    const zoomIn = () => mapRef.current?.zoomIn();
    const zoomOut = () => mapRef.current?.zoomOut();
    const reCentre = () => {
        if (!mapRef.current) return;
        const c = startCoords ? [Number(startCoords.lat), Number(startCoords.lng)] : DEFAULT_CENTER;
        mapRef.current.setView(c, DEFAULT_ZOOM);
    };
    const resetPhase = () => { setClickPhase('start'); setPendingStop(null); };

    // ── Confirm pending stop ────────────────────────────────────────────────
    const confirmStop = () => {
        const nameEl = document.getElementById('new-stop-name');
        const catEl = document.getElementById('new-stop-category');
        const name = nameEl?.value?.trim();
        const type = catEl?.value;
        if (!name || !type || type === 'Select category' || !pendingStop) return;
        onUpdateStops([...stops, {
            id: Date.now(), name, type,
            coords: { lat: pendingStop.lat, lng: pendingStop.lng }
        }]);
        setPendingStop(null);
        if (nameEl) nameEl.value = '';
        if (catEl) catEl.value = 'Select category';
    };

    // progress steps
    const steps = [
        { key: 'start', label: 'Start', color: '#f97316', done: !!(startCoords?.lat) },
        { key: 'dest', label: 'Destination', color: '#1e293b', done: !!(destCoords?.lat) },
        { key: 'stop', label: 'Stops', color: '#10b981', done: stops.length > 0 }
    ];

    return (
        <div style={{
            background: 'white', borderRadius: '32px',
            border: '1.5px solid #f1f5f9',
            boxShadow: '0 8px 30px -10px rgba(0,0,0,0.06)',
            display: 'flex', flex: 1, height: '100%', minHeight: 0, overflow: 'hidden'
        }}>
            <div className="routes-content-grid" style={{
                display: 'grid', gridTemplateColumns: '390px 1fr',
                flex: 1, minHeight: 0, overflow: 'hidden'
            }}>

                {/* ══ LEFT PANEL ════════════════════════════════════════════ */}
                <div style={{
                    display: 'flex', flexDirection: 'column', gap: '0.9rem',
                    overflowY: 'auto', padding: '2rem 1.75rem 2rem 2.5rem',
                    borderRight: '1.5px solid #f1f5f9',
                    scrollbarWidth: 'thin', scrollbarColor: '#f1f5f9 transparent'
                }}>
                    {/* Header */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', paddingBottom: '0.25rem' }}>
                        <div style={{
                            width: '44px', height: '44px', borderRadius: '14px',
                            background: 'linear-gradient(135deg,#fff7ed,#ffedd5)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                        }}>
                            <MapPin size={22} color="#f97316" />
                        </div>
                        <div>
                            <h2 style={{ fontSize: '1.25rem', fontFamily: 'Lora,serif', fontWeight: 700, color: '#0f172a', margin: 0 }}>Routes &amp; Stops</h2>
                            <p style={{ fontSize: '0.72rem', color: '#94a3b8', margin: '2px 0 0', fontWeight: 500 }}>Click the map or type to set locations</p>
                        </div>
                    </div>

                    {/* Step progress */}
                    <div style={{ display: 'flex', alignItems: 'center', background: '#f8fafc', borderRadius: '14px', padding: '0.65rem 1rem' }}>
                        {steps.map((s, i) => (
                            <React.Fragment key={s.key}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' }}>
                                    <div style={{
                                        width: '26px', height: '26px', borderRadius: '50%',
                                        background: s.done ? s.color : (clickPhase === s.key ? s.color + '22' : '#e2e8f0'),
                                        border: `2px solid ${s.done ? s.color : (clickPhase === s.key ? s.color : '#e2e8f0')}`,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s'
                                    }}>
                                        {s.done
                                            ? <Check size={11} color="white" strokeWidth={3} />
                                            : <div style={{ width: 6, height: 6, borderRadius: '50%', background: clickPhase === s.key ? s.color : '#cbd5e1' }} />
                                        }
                                    </div>
                                    <span style={{ fontSize: '0.58rem', fontWeight: 700, color: s.done ? s.color : '#94a3b8' }}>{s.label}</span>
                                </div>
                                {i < steps.length - 1 && (
                                    <div style={{ flex: 1, height: '2px', background: steps[i].done ? steps[i].color + '55' : '#e2e8f0', margin: '0 4px 14px' }} />
                                )}
                            </React.Fragment>
                        ))}
                    </div>

                    {/* Phase hint */}
                    <div style={{
                        padding: '0.55rem 0.85rem', borderRadius: '11px',
                        background: phaseBg, border: `1.5px solid ${phaseBorder}`,
                        display: 'flex', alignItems: 'center', gap: '0.45rem'
                    }}>
                        <Navigation size={12} color={phaseColor} />
                        <span style={{ fontSize: '0.7rem', fontWeight: 700, color: phaseColor, flex: 1 }}>{phaseText}</span>
                        {clickPhase !== 'start' && (
                            <button onClick={resetPhase} title="Reset" style={{ background: 'none', border: 'none', cursor: 'pointer', color: phaseColor, padding: 0, display: 'flex' }}>
                                <RotateCcw size={12} />
                            </button>
                        )}
                    </div>

                    {/* ── Start Point input (editable + map-clickable) ─────── */}
                    <div>
                        <label style={labelStyle}>
                            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#f97316', display: 'inline-block', marginRight: 6 }} />
                            Start Point
                        </label>
                        <div style={{ position: 'relative' }}>
                            <input
                                value={startAddr}
                                onChange={e => setStartAddr(e.target.value)}
                                placeholder="Type a location or click the map…"
                                style={{
                                    ...inputSm,
                                    borderColor: startCoords?.lat ? '#f97316' : '#e2e8f0',
                                    paddingRight: loadingStart ? '2.5rem' : '0.85rem'
                                }}
                            />
                            {loadingStart && (
                                <span style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)' }}>
                                    <SpinIcon color="#f97316" />
                                </span>
                            )}
                        </div>
                        {startCoords?.lat && (
                            <p style={coordHint}>{Number(startCoords.lat).toFixed(5)}, {Number(startCoords.lng).toFixed(5)}</p>
                        )}
                    </div>

                    {/* ── Destination input (editable + map-clickable) ──────── */}
                    <div>
                        <label style={labelStyle}>
                            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#1e293b', display: 'inline-block', marginRight: 6 }} />
                            Destination
                        </label>
                        <div style={{ position: 'relative' }}>
                            <input
                                value={destAddr}
                                onChange={e => setDestAddr(e.target.value)}
                                placeholder="Type a location or click the map…"
                                style={{
                                    ...inputSm,
                                    borderColor: destCoords?.lat ? '#1e293b' : '#e2e8f0',
                                    paddingRight: loadingDest ? '2.5rem' : '0.85rem'
                                }}
                            />
                            {loadingDest && (
                                <span style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)' }}>
                                    <SpinIcon color="#1e293b" />
                                </span>
                            )}
                        </div>
                        {destCoords?.lat && (
                            <p style={coordHint}>{Number(destCoords.lat).toFixed(5)}, {Number(destCoords.lng).toFixed(5)}</p>
                        )}
                    </div>

                    {/* ── Stops list ───────────────────────────────────────── */}
                    {stops.length > 0 && (
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.55rem' }}>
                                <MapPin size={13} color="#10b981" fill="#10b98133" />
                                <h3 style={{ fontSize: '0.73rem', fontWeight: 800, color: '#1e293b', margin: 0 }}>Stops ({stops.length})</h3>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                {stops.map((stop, i) => {
                                    const { color } = getStopStyles(stop.type);
                                    return (
                                        <div key={stop.id} style={stopCard}>
                                            <div style={{
                                                width: '26px', height: '26px', borderRadius: '50%',
                                                background: color, display: 'flex', alignItems: 'center',
                                                justifyContent: 'center', color: 'white', flexShrink: 0,
                                                fontSize: '11px', fontWeight: 800
                                            }}>{i + 1}</div>
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <div style={{ fontSize: '0.76rem', fontWeight: 700, color: '#1e293b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{stop.name}</div>
                                                <div style={{ fontSize: '0.6rem', color: '#94a3b8', fontWeight: 600 }}>{stop.type}</div>
                                            </div>
                                            <button onClick={() => onUpdateStops(stops.filter(s => s.id !== stop.id))}
                                                style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer', padding: '4px', borderRadius: '6px' }}
                                                onMouseEnter={e => e.currentTarget.style.color = '#ef4444'}
                                                onMouseLeave={e => e.currentTarget.style.color = '#cbd5e1'}
                                            >
                                                <Trash2 size={13} />
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* ── Confirm stop form (appears after map click in stop phase) ── */}
                    <div style={{ marginTop: stops.length === 0 ? 'auto' : '0' }}>
                        {pendingStop ? (
                            <div style={{
                                background: '#f0fdf4', padding: '1rem', borderRadius: '14px',
                                border: '1.5px solid #86efac'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.7rem' }}>
                                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e' }} />
                                    <span style={{ fontSize: '0.63rem', fontWeight: 800, color: '#15803d', textTransform: 'uppercase' }}>Stop Pinned — Fill Details</span>
                                </div>

                                {/* Stop name pre-filled from geocode, but editable */}
                                <div style={{ marginBottom: '0.6rem' }}>
                                    <label style={{ fontSize: '0.68rem', fontWeight: 700, color: '#374151', display: 'block', marginBottom: '0.3rem' }}>Stop Name</label>
                                    <div style={{ position: 'relative' }}>
                                        <input
                                            id="new-stop-name"
                                            autoFocus
                                            defaultValue={pendingStop.name}
                                            style={{ ...inputSm, background: 'white', borderColor: '#86efac', paddingRight: loadingStop ? '2.5rem' : '0.85rem' }}
                                            placeholder="e.g. Annathanam Tent"
                                        />
                                        {loadingStop && (
                                            <span style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)' }}>
                                                <SpinIcon color="#10b981" />
                                            </span>
                                        )}
                                    </div>
                                    <p style={coordHint}>{pendingStop.lat.toFixed(5)}, {pendingStop.lng.toFixed(5)}</p>
                                </div>

                                <div style={{ marginBottom: '0.75rem' }}>
                                    <label style={{ fontSize: '0.68rem', fontWeight: 700, color: '#374151', display: 'block', marginBottom: '0.3rem' }}>Category</label>
                                    <div style={{ position: 'relative' }}>
                                        <select id="new-stop-category" style={{ ...inputSm, background: 'white', borderColor: '#86efac', WebkitAppearance: 'none' }}>
                                            <option>Select category</option>
                                            <option>Annathanam</option>
                                            <option>Resting Place/Park</option>
                                            <option>Medical</option>
                                        </select>
                                        <ChevronDown size={13} style={{ position: 'absolute', right: '0.65rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none' }} />
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <button onClick={confirmStop} style={confirmBtn}>
                                        <Plus size={13} /> Add Stop
                                    </button>
                                    <button onClick={() => setPendingStop(null)} style={cancelBtn}>Cancel</button>
                                </div>
                            </div>
                        ) : clickPhase === 'stop' && (
                            <div style={{
                                padding: '0.85rem 1rem', borderRadius: '12px',
                                background: '#f0fdf4', border: '1.5px dashed #86efac', textAlign: 'center'
                            }}>
                                <p style={{ fontSize: '0.72rem', color: '#16a34a', fontWeight: 700, margin: 0 }}>
                                    👆 Click the map to pin a new stop
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* ══ RIGHT: MAP ════════════════════════════════════════════ */}
                <div style={{ padding: '2rem 2.5rem 2rem 2rem', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
                    <div style={{ position: 'relative', flex: 1, borderRadius: '20px', overflow: 'hidden', background: '#e5e7eb' }}>

                        {/* Leaflet map */}
                        <div ref={mapContainerRef} style={{ width: '100%', height: '100%', borderRadius: '20px' }} />

                        {/* Loading overlay */}
                        {!mapReady && (
                            <div style={{
                                position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
                                alignItems: 'center', justifyContent: 'center',
                                background: '#f8fafc', borderRadius: '20px', gap: '0.5rem'
                            }}>
                                <div style={{ width: 32, height: 32, borderRadius: '50%', border: '3px solid #f97316', borderTopColor: 'transparent', animation: 'spin 0.8s linear infinite' }} />
                                <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 700 }}>Loading OpenStreetMap…</span>
                            </div>
                        )}

                        {/* Floating phase badge */}
                        {mapReady && (
                            <div style={{
                                position: 'absolute', top: '1rem', left: '50%', transform: 'translateX(-50%)',
                                background: 'white', borderRadius: '40px', padding: '0.4rem 1.1rem', zIndex: 500,
                                display: 'flex', alignItems: 'center', gap: '0.4rem',
                                boxShadow: '0 4px 14px rgba(0,0,0,0.12)',
                                fontSize: '0.72rem', fontWeight: 700, color: phaseColor,
                                border: `1.5px solid ${phaseBorder}`, whiteSpace: 'nowrap',
                                maxWidth: 'calc(100% - 2rem)'
                            }}>
                                <span style={{ width: 8, height: 8, borderRadius: '50%', background: phaseColor, display: 'inline-block' }} />
                                {clickPhase === 'start' ? '👆 Click to pin Start'
                                    : clickPhase === 'dest' ? '👆 Click to pin Destination'
                                        : '👆 Click to add a Stop'}
                            </div>
                        )}

                        {/* Zoom controls */}
                        <div style={{ position: 'absolute', bottom: '1.25rem', right: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.6rem', zIndex: 500 }}>
                            <button className="map-util-btn" onClick={zoomIn} title="Zoom in"><ZoomIn size={18} /></button>
                            <button className="map-util-btn" onClick={zoomOut} title="Zoom out"><ZoomOut size={18} /></button>
                            <button className="map-util-btn" onClick={reCentre} style={{ background: '#f97316', color: 'white' }} title="Re-centre"><Locate size={18} /></button>
                        </div>
                    </div>

                    {/* Legend */}
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '0.65rem', flexWrap: 'wrap' }}>
                        {[
                            { color: '#f97316', label: 'Start' },
                            { color: '#1e293b', label: 'Destination' },
                            { color: '#10b981', label: 'Annathanam' },
                            { color: '#f97316', label: 'Rest Stop' },
                            { color: '#ef4444', label: 'Medical' }
                        ].map(item => (
                            <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                <div style={{ width: 9, height: 9, borderRadius: '50%', background: item.color, border: '2px solid white', boxShadow: '0 1px 4px rgba(0,0,0,0.18)' }} />
                                <span style={{ fontSize: '0.63rem', fontWeight: 600, color: '#94a3b8' }}>{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Global Styles ─────────────────────────────────────────── */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes spin { to { transform: rotate(360deg); } }
                @keyframes pulse-ring {
                    0%   { box-shadow: 0 0 0 0   rgba(16,185,129,0.5); }
                    70%  { box-shadow: 0 0 0 10px rgba(16,185,129,0);   }
                    100% { box-shadow: 0 0 0 0   rgba(16,185,129,0);   }
                }
                .map-util-btn {
                    width:40px;height:40px;border-radius:10px;border:none;
                    background:white;box-shadow:0 4px 12px rgba(0,0,0,0.12);
                    color:#1e293b;cursor:pointer;
                    display:flex;align-items:center;justify-content:center;
                    transition:all 0.2s;
                }
                .map-util-btn:hover { transform:translateY(-2px); box-shadow:0 6px 16px rgba(0,0,0,0.18); }
                .leaflet-tooltip {
                    font-family:Outfit,sans-serif!important;
                    font-size:11px!important;font-weight:700!important;
                    border-radius:8px!important;border:none!important;
                    box-shadow:0 4px 12px rgba(0,0,0,0.12)!important;
                    padding:3px 9px!important;
                }
                .leaflet-control-attribution { font-size:9px!important; }
                @media (max-width:768px) {
                    .routes-content-grid { grid-template-columns:1fr!important; }
                }
            `}} />
        </div>
    );
}

// ── Tiny spinner icon ─────────────────────────────────────────────────────────
function SpinIcon({ color }) {
    return (
        <div style={{
            width: 14, height: 14, borderRadius: '50%',
            border: `2px solid ${color}33`,
            borderTopColor: color,
            animation: 'spin 0.7s linear infinite'
        }} />
    );
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function getStopColor(type) {
    switch (type) {
        case 'Annathanam': return '#10b981';
        case 'Resting Place/Park': return '#f97316';
        case 'Medical': return '#ef4444';
        default: return '#3b82f6';
    }
}
function getStopStyles(type) {
    switch (type) {
        case 'Annathanam': return { icon: <Utensils size={13} />, color: '#10b981' };
        case 'Resting Place/Park': return { icon: <Trees size={13} />, color: '#f97316' };
        case 'Medical': return { icon: <Stethoscope size={13} />, color: '#ef4444' };
        default: return { icon: <MapPin size={13} />, color: '#3b82f6' };
    }
}

// ── Style objects ─────────────────────────────────────────────────────────────
const labelStyle = {
    fontSize: '0.72rem', fontWeight: 700, color: '#1e293b',
    display: 'flex', alignItems: 'center', marginBottom: '0.35rem'
};
const inputSm = {
    width: '100%', padding: '0.6rem 0.85rem',
    borderRadius: '10px', border: '1.5px solid #e2e8f0',
    background: '#f8fafc', fontSize: '0.78rem', fontWeight: 600,
    outline: 'none', color: '#1e293b', boxSizing: 'border-box',
    fontFamily: 'inherit', transition: 'border-color 0.2s'
};
const coordHint = {
    fontSize: '0.62rem', color: '#94a3b8', fontWeight: 600,
    margin: '3px 0 0 2px', fontFamily: 'monospace'
};
const stopCard = {
    background: 'white', padding: '0.5rem 0.65rem', borderRadius: '11px',
    border: '1.5px solid #f1f5f9', display: 'flex', alignItems: 'center',
    gap: '0.6rem', boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
};
const confirmBtn = {
    flex: 1, padding: '0.55rem', borderRadius: '9px', border: 'none',
    background: '#10b981', color: 'white', fontWeight: 700,
    fontSize: '0.75rem', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem',
    transition: 'all 0.2s'
};
const cancelBtn = {
    padding: '0.55rem 0.75rem', borderRadius: '9px',
    border: '1.5px solid #e2e8f0', background: 'white',
    color: '#94a3b8', fontWeight: 700, fontSize: '0.75rem',
    cursor: 'pointer', transition: 'all 0.2s'
};
