import { useMemo } from 'react';
import { useLiquidations, useBigLiquidations, useTrades } from '../hooks/useData';
import { formatUSD } from '../utils/formatters';

const ASCII_ART = `
    ██████╗ ██╗   ██╗ █████╗ ███╗   ██╗████████╗
   ██╔═══██╗██║   ██║██╔══██╗████╗  ██║╚══██╔══╝
   ██║   ██║██║   ██║███████║██╔██╗ ██║   ██║
   ██║▄▄ ██║██║   ██║██╔══██║██║╚██╗██║   ██║
   ╚██████╔╝╚██████╔╝██║  ██║██║ ╚████║   ██║
    ╚══▀▀═╝  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═══╝   ╚═╝

   ████████╗███████╗██████╗ ███╗   ███╗██╗███╗   ██╗ █████╗ ██╗
   ╚══██╔══╝██╔════╝██╔══██╗████╗ ████║██║████╗  ██║██╔══██╗██║
      ██║   █████╗  ██████╔╝██╔████╔██║██║██╔██╗ ██║███████║██║
      ██║   ██╔══╝  ██╔══██╗██║╚██╔╝██║██║██║╚██╗██║██╔══██║██║
      ██║   ███████╗██║  ██║██║ ╚═╝ ██║██║██║ ╚████║██║  ██║███████╗
      ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝
`;

export function Overview({ tier }) {
    const { data: liqData } = useLiquidations();
    const { data: bigLiqData } = useBigLiquidations();
    const { data: tradeData } = useTrades();

    const stats = useMemo(() => {
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

        const buyLiqs = filteredLiqs.filter(r => r[1] === 'BUY').length;
        const sellLiqs = filteredLiqs.filter(r => r[1] === 'SELL').length;
        const totalLiqValue = filteredLiqs.reduce((sum, row) => sum + (parseFloat(row[11]) || 0), 0);

        return {
            liqCount: filteredLiqs.length,
            buyLiqs,
            sellLiqs,
            liqValue: totalLiqValue,
            tradeCount: filteredTrades.length,
            bigLiqCount: filteredBigLiqs.length
        };
    }, [liqData, bigLiqData, tradeData, tier]);

    const tierLabel = tier === 0 ? 'ALL' : `TOP ${tier}`;

    return (
        <div className="data-panel active">
            <div className="panel-header">
                <span className="panel-title">SYSTEM OVERVIEW</span>
            </div>
            <div style={{ padding: '20px' }}>
                <pre className="ascii-art">{ASCII_ART}</pre>
                <div style={{ marginTop: '30px', lineHeight: '1.8' }}>
                    <p>&gt;&gt; BINANCE FUTURES MARKET SURVEILLANCE SYSTEM</p>
                    <p>&gt;&gt; MONITORING: LIQUIDATIONS | LARGE TRADES | FUNDING RATES</p>
                    <p>&gt;&gt; TRACKING: TOP 100 COINS BY MARKET CAP</p>
                    <p>&gt;&gt; THRESHOLDS: LIQS &gt; $3K | BIG LIQS &gt; $100K | TRADES &gt; $15K</p>
                    <br />
                    <p style={{ color: 'var(--accent-orange)' }}>&gt;&gt; DATA SOURCES:</p>
                    <p>   - binance.csv - Liquidation events</p>
                    <p>   - binance_big_liqs.csv - Whale liquidations</p>
                    <p>   - binance_trades.csv - Large trades</p>
                    <br />
                    <p style={{ color: 'var(--accent-cyan)' }}>&gt;&gt; STATISTICS ({tierLabel}):</p>
                    <p>   - Total Liquidations: {stats.liqCount.toLocaleString()}</p>
                    <p>   - BUY Liquidations: <span className="side-buy">{stats.buyLiqs.toLocaleString()}</span></p>
                    <p>   - SELL Liquidations: <span className="side-sell">{stats.sellLiqs.toLocaleString()}</span></p>
                    <p>   - Total Liq Value: {formatUSD(stats.liqValue)}</p>
                    <p>   - Large Trades: {stats.tradeCount.toLocaleString()}</p>
                    <p>   - Whale Liqs (&gt;$100K): {stats.bigLiqCount.toLocaleString()}</p>
                </div>
            </div>
        </div>
    );
}
