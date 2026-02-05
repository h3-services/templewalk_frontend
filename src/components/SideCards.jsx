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


        </div>
    );
}
