import React from 'react';
import { useLocation, Link } from '../simple-router';
import { ChevronRight, Plus, Download } from 'lucide-react';

export function PageHeader({
    onDiscard,
    onSaveDraft,
    view
}) {
    const location = useLocation();

    const getPageDetails = () => {
        const path = location.pathname;
        switch (path) {
            case '/':
                return { name: 'DASHBOARD', title: null, action: null };
            case '/events':
                return {
                    name: 'EVENTS',
                    title: view === 'create' ? 'CREATE EVENT' : null,
                    action: view === 'create' ? 'Draft' : null
                };
            case '/devotees':
                return { name: 'DEVOTEE DIRECTORY', title: null, action: 'devotee' };
            case '/volunteers':
                return { name: 'VOLUNTEER FORCE', title: null, action: null };
            case '/notifications':
                return { name: 'NOTIFICATIONS', title: 'ANNOUNCEMENTS', action: null };
            case '/donations':
                return { name: 'DONATIONS', title: 'FINANCIALS', action: null };
            case '/medias':
                return { name: 'MEDIA LIBRARY', title: 'PLAYLISTS', action: null };
            case '/payments':
                return { name: 'PAYMENT CONFIG', title: 'GATEWAYS', action: null };
            default:
                return { name: 'ADMIN', title: 'CONSOLE', action: null };
        }
    };

    const current = getPageDetails();

    return (
        <div className="page-header" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0.5rem 0 1.5rem',
            border: 'none',
            background: 'transparent'
        }}>
            <div className="header-left">
                <div className="breadcrumbs" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    fontSize: '0.65rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: '#94a3b8'
                }}>
                    <Link to="/" style={{ textDecoration: 'none', color: '#94a3b8' }} title="Go to Dashboard">ADMIN</Link>
                    <ChevronRight size={14} />

                    {/* Universal Clickable Parent Logic */}
                    {current.title ? (
                        <span
                            onClick={onDiscard}
                            style={{ color: '#1e293b', cursor: 'pointer' }}
                            title={`Back to ${current.name}`}
                        >
                            {current.name}
                        </span>
                    ) : (
                        <span style={{ color: '#F97316' }}>{current.name}</span>
                    )}

                    {/* Final Breadcrumb: Sub-level title */}
                    {current.title && (
                        <>
                            <ChevronRight size={14} />
                            <span style={{ color: '#F97316' }}>{current.title}</span>
                        </>
                    )}
                </div>
            </div>

            <div className="header-right" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                {/* Specific actions for Devotees Page */}
                {location.pathname === '/devotees' && (
                    <>
                        <button style={{
                            background: 'none',
                            border: 'none',
                            color: '#64748b',
                            fontSize: '0.85rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem'
                        }}>
                            Export Directory
                        </button>
                        <button style={{
                            background: '#F97316',
                            color: 'white',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '12px',
                            border: 'none',
                            fontWeight: 800,
                            fontSize: '0.85rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.6rem',
                            cursor: 'pointer',
                            boxShadow: '0 4px 12px rgba(249, 115, 22, 0.2)'
                        }}>
                            <Plus size={18} strokeWidth={3} /> Register New Devotee
                        </button>
                    </>
                )}

                {/* Specific actions for Event Creation */}
                {current.action === 'Draft' && (
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <button onClick={onDiscard} style={{ background: 'none', border: 'none', color: '#64748b', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer' }}>Discard Changes</button>
                        <button onClick={onSaveDraft} style={{
                            background: '#F97316',
                            color: 'white',
                            padding: '0.6rem 1.25rem',
                            borderRadius: '10px',
                            border: 'none',
                            fontWeight: 800,
                            fontSize: '0.85rem',
                            cursor: 'pointer',
                            boxShadow: '0 4px 12px rgba(249, 115, 22, 0.2)'
                        }}>Save Draft</button>
                    </div>
                )}
            </div>
        </div>
    );
}
