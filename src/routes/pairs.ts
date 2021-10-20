/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router, Request } from 'express'
import { Response } from '../custom'
import { response } from  '../utils'
import { Pair as PairC } from '../controllers/pair'
import { DtoPair } from '../dto-interfaces'

const Pair = Router()

Pair.route('/pairs/')
  .get(async (req: Request, res: Response): Promise<void> => {
    const uc = new PairC()

    try {
      const result = await uc.process('getAll')
      response(false, { result }, res, 200)
    } catch (error: any) {
      console.error(error)
      response(true, { message: error.message }, res, 500)
    }
  })
  .post(async (req: Request, res: Response): Promise<void> => {
    const { body } = req
    const uc = new PairC(body as DtoPair)

    try {
      const result = await uc.process('store')
      response(false, { result }, res, 201)
    } catch (error: any) {
      console.error(error)
      response(true, { message: error.message }, res, 500)
    }
  })
  .delete(async (req: Request, res: Response): Promise<void> => {
    const uc = new PairC()

    try {
      const result = await uc.process('deleteAll')
      response(false, { result }, res, 200)
    } catch (error: any) {
      console.error(error)
      response(true, { message: error.message }, res, 500)
    }
  })

Pair.route('/pairs/:pairId')
  .get(async (req: Request, res: Response): Promise<void> => {
    const { params: { pairId } } = req
    const dto = {
      id: pairId
    }
    const uc = new PairC(dto as DtoPair)

    try {
      const result = await uc.process('getOne')
      response(false, { result }, res, 200)
    } catch (error: any) {
      console.log(error)
      response(true, { message: error.message }, res, 500)
    }
  })
  .patch(async (req: Request, res: Response): Promise<void> => {
    const { body: { args: { symbol } }, params: { pairId } } = req
    const dto = {
      id: pairId,
      symbol
    }
    const uc = new PairC(dto as DtoPair)

    try {
      const result = await uc.process('update')
      response(false, { result }, res, 200)
    } catch (error: any) {
      console.error(error)
      response(true, { message: error.message }, res, 500)
    }
  })
  .delete(async (req: Request, res: Response): Promise<void> => {
    const { params: { pairId } } = req
    const dto = { id: pairId }
    const uc = new PairC(dto as DtoPair)

    try {
      const result = await uc.process('delete')
      response(false, { result }, res, 200)
    } catch (error: any) {
      console.error(error)
      response(true, { message: error.message }, res, 500)
    }
  })

export { Pair }
