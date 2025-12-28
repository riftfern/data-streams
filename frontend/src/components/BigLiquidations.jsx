import { useBigLiquidations } from '../hooks/useData';
import { DataTable, Legend } from './DataTable';
import { formatTime, formatNumber, formatUSD, getSideClass } from '../utils/formatters';

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

export function BigLiquidations() {
    const { data, loading } = useBigLiquidations();

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
                <td className="size-huge">{formatUSD(usdSize)}</td>
                <td>{status || '--'}</td>
            </tr>
        );
    };

    return (
        <div className="data-panel active">
            <div className="panel-header">
                <span className="panel-title">WHALE LIQUIDATIONS (&gt;$100K)</span>
            </div>
            <Legend items={legendItems} />
            <DataTable
                data={data}
                columns={columns}
                loading={loading}
                emptyMessage="NO WHALE LIQUIDATIONS RECORDED"
                renderRow={renderRow}
            />
        </div>
    );
}
