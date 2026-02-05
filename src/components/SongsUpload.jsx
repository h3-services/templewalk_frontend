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
    Check,
    Search,
    ChevronDown,
    MoreVertical,
    Volume2,
    Info,
    UploadCloud
} from 'lucide-react';

export function SongsUpload() {
    const [isDragging, setIsDragging] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [songs, setSongs] = useState([
        { id: 1, name: 'Siva Siva Om.mp3', size: '4.2 MB', duration: '05:24', category: 'Bhajans', plays: '1.2k' },
        { id: 2, name: 'Temple Morning Chants.mp3', size: '3.1 MB', duration: '03:45', category: 'Chants', plays: '840' },
        { id: 3, name: 'Evening Aarathi Hymn.wav', size: '12.5 MB', duration: '08:12', category: 'Aarathi', plays: '2.1k' },
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
        const newSong = {
            id: Date.now(),
            name: 'New Pilgrimage Song.mp3',
            size: '5.0 MB',
            duration: '--:--',
            category: 'Devotional',
            plays: '0'
        };
        setSongs([...songs, newSong]);
    };

    const removeSong = (id) => {
        setSongs(songs.filter(s => s.id !== id));
    };

    return (
        <div className="medias-page" style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, gap: '1.25rem' }}>

            {/* Header Section */}
            <div className="page-title-section">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
                    <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', fontFamily: 'Lora, serif' }}>
                        Spiritual Media Library
                    </h1>
                    <span style={{
                        background: '#fff7ed',
                        color: '#f97316',
                        fontSize: '0.6rem',
                        fontWeight: 800,
                        padding: '0.15rem 0.6rem',
                        borderRadius: '6px',
                        letterSpacing: '0.05em'
                    }}>CLOUD STORAGE ACTIVE</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>
                    Manage the audio experience for participants. Upload hymns, bhajans and morning chants for the mobile application.
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 340px', gap: '2rem', flex: 1, minHeight: 0 }}>

                {/* Left: Library & Upload */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', minHeight: 0 }}>

                    {/* Search & Actions */}
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <div style={{ position: 'relative', flex: 1 }}>
                            <Search size={18} style={{
                                position: 'absolute',
                                left: '1.25rem',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: '#94a3b8'
                            }} />
                            <input
                                type="text"
                                placeholder="Search by hymn name, category or duration..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem 1.25rem 0.75rem 3.5rem',
                                    borderRadius: '14px',
                                    border: '1.5px solid #f1f5f9',
                                    background: 'white',
                                    fontSize: '0.85rem',
                                    color: '#1e293b',
                                    outline: 'none',
                                    fontWeight: 600
                                }}
                            />
                        </div>
                        <button style={{
                            padding: '0 1.5rem',
                            borderRadius: '14px',
                            border: '1.5px solid #f1f5f9',
                            background: 'white',
                            color: '#475569',
                            fontWeight: 800,
                            fontSize: '0.85rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            cursor: 'pointer'
                        }}>
                            Filter by Category <ChevronDown size={14} />
                        </button>
                    </div>

                    {/* Scrollable Tracks Area */}
                    <div style={{ flex: 1, overflowY: 'auto', background: 'white', borderRadius: '24px', border: '1.5px solid #f1f5f9', boxShadow: 'var(--card-shadow)' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px 100px 100px 80px', padding: '1rem 1.5rem', background: '#fcfcfc', borderBottom: '1.5px solid #f1f5f9' }}>
                            {['TRACK NAME', 'CATEGORY', 'SIZE', 'DURAT.', ''].map(h => (
                                <span key={h} style={{ fontSize: '0.65rem', fontWeight: 800, color: '#94a3b8', letterSpacing: '0.05em' }}>{h}</span>
                            ))}
                        </div>
                        {songs.map((song, i) => (
                            <div key={song.id} style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 120px 100px 100px 80px',
                                padding: '1rem 1.5rem',
                                borderBottom: i === songs.length - 1 ? 'none' : '1.5px solid #f8fafc',
                                alignItems: 'center',
                                transition: 'all 0.2s'
                            }} className="song-row">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#fff7ed', color: '#f97316', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Play size={18} fill="currentColor" />
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#1e293b' }}>{song.name}</span>
                                        <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 600 }}>{song.plays} app streams</span>
                                    </div>
                                </div>
                                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#f97316' }}>{song.category}</span>
                                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b' }}>{song.size}</span>
                                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b' }}>{song.duration}</span>
                                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                                    <button
                                        onClick={() => removeSong(song.id)}
                                        style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer' }}
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                    <button style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer' }}>
                                        <MoreVertical size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Upload Area & Info */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

                    {/* Drag and Drop Zone */}
                    <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        style={{
                            background: isDragging ? '#fff7ed' : 'white',
                            padding: '2.5rem 1.5rem',
                            borderRadius: '28px',
                            border: '2px dashed ' + (isDragging ? '#f97316' : '#e2e8f0'),
                            textAlign: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '1rem',
                            boxShadow: 'var(--card-shadow)'
                        }}
                    >
                        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#fff7ed', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f97316' }}>
                            <UploadCloud size={32} />
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#1e293b', marginBottom: '0.25rem' }}>Upload Audio</h3>
                            <p style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>MP3, WAV, or OGG up to 50MB</p>
                        </div>
                        <button style={{
                            marginTop: '0.5rem',
                            padding: '0.6rem 2rem',
                            borderRadius: '12px',
                            border: 'none',
                            background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                            color: 'white',
                            fontWeight: 800,
                            fontSize: '0.85rem'
                        }}>Select Local File</button>
                    </div>

                    {/* App Preview Box */}
                    <div style={{
                        background: 'white',
                        padding: '1.5rem',
                        borderRadius: '24px',
                        color: '#1e293b',
                        border: '1.5px solid #f1f5f9',
                        boxShadow: 'var(--card-shadow)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                            <Volume2 size={18} color="#f97316" />
                            <h3 style={{ fontSize: '1rem', fontWeight: 800 }}>App Player Preview</h3>
                        </div>
                        <div style={{ background: '#f8fafc', borderRadius: '16px', padding: '1rem', border: '1.5px solid #f1f5f9' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#f97316', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Music size={16} color="white" />
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.8rem', fontWeight: 800 }}>{songs[0]?.name || 'No Track'}</div>
                                    <div style={{ fontSize: '0.65rem', color: '#64748b' }}>Now Playing in App</div>
                                </div>
                            </div>
                            <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', position: 'relative' }}>
                                <div style={{ width: '45%', height: '100%', background: '#f97316', borderRadius: '2px' }} />
                                <div style={{ width: '10px', height: '10px', background: 'white', borderRadius: '50%', position: 'absolute', left: '45%', top: '50%', transform: 'translate(-50%, -50%)', boxShadow: '0 0 10px rgba(249,115,22,0.8)' }} />
                            </div>
                        </div>
                    </div>

                    {/* Support Info */}
                    <div style={{
                        marginTop: 'auto',
                        padding: '1.25rem',
                        borderRadius: '20px',
                        background: '#f8fafc',
                        border: '1.5px solid #f1f5f9',
                        display: 'flex',
                        gap: '1rem'
                    }}>
                        <Info size={20} color="#3b82f6" style={{ flexShrink: 0 }} />
                        <p style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, lineHeight: 1.4 }}>
                            Tracks are automatically optimized for mobile network streaming.
                        </p>
                    </div>

                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .song-row:hover { background-color: #fffaf5; }
                `
            }} />
        </div>
    );
}
