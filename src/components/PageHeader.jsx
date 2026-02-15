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
            case '/dashboard':
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
            case '/media':
                return { name: 'MEDIA', title: null, action: null };
            case '/sos-requests':
                return { name: 'SOS REQUESTS', title: null, action: null };
            case '/notifications':
                return { name: 'NOTIFICATIONS', title: null, action: null };
            case '/settings':
                return { name: 'SETTINGS', title: 'CONFIG', action: null };
            case '/guide-creation':
                return { name: 'VRATHAM GUIDE', title: 'CREATION', action: null };
            default:
                return { name: 'ADMIN', title: 'CONSOLE', action: null };
        }
    };

    const current = getPageDetails();

    return (
        <div className="page-header-container" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 0,
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
                    color: '#94a3b8',
                    height: '40px', // Match hamburger height
                    whiteSpace: 'nowrap'
                }}>
                    <Link to="/dashboard" style={{ textDecoration: 'none', color: '#94a3b8' }} title="Go to Dashboard">ADMIN</Link>
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

            <div className="header-right" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', height: '40px' }}>
                {/* Specific actions for Event Creation */}
                {current.action === 'Draft' && (
                    <div className="header-draft-actions" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <button onClick={onDiscard} style={{ background: 'none', border: 'none', color: '#64748b', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}>Discard</button>
                        <button onClick={onSaveDraft} style={{
                            background: '#F97316',
                            color: 'white',
                            padding: '0.6rem 1.25rem',
                            borderRadius: '10px',
                            border: 'none',
                            fontWeight: 800,
                            fontSize: '0.85rem',
                            cursor: 'pointer',
                            boxShadow: '0 4px 12px rgba(249, 115, 22, 0.2)',
                            whiteSpace: 'nowrap'
                        }}>Save Draft</button>
                    </div>
                )}
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @media (max-width: 768px) {
                    .page-header-container {
                        padding: 0 !important;
                    }
                    .breadcrumbs {
                        padding-left: 4.5rem !important;
                    }
                    .header-mobile-spacer {
                        display: none !important;
                    }
                    .header-right {
                        gap: 0.75rem !important;
                    }
                    .header-draft-actions button {
                        padding: 0.5rem 0.74rem !important;
                        font-size: 0.7rem !important;
                    }
                }
                @media (max-width: 480px) {
                    .breadcrumbs {
                        gap: 0.4rem !important;
                        font-size: 0.6rem !important;
                    }
                }
            `}} />
        </div>
    );
}
