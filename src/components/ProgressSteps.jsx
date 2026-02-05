import { Info, Map, Music, CreditCard, ChevronRight } from 'lucide-react';

export function ProgressSteps({ currentStep, setStep }) {
    const steps = [
        { id: 1, label: 'Basic Info', icon: <Info size={18} /> },
        { id: 2, label: 'Routes & Logistics', icon: <Map size={18} /> },
        { id: 3, label: 'Media Library', icon: <Music size={18} /> },
        { id: 4, label: 'Financial Setup', icon: <CreditCard size={18} /> },
    ];

    return (
        <div className="progress-steps" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            marginBottom: '2.5rem',
            padding: '0.5rem',
            background: '#f8fafc',
            borderRadius: '20px',
            border: '1.5px solid #f1f5f9'
        }}>
            {steps.map((step, idx) => (
                <div key={step.id} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <button
                        onClick={() => setStep(step.id)}
                        style={{
                            border: 'none',
                            background: currentStep === step.id ? 'white' : 'transparent',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            padding: '0.6rem 1.25rem',
                            borderRadius: '14px',
                            color: currentStep === step.id ? '#1e293b' : '#94a3b8',
                            fontWeight: 800,
                            fontSize: '0.85rem',
                            boxShadow: currentStep === step.id ? '0 4px 12px rgba(0,0,0,0.05)' : 'none',
                            transition: 'all 0.2s',
                            border: currentStep === step.id ? '1.5px solid #f1f5f9' : '1.5px solid transparent'
                        }}
                    >
                        <div style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '8px',
                            background: currentStep === step.id ? '#fff7ed' : '#f1f5f9',
                            color: currentStep === step.id ? '#f97316' : '#94a3b8',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s'
                        }}>
                            {step.icon}
                        </div>
                        {step.label}
                    </button>
                    {idx < steps.length - 1 && <ChevronRight size={14} color="#cbd5e1" />}
                </div>
            ))}
        </div>
    );
}
