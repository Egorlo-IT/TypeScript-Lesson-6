/**
 * Ответ с несколькими отелями
 */
export interface HotelListResponse {
  errorMessage?: string;
  // items: Hotel[];
}
/**
 * Ответ с одним отелем
 *  */
export interface HotelResponse {
  errorMessage?: string;
  item: Hotel;
}

export interface Hotel {
  id: string;
  title: string;
  details: string;
  photos: string;
  totalPrice: number;
  bookedDates: [];
  coordinates: [];
  remoteness: number;
}
