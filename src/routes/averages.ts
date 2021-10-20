/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router, Request } from 'express'
import { Response } from '../custom'
import { response } from  '../utils'
import { Average as AverageC } from '../controllers/average'
import { DtoPrice } from '../dto-interfaces'

const Average = Router()

Average.route('/averages/')
  .get(async (req: Request, res: Response): Promise<void> => {
    const { query: { symbol } } = req
    const dto = {
      symbol: symbol
    }
    const uc = new AverageC(dto as DtoPrice)

    try {
      const result = await uc.process('getOne')
      response(false, { result }, res, 200)
    } catch (error: any) {
      console.error(error)
      response(true, { message: error.message }, res, 500)
    }
  })

export { Average }
