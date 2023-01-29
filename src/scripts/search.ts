import { SearchFormData } from "./searchFormData.js";
import { Place } from "./place.js";
import {
  renderSearchResultsBlockHeader,
  renderSearchResultBlockBody,
  renderEmptyOrErrorSearchBlock,
  runBooking,
} from "./search-results.js";
import { toggleFavoriteItem } from "./toggleFavoriteItem.js";
import { renderToast } from "./lib.js";
import { SearchFilter } from "./store/domain/search-filter.js";
import { HomyProvider } from "./store/providers/homy/homy-provider.js";
import { FlatRentProvider } from "./store/providers/flatRent/flatRent-provider.js";
import { Hotel } from "./store/domain/hotel.js";
import { getSelected } from "./getSelected.js";

export let bookingPossible = true;
export let allResultsSort: Hotel[];

export const search = async (entity: SearchFormData, param: Place) => {
  let show = false;
  bookingPossible = true;

  const homyProvider = new HomyProvider();
  const flatRentProvider = new FlatRentProvider();

  const filter: SearchFilter = {
    checkInDate: param.checkInDate,
    checkOutDate: param.checkOutDate,
    priceLimit: param.priceLimit,
    city: param.city,
    coordinates: param.coordinates,
  };

  const sortByPrice = (one: Hotel, two: Hotel) => {
    const elSelect = document.querySelector("select");
    switch (elSelect?.value) {
      case "Сначала дешёвые": {
        if (one.price < two.price) {
          return 1;
        } else if (one.price > two.price) {
          return -1;
        } else {
          return 0;
        }
      }
      case "Сначала дорогие": {
        if (one.price > two.price) {
          return -1;
        } else if (one.price < two.price) {
          return 1;
        } else {
          return 0;
        }
      }
      case "Сначала ближе": {
        if (one.remoteness && two.remoteness) {
          if (one.remoteness > two.remoteness) {
            return 1;
          } else if (one.remoteness < two.remoteness) {
            return -1;
          } else {
            return 0;
          }
        }
        return 0;
      }
      default:
        if (one.price < two.price) {
          return 1;
        } else if (one.price > two.price) {
          return -1;
        } else {
          return 0;
        }
    }
  };

  renderSearchResultsBlockHeader();

  Promise.all([homyProvider.find(filter), flatRentProvider.find(filter)]).then(
    (results) => {
      let allResults: Hotel[] = <Hotel[]>[];
      allResults = allResults.concat(results[0], results[1]);

      if (allResults != null) {
        allResultsSort = allResults;

        allResults.sort(sortByPrice);
        allResults.forEach((item: Hotel) => {
          entity.provider.forEach(async (provider: HTMLFormElement) => {
            switch (provider["value"]) {
              case "homy": {
                if (provider["checked"] && item.isProvidedBy("homy")) {
                  renderSearchResultBlockBody(item);
                  show = true;
                }
                break;
              }
              case "flat-rent": {
                if (provider["checked"] && item.isProvidedBy("flat-rent")) {
                  renderSearchResultBlockBody(item);
                  show = true;
                }

                break;
              }
              default:
                break;
            }
          });
        });

        const timerId = setTimeout(() => {
          renderToast(
            {
              text: "Информация устарела. Обновите данные поиска",
              type: "warning",
            },
            {
              name: "Понял",
              handler: () => {
                console.log("Уведомление закрыто");
              },
            }
          );
          bookingPossible = false;
          clearTimeout(timerId);
        }, 1000);
        // }, 300000);
        toggleFavoriteItem();
        getSelected();
        document.querySelectorAll(".btn-booking").forEach((button) => {
          button.addEventListener("click", (event: Event) => {
            const { target } = event;
            bookingPossible && runBooking(target as HTMLFormElement);
          });
        });
      } else {
        renderEmptyOrErrorSearchBlock(
          "По выбранным критериям поиска нет предложений"
        );
      }

      if (!show) {
        renderEmptyOrErrorSearchBlock(
          "По выбранным критериям поиска нет предложений"
        );
      }
    }
  );
};
