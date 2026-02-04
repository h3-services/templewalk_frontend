import React, { useState } from 'react';
import {
    ArrowRight,
    Check,
    MapPin,
    Music,
    Settings,
    LayoutDashboard
} from 'lucide-react';

// --- Components ---
import {
    Sidebar,
    PageHeader,
    ProgressSteps,
    EventForm,
    RoutesAndStops,
    SongsUpload,
    PaymentConfig,
    Devotees,
    Volunteers,
    Notifications,
    SideCards
} from './components';

function App() {
    const [activeTab, setActiveTab] = useState('Dashboard');
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        eventName: '',
        eventDate: '',
        startTime: '',
        contact: '',
        description: ''
    });
    const [lastSaved, setLastSaved] = useState('10:45 AM');

    const handleSaveNext = () => {
        if (currentStep < 4) {
            setCurrentStep(prev => prev + 1);
            setLastSaved(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        } else {
            alert("Event setup complete! Reviewing your details...");
            console.log("Final Form Data:", formData);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const handleDiscard = () => {
        if (window.confirm("Are you sure you want to discard this event setup? All progress will be lost.")) {
            setFormData({
                eventName: '',
                eventDate: '',
                startTime: '',
                contact: '',
                description: ''
            });
            setCurrentStep(1);
        }
    };

    const handleSaveDraft = () => {
        setLastSaved(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        alert("Draft saved successfully!");
        console.log("Draft data:", formData);
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'Dashboard':
                return (
                    <>
                        <ProgressSteps currentStep={currentStep} setStep={setCurrentStep} />
                        <div className={`content-grid ${currentStep !== 1 ? 'full-width' : ''}`}>
                            <section>
                                {currentStep === 1 && (
                                    <EventForm formData={formData} setFormData={setFormData} />
                                )}
                                {currentStep === 2 && (
                                    <RoutesAndStops />
                                )}
                                {currentStep === 3 && (
                                    <SongsUpload />
                                )}
                                {currentStep === 4 && (
                                    <PaymentConfig />
                                )}

                                <div className="footer-actions">
                                    <span className="auto-save">Auto-saved at {lastSaved}</span>
                                    <div className="action-buttons">
                                        <button
                                            onClick={handlePrevious}
                                            className="btn btn-outline"
                                            disabled={currentStep === 1}
                                            style={{ borderColor: '#e5e7eb', color: 'var(--text-main)', opacity: currentStep === 1 ? 0.5 : 1 }}
                                        >
                                            Previous
                                        </button>
                                        <button
                                            onClick={handleSaveNext}
                                            className="btn btn-primary"
                                            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                                        >
                                            {currentStep === 4 ? 'Complete' : 'Save & Next'}
                                            {currentStep < 4 ? <ArrowRight size={18} /> : <Check size={18} />}
                                        </button>
                                    </div>
                                </div>
                            </section>

                            {currentStep === 1 && (
                                <aside>
                                    <SideCards />
                                </aside>
                            )}
                        </div>
                    </>
                );
            case 'Devotees':
                return <Devotees />;
            case 'Volunteers':
                return <Volunteers />;
            case 'Notifications':
                return <Notifications />;
            case 'Medias':
                return <SongsUpload />;
            case 'Payments':
                return <PaymentConfig />;
            default:
                return (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', gap: '1rem' }}>
                        <LayoutDashboard size={64} style={{ color: '#e5e7eb' }} />
                        <h2 style={{ color: '#1f2937' }}>{activeTab} Management</h2>
                        <p style={{ color: '#6b7280' }}>This section is currently under development.</p>
                    </div>
                );
        }
    };

    return (
        <div className="app-container">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            <main className="main-content">
                <PageHeader
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    onDiscard={handleDiscard}
                    onSaveDraft={handleSaveDraft}
                />
                {renderContent()}
            </main>
        </div>
    );
}

export default App;
