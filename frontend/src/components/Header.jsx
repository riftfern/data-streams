import { useState, useEffect } from 'react';
import { useLiquidations, useBigLiquidations, useTrades } from '../hooks/useData';

export function Header() {
    const [time, setTime] = useState(new Date());
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
    const { data: liqData } = useLiquidations();
    const { data: bigLiqData } = useBigLiquidations();
    const { data: tradeData } = useTrades();

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (theme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    const totalRecords = liqData.length + bigLiqData.length + tradeData.length;

    return (
        <div className="header">
            <div className="header-top">
                <div>
                    <div className="header-title">
                        QUANT TERMINAL v1.0<span className="cursor"></span>
                    </div>
                    <div className="header-subtitle">
                        &gt;&gt; BINANCE FUTURES MARKET SURVEILLANCE SYSTEM
                    </div>
                </div>
                <div className="theme-toggle">
                    <span className="theme-toggle-label">DARK</span>
                    <div
                        className={`toggle-switch ${theme === 'light' ? 'light' : ''}`}
                        onClick={toggleTheme}
                    />
                    <span className="theme-toggle-label">LIGHT</span>
                </div>
            </div>
            <div className="header-status">
                <span>
                    SYSTEM TIME: {time.toLocaleTimeString('en-US', { hour12: false })}
                </span>
                <span>RECORDS LOADED: {totalRecords.toLocaleString()}</span>
            </div>
        </div>
    );
}
