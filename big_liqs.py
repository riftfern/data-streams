import asyncio
import json
import os
from datetime import datetime
import pytz
from websockets import connect
from termcolor import cprint
from symbols import get_tier

websocket_url = 'wss://fstream.binance.com/ws/!forceOrder@arr'
filename = 'binance_big_liqs.csv'

if not os.path.isfile(filename):
    with open(filename, 'w') as f:
        f.write(",".join([
            'symbol', 'side', 'order_type', 'time_in_force',
            'original_quantity', 'price', 'average_price', 'order_status',
            'order_last_filled_quantity', 'order_filled_accumulated_quantity',
            'order_trade_time', 'usd_size', 'tier'
        ]) + "\n")

async def binance_liquidation(uri, filename):
    async with connect(uri) as websocket:
        while True:
            try:
                msg = await websocket.recv()
                order_data = json.loads(msg)['o']
                symbol_full = order_data['s']
                symbol = symbol_full.replace('USDT', '')
                side = order_data['S']

                timestamp = int(order_data['T'])
                filled_quantity = float(order_data['z'])
                price = float(order_data['p'])
                usd_size = filled_quantity * price
                tier = get_tier(symbol_full)

                est = pytz.timezone("US/Eastern")
                time_est = datetime.fromtimestamp(timestamp/1000, est).strftime('%H:%M:%S')

                if side == 'SELL':
                    liquidation_type = 'L LIQ'
                    color = 'blue'
                else:
                    liquidation_type = 'S LIQ'
                    color = 'magenta'

                if usd_size > 100000:
                    symbol_print = symbol[:8] if len(symbol) > 4 else symbol

                    output = f"{liquidation_type} {symbol_print} {time_est} {usd_size:,.2f}"
                    attrs = ['bold'] if usd_size > 10000 else []

                    cprint(output, 'white', f"on_{color}", attrs=attrs)

                    msg_values = [str(order_data.get(key)) for key in ['s', 'S', 'o', 'f', 'q', 'p', 'ap', 'X', 'l', 'z', 'T']]
                    msg_values.append(str(usd_size))
                    msg_values.append(str(tier))

                    with open(filename, 'a') as f:
                        trade_info = ','.join(msg_values) + '\n'
                        trade_info = trade_info.replace('USDT', '')
                        f.write(trade_info)

            except Exception as e:
                print(f"Error: {e}")
                await asyncio.sleep(5)

if __name__ == "__main__":
    try:
        print("Starting Binance Big Liquidation Stream....")
        asyncio.run(binance_liquidation(websocket_url, filename))
    except KeyboardInterrupt:
        print("\nStream stopped.")
