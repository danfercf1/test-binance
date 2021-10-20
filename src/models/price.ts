import { Document, model, Schema } from 'mongoose'

interface IPrice extends Document {
  price: number
  symbol: string
}

const Price = new Schema(
  {
    price: {
      required: true,
      type    : Number
    },
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

const PriceModel = model<IPrice>('prices', Price)

export { IPrice, PriceModel }
