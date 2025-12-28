import { useState, useMemo } from 'react';
import { useLiquidations } from '../hooks/useData';
import { DataTable, Legend, FilterBar, FilterInput, PanelControls, PanelButton } from './DataTable';
import { formatTime, formatNumber, formatUSD, getSizeClass, getSideClass } from '../utils/formatters';

const columns = [
    { label: 'TIME' },
    { label: 'SYMBOL' },
    { label: 'SIDE' },
    { label: 'PRICE' },
    { label: 'QTY' },
    { label: 'USD SIZE' },
    { label: 'STATUS' }
];

const legendItems = [
    { color: 'buy', label: 'BUY (Long Liquidated)' },
    { color: 'sell', label: 'SELL (Short Liquidated)' }
];

export function Liquidations() {
    const { data, loading } = useLiquidations();
    const [symbolFilter, setSymbolFilter] = useState('');
    const [sideFilter, setSideFilter] = useState('');
    const [minFilter, setMinFilter] = useState('');
    const [sortBy, setSortBy] = useState('time');
    const [sortOrder, setSortOrder] = useState('desc');

    const filteredData = useMemo(() => {
        let result = [...data];

        // Apply filters
        if (symbolFilter) {
            result = result.filter(row =>
                (row[0] || '').toUpperCase().includes(symbolFilter.toUpperCase())
            );
        }
        if (sideFilter) {
            result = result.filter(row =>
                (row[1] || '').toUpperCase().includes(sideFilter.toUpperCase())
            );
        }
        if (minFilter) {
            const min = parseFloat(minFilter) || 0;
            result = result.filter(row => (parseFloat(row[11]) || 0) >= min);
        }

        // Apply sorting
        result.sort((a, b) => {
            let valA, valB;
            if (sortBy === 'usd_size') {
                valA = parseFloat(a[11]) || 0;
                valB = parseFloat(b[11]) || 0;
            } else {
                valA = parseInt(a[10]) || 0;
                valB = parseInt(b[10]) || 0;
            }
            return sortOrder === 'desc' ? valB - valA : valA - valB;
        });

        return result;
    }, [data, symbolFilter, sideFilter, minFilter, sortBy, sortOrder]);

    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
        } else {
            setSortBy(field);
            setSortOrder('desc');
        }
    };

    const renderRow = (row, index) => {
        const symbol = row[0];
        const side = row[1];
        const qty = row[4];
        const avgPrice = row[6];
        const status = row[7];
        const time = row[10];
        const usdSize = row[11] || (parseFloat(avgPrice) * parseFloat(qty));

        return (
            <tr key={index}>
                <td>{formatTime(time)}</td>
                <td className="symbol">{symbol || '--'}</td>
                <td className={getSideClass(side)}>{side || '--'}</td>
                <td>{formatNumber(avgPrice, 6)}</td>
                <td>{formatNumber(qty, 2)}</td>
                <td className={getSizeClass(usdSize)}>{formatUSD(usdSize)}</td>
                <td>{status || '--'}</td>
            </tr>
        );
    };

    return (
        <div className="data-panel active">
            <div className="panel-header">
                <span className="panel-title">LIQUIDATION FEED</span>
                <PanelControls>
                    <PanelButton onClick={() => handleSort('usd_size')}>
                        SORT BY SIZE
                    </PanelButton>
                    <PanelButton onClick={() => handleSort('time')}>
                        SORT BY TIME
                    </PanelButton>
                </PanelControls>
            </div>
            <Legend items={legendItems} />
            <FilterBar>
                <FilterInput
                    placeholder="SYMBOL"
                    value={symbolFilter}
                    onChange={setSymbolFilter}
                />
                <FilterInput
                    placeholder="BUY/SELL"
                    value={sideFilter}
                    onChange={setSideFilter}
                />
                <FilterInput
                    placeholder="MIN USD"
                    value={minFilter}
                    onChange={setMinFilter}
                    type="number"
                />
            </FilterBar>
            <DataTable
                data={filteredData}
                columns={columns}
                loading={loading}
                renderRow={renderRow}
            />
        </div>
    );
}
