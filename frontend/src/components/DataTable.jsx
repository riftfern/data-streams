import { useState, useMemo } from 'react';

export function DataTable({
    data,
    columns,
    loading,
    emptyMessage = 'NO DATA AVAILABLE',
    renderRow
}) {
    if (loading) {
        return (
            <div className="data-table-container">
                <table className="data-table">
                    <thead>
                        <tr>
                            {columns.map((col, i) => (
                                <th key={i}>{col.label}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan={columns.length} className="loading">
                                LOADING DATA
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }

    if (data.length === 0) {
        return (
            <div className="data-table-container">
                <table className="data-table">
                    <thead>
                        <tr>
                            {columns.map((col, i) => (
                                <th key={i}>{col.label}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan={columns.length} className="empty-state">
                                {emptyMessage}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }

    return (
        <div className="data-table-container">
            <table className="data-table">
                <thead>
                    <tr>
                        {columns.map((col, i) => (
                            <th key={i}>{col.label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => renderRow(row, index))}
                </tbody>
            </table>
        </div>
    );
}

export function Legend({ items }) {
    return (
        <div className="legend">
            {items.map((item, i) => (
                <div key={i} className="legend-item">
                    <div
                        className="legend-color"
                        style={{ background: `var(--color-${item.color})` }}
                    />
                    <span>{item.label}</span>
                </div>
            ))}
        </div>
    );
}

export function FilterBar({ children }) {
    return (
        <div className="filter-bar">
            <span className="filter-label">FILTER:</span>
            {children}
        </div>
    );
}

export function FilterInput({ placeholder, value, onChange, type = 'text' }) {
    return (
        <input
            type={type}
            className="filter-input"
            placeholder={placeholder}
            value={value}
            onChange={e => onChange(e.target.value)}
        />
    );
}

export function PanelControls({ children }) {
    return <div className="panel-controls">{children}</div>;
}

export function PanelButton({ onClick, children }) {
    return (
        <button className="panel-btn" onClick={onClick}>
            {children}
        </button>
    );
}
