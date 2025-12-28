// Format timestamp
export function formatTime(timestamp) {
    const ts = parseInt(timestamp);
    if (isNaN(ts)) return '--';
    const date = new Date(ts);
    return date.toLocaleString('en-US', {
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
}

// Format USD
export function formatUSD(value) {
    const num = parseFloat(value);
    if (isNaN(num)) return '--';
    return '$' + num.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

// Format number
export function formatNumber(value, decimals = 2) {
    const num = parseFloat(value);
    if (isNaN(num)) return '--';
    return num.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

// Get size class
export function getSizeClass(usd) {
    const value = parseFloat(usd);
    if (value >= 500000) return 'size-huge';
    if (value >= 100000) return 'size-large';
    return '';
}

// Get side class
export function getSideClass(side) {
    if (!side) return '';
    const s = side.toString().toUpperCase();
    if (s === 'BUY' || s === 'BUYER') return 'side-buy';
    if (s === 'SELL' || s === 'SELLER') return 'side-sell';
    return '';
}
