import { useState, useMemo } from 'react';
import { useTrades } from '../hooks/useData';
import { DataTable, Legend, FilterBar, FilterInput, PanelControls, PanelButton } from './DataTable';
import { formatTime, formatNumber, formatUSD, getSizeClass, getSideClass } from '../utils/formatters';

const columns = [
    { label: 'TIME' },
    { label: 'SYMBOL' },
    { label: 'PRICE' },
    { label: 'QUANTITY' },
    { label: 'USD VALUE' },
    { label: 'SIDE' }
];

const legendItems = [
    { color: 'buy', label: 'BUYER (Taker Buy)' },
    { color: 'sell', label: 'SELLER (Taker Sell)' }
];

export function Trades({ tier }) {
    const { data, loading } = useTrades();
    const [symbolFilter, setSymbolFilter] = useState('');
    const [sideFilter, setSideFilter] = useState('');
    const [sortBy, setSortBy] = useState('time');
    const [sortOrder, setSortOrder] = useState('desc');

    const filteredData = useMemo(() => {
        let result = [...data];

        // Apply tier filter (column 8 has tier value in new format)
        if (tier > 0) {
            result = result.filter(row => {
                const rowTier = parseInt(row[8]) || 0;
                return rowTier > 0 && rowTier <= tier;
            });
        }

        // Apply filters
        if (symbolFilter) {
            result = result.filter(row =>
                (row[1] || '').toUpperCase().includes(symbolFilter.toUpperCase())
            );
        }
        if (sideFilter) {
            result = result.filter(row => {
                const isBuyerMaker = row[6];
                const side = (isBuyerMaker === 'True' || isBuyerMaker === 'true') ? 'SELLER' : 'BUYER';
                return side.includes(sideFilter.toUpperCase());
            });
        }

        // Apply sorting
        result.sort((a, b) => {
            let valA, valB;
            if (sortBy === 'usd') {
                valA = parseFloat(a[7]) || (parseFloat(a[3]) * parseFloat(a[4])) || 0;
                valB = parseFloat(b[7]) || (parseFloat(b[3]) * parseFloat(b[4])) || 0;
            } else {
                valA = parseInt(a[0]) || 0;
                valB = parseInt(b[0]) || 0;
            }
            return sortOrder === 'desc' ? valB - valA : valA - valB;
        });

        return result;
    }, [data, tier, symbolFilter, sideFilter, sortBy, sortOrder]);

    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
        } else {
            setSortBy(field);
            setSortOrder('desc');
        }
    };

    const renderRow = (row, index) => {
        const eventTime = row[0];
        const symbol = row[1];
        const price = row[3];
        const quantity = row[4];
        const isBuyerMaker = row[6];
        // Use pre-calculated USD size if available (column 7), else calculate
        const usdValue = parseFloat(row[7]) || (parseFloat(price) * parseFloat(quantity));
        const side = (isBuyerMaker === 'True' || isBuyerMaker === 'true') ? 'SELLER' : 'BUYER';
        const rowTier = parseInt(row[8]) || 0;

        return (
            <tr key={index}>
                <td>{formatTime(eventTime)}</td>
                <td className="symbol">
                    {(symbol || '--').trim().replace('USDT', '')}
                    {rowTier > 0 && <span className={`tier-badge tier-${rowTier}`}>{rowTier}</span>}
                </td>
                <td>{formatNumber(price, 4)}</td>
                <td>{formatNumber(quantity, 4)}</td>
                <td className={getSizeClass(usdValue)}>{formatUSD(usdValue)}</td>
                <td className={getSideClass(side)}>{side}</td>
            </tr>
        );
    };

    return (
        <div className="data-panel active">
            <div className="panel-header">
                <span className="panel-title">LARGE TRADES FEED</span>
                <PanelControls>
                    <PanelButton onClick={() => handleSort('usd')}>
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
                    placeholder="BUYER/SELLER"
                    value={sideFilter}
                    onChange={setSideFilter}
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
