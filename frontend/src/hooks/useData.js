import { useState, useEffect, useCallback } from 'react';

// Parse CSV without headers - returns array of arrays
function parseCSV(csv) {
    const lines = csv.trim().split('\n');
    return lines.map(line => {
        return line.split(',').map(v => v.trim());
    }).filter(row => row.length > 1 && row[0] !== '');
}

export function useLiquidations() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        try {
            const response = await fetch('/binance.csv');
            if (response.ok) {
                const csv = await response.text();
                const parsed = parseCSV(csv);
                // Sort by time descending (column 10)
                parsed.sort((a, b) => parseInt(b[10]) - parseInt(a[10]));
                setData(parsed);
            }
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
        // Poll every 5 seconds for updates
        const interval = setInterval(fetchData, 5000);
        return () => clearInterval(interval);
    }, [fetchData]);

    return { data, loading, error, refetch: fetchData };
}

export function useBigLiquidations() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        try {
            const response = await fetch('/binance_big_liqs.csv');
            if (response.ok) {
                const csv = await response.text();
                const parsed = parseCSV(csv);
                // Sort by time descending (column 10)
                parsed.sort((a, b) => parseInt(b[10]) - parseInt(a[10]));
                setData(parsed);
            }
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 5000);
        return () => clearInterval(interval);
    }, [fetchData]);

    return { data, loading, error, refetch: fetchData };
}

export function useTrades() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        try {
            const response = await fetch('/binance_trades.csv');
            if (response.ok) {
                const csv = await response.text();
                const parsed = parseCSV(csv);
                // Sort by time descending (column 0)
                parsed.sort((a, b) => parseInt(b[0]) - parseInt(a[0]));
                setData(parsed);
            }
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 5000);
        return () => clearInterval(interval);
    }, [fetchData]);

    return { data, loading, error, refetch: fetchData };
}
