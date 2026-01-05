# Binance Data Streams

Real-time tracking of Binance Futures liquidations and large trades with a live dashboard.

## Features

- **Liquidation tracker** — Monitors forced liquidations across all USDT perpetual pairs
- **Whale trade detection** — Flags trades above configurable thresholds
- **Funding rate monitor** — Tracks funding rates for sentiment analysis
- **Live dashboard** — Frontend visualization of real-time market data

## Tech Stack

**Backend:** Python, Binance WebSocket API  
**Frontend:** HTML, CSS, JavaScript

## Project Structure

```
data-streams/
├── frontend/           # Live dashboard
├── liq.py              # Liquidation stream listener
├── big_liqs.py         # Large liquidation filter
├── huge_trades.py      # Whale trade detector
├── funding.py          # Funding rate tracker
├── recent_trades.py    # Trade stream processor
├── symbols.py          # Symbol utilities
└── index.html          # Dashboard entry point
```

## Quick Start

```bash
# Clone the repo
git clone https://github.com/riftfern/data-streams.git
cd data-streams

# Install dependencies
pip install websocket-client pandas

# Run liquidation tracker
python liq.py

# Run whale trade detector
python huge_trades.py
```

## Configuration

Adjust thresholds in the Python scripts:

```python
# big_liqs.py
MIN_LIQUIDATION_USD = 100000  # Only log liquidations > $100k

# huge_trades.py
MIN_TRADE_USD = 500000        # Only log trades > $500k
```

## Sample Output

```
[LIQUIDATION] BTCUSDT | LONG | $847,234 @ 67,421.50
[WHALE TRADE] ETHUSDT | BUY  | $1,203,847 @ 3,842.20
```

## Use Cases

- Spot large liquidation cascades before price moves
- Track whale activity for momentum signals
- Monitor funding rates for crowded trade detection

## Author

Jack ([@riftfern](https://github.com/riftfern))
