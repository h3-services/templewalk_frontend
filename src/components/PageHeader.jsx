import React from 'react';

export function PageHeader({
    activeTab,
    setActiveTab,
    onDiscard,
    onSaveDraft
}) {
    return (
        <div className="page-header">
            <div className="breadcrumbs">
                <button
                    onClick={() => setActiveTab('Dashboard')}
                    style={{ background: 'none', border: 'none', padding: 0, font: 'inherit', color: 'inherit', cursor: 'pointer', textTransform: 'inherit', fontWeight: 'inherit', letterSpacing: 'inherit' }}
                >
                    Admin
                </button>
                <span style={{ fontSize: '10px', color: '#e5e7eb' }}>/</span>
                <button
                    onClick={() => setActiveTab(activeTab)}
                    style={{ background: 'none', border: 'none', padding: 0, font: 'inherit', color: 'inherit', cursor: 'pointer', textTransform: 'inherit', fontWeight: 'inherit', letterSpacing: 'inherit' }}
                >
                    {activeTab === 'Medias' ? 'Upload Medias' : activeTab === 'Payments' ? 'Payment Config' : activeTab}
                </button>
                {activeTab === 'Dashboard' && (
                    <>
                        <span style={{ fontSize: '10px', color: '#e5e7eb' }}>/</span>
                        <span style={{ color: 'var(--primary)', fontWeight: 700 }}>Event Setup</span>
                    </>
                )}
            </div>
            <div className="page-title-row">
                <h1 className="page-title">
                    {activeTab === 'Dashboard' ? 'Setup Your Padhayatra' :
                        activeTab === 'Medias' ? 'Media Management' :
                            activeTab === 'Payments' ? 'Payments Dashboard' :
                                `${activeTab} Dashboard`}
                    {activeTab === 'Dashboard' && <span className="tag-draft">DRAFT</span>}
                </h1>
                <div className="header-actions">
                    <button onClick={onDiscard} className="btn btn-ghost" style={{ color: '#6b7280' }}>Discard</button>
                    <button onClick={onSaveDraft} className="btn btn-outline" style={{
                        borderColor: '#fed7aa',
                        color: '#f59e0b',
                        backgroundColor: '#fffbeb',
                        padding: '0.6rem 2rem'
                    }}>
                        Save Draft
                    </button>
                </div>
            </div>
        </div>
    );
}
