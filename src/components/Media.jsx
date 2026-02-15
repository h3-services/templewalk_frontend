import React, { useState, useMemo } from 'react';
import {
    Music, Search, Plus, Trash2, Youtube, Play, X, ChevronDown, Calendar, Youtube as YoutubeIcon, Layers
} from 'lucide-react';
import { SearchBar, Pagination } from './index';

export function Media() {
    const [searchTerm, setSearchTerm] = useState('');
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    // Form State
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Song');
    const [youtubeUrl, setYoutubeUrl] = useState('');
    const [isTitleFocused, setIsTitleFocused] = useState(false);
    const [isUrlFocused, setIsUrlFocused] = useState(false);

    const getYoutubeVideoId = (url) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url?.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const [mediaData, setMediaData] = useState([
        { id: 1, title: "Siva Siva Om", category: "Song", url: "https://www.youtube.com/watch?v=example1", dateAdded: "Oct 24, 2023", color: "#E3F2FD" },
        { id: 2, title: "Temple Morning Chants", category: "Chant", url: "https://www.youtube.com/watch?v=example2", dateAdded: "Oct 22, 2023", color: "#FFF3E0" },
        { id: 3, title: "Evening Aarathi Hymn", category: "Song", url: "https://www.youtube.com/watch?v=example3", dateAdded: "Oct 20, 2023", color: "#E8F5E9" },
        { id: 4, title: "Om Namah Shivaya Japa", category: "Chant", url: "https://www.youtube.com/watch?v=example4", dateAdded: "Oct 18, 2023", color: "#F3E5F5" },
        { id: 5, title: "Ganesha Pancharatnam", category: "Song", url: "https://www.youtube.com/watch?v=example5", dateAdded: "Oct 15, 2023", color: "#FCE4EC" },
    ]);

    React.useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    React.useEffect(() => {
        document.title = 'Media | Temple Walk Admin';
    }, []);

    const filteredMedia = useMemo(() => {
        return mediaData.filter(m =>
            m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            m.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, mediaData]);

    const totalPages = Math.ceil(filteredMedia.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = filteredMedia.slice(startIndex, startIndex + itemsPerPage);

    const handleAddMedia = () => {
        if (!title || !youtubeUrl) {
            alert("Please fill in all fields.");
            return;
        }
        const newEntry = {
            id: Date.now(),
            title,
            category,
            url: youtubeUrl,
            dateAdded: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
            color: category === 'Song' ? '#E3F2FD' : '#FFF3E0'
        };
        setMediaData([newEntry, ...mediaData]);
        setIsDrawerOpen(false);
        setTitle('');
        setYoutubeUrl('');
        setCategory('Song');
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this media?")) {
            setMediaData(mediaData.filter(m => m.id !== id));
        }
    };

    return (
        <div className="media-page-container" style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            minHeight: 0,
            overflow: 'hidden'
        }}>
            {/* Overlay */}
            {isDrawerOpen && (
                <div
                    onClick={() => setIsDrawerOpen(false)}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.1)',
                        backdropFilter: 'blur(2px)',
                        zIndex: 40,
                        transition: 'all 0.3s'
                    }}
                />
            )}

            <div className="media-page" style={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                minHeight: 0,
                gap: '1rem'
            }}>
                {/* Page Title Header */}
                <div className="page-header" style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '0.5rem',
                    gap: '1rem',
                    flexShrink: 0
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                            borderRadius: '14px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 4px 12px rgba(249, 115, 22, 0.25)',
                            flexShrink: 0
                        }}>
                            <Music size={24} color="white" />
                        </div>
                        <div>
                            <h1 style={{
                                fontSize: '1.5rem',
                                fontWeight: 800,
                                color: '#0f172a',
                                marginBottom: '0.25rem'
                            }}>Media Management</h1>
                            <p style={{
                                fontSize: '0.85rem',
                                color: '#64748b',
                                fontWeight: 500
                            }}>Manage songs and chants for the mobile app</p>
                        </div>
                    </div>
                    <button
                        className="primary-action-btn"
                        onClick={() => setIsDrawerOpen(true)}
                    >
                        <Plus size={18} /> <span className="btn-text">Add New Song</span>
                    </button>
                </div>

                {/* Filter Bar */}
                <div className="filter-bar" style={{
                    background: 'white',
                    padding: '0.75rem 1rem',
                    borderRadius: '20px',
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'center',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                    border: '1.5px solid #f1f5f9',
                    flexWrap: 'wrap',
                    flexShrink: 0
                }}>
                    <SearchBar
                        placeholder="Search songs, chants..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ flex: 1.5, minWidth: '200px' }}
                    />
                    <div className="filter-actions" style={{ flex: 1, display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <div style={{ flex: 1, position: 'relative' }}>
                            <div style={{
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                <Calendar size={18} style={{
                                    position: 'absolute',
                                    left: '1rem',
                                    color: '#F97316'
                                }} />
                                <input
                                    type="date"
                                    defaultValue="2024-03-24"
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem 1rem 0.75rem 2.75rem',
                                        borderRadius: '12px',
                                        border: '1.5px solid #f1f5f9',
                                        background: '#f8fafc',
                                        fontSize: '0.85rem',
                                        fontWeight: 600,
                                        color: '#1e293b',
                                        outline: 'none',
                                        cursor: 'pointer',
                                        fontFamily: 'inherit'
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Media Table Card */}
                <div className="table-card" style={{
                    backgroundColor: 'white',
                    border: '1.5px solid #f1f5f9',
                    borderRadius: '28px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: 0
                }}>
                    {/* Table Headers */}
                    <div className="table-header" style={{
                        display: 'grid',
                        gridTemplateColumns: '2.5fr 1.5fr 1fr 80px',
                        padding: '1.25rem 2rem',
                        backgroundColor: '#fcfcfc',
                        borderBottom: '1.5px solid #f1f5f9',
                        flexShrink: 0
                    }}>
                        {['MEDIA', 'CATEGORY', 'DATE ADDED', ''].map((header, i) => (
                            <span key={i} style={{
                                fontSize: '0.65rem',
                                fontWeight: 800,
                                color: '#94a3b8',
                                letterSpacing: '0.05em'
                            }}>{header}</span>
                        ))}
                    </div>

                    {/* Card List Content */}
                    <div style={{
                        overflowY: 'auto',
                        flex: 1,
                        maxHeight: '500px',
                        scrollbarWidth: 'thin',
                        scrollbarColor: '#f1f5f9 transparent'
                    }}>
                        {currentItems.map((item, idx) => (
                            <div key={item.id} style={{
                                display: 'grid',
                                gridTemplateColumns: '2.5fr 1.5fr 1fr 80px',
                                padding: '1rem 2rem',
                                borderBottom: idx === currentItems.length - 1 ? 'none' : '1.5px solid #f8fafc',
                                alignItems: 'center',
                                transition: 'all 0.2s'
                            }} className="media-row">
                                <div className="col-media" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{
                                        width: '48px',
                                        height: '48px',
                                        borderRadius: '14px',
                                        background: item.color,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0
                                    }}>
                                        {item.category === 'Song' ? <Music size={20} color="#3b82f6" /> : <Layers size={20} color="#f97316" />}
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 800, color: '#1e293b', fontSize: '0.9rem' }}>{item.title}</div>
                                        <div style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <Youtube size={12} color="#ef4444" /> {item.url.length > 30 ? item.url.substring(0, 30) + "..." : item.url}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-category">
                                    <span style={{
                                        padding: '0.4rem 0.85rem',
                                        borderRadius: '10px',
                                        fontSize: '0.7rem',
                                        fontWeight: 800,
                                        background: item.category === 'Song' ? '#eff6ff' : '#fff7ed',
                                        color: item.category === 'Song' ? '#3b82f6' : '#f97316',
                                        letterSpacing: '0.02em',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.4rem'
                                    }}>
                                        {item.category}
                                    </span>
                                </div>
                                <div className="col-date" style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>
                                    {item.dateAdded}
                                </div>
                                <div className="col-actions" style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer', transition: 'color 0.2s' }}
                                        onMouseEnter={(e) => e.target.style.color = '#ef4444'}
                                        onMouseLeave={(e) => e.target.style.color = '#cbd5e1'}
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <Pagination
                        currentPage={currentPage}
                        itemsPerPage={itemsPerPage}
                        totalEntries={filteredMedia.length}
                        onPageChange={setCurrentPage}
                        onItemsPerPageChange={(val) => {
                            setItemsPerPage(val);
                            setCurrentPage(1);
                        }}
                    />
                </div>
            </div>

            {/* Create New Media Drawer */}
            <div className={`media-drawer ${isDrawerOpen ? 'open' : ''}`} style={{
                backgroundColor: 'white',
                boxShadow: '-4px 0 20px rgba(0,0,0,0.1)',
                zIndex: 50,
                display: 'flex',
                flexDirection: 'column'
            }}>
                {/* Drawer Header */}
                <div style={{
                    padding: '24px 28px',
                    borderBottom: '1px solid #f3f4f6',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start'
                }}>
                    <div>
                        <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#111827', margin: 0 }}>Add New Media</h2>
                        <p style={{ fontSize: '13px', color: '#6b7280', margin: '4px 0 0 0' }}>Upload a new song or chant to the spiritual library</p>
                    </div>
                    <button
                        onClick={() => setIsDrawerOpen(false)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af' }}
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Drawer Body */}
                <div style={{ padding: '28px', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '28px' }}>
                    {/* Title Input */}
                    <div style={{ position: 'relative' }}>
                        <label style={{
                            position: 'absolute',
                            left: '14px',
                            top: (isTitleFocused || title) ? '-8px' : '15px',
                            fontSize: (isTitleFocused || title) ? '12px' : '14px',
                            color: isTitleFocused ? '#f97316' : '#9ca3af',
                            backgroundColor: 'white',
                            padding: '0 5px',
                            transition: 'all 0.2s ease',
                            pointerEvents: 'none',
                            fontWeight: (isTitleFocused || title) ? '700' : '500',
                            zIndex: 1
                        }}>
                            Title of Song
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            onFocus={() => setIsTitleFocused(true)}
                            onBlur={() => setIsTitleFocused(false)}
                            style={{
                                ...inputStyle,
                                borderColor: isTitleFocused ? '#f97316' : '#e5e7eb',
                                borderWidth: isTitleFocused ? '2px' : '1px',
                                padding: isTitleFocused ? '13px 17px' : '14px 18px'
                            }}
                        />
                    </div>

                    {/* Category Selection */}
                    <div>
                        <label style={labelStyle}>CATEGORY</label>
                        <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
                            <button
                                onClick={() => setCategory('Song')}
                                style={category === 'Song' ? selectedOptionStyle : optionStyle}
                            >
                                <Music size={16} /> Song
                            </button>
                            <button
                                onClick={() => setCategory('Chant')}
                                style={category === 'Chant' ? selectedOptionStyle : optionStyle}
                            >
                                <Layers size={16} /> Chant
                            </button>
                        </div>
                    </div>

                    {/* Youtube URL Input */}
                    <div style={{ position: 'relative' }}>
                        <label style={{
                            position: 'absolute',
                            left: '14px',
                            top: (isUrlFocused || youtubeUrl) ? '-8px' : '15px',
                            fontSize: (isUrlFocused || youtubeUrl) ? '12px' : '14px',
                            color: isUrlFocused ? '#f97316' : '#9ca3af',
                            backgroundColor: 'white',
                            padding: '0 5px',
                            transition: 'all 0.2s ease',
                            pointerEvents: 'none',
                            fontWeight: (isUrlFocused || youtubeUrl) ? '700' : '500',
                            zIndex: 1
                        }}>
                            Youtube URL of Song or Chant
                        </label>
                        <input
                            type="text"
                            value={youtubeUrl}
                            onChange={(e) => setYoutubeUrl(e.target.value)}
                            onFocus={() => setIsUrlFocused(true)}
                            onBlur={() => setIsUrlFocused(false)}
                            style={{
                                ...inputStyle,
                                borderColor: isUrlFocused ? '#f97316' : '#e5e7eb',
                                borderWidth: isUrlFocused ? '2px' : '1px',
                                padding: isUrlFocused ? '13px 17px' : '14px 18px'
                            }}
                        />
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '8px' }}>
                            <YoutubeIcon size={14} color="#ef4444" />
                            <span style={{ fontSize: '11px', color: '#9ca3af', fontWeight: '600' }}>Valid YouTube Links only</span>
                        </div>
                    </div>

                    {/* Youtube Preview */}
                    {youtubeUrl && (
                        <div style={{
                            marginTop: '-12px',
                            borderRadius: '16px',
                            overflow: 'hidden',
                            backgroundColor: '#f8fafc',
                            border: '1.5px solid #f1f5f9',
                            aspectRatio: '16/9',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                        }}>
                            {getYoutubeVideoId(youtubeUrl) ? (
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src={`https://www.youtube.com/embed/${getYoutubeVideoId(youtubeUrl)}`}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                    style={{ border: 'none' }}
                                />
                            ) : (
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '24px'
                                }}>
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '12px',
                                        backgroundColor: '#fff1f2',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <YoutubeIcon size={20} color="#ef4444" />
                                    </div>
                                    <p style={{
                                        fontSize: '13px',
                                        color: '#94a3b8',
                                        fontWeight: '600',
                                        textAlign: 'center',
                                        margin: 0
                                    }}>Preview will appear here once you enter a valid YouTube URL</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Drawer Footer */}
                <div style={{
                    padding: '24px 28px',
                    borderTop: '1px solid #f3f4f6',
                    display: 'flex',
                    gap: '12px'
                }}>
                    <button
                        onClick={() => setIsDrawerOpen(false)}
                        style={{
                            flex: 1,
                            padding: '12px',
                            borderRadius: '10px',
                            border: '1px solid #e5e7eb',
                            backgroundColor: 'white',
                            color: '#111827',
                            fontSize: '14px',
                            fontWeight: '700',
                            cursor: 'pointer'
                        }}
                    >
                        Discard
                    </button>
                    <button
                        onClick={handleAddMedia}
                        style={{
                            flex: 1.5,
                            padding: '12px',
                            borderRadius: '10px',
                            border: 'none',
                            backgroundColor: '#f97316',
                            color: 'white',
                            fontSize: '14px',
                            fontWeight: '700',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            cursor: 'pointer'
                        }}
                    >
                        Add to Library <Plus size={16} />
                    </button>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .media-row:hover { background-color: #fcfcfc; }
                
                .media-drawer {
                    position: fixed;
                    top: 0;
                    right: -500px;
                    width: 500px;
                    height: 100vh;
                    transition: right 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }
                
                .media-drawer.open {
                    right: 0;
                }

                @media (max-width: 768px) {
                    .page-header { flex-direction: column; align-items: stretch !important; gap: 0.75rem !important; margin-bottom: 1rem !important; }
                    .page-header h1 { font-size: 1.25rem !important; margin-bottom: 0.25rem !important; }
                    
                    .filter-bar { flex-direction: column; align-items: stretch !important; padding: 1rem !important; }
                    .filter-actions { width: 100%; flex-direction: column; gap: 0.75rem !important; }
                    
                    /* Revert Card View - Enable Horizontal Scroll */
                    .table-card {
                        overflow-x: auto !important;
                        display: block !important;
                    }
                    
                    .table-header, .media-row {
                        min-width: 800px !important;
                        display: grid !important;
                        grid-template-columns: 2.5fr 1.5fr 1fr 80px !important;
                    }
                    
                    .table-header { display: grid !important; }
                    
                    .media-row {
                        gap: 0 !important;
                        padding: 1rem 2rem !important;
                        border-bottom: 1.5px solid #f8fafc !important;
                    }
                     .col-category, .col-date {
                        display: flex !important;
                        flex-direction: column !important;
                        align-items: flex-start !important;
                        gap: 0.25rem !important;
                        width: auto !important;
                        justify-content: flex-start !important;
                    }
                    
                    .col-category::before, .col-date::before { display: none !important; }
                    
                    .media-drawer {
                        width: 100%;
                        right: -100%;
                    }
                }
                `
            }} />
        </div>
    );
}

const inputStyle = {
    width: '100%',
    padding: '14px 18px',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    fontSize: '14px',
    color: '#111827',
    outline: 'none',
    boxSizing: 'border-box'
};

const labelStyle = {
    fontSize: '11px',
    fontWeight: '800',
    color: '#9ca3af',
    letterSpacing: '0.05em'
};

const optionStyle = {
    flex: 1,
    padding: '12px',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    backgroundColor: 'white',
    color: '#64748b',
    fontSize: '13px',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    cursor: 'pointer'
};

const selectedOptionStyle = {
    ...optionStyle,
    border: '1px solid #f97316',
    color: '#f97316',
    backgroundColor: '#fff7ed'
};
