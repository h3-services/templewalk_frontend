import React, { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import {
    Music, Search, Plus, Trash2, Youtube, Play, X, ChevronDown, Calendar, Youtube as YoutubeIcon, Layers
} from 'lucide-react';
import { SearchBar, Pagination } from './index';

export function Media() {
    const [searchTerm, setSearchTerm] = useState('');
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form State - matching API requirements
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('mantra'); // API uses 'mantra' as media_type
    const [youtubeUrl, setYoutubeUrl] = useState('');
    const [isTitleFocused, setIsTitleFocused] = useState(false);
    const [isDescriptionFocused, setIsDescriptionFocused] = useState(false);
    const [isUrlFocused, setIsUrlFocused] = useState(false);


    const getYoutubeVideoId = (url) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url?.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const [mediaData, setMediaData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchMediaData = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/media/');
            if (response.ok) {
                const data = await response.json();
                const mappedData = Array.isArray(data) ? data.map(item => ({
                    id: item.media_id || item.id,
                    title: item.title,
                    category: item.media_type,
                    url: item.url,
                    dateAdded: new Date(item.created_at).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
                    color: item.media_type === 'mantra' ? '#E3F2FD' : '#FFF3E0'
                })) : [];
                setMediaData(mappedData);
            }
        } catch (error) {
            console.error("Error loading media data:", error);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        fetchMediaData();
    }, []);

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

    const handleAddMedia = async () => {
        // Validation
        if (!title || !youtubeUrl) {
            alert("Please fill in at least the title and URL fields.");
            return;
        }

        setIsSubmitting(true);

        try {
            // Prepare API payload
            const payload = {
                title,
                description: description || '',
                media_type: category,
                url: youtubeUrl,
                thumbnail_url: '',
                duration: ''
            };

            // Make API call
            const response = await fetch('/api/media/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Failed to add media');
            }

            const newMedia = await response.json();

            // Update local state with the new media from API response
            const newEntry = {
                id: newMedia.media_id || newMedia.id,
                title: newMedia.title,
                category: newMedia.media_type,
                url: newMedia.url,
                dateAdded: new Date(newMedia.created_at).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
                color: newMedia.media_type === 'mantra' ? '#E3F2FD' : '#FFF3E0'
            };

            setMediaData([newEntry, ...mediaData]);

            // Reset form and close drawer
            setIsDrawerOpen(false);
            setTitle('');
            setDescription('');
            setYoutubeUrl('');
            setCategory('mantra');

            alert('Media added successfully!');
        } catch (error) {
            console.error('Error adding media:', error);
            alert(`Error: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        if (!id) {
            console.error("No ID provided for deletion");
            return;
        }

        if (window.confirm("Are you sure you want to delete this spiritual media?")) {
            try {
                console.log(`Attempting to delete media with ID: ${id}`);
                const response = await fetch(`/api/media/${id}`, {
                    method: 'DELETE'
                });

                if (response.ok || response.status === 404) {
                    setMediaData(prev => prev.filter(m => m.id !== id));
                    if (response.ok) alert("Media deleted successfully!");
                    else console.warn("Media already deleted from server, updating local view.");
                } else {
                    const errorText = await response.text();
                    console.error("Delete failed:", errorText);
                    let errorMessage = "Failed to delete media";
                    try {
                        const errorData = JSON.parse(errorText);
                        errorMessage = errorData.detail || errorData.message || errorMessage;
                    } catch (e) { }
                    throw new Error(errorMessage);
                }
            } catch (error) {
                console.error("Error deleting media:", error);
                alert(`Error: ${error.message}`);
            }
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
            {isDrawerOpen && createPortal(
                <div
                    onClick={() => setIsDrawerOpen(false)}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.3)',
                        zIndex: 9998,
                        transition: 'all 0.3s'
                    }}
                />,
                document.body
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
                        {loading ? (
                            <div style={{ padding: '4rem', textAlign: 'center', color: '#64748b' }}>
                                <p>Loading spiritual library...</p>
                            </div>
                        ) : currentItems.length === 0 ? (
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '4rem 2rem',
                                gap: '1rem'
                            }}>
                                <div style={{
                                    width: '80px',
                                    height: '80px',
                                    borderRadius: '20px',
                                    background: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: '0.5rem'
                                }}>
                                    <Music size={36} color="#f97316" />
                                </div>
                                <h3 style={{
                                    fontSize: '1.1rem',
                                    fontWeight: 700,
                                    color: '#1e293b',
                                    margin: 0
                                }}>No media found</h3>
                                <p style={{
                                    fontSize: '0.9rem',
                                    color: '#64748b',
                                    textAlign: 'center',
                                    margin: 0,
                                    maxWidth: '400px'
                                }}>
                                    {searchTerm
                                        ? `No media matching "${searchTerm}". Try a different search term.`
                                        : 'Get started by adding your first song or chant to the library.'
                                    }
                                </p>
                            </div>
                        ) : (
                            currentItems.map((item, idx) => (
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
                                            {item.category === 'song' ? <Music size={20} color="#3b82f6" /> : <Layers size={20} color="#f97316" />}
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
                            ))
                        )}
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
            {createPortal(
                <div className={`media-drawer ${isDrawerOpen ? 'open' : ''}`} style={{
                    backgroundColor: 'white',
                    boxShadow: '-4px 0 20px rgba(0,0,0,0.1)',
                    zIndex: 9999,
                    display: 'flex',
                    flexDirection: 'column',
                    borderTopLeftRadius: '24px',
                    borderBottomLeftRadius: '24px',
                    position: 'fixed',
                    top: 0,
                    right: 0,
                    width: '500px',
                    height: '100vh',
                    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: isDrawerOpen ? 'translateX(0)' : 'translateX(100%)'
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
                                Title *
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

                        {/* Description Input */}
                        <div style={{ position: 'relative' }}>
                            <label style={{
                                position: 'absolute',
                                left: '14px',
                                top: (isDescriptionFocused || description) ? '-8px' : '15px',
                                fontSize: (isDescriptionFocused || description) ? '12px' : '14px',
                                color: isDescriptionFocused ? '#f97316' : '#9ca3af',
                                backgroundColor: 'white',
                                padding: '0 5px',
                                transition: 'all 0.2s ease',
                                pointerEvents: 'none',
                                fontWeight: (isDescriptionFocused || description) ? '700' : '500',
                                zIndex: 1
                            }}>
                                Description (Optional)
                            </label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                onFocus={() => setIsDescriptionFocused(true)}
                                onBlur={() => setIsDescriptionFocused(false)}
                                rows={3}
                                style={{
                                    ...inputStyle,
                                    borderColor: isDescriptionFocused ? '#f97316' : '#e5e7eb',
                                    borderWidth: isDescriptionFocused ? '2px' : '1px',
                                    padding: isDescriptionFocused ? '13px 17px' : '14px 18px',
                                    resize: 'vertical',
                                    fontFamily: 'inherit'
                                }}
                            />
                        </div>

                        {/* Category Selection */}
                        <div>
                            <label style={labelStyle}>MEDIA TYPE *</label>
                            <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
                                <button
                                    onClick={() => setCategory('mantra')}
                                    style={category === 'mantra' ? selectedOptionStyle : optionStyle}
                                >
                                    <Layers size={16} /> Mantra
                                </button>
                                <button
                                    onClick={() => setCategory('song')}
                                    style={category === 'song' ? selectedOptionStyle : optionStyle}
                                >
                                    <Music size={16} /> Song
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
                                Youtube URL *
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
                            disabled={isSubmitting}
                            style={{
                                flex: 1.5,
                                padding: '12px',
                                borderRadius: '10px',
                                border: 'none',
                                backgroundColor: isSubmitting ? '#fb923c' : '#f97316',
                                color: 'white',
                                fontSize: '14px',
                                fontWeight: '700',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                opacity: isSubmitting ? 0.7 : 1
                            }}
                        >
                            {isSubmitting ? 'Adding...' : 'Add to Library'} {!isSubmitting && <Plus size={16} />}
                        </button>
                    </div>
                </div>,
                document.body
            )}

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
                    .page-header { flex-direction: column !important; align-items: stretch !important; gap: 0.75rem !important; margin-bottom: 1rem !important; }
                    .page-header h1 { font-size: 1.2rem !important; }
                    
                    .filter-bar { flex-direction: column !important; align-items: stretch !important; padding: 1rem !important; gap: 1rem !important; }
                    .filter-actions { width: 100% !important; flex-direction: column !important; gap: 1rem !important; }
                    
                    .table-header { display: none !important; }
                    
                    /* Card-view rows for media on mobile */
                    .media-row { 
                        display: flex !important; 
                        flex-direction: column !important; 
                        gap: 0.75rem !important; 
                        padding: 1.25rem 1rem !important;
                        border-bottom: 1.5px solid #f8fafc !important;
                        min-width: unset !important;
                        grid-template-columns: unset !important;
                    }
                    
                    .col-media { 
                        width: 100% !important; 
                        border-bottom: 1px solid #f1f5f9 !important;
                        padding-bottom: 0.75rem !important;
                    }

                    .col-category, .col-date {
                        display: flex !important;
                        align-items: center !important;
                        gap: 0.75rem !important;
                        width: 100% !important;
                    }
                    
                    .col-actions { 
                        justify-content: flex-start !important; 
                        width: 100% !important;
                        padding-top: 0.5rem;
                    }

                    .pagination-footer {
                        flex-direction: column !important;
                        gap: 1rem !important;
                        padding: 1.25rem 1rem !important;
                        align-items: center !important;
                        text-align: center !important;
                    }

                    .media-drawer {
                        width: min(500px, 100vw) !important;
                        height: 100dvh !important;
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
