# Top 100 crypto symbols by market cap (futures pairs)
# Organized into tiers for filtering

TOP_25 = [
    'BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'SOLUSDT', 'XRPUSDT',
    'DOGEUSDT', 'ADAUSDT', 'AVAXUSDT', 'SHIBUSDT', 'DOTUSDT',
    'LINKUSDT', 'TRXUSDT', 'MATICUSDT', 'BCHUSDT', 'ICPUSDT',
    'NEARUSDT', 'UNIUSDT', 'LTCUSDT', 'APTUSDT', 'STXUSDT',
    'FILUSDT', 'ETCUSDT', 'ATOMUSDT', 'IMXUSDT', 'RNDRUSDT'
]

TOP_50 = TOP_25 + [
    'HBARUSDT', 'INJUSDT', 'OPUSDT', 'ARBUSDT', 'VETUSDT',
    'MKRUSDT', 'GRTUSDT', 'THETAUSDT', 'FTMUSDT', 'RUNEUSDT',
    'TIAUSDT', 'SEIUSDT', 'SUIUSDT', 'AABORUSDT', 'LDOUSDT',
    'ALGOUSDT', 'FLOWUSDT', 'SANDUSDT', 'AXSUSDT', 'MANAUSDT',
    'SNXUSDT', 'XTZUSDT', 'EOSUSDT', 'AAVEUSDT', 'EGLDUSDT'
]

TOP_100 = TOP_50 + [
    'QNTUSDT', 'BSVUSDT', 'MINAUSDT', 'XECUSDT', 'NEOUSDT',
    'KAVAUSDT', 'IOTAUSDT', 'CFXUSDT', 'GMXUSDT', 'PENDLEUSDT',
    'BLURUSDT', 'DYDXUSDT', 'WOOUSDT', 'FETUSDT', 'AGIXUSDT',
    'OCEANUSDT', 'APEUSDT', 'CRVUSDT', '1INCHUSDT', 'ENSUSDT',
    'LRCUSDT', 'CKBUSDT', 'ZLOTHEUSDT', 'ILVUSDT', 'YFIUSDT',
    'COMPUSDT', 'ZILUSDT', 'BATUSDT', 'ENJUSDT', 'CHZUSDT',
    'HOTUSDT', 'CELOUSDT', 'ONEUSDT', 'IOTXUSDT', 'ANKRUSDT',
    'SKLUSDT', 'ICXUSDT', 'ONTUSDT', 'SCUSDT', 'ZRXUSDT',
    'WAVESUSDT', 'RVNUSDT', 'JASMYUSDT', 'GALAUSDT', 'MAGICUSDT',
    'GMTUSDT', 'ARPAUSDT', 'TUSDT', 'JOEUSDT', 'HIGHUSDT'
]

def get_tier(symbol):
    """Return the tier (25, 50, 100) for a given symbol, or 0 if not in top 100"""
    symbol_upper = symbol.upper()
    if not symbol_upper.endswith('USDT'):
        symbol_upper = symbol_upper + 'USDT'

    if symbol_upper in TOP_25:
        return 25
    elif symbol_upper in TOP_50:
        return 50
    elif symbol_upper in TOP_100:
        return 100
    return 0

def get_symbols_for_tier(tier):
    """Return list of symbols for a given tier"""
    if tier == 25:
        return TOP_25
    elif tier == 50:
        return TOP_50
    elif tier == 100:
        return TOP_100
    return TOP_100

# Lowercase versions for websocket URLs
TOP_25_LOWER = [s.lower() for s in TOP_25]
TOP_50_LOWER = [s.lower() for s in TOP_50]
TOP_100_LOWER = [s.lower() for s in TOP_100]
