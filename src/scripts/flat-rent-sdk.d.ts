import { Hotel } from "./store/domain/hotel.js";
import {
  HotelListResponse,
  HotelResponse,
} from "../scripts/store/providers/flatRent/response.js";
import { SearchFilter } from "../scripts/store/domain/search-filter.js";

export class FlatRentSdk {
  book(
    flatId: string,
    checkInDateFlatRent: Date,
    checkOutDateFlatRent: Date
  ): Hotel;
  search(parameters: SearchFilter): HotelListResponse;
  get(id: string): HotelResponse;
}
