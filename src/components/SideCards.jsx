import React from 'react';
import { Check, HelpCircle } from 'lucide-react';

export function SideCards() {
    return (
        <div className="side-cards">
            <div className="info-card tips-card">
                <h3>Quick Setup Tips</h3>
                <div className="tips-list">
                    <div className="tip-item">
                        <Check size={32} />
                        <p>Ensure the event name includes the year for better archiving.</p>
                    </div>
                    <div className="tip-item">
                        <Check size={32} />
                        <p>Set a start time at least 30 mins before the actual walk for congregation.</p>
                    </div>
                    <div className="tip-item">
                        <Check size={32} />
                        <p>The helpline number should be reachable 24/7 during the event.</p>
                    </div>
                </div>
            </div>

            <div className="info-card help-card">
                <div className="help-card-header">
                    <div className="help-icon">
                        <HelpCircle size={20} />
                    </div>
                    <h4 style={{ fontWeight: 700 }}>Need Help?</h4>
                </div>
                <p>Our support team is available to help you configure your spiritual journey details.</p>
                <button
                    onClick={() => alert("Connecting you with an expert...")}
                    className="btn btn-outline"
                    style={{ width: '100%', borderColor: '#f3f4f6', color: 'var(--text-main)' }}
                >
                    Talk to an Expert
                </button>
            </div>
        </div>
    );
}
