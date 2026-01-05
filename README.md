# Binance Data Streams

Real-time tracking of Binance Futures liquidations and large trades with a live React dashboard.

## Features

- **Liquidation tracker** — Monitors forced liquidations across all USDT perpetual pairs.
- **Whale trade detection** — Flags trades above configurable thresholds.
- **Funding rate monitor** — Tracks funding rates for sentiment analysis.
- **React Dashboard** — Professional terminal-style visualization of real-time market data.

## Project Structure

```
data-streams/
├── backend/            # Python market data collectors
├── frontend/           # React dashboard (Vite)
│   └── public/data/    # Live CSV data storage
└── README.md
```

## Quick Start

### 1. Setup Backend
```bash
cd backend
pip install -r requirements.txt

# Run liquidation tracker
python liq.py

# Run whale trade detector
python huge_trades.py
```

### 2. Setup Frontend
```bash
cd frontend
npm install
npm run dev
```
The dashboard will be available at `http://localhost:5173`.

## Configuration

Adjust thresholds in the Python scripts within the `backend/` directory:

```python
# big_liqs.py
MIN_LIQUIDATION_USD = 100000  # Only log liquidations > $100k

# huge_trades.py
MIN_TRADE_USD = 500000        # Only log trades > $500k
```

## Sample Output (Terminal)

```
[LIQUIDATION] BTCUSDT | LONG | $847,234 @ 67,421.50
[WHALE TRADE] ETHUSDT | BUY  | $1,203,847 @ 3,842.20
```

## Tech Stack

- **Backend:** Python, Binance WebSocket API
- **Frontend:** React, Vite, CSS (Terminal Aesthetic)

## Author

Jack ([@riftfern](https://github.com/riftfern))