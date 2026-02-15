import { Check } from 'lucide-react';

export function ProgressSteps({ currentStep, setStep }) {
    const steps = [
        { id: 1, label: 'Basic Details', icon: '01' },
        { id: 2, label: 'Routes & Stops', icon: '02' },
    ];

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            padding: '0.35rem',
            background: '#f8fafc',
            borderRadius: '12px',
            width: 'fit-content',
            border: '1px solid #f1f5f9'
        }}>
            {steps.map((step, index) => {
                const isActive = currentStep === step.id;
                const isCompleted = currentStep > step.id;

                return (
                    <button
                        key={step.id}
                        onClick={() => setStep(step.id)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.5rem 1rem',
                            border: 'none',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            background: isActive
                                ? 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)'
                                : 'transparent',
                            boxShadow: isActive
                                ? '0 4px 12px rgba(249, 115, 22, 0.25)'
                                : 'none'
                        }}
                    >
                        {/* Step Number/Check */}
                        <div style={{
                            width: '22px',
                            height: '22px',
                            borderRadius: '6px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.65rem',
                            fontWeight: 800,
                            background: isActive
                                ? 'rgba(255,255,255,0.2)'
                                : isCompleted
                                    ? '#10b981'
                                    : '#e2e8f0',
                            color: isActive || isCompleted ? 'white' : '#64748b',
                            transition: 'all 0.2s ease'
                        }}>
                            {isCompleted ? <Check size={12} strokeWidth={3} /> : step.icon}
                        </div>

                        {/* Step Label */}
                        <span style={{
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            color: isActive ? 'white' : isCompleted ? '#10b981' : '#64748b',
                            transition: 'color 0.2s ease'
                        }}>
                            {step.label}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}
