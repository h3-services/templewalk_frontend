import React, { useState } from 'react';
import {
    Music,
    Upload,
    X,
    Play,
    Pause,
    Trash2,
    FileAudio,
    Plus,
    Check
} from 'lucide-react';

export function SongsUpload() {
    const [isDragging, setIsDragging] = useState(false);
    const [songs, setSongs] = useState([
        { id: 1, name: 'Siva Siva Om.mp3', size: '4.2 MB', duration: '05:24', category: 'Bhajans' },
        { id: 2, name: 'Temple Morning Chants.mp3', size: '3.1 MB', duration: '03:45', category: 'Chants' },
    ]);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        // In a real app, you'd handle file processing here
        const newSong = {
            id: Date.now(),
            name: 'New Pilgrimage Song.mp3',
            size: '5.0 MB',
            duration: '--:--',
            category: 'Devotional'
        };
        setSongs([...songs, newSong]);
    };

    const removeSong = (id) => {
        setSongs(songs.filter(s => s.id !== id));
    };

    return (
        <div className="form-card">
            <div className="form-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ background: '#fff7ed', padding: '0.75rem', borderRadius: '12px', color: '#f59e0b' }}>
                        <Music size={24} />
                    </div>
                    <div>
                        <h2 style={{ marginBottom: '0.25rem' }}>Upload Spiritual Medias</h2>
                        <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Manage audio tracks and chants for the padhayatra.</p>
                    </div>
                </div>
                <span className="step-indicator">STEP 3 OF 4</span>
            </div>

            <div className="form-body">
                {/* Upload Area */}
                <div
                    className={`upload-zone ${isDragging ? 'dragging' : ''}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    style={{
                        border: '2px dashed #e5e7eb',
                        borderRadius: '16px',
                        padding: '3rem 2rem',
                        textAlign: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        background: isDragging ? '#fffbeb' : '#f9fafb',
                        borderColor: isDragging ? '#f59e0b' : '#e5e7eb',
                        marginBottom: '2rem'
                    }}
                >
                    <div style={{
                        background: 'white',
                        width: '64px',
                        height: '64px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1.5rem',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                        color: '#f59e0b'
                    }}>
                        <Upload size={32} />
                    </div>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#111827', marginBottom: '0.5rem' }}>
                        Click to upload or drag and drop
                    </h3>
                    <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
                        Audio files (MP3, WAV under 25MB)
                    </p>
                    <button className="btn btn-primary" style={{ padding: '0.6rem 2rem' }}>
                        <Plus size={18} /> Select Files
                    </button>
                </div>

                {/* Song List */}
                <div className="songs-list">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                        <h4 style={{ fontWeight: 600, color: '#374151' }}>Uploaded Tracks ({songs.length})</h4>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {songs.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '2rem', color: '#9ca3af' }}>
                                No songs uploaded yet.
                            </div>
                        ) : (
                            songs.map(song => (
                                <div key={song.id} className="song-item" style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '1rem',
                                    background: 'white',
                                    border: '1px solid #f3f4f6',
                                    borderRadius: '12px',
                                    gap: '1rem'
                                }}>
                                    <div style={{
                                        background: '#f9fafb',
                                        padding: '0.75rem',
                                        borderRadius: '10px',
                                        color: '#6b7280'
                                    }}>
                                        <FileAudio size={24} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <h5 style={{ fontWeight: 600, color: '#111827', marginBottom: '0.25rem' }}>{song.name}</h5>
                                        <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', color: '#6b7280' }}>
                                            <span>{song.size}</span>
                                            <span>•</span>
                                            <span>{song.duration}</span>
                                            <span>•</span>
                                            <span style={{ color: '#f59e0b', fontWeight: 600 }}>{song.category}</span>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button className="btn-icon" style={{
                                            background: '#f9fafb',
                                            border: 'none',
                                            borderRadius: '8px',
                                            padding: '0.5rem',
                                            color: '#6b7280',
                                            cursor: 'pointer'
                                        }}>
                                            <Play size={18} fill="currentColor" />
                                        </button>
                                        <button
                                            onClick={() => removeSong(song.id)}
                                            className="btn-icon"
                                            style={{
                                                background: '#f9fafb',
                                                border: 'none',
                                                borderRadius: '8px',
                                                padding: '0.5rem',
                                                color: '#ef4444',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
