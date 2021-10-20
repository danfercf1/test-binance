/* eslint-disable @typescript-eslint/no-explicit-any */
import { DtoPrice } from '../dto-interfaces'
import { PriceModel } from '../models'

interface IAverage {
  average: number
  numberOfLectures: number
}

class Average {
  private _args: DtoPrice | null

  constructor(args: DtoPrice | null = null) {
    this._args = args
  }

  process(type: string): Promise<IAverage | null> | undefined {
    switch (type) {
      case 'getOne':
        return this._getOne()
      default:
        return undefined
    }
  }

  private async _getOne(): Promise<IAverage | null> {
    const { symbol } = this._args as DtoPrice
    try {
      const average = await PriceModel.aggregate([
        { $match: { symbol: symbol } },
        {
          $group: {
            _id             : null,
            average         : { $avg: '$price' },
            numberOfLectures: { $sum: 1 }
          }
        }
      ])

      if (average.length < 1) return null

      // eslint-disable-next-line no-underscore-dangle
      delete average[0]._id

      return average[0] as IAverage
    } catch (error: any) {
      console.error(error)
      throw new Error('There was a problem trying to get the requested average')
    }
  }
}

export { Average }
