export interface ICard {
  cardId: number
  title: string
  description: string
}

export interface IContentElement {
  id: number
  title: string
  yearStart: number
  yearEnd: number
  cards: ICard[]
}
