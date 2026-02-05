import { Check } from 'lucide-react';

export function ProgressSteps({ currentStep, setStep }) {
    const steps = [
        { id: 1, label: 'Basic Details' },
        { id: 2, label: 'Routes & Stops' },
        { id: 3, label: 'Payments Config' },
    ];

    return (
        <div className="progress-steps">
            {steps.map((step) => {
                const isCompleted = currentStep > step.id;
                const isActive = currentStep === step.id;

                return (
                    <button
                        key={step.id}
                        onClick={() => setStep(step.id)}
                        className={`step ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                        style={{ border: 'none', background: 'none', cursor: 'pointer' }}
                    >
                        <div className="step-num">
                            {isCompleted ? <Check size={16} /> : step.id}
                        </div>
                        {step.label}
                    </button>
                );
            })}
        </div>
    );
}
