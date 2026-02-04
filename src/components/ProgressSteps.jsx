import React from 'react';

export function ProgressSteps({ currentStep, setStep }) {
    const steps = [
        { id: 1, label: 'Basic Details' },
        { id: 2, label: 'Routes & Stops' },
        { id: 3, label: 'Upload Songs' },
        { id: 4, label: 'Payments Config' },
    ];

    return (
        <div className="progress-steps">
            {steps.map((step) => (
                <button
                    key={step.id}
                    onClick={() => setStep(step.id)}
                    className={`step ${currentStep >= step.id ? 'active' : ''}`}
                    style={{ border: 'none', background: 'none', cursor: 'pointer' }}
                >
                    <div className="step-num">
                        {step.id}
                    </div>
                    {step.label}
                </button>
            ))}
        </div>
    );
}
