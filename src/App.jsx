import React, { useState } from 'react';
import { Routes, Route, Navigate } from './simple-router';
import {
    ArrowRight,
    Check
} from 'lucide-react';
import { ConfigProvider, useConfig } from './contexts/ConfigContext';

// --- Components ---
import {
    Sidebar,
    PageHeader,
    ProgressSteps,
    EventForm,
    RoutesAndStops,
    Devotees,
    Volunteers,
    Notifications,
    Media,
    SOSRequests,
    SideCards,
    LiveDashboard,
    Donations,
    EventsManagement,
    Login,
    AccountSettings,
    GuideCreation
} from './components';

function MainLayout({ children }) {
    return (
        <div className="app-container">
            <Sidebar />
            <main className="main-content" style={{ background: '#fcfcf9' }}>
                <PageHeader
                    onDiscard={() => { }}
                    onSaveDraft={() => { }}
                    view="list"
                />
                {children}
            </main>
        </div>
    );
}

function AuthenticatedApp() {
    const { isAuthenticated } = useConfig();
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        eventName: '',
        eventDate: '',
        startTime: '',
        contact: '',
        description: '',
        startCoords: { lat: 9.9195, lng: 78.1193 },
        destCoords: { lat: 9.8329, lng: 78.0841 },
        stops: [
            { id: 1, name: "McDonald's", type: "Annathanam", coords: { lat: 9.9252, lng: 78.1198 } },
            { id: 2, name: "Bird's Fort Trail Park", type: "Resting Place/Park", coords: { lat: 9.9152, lng: 78.1298 } },
        ]
    });
    const [lastSaved, setLastSaved] = useState('10:45 AM');
    const [view, setView] = useState('list'); // 'list' or 'create'
    const [errors, setErrors] = useState({});

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    const validateStep = () => {
        const newErrors = {};
        if (currentStep === 1) {
            if (!formData.eventName.trim()) newErrors.eventName = "Event name is required";
            if (!formData.eventDate) newErrors.eventDate = "Event date is required";
            if (!formData.startTime) newErrors.startTime = "Start time is required";
            if (!formData.description.trim()) newErrors.description = "Description is required";
            const phoneClean = (formData.contact || "").replace(/\s/g, '');
            if (!phoneClean) {
                newErrors.contact = "Emergency helpline is required";
            } else if (phoneClean.length < 10) {
                newErrors.contact = "Enter a valid 10-digit number";
            }
        }
        if (currentStep === 2) {
            if (!formData.startCoords || !formData.destCoords) {
                newErrors.map = "Please ensure start and destination points are set.";
            }
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            const firstError = Object.values(newErrors)[0];
            alert(firstError);
            return false;
        }
        return true;
    };

    const handleSaveNext = async () => {
        if (!validateStep()) return;

        if (currentStep < 2) {
            setCurrentStep(prev => prev + 1);
            setLastSaved(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        } else {
            try {
                // Safely format the date string. input type="time" normally provides HH:mm
                const dateTimeStr = `${formData.eventDate}T${formData.startTime}:00`;
                const eventDateObj = new Date(dateTimeStr);

                if (isNaN(eventDateObj.getTime())) {
                    throw new Error("Invalid date or time selected.");
                }

                // Construct payload for API
                const payload = {
                    name: formData.eventName,
                    description: formData.description,
                    event_type: "walk",
                    is_paid: false,
                    fee: 0,
                    event_date: eventDateObj.toISOString(),
                    start_lat: Number(formData.startCoords.lat),
                    start_lng: Number(formData.startCoords.lng),
                    end_lat: Number(formData.destCoords.lat),
                    end_lng: Number(formData.destCoords.lng),
                    route_polyline: formData.stops.map(stop => ({
                        name: stop.name,
                        type: stop.type,
                        lat: Number(stop.coords.lat),
                        lng: Number(stop.coords.lng)
                    })),
                    emergency_contacts: [
                        {
                            name: "General Emergency",
                            phone: formData.contact
                        }
                    ]
                };

                const response = await fetch('/api/events/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload)
                });

                if (response.ok) {
                    const result = await response.json();
                    console.log("Event created successfully:", result);
                    alert("Event created successfully!");
                    setView('list');
                    setCurrentStep(1);
                } else if (response.status === 422) {
                    const error = await response.json();
                    console.error("Validation Error from Server:", error.detail);
                    alert(`Submission failed: ${error.detail[0]?.msg || "Invalid data structure"}`);
                } else {
                    console.error("Failed to create event:", response.statusText);
                    alert("Failed to create event. Please check the logs.");
                }
            } catch (error) {
                console.error("Error creating event:", error);
                alert("An error occurred while creating the event.");
            }
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
            description: '',
            startCoords: { lat: 9.9195, lng: 78.1193 },
            destCoords: { lat: 9.8329, lng: 78.0841 },
            stops: []
        });
        setCurrentStep(1);
        setView('list');
    };

    const handleSaveDraft = () => {
        setLastSaved(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        alert("Draft saved successfully!");
        console.log("Draft data:", formData);
    };

    const handleEditEvent = (event) => {
        console.log("Editing event:", event);
        setFormData({
            eventName: event.title || '',
            eventDate: event.schedule?.split(' • ')[0] || '',
            startTime: event.schedule?.split(' • ')[1]?.split(' ')[0] || '',
            contact: '',
            description: '',
            startCoords: { lat: 9.9195, lng: 78.1193 },
            destCoords: { lat: 9.8329, lng: 78.0841 },
            stops: []
        });
        setView('create');
        setCurrentStep(1);
    };

    return (
        <Routes>
            <Route path="/dashboard" element={<MainLayout><LiveDashboard /></MainLayout>} />
            <Route path="/events" element={
                view === 'list' ? (
                    <MainLayout>
                        <EventsManagement
                            onCreateNew={() => {
                                setFormData({
                                    eventName: '',
                                    eventDate: '',
                                    startTime: '',
                                    contact: '',
                                    description: '',
                                    startCoords: { lat: 9.9195, lng: 78.1193 },
                                    destCoords: { lat: 9.8329, lng: 78.0841 },
                                    stops: []
                                });
                                setErrors({});
                                setView('create');
                            }}
                            onEdit={handleEditEvent}
                        />
                    </MainLayout>
                ) : (
                    <div className="app-container">
                        <Sidebar />
                        <main className="main-content" style={{ background: '#fcfcf9' }}>
                            <PageHeader onDiscard={handleDiscard} onSaveDraft={handleSaveDraft} view={view} />
                            <ProgressSteps currentStep={currentStep} setStep={setCurrentStep} />

                            {/* Content Area - Non-scrollable on desktop, scrollable on mobile */}
                            <div className="event-content-area" style={{
                                flex: 1,
                                minHeight: 0,
                                overflow: 'visible',
                                marginBottom: '0.5rem',
                                display: 'flex',
                                flexDirection: 'column'
                            }}>
                                {currentStep === 1 && (
                                    <EventForm formData={formData} setFormData={setFormData} errors={errors} />
                                )}
                                {currentStep === 2 && (
                                    <RoutesAndStops
                                        startCoords={formData.startCoords}
                                        destCoords={formData.destCoords}
                                        stops={formData.stops}
                                        onUpdateStops={(newStops) => setFormData(prev => ({ ...prev, stops: newStops }))}
                                        onUpdateCoords={(type, coords) => setFormData(prev => ({
                                            ...prev,
                                            [type === 'start' ? 'startCoords' : 'destCoords']: coords
                                        }))}
                                    />
                                )}
                            </div>

                            {/* Responsive styling for content area */}
                            <style dangerouslySetInnerHTML={{
                                __html: `
                            @media (max-width: 768px) {
                                .event-content-area {
                                    overflow: auto !important;
                                }
                            }
                        `
                            }} />

                            {/* Footer Actions - Always visible at bottom */}
                            <div className="footer-actions" style={{
                                background: 'white',
                                padding: '1rem 2rem',
                                borderRadius: '20px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                boxShadow: '0 -4px 20px rgba(0,0,0,0.03)',
                                border: '1.5px solid #f1f5f9',
                                flexShrink: 0
                            }}>
                                <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600 }}>
                                    Auto-saved at <span style={{ color: '#64748b' }}>{lastSaved}</span>
                                </span>
                                <div className="action-buttons" style={{ display: 'flex', gap: '1rem' }}>
                                    <button
                                        onClick={handlePrevious}
                                        disabled={currentStep === 1}
                                        style={{
                                            padding: '0.75rem 1.75rem',
                                            borderRadius: '12px',
                                            border: '1.5px solid #e2e8f0',
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
                                            padding: '0.75rem 2rem',
                                            borderRadius: '12px',
                                            border: 'none',
                                            background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                                            color: 'white',
                                            fontWeight: 700,
                                            fontSize: '0.9rem',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.6rem',
                                            boxShadow: '0 6px 16px -4px rgba(249, 115, 22, 0.4)'
                                        }}
                                    >
                                        {currentStep === 2 ? 'Complete' : 'Save & Next'}
                                        {currentStep < 2 ? <ArrowRight size={18} strokeWidth={2.5} /> : <Check size={18} strokeWidth={2.5} />}
                                    </button>
                                </div>
                            </div>
                        </main>
                    </div>
                )
            } />
            <Route path="/devotees" element={<MainLayout><Devotees /></MainLayout>} />
            <Route path="/volunteers" element={<MainLayout><Volunteers /></MainLayout>} />
            <Route path="/media" element={<MainLayout><Media /></MainLayout>} />
            <Route path="/sos-requests" element={<MainLayout><SOSRequests /></MainLayout>} />
            <Route path="/guide-creation" element={<MainLayout><GuideCreation /></MainLayout>} />
            <Route path="/notifications" element={<MainLayout><Notifications /></MainLayout>} />
            <Route path="/account-settings" element={<MainLayout><AccountSettings /></MainLayout>} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes >
    );
}

function App() {
    return (
        <ConfigProvider>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<AuthenticatedApp />} />
            </Routes>
        </ConfigProvider>
    );
}

export default App;
