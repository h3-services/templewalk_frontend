import React from 'react';
import { Search } from 'lucide-react';

export function SearchBar({ value, onChange, placeholder, style = {} }) {
    return (
        <div style={{ position: 'relative', ...style }}>
            <Search size={18} style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#94a3b8'
            }} />
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
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
                    boxSizing: 'border-box'
                }}
            />
        </div>
    );
}
