export function TierToggle({ tier, setTier }) {
    const tiers = [
        { value: 25, label: 'TOP 25' },
        { value: 50, label: 'TOP 50' },
        { value: 100, label: 'TOP 100' },
        { value: 0, label: 'ALL' }
    ];

    return (
        <div className="tier-toggle">
            <span className="tier-label">SYMBOLS:</span>
            <div className="tier-buttons">
                {tiers.map(t => (
                    <button
                        key={t.value}
                        className={`tier-btn ${tier === t.value ? 'active' : ''}`}
                        onClick={() => setTier(t.value)}
                    >
                        {t.label}
                    </button>
                ))}
            </div>
        </div>
    );
}
