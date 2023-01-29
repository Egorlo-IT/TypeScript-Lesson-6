import { Hotel } from "./hotel.js";
import { SearchFilter } from "./search-filter.js";

export interface Provider {
  /**
  * Источник получает фильтр в общем виде и сам должен преобразовать его в
  свой формат
  * Источник также должен конвертировать свой ответ в объекты Order
  */
  find(filter: SearchFilter): Promise<Hotel[]>;
  getById(id: string): Promise<Hotel>;
}
