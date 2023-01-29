import { Provider } from "../../domain/provider.js";
import { Hotel } from "../../domain/hotel.js";
import { HttpHelper } from "../../utils/http-helper.js";
import { SearchFilter } from "../../domain/search-filter.js";
import {
  HotelListResponse,
  HotelResponse,
  Hotel as HomyHotel,
} from "./response.js";

export class HomyProvider implements Provider {
  public static provider = "homy";
  private static apiUrl = "http://localhost:3030";

  public async find(filter: SearchFilter): Promise<Hotel[]> {
    const response: HotelListResponse =
      await HttpHelper.fetchAsJson<HotelListResponse>(
        HomyProvider.apiUrl +
          "/places?" +
          // создадим соответствующую строку запроса из объекта фильтра
          this.convertFilterToQueryString(filter)
      );

    // проверим, что с ответ корректный
    this.assertIsValidResponse(response);
    return this.convertHotelListResponse(<HotelListResponse[]>response);
  }

  public async getById(id: string): Promise<Hotel> {
    const response: HotelResponse = await HttpHelper.fetchAsJson<HotelResponse>(
      HomyProvider.apiUrl + "/hotel/" + id
    );
    // проверим, что ответ корректный
    this.assertIsValidResponse(response);
    return this.convertHotelResponse(response.item);
  }

  private assertIsValidResponse(
    response: HotelResponse | HotelListResponse
  ): void {
    if (response.errorMessage != null) {
      throw new Error(response.errorMessage);
    }
  }

  private convertFilterToQueryString(filter: SearchFilter): string {
    return (
      `coordinates=${filter.coordinates}` +
      `&checkInDate=${filter.checkInDate.getTime()}` +
      `&checkOutDate=${filter.checkOutDate.getTime()}` +
      `&maxPrice=${filter.priceLimit}`
    );
  }

  private convertHotelListResponse(response: HotelListResponse[]): Hotel[] {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return response.map((item: any) => {
      return this.convertHotelResponse(item);
    });
  }
  /**
   * Здесь находится логика преобразования объекта отеля из источника
   * в экземпляр Hotel нашего приложения
   */
  private convertHotelResponse(item: HomyHotel): Hotel {
    return new Hotel(
      HomyProvider.provider,
      String(item.id),
      item.name,
      item.description,
      item.image,
      item.price,
      item.remoteness
    );
  }
}
