import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export function Dropdown({
    options = [],
    value,
    onChange,
    placeholder = "Select...",
    icon: Icon,
    label,
    width = '100%',
    optionLabel = 'label',
    optionValue = 'value'
}) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const selectedOption = options.find(opt => (typeof opt === 'object' ? opt[optionValue] : opt) === value);
    const displayValue = selectedOption
        ? (typeof selectedOption === 'object' ? selectedOption[optionLabel] : selectedOption)
        : placeholder;

    return (
        <div
            className="custom-dropdown"
            ref={dropdownRef}
            style={{ width, position: 'relative', fontFamily: 'inherit' }}
        >
            {label && (
                <label style={{
                    display: 'block',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: '#64748b',
                    marginBottom: '0.4rem',
                    letterSpacing: '0.02em'
                }}>
                    {label.toUpperCase()}
                </label>
            )}

            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: '12px',
                    border: isOpen ? '1.5px solid #3b82f6' : '1.5px solid #e2e8f0',
                    background: isOpen ? '#ffffff' : '#f8fafc',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: isOpen ? '0 4px 12px rgba(59, 130, 246, 0.1)' : 'none',
                    outline: 'none',
                    color: value ? '#1e293b' : '#94a3b8',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    textAlign: 'left'
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', overflow: 'hidden' }}>
                    {Icon && <Icon size={18} color={value ? "#3b82f6" : "#94a3b8"} />}
                    <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {displayValue}
                    </span>
                </div>
                <ChevronDown
                    size={16}
                    color={isOpen ? "#3b82f6" : "#94a3b8"}
                    style={{
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s ease',
                        flexShrink: 0
                    }}
                />
            </button>

            {isOpen && (
                <div style={{
                    position: 'absolute',
                    top: 'calc(100% + 6px)',
                    left: 0,
                    right: 0,
                    background: 'white',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                    border: '1px solid #f1f5f9',
                    zIndex: 50,
                    padding: '0.4rem',
                    maxHeight: '240px',
                    overflowY: 'auto',
                    animation: 'fadeIn 0.1s ease-out'
                }}>
                    {options.map((option, index) => {
                        const optVal = typeof option === 'object' ? option[optionValue] : option;
                        const optLabel = typeof option === 'object' ? option[optionLabel] : option;
                        const isSelected = value === optVal;

                        return (
                            <div
                                key={index}
                                onClick={() => {
                                    onChange(optVal);
                                    setIsOpen(false);
                                }}
                                style={{
                                    padding: '0.6rem 0.8rem',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    fontSize: '0.85rem',
                                    fontWeight: isSelected ? 700 : 500,
                                    color: isSelected ? '#3b82f6' : '#475569',
                                    background: isSelected ? '#eff6ff' : 'transparent',
                                    transition: 'background 0.15s ease'
                                }}
                                onMouseEnter={(e) => {
                                    if (!isSelected) e.currentTarget.style.background = '#f8fafc';
                                }}
                                onMouseLeave={(e) => {
                                    if (!isSelected) e.currentTarget.style.background = 'transparent';
                                }}
                            >
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    {typeof option === 'object' && option.icon && <option.icon size={14} />}
                                    {optLabel}
                                </span>
                                {isSelected && <Check size={14} color="#3b82f6" />}
                            </div>
                        );
                    })}
                </div>
            )}
            <style>
                {`
                    @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(-4px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    .custom-dropdown ::-webkit-scrollbar {
                        width: 4px;
                    }
                    .custom-dropdown ::-webkit-scrollbar-track {
                        background: transparent;
                    }
                    .custom-dropdown ::-webkit-scrollbar-thumb {
                        background: #cbd5e1;
                        border-radius: 4px;
                    }
                    .custom-dropdown ::-webkit-scrollbar-thumb:hover {
                        background: #94a3b8;
                    }
                `}
            </style>
        </div>
    );
}
