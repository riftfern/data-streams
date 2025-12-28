import { useLiquidations, useBigLiquidations, useTrades } from '../hooks/useData';
import { formatUSD } from '../utils/formatters';

export function StatsBar() {
    const { data: liqData } = useLiquidations();
    const { data: bigLiqData } = useBigLiquidations();
    const { data: tradeData } = useTrades();

    const totalLiqValue = liqData.reduce((sum, row) => sum + (parseFloat(row[11]) || 0), 0);

    return (
        <div className="stats-bar">
            <div className="stat-box">
                <div className="stat-label">TOTAL LIQUIDATIONS</div>
                <div className="stat-value">{liqData.length.toLocaleString()}</div>
            </div>
            <div className="stat-box">
                <div className="stat-label">TOTAL LIQ VALUE</div>
                <div className="stat-value">{formatUSD(totalLiqValue)}</div>
            </div>
            <div className="stat-box">
                <div className="stat-label">LARGE TRADES</div>
                <div className="stat-value">{tradeData.length.toLocaleString()}</div>
            </div>
            <div className="stat-box">
                <div className="stat-label">BIG LIQS (&gt;$100K)</div>
                <div className="stat-value">{bigLiqData.length.toLocaleString()}</div>
            </div>
        </div>
    );
}
