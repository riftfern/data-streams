import { useState } from 'react';
import { Header } from './components/Header';
import { StatsBar } from './components/StatsBar';
import { TierToggle } from './components/TierToggle';
import { Liquidations } from './components/Liquidations';
import { BigLiquidations } from './components/BigLiquidations';
import { Trades } from './components/Trades';
import { Overview } from './components/Overview';
import './styles/terminal.css';

const TABS = [
    { id: 'liquidations', label: '[1] LIQUIDATIONS', Component: Liquidations },
    { id: 'big-liqs', label: '[2] BIG LIQS (>$100K)', Component: BigLiquidations },
    { id: 'trades', label: '[3] LARGE TRADES', Component: Trades },
    { id: 'overview', label: '[4] OVERVIEW', Component: Overview },
];

function App() {
    const [activeTab, setActiveTab] = useState('liquidations');
    const [tier, setTier] = useState(0); // 0 = all, 25, 50, 100

    const ActiveComponent = TABS.find(t => t.id === activeTab)?.Component || Liquidations;

    return (
        <div className="crt">
            <div className="terminal-container">
                <Header />

                <div className="nav-tabs">
                    {TABS.map(tab => (
                        <button
                            key={tab.id}
                            className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <StatsBar tier={tier} />

                <TierToggle tier={tier} setTier={setTier} />

                <ActiveComponent tier={tier} />

                <div className="footer">
                    [ QUANT TERMINAL v1.0 ] - DATA STREAMS MONITOR - SYSTEM OPERATIONAL
                </div>
            </div>
        </div>
    );
}

export default App;
