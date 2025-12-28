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

export function Overview() {
    const { data: liqData } = useLiquidations();
    const { data: bigLiqData } = useBigLiquidations();
    const { data: tradeData } = useTrades();

    const buyLiqs = liqData.filter(r => r[1] === 'BUY').length;
    const sellLiqs = liqData.filter(r => r[1] === 'SELL').length;
    const totalLiqValue = liqData.reduce((sum, row) => sum + (parseFloat(row[11]) || 0), 0);

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
                    <p>&gt;&gt; TRACKED SYMBOLS: BTC, ETH, SOL, BNB, DOGE + ALL LIQ EVENTS</p>
                    <p>&gt;&gt; THRESHOLDS: LIQS &gt; $3K | BIG LIQS &gt; $100K | TRADES &gt; $15K</p>
                    <br />
                    <p style={{ color: 'var(--accent-orange)' }}>&gt;&gt; DATA SOURCES:</p>
                    <p>   - binance.csv - Liquidation events</p>
                    <p>   - binance_big_liqs.csv - Whale liquidations</p>
                    <p>   - binance_trades.csv - Large spot trades</p>
                    <br />
                    <p style={{ color: 'var(--accent-cyan)' }}>&gt;&gt; STATISTICS:</p>
                    <p>   - Total Liquidations: {liqData.length.toLocaleString()}</p>
                    <p>   - BUY Liquidations: <span className="side-buy">{buyLiqs.toLocaleString()}</span></p>
                    <p>   - SELL Liquidations: <span className="side-sell">{sellLiqs.toLocaleString()}</span></p>
                    <p>   - Total Liq Value: {formatUSD(totalLiqValue)}</p>
                    <p>   - Large Trades: {tradeData.length.toLocaleString()}</p>
                    <p>   - Whale Liqs (&gt;$100K): {bigLiqData.length.toLocaleString()}</p>
                </div>
            </div>
        </div>
    );
}
