export type PieceCategory =
  | 'Camisa'
  | 'Calça'
  | 'Blazer'
  | 'Costume'
  | 'Terno'
  | 'Colete'
  | 'Sapato'
  | 'Cinto'
  | 'Gravata'
  | 'Relógio'
  | 'Suéter'
  | 'Polo'
  | 'Camiseta'
  | 'Jaqueta'
  | 'Acessório'

export type LookTag =
  | 'formal'
  | 'casual'
  | 'esportes'
  | 'diurno'
  | 'noturno'
  | 'verao'
  | 'inverno'
  | 'primavera'
  | 'outono'

export interface Piece {
  id: string
  name: string
  brand: string
  category: PieceCategory
  img: string
  color: string
  tips: string[]
  notes?: string
  hidden?: boolean
}

export interface LookPiece {
  cat: string
  pieceId: string
}

export interface Look {
  id: string
  title: string
  tags: LookTag[]
  formality: 1 | 2 | 3 | 4 | 5   // 1 = casual, 5 = black-tie
  tip: string
  notes?: string
  photoId?: string    // ID único da foto do look real (look_photos.id)
  hidden?: boolean
  pieces: LookPiece[]
}

export interface WishlistItem {
  id: string
  name: string
  category: string
  brand: string
  price: number | null
  priority: 1 | 2 | 3
  notes: string
  link: string
  purchased: boolean
  purchasedAt: string | null
  createdAt: string
}

export interface ShirtLookSet {
  shirtId: string
  formalComGravata: LookPiece[]
  formalSemGravata: LookPiece[]
  casual: LookPiece[]
}
