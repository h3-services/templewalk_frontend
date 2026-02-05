import React, { useState } from 'react';
import { Routes, Route, Navigate } from './simple-router';
import {
    ArrowRight,
    Check
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
    SideCards,
    Dashboard,
    Donations,
    EventsManagement
} from './components';

function App() {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        eventName: '',
        eventDate: '',
        startTime: '',
        contact: '',
        description: ''
    });
    const [lastSaved, setLastSaved] = useState('10:45 AM');
    const [view, setView] = useState('list'); // 'list' or 'create'

    const handleSaveNext = () => {
        if (currentStep < 4) {
            setCurrentStep(prev => prev + 1);
            setLastSaved(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        } else {
            console.log("Final Form Data:", formData);
            setView('list');
            setCurrentStep(1);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const handleDiscard = () => {
        setFormData({
            eventName: '',
            eventDate: '',
            startTime: '',
            contact: '',
            description: ''
        });
        setCurrentStep(1);
        setView('list');
    };

    const handleSaveDraft = () => {
        setLastSaved(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        alert("Draft saved successfully!");
        console.log("Draft data:", formData);
    };

    const EventsPage = () => {
        if (view === 'list') {
            return <EventsManagement onCreateNew={() => setView('create')} />;
        }

        return (
            <>
                <ProgressSteps currentStep={currentStep} setStep={setCurrentStep} />
                <div className={`content-grid ${currentStep !== 1 ? 'full-width' : ''}`} style={{
                    display: 'grid',
                    gridTemplateColumns: currentStep === 1 ? '1fr 360px' : '1fr',
                    gap: '3rem'
                }}>
                    <section style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
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

                        <div className="footer-actions" style={{
                            marginTop: '1rem',
                            background: 'white',
                            padding: '1.25rem 2rem',
                            borderRadius: '24px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            boxShadow: 'var(--card-shadow)',
                            border: '1.5px solid #f1f5f9'
                        }}>
                            <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600 }}>
                                Auto-saved at <span style={{ color: '#64748b' }}>{lastSaved}</span>
                            </span>
                            <div className="action-buttons" style={{ display: 'flex', gap: '1rem' }}>
                                <button
                                    onClick={handlePrevious}
                                    disabled={currentStep === 1}
                                    style={{
                                        padding: '0.8rem 2rem',
                                        borderRadius: '14px',
                                        border: '1.5px solid #f1f5f9',
                                        background: 'white',
                                        color: '#64748b',
                                        fontWeight: 700,
                                        fontSize: '0.9rem',
                                        cursor: currentStep === 1 ? 'default' : 'pointer',
                                        opacity: currentStep === 1 ? 0.5 : 1
                                    }}
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={handleSaveNext}
                                    style={{
                                        padding: '0.8rem 2.5rem',
                                        borderRadius: '14px',
                                        border: 'none',
                                        background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                                        color: 'white',
                                        fontWeight: 700,
                                        fontSize: '0.9rem',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.75rem',
                                        boxShadow: '0 8px 20px -6px rgba(249, 115, 22, 0.4)'
                                    }}
                                >
                                    {currentStep === 4 ? 'Complete' : 'Save & Next'}
                                    {currentStep < 4 ? <ArrowRight size={18} strokeWidth={2.5} /> : <Check size={18} strokeWidth={2.5} />}
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
    };

    return (
        <div className="app-container">
            <Sidebar />
            <main className="main-content" style={{ background: '#fcfcf9' }}>
                <PageHeader
                    onDiscard={handleDiscard}
                    onSaveDraft={handleSaveDraft}
                    view={view}
                />
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/events" element={<EventsPage />} />
                    <Route path="/devotees" element={<Devotees />} />
                    <Route path="/volunteers" element={<Volunteers />} />
                    <Route path="/notifications" element={<Notifications />} />
                    <Route path="/donations" element={<Donations />} />
                    <Route path="/medias" element={<SongsUpload />} />
                    <Route path="/payments" element={<PaymentConfig />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
