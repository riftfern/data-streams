# Binance Data Streams

Real-time market surveillance system for Binance Futures. Ingests high-velocity WebSocket streams, processes liquidation and trade events, and renders live data through a terminal-style React dashboard.

## Architecture

```
Binance WebSocket API
        │
        ▼
┌───────────────────────────────────────────────────────┐
│              Python Async Stream Processors           │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────────┐ │
│  │  liqs   │ │big_liqs │ │ trades  │ │   funding   │ │
│  │ >$3K    │ │ >$100K  │ │ >$15K   │ │  all pairs  │ │
│  └────┬────┘ └────┬────┘ └────┬────┘ └──────┬──────┘ │
│       │           │           │             │        │
│       └───────────┴─────┬─────┴─────────────┘        │
│                         ▼                            │
│                   CSV Persistence                    │
└─────────────────────────┬─────────────────────────────┘
                          │
                          ▼
┌───────────────────────────────────────────────────────┐
│              React Dashboard (Vite)                   │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │
│  │ Liquidations│  │   Trades    │  │  Overview   │   │
│  │   Feed      │  │    Feed     │  │   Stats     │   │
│  └─────────────┘  └─────────────┘  └─────────────┘   │
│           Polling @ 5s │ Tier Filtering              │
└───────────────────────────────────────────────────────┘
```

## Features

**Data Ingestion**
- Async WebSocket connections to Binance `!forceOrder@arr` and `@aggTrade` streams
- Concurrent processing of 100+ symbol streams with `asyncio`
- Automatic reconnection with exponential backoff

**Stream Processing**
- Configurable USD thresholds ($3K, $15K, $100K, $500K)
- Market-cap tier classification (Top 25/50/100)
- Trade aggregation engine with temporal bucketing
- Funding rate annualization (8h → yearly)

**Visualization**
- Real-time React dashboard with 5s polling
- Filterable/sortable data tables
- Side-aware color coding (longs/shorts, buys/sells)
- CRT terminal aesthetic

## Project Structure

```
data-streams/
├── backend/
│   ├── liq.py              # All liquidations (>$3K)
│   ├── big_liqs.py         # Whale liquidations (>$100K)
│   ├── huge_trades.py      # Select symbol trades (>$500K)
│   ├── recent_trades.py    # Top 100 symbols trades (>$15K)
│   ├── funding.py          # Funding rate tracker
│   ├── symbols.py          # Market cap tier definitions
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx                 # Tab routing
│   │   ├── components/
│   │   │   ├── Liquidations.jsx    # Main liquidation feed
│   │   │   ├── BigLiquidations.jsx # Whale feed
│   │   │   ├── Trades.jsx          # Trade feed
│   │   │   └── Overview.jsx        # System stats
│   │   ├── hooks/useData.js        # CSV polling hooks
│   │   └── utils/formatters.js     # Display formatting
│   └── public/data/                # Live CSV output
│
└── README.md
```

## Quick Start

### Backend
```bash
cd backend
pip install -r requirements.txt

# Run individual streams
python liq.py           # All liquidations
python big_liqs.py      # Whale liquidations only
python recent_trades.py # Large trades (Top 100 coins)
python funding.py       # Funding rates
```

### Frontend
```bash
cd frontend
npm install
npm run dev
# → http://localhost:5173
```

## Configuration

Thresholds are defined at the top of each backend script:

| Script           | Threshold | Description                      |
|------------------|-----------|----------------------------------|
| `liq.py`         | $3,000    | Minimum liquidation to log       |
| `big_liqs.py`    | $100,000  | Whale-level liquidations         |
| `recent_trades.py`| $15,000  | Large trades across Top 100      |
| `huge_trades.py` | $500,000  | Massive trades on select symbols |

## Sample Output

```
12:34:56 [LIQ]  BTCUSDT  LONG   $847,234  @  67,421.50
12:34:57 [LIQ]  ETHUSDT  SHORT  $123,456  @   3,842.20
12:35:01 [TRADE] SOLUSDT  BUY   $1.2M     @     187.34
```

## Tech Stack

| Layer     | Technology                                      |
|-----------|-------------------------------------------------|
| Ingestion | Python 3, `websockets`, `asyncio`               |
| Storage   | CSV (append-only, human-readable)               |
| Frontend  | React 19, Vite, custom hooks                    |
| Styling   | CSS with CRT terminal aesthetic                 |

## Use Cases

- **Liquidation cascades**: Detect forced selling pressure before price moves
- **Whale tracking**: Monitor large player activity for momentum signals
- **Funding arbitrage**: Identify crowded trades via extreme funding rates
- **Market stress**: Real-time visibility into leverage flush events

## Author

Jack ([@riftfern](https://github.com/riftfern))
