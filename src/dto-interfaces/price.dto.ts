interface DtoPrice {
  id       : string,
  price?: number,
  symbol?: string
}

interface BinanceData {
  mins: number,
  price       : number
}

export { DtoPrice, BinanceData }
