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
  id: number;
  name: string;
  description: string;
  image: string;
  remoteness: number;
  price: number;
  bookedDates: [];
}
