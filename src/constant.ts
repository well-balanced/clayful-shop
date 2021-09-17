export const LOGO_IMG_URL =
  'https://contents.sixshop.com/uploadedFiles/99292/default/image_1585118656078.png'
export const MAIN_BANNER_IMG_URL =
  'https://contents.sixshop.com/thumbnails/uploadedFiles/99292/default/image_1610691710053_2500.jpg'

export const orderState = {
  cancelled: '취소',
  'over-paid': '초과 결제',
  'over-refunded': '초과 환불',
  paid: '결제 완료',
  'partially-refunded': '부분 취소',
  placed: '주문 완료',
  refunded: '환불 완료',
  'under-paid': '결제 금액 부족',
  'under-refunded': '환불 금액 부족',
} as const
