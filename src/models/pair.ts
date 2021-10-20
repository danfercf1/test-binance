import { Document, model, Schema } from 'mongoose'

interface IPair extends Document {
  symbol: string
}

const Pair = new Schema(
  {
    symbol: {
      required: true,
      type    : String
    }
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true
    }
  }
)

const PairModel = model<IPair>('pairs', Pair)

export { IPair, PairModel }
