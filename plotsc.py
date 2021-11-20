import pandas as pd
import plotly.graph_objects as go
import plotly.io as pio
import os
import sys

from pandas_datareader import data as web
from datetime import date

pio.templates.default = pio.templates["plotly_dark"]

if not os.path.exists("images"):
    os.mkdir("images")

print("Input stock symbol: ")
stock = input()

today = date.today()
day = int(today.strftime("%d"))
month = int(today.strftime("%m"))
year = int(today.strftime("%Y"))
if(month < 6):
    year = year - 1
    month = month + 6
else:
    month = month - 6
if(day < 10):
    day = "0" + str(day)
if(month < 10):
    month = "0" + str(month)
initialDate = str(day) + "-" + str(month) + "-" + str(year)

df = web.DataReader(stock, data_source='yahoo', start=initialDate)
#print(df)

trace = {
    'x': df.index,
    'open': df.Open,
    'close': df.Close,
    'high': df.High,
    'low': df.Low,
    'type': 'candlestick',
    'name': stock,
    'showlegend': True
}

fig = go.Figure()
fig.add_trace(trace)

fig.write_image("images/" + stock + ".png")