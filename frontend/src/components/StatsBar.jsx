import { useMemo } from 'react';
import { useLiquidations, useBigLiquidations, useTrades } from '../hooks/useData';
import { formatUSD } from '../utils/formatters';

export function StatsBar({ tier }) {
    const { data: liqData } = useLiquidations();
    const { data: bigLiqData } = useBigLiquidations();
    const { data: tradeData } = useTrades();

    const stats = useMemo(() => {
        // Filter by tier if set
        const filterByTier = (data, tierCol) => {
            if (tier === 0) return data;
            return data.filter(row => {
                const rowTier = parseInt(row[tierCol]) || 0;
                return rowTier > 0 && rowTier <= tier;
            });
        };

        const filteredLiqs = filterByTier(liqData, 12);
        const filteredBigLiqs = filterByTier(bigLiqData, 12);
        const filteredTrades = filterByTier(tradeData, 8);

        const totalLiqValue = filteredLiqs.reduce((sum, row) => sum + (parseFloat(row[11]) || 0), 0);

        return {
            liqCount: filteredLiqs.length,
            liqValue: totalLiqValue,
            tradeCount: filteredTrades.length,
            bigLiqCount: filteredBigLiqs.length
        };
    }, [liqData, bigLiqData, tradeData, tier]);

    return (
        <div className="stats-bar">
            <div className="stat-box">
                <div className="stat-label">TOTAL LIQUIDATIONS</div>
                <div className="stat-value">{stats.liqCount.toLocaleString()}</div>
            </div>
            <div className="stat-box">
                <div className="stat-label">TOTAL LIQ VALUE</div>
                <div className="stat-value">{formatUSD(stats.liqValue)}</div>
            </div>
            <div className="stat-box">
                <div className="stat-label">LARGE TRADES</div>
                <div className="stat-value">{stats.tradeCount.toLocaleString()}</div>
            </div>
            <div className="stat-box">
                <div className="stat-label">BIG LIQS (&gt;$100K)</div>
                <div className="stat-value">{stats.bigLiqCount.toLocaleString()}</div>
            </div>
        </div>
    );
}
