import React from 'react';
import { Check, HelpCircle } from 'lucide-react';

export function SideCards() {
    return (
        <div className="side-cards" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="info-card tips-card" style={{
                background: 'linear-gradient(145deg, #f97316 0%, #ea580c 100%)',
                color: 'white',
                padding: '2.5rem 2rem',
                borderRadius: '32px',
                boxShadow: '0 20px 40px -10px rgba(249, 115, 22, 0.3)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <h3 style={{
                    fontFamily: 'Outfit, sans-serif',
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    marginBottom: '1.5rem',
                    letterSpacing: '-0.01em'
                }}>Quick Setup Tips</h3>
                <div className="tips-list" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="tip-item" style={{ display: 'flex', gap: '0.9rem', alignItems: 'flex-start' }}>
                        <div style={{
                            background: 'rgba(255,255,255,0.2)',
                            borderRadius: '50%',
                            padding: '4px',
                            display: 'flex',
                            marginTop: '2px'
                        }}>
                            <Check size={12} strokeWidth={4} />
                        </div>
                        <p style={{ fontSize: '0.85rem', lineHeight: '1.5', opacity: 0.9, fontWeight: 500 }}>
                            Ensure the event name includes the year for better archiving.
                        </p>
                    </div>
                    <div className="tip-item" style={{ display: 'flex', gap: '0.9rem', alignItems: 'flex-start' }}>
                        <div style={{
                            background: 'rgba(255,255,255,0.2)',
                            borderRadius: '50%',
                            padding: '4px',
                            display: 'flex',
                            marginTop: '2px'
                        }}>
                            <Check size={12} strokeWidth={4} />
                        </div>
                        <p style={{ fontSize: '0.85rem', lineHeight: '1.5', opacity: 0.9, fontWeight: 500 }}>
                            Set a start time at least 30 mins before the actual walk for congregation.
                        </p>
                    </div>
                    <div className="tip-item" style={{ display: 'flex', gap: '0.9rem', alignItems: 'flex-start' }}>
                        <div style={{
                            background: 'rgba(255,255,255,0.2)',
                            borderRadius: '50%',
                            padding: '4px',
                            display: 'flex',
                            marginTop: '2px'
                        }}>
                            <Check size={12} strokeWidth={4} />
                        </div>
                        <p style={{ fontSize: '0.85rem', lineHeight: '1.5', opacity: 0.9, fontWeight: 500 }}>
                            The helpline number should be reachable 24/7 during the event.
                        </p>
                    </div>
                </div>
                {/* Decorative element */}
                <div style={{
                    position: 'absolute',
                    bottom: '-20px',
                    right: '-20px',
                    opacity: 0.1,
                    transform: 'rotate(-15deg)'
                }}>
                    <HelpCircle size={120} />
                </div>
            </div>

            <div className="info-card help-card" style={{
                background: 'white',
                padding: '2.5rem 2rem',
                borderRadius: '32px',
                boxShadow: 'var(--card-shadow)',
                border: '1.5px solid #f1f5f9'
            }}>
                <div className="help-card-header" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <div className="help-icon" style={{
                        background: '#fff7ed',
                        color: '#f97316',
                        padding: '0.5rem',
                        borderRadius: '10px'
                    }}>
                        <HelpCircle size={20} />
                    </div>
                    <h4 style={{ fontWeight: 800, fontSize: '0.95rem', color: '#1e293b' }}>Need Help?</h4>
                </div>
                <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1.75rem', lineHeight: '1.6' }}>
                    Our support team is available to help you configure your spiritual journey details.
                </p>
                <button
                    onClick={() => alert("Connecting you with an expert...")}
                    style={{
                        width: '100%',
                        padding: '0.85rem',
                        borderRadius: '14px',
                        border: 'none',
                        background: '#f8fafc',
                        color: '#1e293b',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                    }}
                >
                    Talk to an Expert
                </button>
            </div>
        </div>
    );
}
