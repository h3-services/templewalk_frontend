import React from 'react';
import { ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight, ChevronDown } from 'lucide-react';

export function Pagination({
    currentPage,
    itemsPerPage,
    totalEntries,
    onPageChange,
    onItemsPerPageChange
}) {
    const totalPages = Math.ceil(totalEntries / itemsPerPage);
    const startIndex = totalEntries > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
    const endIndex = Math.min(currentPage * itemsPerPage, totalEntries);

    const btnStyle = {
        padding: '0.5rem',
        borderRadius: '8px',
        border: '1.5px solid #f1f5f9',
        background: 'white',
        color: '#64748b',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'all 0.2s',
        minWidth: '40px',
        height: '40px'
    };

    const disabledBtnStyle = {
        ...btnStyle,
        opacity: 0.5,
        cursor: 'not-allowed'
    };

    return (
        <div className="pagination-container" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
            padding: '1.25rem 2rem',
            borderTop: '1.5px solid #f1f5f9',
            background: 'white',
            flexWrap: 'wrap'
        }}>
            {/* Left Side: Results per page & Range Indicator */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>Results per page</span>
                    <div style={{ position: 'relative' }}>
                        <select
                            value={itemsPerPage}
                            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
                            style={{
                                appearance: 'none',
                                padding: '0.4rem 2.25rem 0.4rem 0.75rem',
                                borderRadius: '10px',
                                border: '1.5px solid #f1f5f9',
                                background: 'white',
                                fontSize: '0.85rem',
                                fontWeight: 700,
                                color: '#1e293b',
                                cursor: 'pointer',
                                outline: 'none'
                            }}
                        >
                            {[5, 10, 20, 50, 100].map(val => (
                                <option key={val} value={val}>{val}</option>
                            ))}
                        </select>
                        <ChevronDown size={14} color="#64748b" style={{
                            position: 'absolute',
                            right: '0.75rem',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            pointerEvents: 'none'
                        }} />
                    </div>
                </div>

                <div style={{
                    fontSize: '0.85rem',
                    color: '#64748b',
                    fontWeight: 600
                }}>
                    <span style={{ color: '#94a3b8' }}>{startIndex}-{endIndex}</span> of <span style={{ color: '#94a3b8' }}>{totalEntries.toLocaleString()}</span>
                </div>
            </div>

            {/* Right Side: Navigation Buttons */}
            <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                    onClick={() => onPageChange(1)}
                    disabled={currentPage === 1}
                    style={currentPage === 1 ? disabledBtnStyle : btnStyle}
                    title="First Page"
                >
                    <ChevronsLeft size={18} />
                </button>
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    style={currentPage === 1 ? disabledBtnStyle : btnStyle}
                    title="Previous Page"
                >
                    <ChevronLeft size={18} />
                </button>
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages || totalPages === 0}
                    style={(currentPage === totalPages || totalPages === 0) ? disabledBtnStyle : btnStyle}
                    title="Next Page"
                >
                    <ChevronRight size={18} />
                </button>
                <button
                    onClick={() => onPageChange(totalPages)}
                    disabled={currentPage === totalPages || totalPages === 0}
                    style={(currentPage === totalPages || totalPages === 0) ? disabledBtnStyle : btnStyle}
                    title="Last Page"
                >
                    <ChevronsRight size={18} />
                </button>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @media (max-width: 640px) {
                    .pagination-container {
                        flex-direction: column;
                        align-items: center;
                        gap: 1rem;
                        padding: 1.5rem !important;
                    }
                }
                `
            }} />
        </div>
    );
}
