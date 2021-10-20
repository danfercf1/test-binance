/* eslint-disable @typescript-eslint/no-explicit-any */
import { DtoPair } from '../dto-interfaces'
import { IPair, PairModel } from '../models'

class Pair {
  private _args: DtoPair | null

  constructor(args: DtoPair | null = null) {
    this._args = args
  }

  process(
    type: string
  ):
    | Promise<IPair[]>
    | Promise<IPair | null>
    | Promise<IPair>
    | Promise<number | undefined>
    | Promise<any>
    | undefined {
    switch (type) {
      case 'delete':
        return this._delete()
      case 'deleteAll':
        return this._deleteAll()
      case 'getAll':
        return this._getAll()
      case 'getOne':
        return this._getOne()
      case 'store':
        return this._store()
      case 'update':
        return this._update()
      default:
        return undefined
    }
  }

  private async _delete(): Promise<IPair | null> {
    const { id } = this._args as DtoPair
    try {
      const deletedPair = await PairModel.findOneAndDelete({ id })

      return deletedPair
    } catch (error) {
      console.error(error)
      throw new Error('There was an error trying to delete the requested pair')
    }
  }

  // eslint-disable-next-line class-methods-use-this
  private async _deleteAll() {
    try {
      const deletedPairs = await PairModel.deleteMany({})

      return deletedPairs
    } catch (error: any) {
      console.error(error)
      throw new Error('THere was an error trying to delete all the pairs.')
    }
  }

  // eslint-disable-next-line class-methods-use-this
  private async _getAll(): Promise<IPair[]> {
    try {
      const pairs = await PairModel.find({})

      return pairs
    } catch (error: any) {
      console.error(error)
      throw new Error('There was a problem trying to get all the pairs')
    }
  }

  private async _getOne(): Promise<IPair | null> {
    const { id } = this._args as DtoPair
    try {
      const pair = await PairModel.findOne({ id })

      return pair
    } catch (error: any) {
      console.error(error)
      throw new Error('There was a problem trying to get the requested pair')
    }
  }

  private async _store(): Promise<IPair> {
    const { symbol } = this._args as DtoPair
    try {
      if (!symbol) throw new Error('Symbol is required')

      const newPair = new PairModel({ symbol })
      const result = await newPair.save()

      return result
    } catch (error: any) {
      console.error(error)
      throw new Error('There was a problem trying to store the pair')
    }
  }

  private async _update(): Promise<IPair | null> {
    const { id, symbol } = this._args as DtoPair
    try {
      let updatedPair: IPair | null

      if (!symbol) throw new Error('Symbol must be provided.')
      else
        updatedPair = await PairModel.findOneAndUpdate(
          { id },
          { symbol },
          { new: true }
        )

      return updatedPair
    } catch (error: any) {
      if (error.message === 'Symbol must be provided.') throw error
      else {
        console.error(error)
        throw new Error(
          'There was a problem trying to update the requested pair'
        )
      }
    }
  }
}

export { Pair }
