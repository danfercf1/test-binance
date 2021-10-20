/* eslint-disable @typescript-eslint/no-explicit-any */
import * as schedule from 'node-schedule'
import axios, { AxiosResponse } from 'axios'
import { BinanceData } from '../dto-interfaces'
import { PriceModel, PairModel } from '../models'

class Cron {
  private _time: string
  private _binanceUrl: string

  constructor(time: string, binanceUrl = 'https://api1.binance.com') {
    this._time = time
    this._binanceUrl = binanceUrl
  }

  process(): void {
    schedule.scheduleJob(this._time, async () => {
      const pairs = await PairModel.find({})
      const url = this._binanceUrl + '/api/v3/avgPrice'
      try {
        if (pairs.length > 0)
          pairs.forEach(async pair => {
            const symbol = pair.symbol
            const binancePrice: AxiosResponse = await axios.get(
              `${url}?symbol=${symbol}`
            )
            if (binancePrice.data) {
              const data: BinanceData = binancePrice.data as BinanceData
              const price = data.price
              const newPrice = new PriceModel({ price, symbol })
              await newPrice.save()
              console.log(`Request to binance and save the price for ${symbol}`)
            }
          })
        else console.log('There is nothing to do here')
      } catch (error: any) {
        console.error(error)
        throw new Error('There was a problem trying to store the price')
      }
    })
  }
}

export { Cron }
