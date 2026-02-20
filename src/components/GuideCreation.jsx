import React, { useState } from 'react';
import {
    Plus,
    Trash2,
    GripVertical,
    Save,
    Check,
    AlertCircle,
    MoveUp,
    MoveDown,
    X,
    ChevronDown,
    ChevronUp,
    Sun,
    Moon,
    Star,
    Heart,
    Shield,
    Flame,
    Droplet,
    Zap,
    Book,
    Music,
    Smile,
    Coffee,
    Feather,
    Bell,
    Anchor
} from 'lucide-react';
import { SearchBar } from './index';

const availableIcons = {
    Sun, Moon, Star, Heart, Shield, Flame, Droplet, Zap, Book, Music, Smile, Coffee, Feather, Bell, Anchor
};

export function GuideCreation() {
    // Categories State
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedIcon, setSelectedIcon] = useState('Star');

    // Filtered categories for search
    const filteredCategories = categories.filter(cat =>
        cat.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cat.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Fetch Categories on Mount
    React.useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('/api/guide/categories/');
                if (response.ok) {
                    const data = await response.json();
                    setCategories(data.map(cat => ({
                        id: cat.category_id,
                        title: cat.title,
                        description: cat.description,
                        icon: cat.icon_url || 'Star',
                        items: [], // Reset items as the current API schema doesn't seem to include them
                        active: true,
                        expanded: false
                    })));
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    // Add Category Side Panel State
    const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
    const [newCategoryTitle, setNewCategoryTitle] = useState('');
    const [newCategoryDescription, setNewCategoryDescription] = useState('');

    // Side Panel State (Items)
    const [activeCategoryForAdd, setActiveCategoryForAdd] = useState(null);
    const [newItemTitle, setNewItemTitle] = useState('');
    const [newItemDescription, setNewItemDescription] = useState('');

    // Icon Picker State
    const [iconPickerOpen, setIconPickerOpen] = useState(null); // category ID
    const [focusedField, setFocusedField] = useState(null);

    // Drag-and-Drop / Reorder Handlers
    const moveCategory = (index, direction) => {
        const newCategories = [...categories];
        if (direction === 'up' && index > 0) {
            [newCategories[index], newCategories[index - 1]] = [newCategories[index - 1], newCategories[index]];
        } else if (direction === 'down' && index < newCategories.length - 1) {
            [newCategories[index], newCategories[index + 1]] = [newCategories[index + 1], newCategories[index]];
        }
        setCategories(newCategories);
    };

    // Category Handlers
    const openAddCategoryPanel = () => {
        setIsAddCategoryOpen(true);
        setNewCategoryTitle('');
        setNewCategoryDescription('');
        setSelectedIcon('Star');
    };

    const closeAddCategoryPanel = () => {
        setIsAddCategoryOpen(false);
    };

    const handleCreateCategory = async () => {
        if (!newCategoryTitle.trim()) {
            showToast('Category title is required', 'error');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('/api/guide/categories/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: newCategoryTitle,
                    description: newCategoryDescription,
                    icon_url: selectedIcon
                })
            });

            if (!response.ok) {
                throw new Error('Failed to create category');
            }

            const data = await response.json();

            // Add the new category to the local state
            setCategories([...categories, {
                id: data.category_id,
                title: data.title,
                description: data.description,
                icon: data.icon_url || 'Star',
                items: [],
                active: true,
                expanded: true
            }]);

            showToast('Category created successfully!');
            closeAddCategoryPanel();
        } catch (error) {
            console.error('Error creating category:', error);
            showToast('Failed to create category. Please try again.', 'error');
        } finally {
            setLoading(false);
        }
    };

    const updateCategory = (id, field, value) => {
        setCategories(categories.map(c => c.id === id ? { ...c, [field]: value } : c));
    };

    const deleteCategory = (id) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            setCategories(categories.filter(c => c.id !== id));
        }
    };

    // Item Handlers
    const openAddItemPanel = (categoryId) => {
        setActiveCategoryForAdd(categoryId);
        setNewItemTitle('');
        setNewItemDescription('');
    };

    const closeAddItemPanel = () => {
        setActiveCategoryForAdd(null);
    };

    const handleAddItem = () => {
        if (!newItemTitle.trim()) {
            showToast('Item title is required', 'error');
            return;
        }

        const category = categories.find(c => c.id === activeCategoryForAdd);
        if (category) {
            const newItem = {
                id: Date.now(),
                title: newItemTitle,
                description: newItemDescription,
                expanded: false
            };
            const updatedCategories = categories.map(c =>
                c.id === activeCategoryForAdd
                    ? { ...c, items: [...c.items, newItem] }
                    : c
            );
            setCategories(updatedCategories);
            showToast('Item added successfully');
            closeAddItemPanel();
        }
    };

    const toggleItemExpansion = (categoryId, itemId) => {
        setCategories(categories.map(c => {
            if (c.id === categoryId) {
                return {
                    ...c,
                    items: c.items.map(i => i.id === itemId ? { ...i, expanded: !i.expanded } : i)
                };
            }
            return c;
        }));
    };

    const deleteItem = (categoryId, itemId) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            setCategories(categories.map(c =>
                c.id === categoryId
                    ? { ...c, items: c.items.filter(i => i.id !== itemId) }
                    : c
            ));
        }
    };

    // Toast Notification
    const [toast, setToast] = useState(null);
    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const handleSave = () => {
        console.log({ categories });
        showToast('Changes saved successfully!');
    };

    return (
        <div style={{
            flex: 1,
            overflowY: 'auto',
            paddingBottom: '2rem',
            paddingRight: '0.5rem',
            position: 'relative'
        }}>
            {/* Toast Notification */}
            {toast && (
                <div className="toast-notification" style={{
                    position: 'fixed',
                    top: '2rem',
                    right: '2rem',
                    background: toast.type === 'success' ? '#fff7ed' : '#fee2e2',
                    border: `1px solid ${toast.type === 'success' ? '#f97316' : '#ef4444'}`,
                    color: toast.type === 'success' ? '#c2410c' : '#b91c1c',
                    padding: '1rem 1.5rem',
                    borderRadius: '12px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                    zIndex: 2000,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    animation: 'slideIn 0.3s ease-out'
                }}>
                    {toast.type === 'success' ? <Check size={20} /> : <AlertCircle size={20} />}
                    <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{toast.message}</span>
                </div>
            )}

            {/* Header Actions */}
            {/* Page Title Header */}
            <div className="page-header" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '2rem', // Increased margin bottom from 0.5rem to 2rem to match original spacing
                gap: '1rem'
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
                        <Book size={24} color="white" />
                    </div>
                    <div>
                        <h1 style={{
                            fontSize: '1.5rem',
                            fontWeight: 800,
                            color: '#0f172a',
                            marginBottom: '0.25rem',
                            margin: 0
                        }}>Guide</h1>
                        <p style={{
                            fontSize: '0.85rem',
                            color: '#64748b',
                            fontWeight: 500,
                            margin: 0
                        }}>Manage guide categories and content</p>
                    </div>
                </div>
                <button
                    className="create-category-btn"
                    onClick={openAddCategoryPanel}
                    style={{
                        padding: '0.75rem 1.5rem',
                        background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '12px',
                        fontSize: '0.9rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        boxShadow: '0 4px 12px rgba(249, 115, 22, 0.2)'
                    }}
                >
                    <Plus size={18} /> Create Category
                </button>
            </div>

            {/* Search Bar Card */}
            <div className="search-card" style={{
                background: 'white',
                borderRadius: '24px',
                padding: '1.5rem',
                boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                border: '1px solid rgba(0,0,0,0.03)',
                marginBottom: '1.5rem'
            }}>
                <SearchBar
                    placeholder="Search guide categories..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ width: '100%' }}
                />
            </div>


            {/* Categories List */}
            <div className="categories-list-container" style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                background: 'white',
                borderRadius: '24px',
                padding: '1.5rem',
                boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                border: '1px solid rgba(0,0,0,0.03)'
            }}>
                {filteredCategories.length === 0 ? (
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
                            <Book size={36} color="#f97316" />
                        </div>
                        <h3 style={{
                            fontSize: '1.1rem',
                            fontWeight: 700,
                            color: '#1e293b',
                            margin: 0
                        }}>{searchTerm ? 'No matching categories' : 'No guide categories found'}</h3>
                        <p style={{
                            fontSize: '0.9rem',
                            color: '#64748b',
                            textAlign: 'center',
                            margin: 0,
                            maxWidth: '400px'
                        }}>
                            {searchTerm
                                ? `No results found for "${searchTerm}". Try a different term.`
                                : 'Get started by creating your first guide category to organize your content.'}
                        </p>
                    </div>
                ) : (
                    filteredCategories.map((cat, index) => {
                        const IconComponent = availableIcons[cat.icon] || Book;
                        return (
                            <div key={cat.id} className="category-card" style={{
                                border: '1px solid #e2e8f0',
                                borderRadius: '16px',
                                padding: '1.5rem',
                                background: '#fff',
                                position: 'relative',
                                transition: 'all 0.2s',
                                maxWidth: '800px',
                                margin: '0'
                            }}>
                                <div className="category-header" style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginBottom: cat.expanded ? '1.5rem' : '0',
                                    borderBottom: cat.expanded ? '1px solid #f1f5f9' : 'none',
                                    paddingBottom: cat.expanded ? '1rem' : '0'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, cursor: 'pointer' }} onClick={() => updateCategory(cat.id, 'expanded', !cat.expanded)}>

                                        <span style={{ fontWeight: 700, color: '#64748b' }}>#{index + 1}</span>
                                        <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>{cat.title || 'New Category'}</h3>
                                    </div>
                                    <div className="category-actions" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                        <Toggle active={cat.active} onToggle={() => updateCategory(cat.id, 'active', !cat.active)} />
                                        <button onClick={() => deleteCategory(cat.id)} style={{ ...iconBtnStyle, color: '#ef4444' }}>
                                            <Trash2 size={18} />
                                        </button>
                                        <button onClick={() => updateCategory(cat.id, 'expanded', !cat.expanded)} style={iconBtnStyle}>
                                            {cat.expanded ? <ChevronUp size={20} color="#64748b" /> : <ChevronDown size={20} color="#64748b" />}
                                        </button>
                                    </div>
                                </div>

                                {cat.expanded && (
                                    <>
                                        <div className="grid-layout" style={gridStyle}>
                                            <div>
                                                <label style={labelStyle}>Category Icon</label>
                                                <div style={{ position: 'relative' }}>
                                                    <div style={{
                                                        width: '80px', height: '80px', borderRadius: '12px',
                                                        border: '1px dashed #cbd5e1', display: 'flex', alignItems: 'center',
                                                        justifyContent: 'center', cursor: 'pointer', background: '#f8fafc'
                                                    }} onClick={() => setIconPickerOpen(iconPickerOpen === cat.id ? null : cat.id)}>
                                                        <IconComponent size={32} color="#f97316" />
                                                    </div>
                                                    {iconPickerOpen === cat.id && (
                                                        <div style={{
                                                            position: 'absolute', top: '90px', left: 0, zIndex: 10,
                                                            background: 'white', border: '1px solid #e2e8f0', borderRadius: '12px',
                                                            padding: '1rem', boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                                            display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.5rem',
                                                            width: 'max-content'
                                                        }}>
                                                            {Object.entries(availableIcons).map(([name, Icon]) => (
                                                                <div key={name} style={{
                                                                    padding: '0.5rem', cursor: 'pointer', borderRadius: '8px',
                                                                    background: cat.icon === name ? '#fff7ed' : 'transparent',
                                                                    display: 'flex', justifyContent: 'center', alignItems: 'center'
                                                                }} onClick={() => { updateCategory(cat.id, 'icon', name); setIconPickerOpen(null); }}>
                                                                    <Icon size={20} color={cat.icon === name ? '#f97316' : '#64748b'} />
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                                <div style={{ position: 'relative' }}>
                                                    <input
                                                        type="text"
                                                        style={{
                                                            ...floatingInputStyle,
                                                            background: 'white',
                                                            border: `1.5px solid ${focusedField?.id === cat.id && focusedField?.field === 'title' ? '#f97316' : '#e2e8f0'}`
                                                        }}
                                                        value={cat.title}
                                                        onChange={(e) => updateCategory(cat.id, 'title', e.target.value)}
                                                        onFocus={() => setFocusedField({ id: cat.id, field: 'title' })}
                                                        onBlur={() => setFocusedField(null)}
                                                    />
                                                    <label style={{
                                                        ...floatingLabelStyle,
                                                        ...(cat.title || (focusedField?.id === cat.id && focusedField?.field === 'title') ? {
                                                            top: '-0.6rem',
                                                            left: '0.8rem',
                                                            fontSize: '0.75rem',
                                                            color: '#f97316',
                                                            background: 'white',
                                                            padding: '0 0.25rem',
                                                            zIndex: 2
                                                        } : {})
                                                    }}>
                                                        Category Title
                                                    </label>
                                                </div>
                                                <div style={{ position: 'relative' }}>
                                                    <input
                                                        type="text"
                                                        style={{
                                                            ...floatingInputStyle,
                                                            background: 'white',
                                                            border: `1.5px solid ${focusedField?.id === cat.id && focusedField?.field === 'description' ? '#f97316' : '#e2e8f0'}`
                                                        }}
                                                        value={cat.description}
                                                        onChange={(e) => updateCategory(cat.id, 'description', e.target.value)}
                                                        onFocus={() => setFocusedField({ id: cat.id, field: 'description' })}
                                                        onBlur={() => setFocusedField(null)}
                                                    />
                                                    <label style={{
                                                        ...floatingLabelStyle,
                                                        ...(cat.description || (focusedField?.id === cat.id && focusedField?.field === 'description') ? {
                                                            top: '-0.6rem',
                                                            left: '0.8rem',
                                                            fontSize: '0.75rem',
                                                            color: '#f97316',
                                                            background: 'white',
                                                            padding: '0 0.25rem',
                                                            zIndex: 2
                                                        } : {})
                                                    }}>
                                                        Short Description
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Sub-Items (Accordion) Section */}
                                        <div style={{ marginTop: '2rem', borderTop: '1px solid #f1f5f9', paddingTop: '1.5rem' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                                <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: '#475569' }}>Items</h4>
                                                <button style={outlineBtnStyle} onClick={() => openAddItemPanel(cat.id)}>
                                                    <Plus size={14} /> Add Item
                                                </button>
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                                {cat.items.map(item => (
                                                    <div key={item.id} style={{
                                                        border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden'
                                                    }}>
                                                        <div style={{
                                                            padding: '1rem', background: '#f8fafc', cursor: 'pointer',
                                                            display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                                                        }} onClick={() => toggleItemExpansion(cat.id, item.id)}>
                                                            <span style={{ fontWeight: 600, color: '#1e293b' }}>{item.title}</span>
                                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                                <button onClick={(e) => { e.stopPropagation(); deleteItem(cat.id, item.id); }}
                                                                    style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#ef4444', padding: '4px' }}>
                                                                    <Trash2 size={16} />
                                                                </button>
                                                                {item.expanded ? <ChevronUp size={18} color="#64748b" /> : <ChevronDown size={18} color="#64748b" />}
                                                            </div>
                                                        </div>
                                                        {item.expanded && (
                                                            <div style={{ padding: '1rem', borderTop: '1px solid #e2e8f0', background: 'white' }}>
                                                                <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem', whiteSpace: 'pre-wrap' }}>{item.description || 'No description provided.'}</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                                {cat.items.length === 0 && (
                                                    <div style={{ textAlign: 'center', padding: '1rem', color: '#94a3b8', fontSize: '0.9rem', fontStyle: 'italic' }}>
                                                        No items added yet. Click &quot;Add Item&quot; to start.
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        );
                    })
                )}
            </div>


            < div className="side-panel" style={{
                position: 'fixed', top: 0, right: activeCategoryForAdd ? 0 : '-400px', width: '350px',
                height: '100vh', background: 'white', boxShadow: '-4px 0 20px rgba(0,0,0,0.1)',
                zIndex: 9999, padding: '2rem', transition: 'right 0.3s ease-in-out',
                display: 'flex', flexDirection: 'column',
                borderTopLeftRadius: '24px', borderBottomLeftRadius: '24px'
            }
            }>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>Add New Item</h2>
                    <button onClick={closeAddItemPanel} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#64748b' }}>
                        <X size={24} />
                    </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', flex: 1 }}>
                    <div>
                        <label style={labelStyle}>Title</label>
                        <input type="text" style={inputStyle} value={newItemTitle} onChange={(e) => setNewItemTitle(e.target.value)} placeholder="e.g. Mental Discipline" />
                    </div>
                    <div>
                        <label style={labelStyle}>Description</label>
                        <textarea style={{ ...inputStyle, minHeight: '150px', resize: 'vertical' }}
                            value={newItemDescription} onChange={(e) => setNewItemDescription(e.target.value)}
                            placeholder="Enter detailed description here..." />
                    </div>
                </div>

                <div style={{ marginTop: 'auto', paddingTop: '2rem' }}>
                    <button onClick={handleAddItem} style={{
                        width: '100%', padding: '1rem', background: '#f97316', color: 'white',
                        border: 'none', borderRadius: '12px', fontWeight: 700, fontSize: '1rem', cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(249, 115, 22, 0.3)'
                    }}>
                        Add Item
                    </button>
                </div>
            </div >

            {
                (activeCategoryForAdd || isAddCategoryOpen) && (
                    <div style={{
                        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                        background: 'rgba(0,0,0,0.3)', zIndex: 9998
                    }} onClick={() => { closeAddItemPanel(); closeAddCategoryPanel(); }} />
                )
            }

            <div className="side-panel" style={{
                position: 'fixed', top: 0, right: isAddCategoryOpen ? 0 : '-400px', width: '350px',
                height: '100vh', background: 'white', boxShadow: '-4px 0 20px rgba(0,0,0,0.1)',
                zIndex: 9999, padding: '2rem', transition: 'right 0.3s ease-in-out',
                display: 'flex', flexDirection: 'column',
                borderTopLeftRadius: '24px', borderBottomLeftRadius: '24px'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>Add New Category</h2>
                    <button onClick={closeAddCategoryPanel} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#64748b' }}>
                        <X size={24} />
                    </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', flex: 1 }}>
                    <div>
                        <label style={labelStyle}>Category Icon</label>
                        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                            {Object.entries(availableIcons).map(([name, Icon]) => (
                                <div
                                    key={name}
                                    onClick={() => setSelectedIcon(name)}
                                    style={{
                                        width: '48px',
                                        height: '48px',
                                        borderRadius: '10px',
                                        border: `2px solid ${selectedIcon === name ? '#f97316' : '#e2e8f0'}`,
                                        background: selectedIcon === name ? '#fff7ed' : '#f8fafc',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    <Icon size={20} color={selectedIcon === name ? '#f97316' : '#64748b'} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label style={labelStyle}>Category Title</label>
                        <input type="text" style={inputStyle} value={newCategoryTitle} onChange={(e) => setNewCategoryTitle(e.target.value)} placeholder="e.g. Morning Rituals" />
                    </div>
                    <div>
                        <label style={labelStyle}>Description</label>
                        <textarea style={{ ...inputStyle, minHeight: '150px', resize: 'vertical' }}
                            value={newCategoryDescription} onChange={(e) => setNewCategoryDescription(e.target.value)}
                            placeholder="Brief description of this category..." />
                    </div>
                </div>

                <div style={{ marginTop: 'auto', paddingTop: '2rem' }}>
                    <button
                        onClick={handleCreateCategory}
                        disabled={loading}
                        style={{
                            width: '100%',
                            padding: '1rem',
                            background: loading ? '#cbd5e1' : '#f97316',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            fontWeight: 700,
                            fontSize: '1rem',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            boxShadow: loading ? 'none' : '0 4px 12px rgba(249, 115, 22, 0.3)',
                            opacity: loading ? 0.7 : 1
                        }}
                    >
                        {loading ? 'Creating...' : 'Create Category'}
                    </button>
                </div>
            </div>

            {/* Responsive styles */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes slideIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @media (max-width: 768px) {
                    .page-header { flex-direction: column !important; align-items: stretch !important; gap: 0.75rem !important; margin-bottom: 1rem !important; }
                    .page-header h1 { font-size: 1.2rem !important; }
                    
                    .create-category-btn { width: 100% !important; margin-top: 0.5rem; justify-content: center !important; }
                    
                    .search-card { padding: 1rem !important; margin-bottom: 1rem !important; }
                    
                    .categories-list-container { padding: 1rem !important; }
                    
                    .category-card { 
                        padding: 1rem !important; 
                        max-width: 100% !important;
                    }
                    
                    .category-header {
                        flex-direction: column !important;
                        align-items: flex-start !important;
                        gap: 1rem !important;
                    }
                    
                    .category-actions {
                        width: 100% !important;
                        justify-content: space-between !important;
                    }

                    .grid-layout {
                        grid-template-columns: 1fr !important;
                        gap: 1rem !important;
                    }

                    .side-panel {
                        width: 100% !important;
                        right: \${activeCategoryForAdd || isAddCategoryOpen ? '0' : '-100%'} !important;
                        border-radius: 0 !important;
                        padding: 1.5rem !important;
                    }

                    .toast-notification {
                        top: 1rem !important;
                        right: 1rem !important;
                        left: 1rem !important;
                    }
                }
                `
            }} />
        </div >
    );
}

// Reusable Components
function SectionCard({ title, icon, children, action }) {
    return (
        <div style={{
            background: 'white',
            borderRadius: '24px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
            border: '1px solid rgba(0,0,0,0.03)',
            overflow: 'hidden',
            marginBottom: '2rem'
        }}>
            <div style={{
                padding: '1.5rem 2rem',
                borderBottom: '1px solid #f1f5f9',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '12px',
                        background: '#fff7ed',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        {icon}
                    </div>
                    <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1e293b', margin: 0 }}>{title}</h2>
                </div>
                {action}
            </div>
            <div style={{ padding: '2rem' }}>
                {children}
            </div>
        </div>
    );
}

function Toggle({ active, onToggle }) {
    return (
        <div
            onClick={onToggle}
            style={{
                width: '48px',
                height: '26px',
                background: active ? '#f97316' : '#cbd5e1',
                borderRadius: '99px',
                position: 'relative',
                cursor: 'pointer',
                transition: 'background 0.3s'
            }}
        >
            <div style={{
                width: '20px',
                height: '20px',
                background: 'white',
                borderRadius: '50%',
                position: 'absolute',
                top: '3px',
                left: active ? '25px' : '3px',
                transition: 'left 0.3s',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }} />
        </div>
    );
}

// Styles
const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1.5rem',
    alignItems: 'start'
};

const labelStyle = {
    display: 'block',
    fontSize: '0.85rem',
    fontWeight: 700,
    color: '#475569',
    marginBottom: '0.5rem'
};

const inputStyle = {
    width: '100%',
    padding: '0.8rem 1rem',
    borderRadius: '12px',
    border: '1.5px solid #e2e8f0',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'border-color 0.2s',
    background: '#f8fafc',
    color: '#1e293b'
};

const outlineBtnStyle = {
    padding: '0.6rem 1.2rem',
    borderRadius: '10px',
    border: '1.5px solid #e2e8f0',
    background: 'white',
    color: '#64748b',
    fontWeight: 600,
    fontSize: '0.85rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
};

const iconBtnStyle = {
    padding: '0.5rem',
    borderRadius: '8px',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background 0.2s'
};

const moveBtnStyle = {
    ...iconBtnStyle,
    color: '#94a3b8',
    padding: '2px'
};

const floatingInputStyle = {
    width: '100%',
    padding: '1rem',
    borderRadius: '12px',
    border: '1.5px solid #e2e8f0',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'border-color 0.2s',
    background: '#f8fafc',
    color: '#1e293b',
    height: 'auto',
    minHeight: '56px'
};

const floatingLabelStyle = {
    position: 'absolute',
    left: '1rem',
    top: '1rem',
    fontSize: '0.95rem',
    color: '#94a3b8',
    pointerEvents: 'none',
    transition: 'all 0.2s',
    fontWeight: 500
};
