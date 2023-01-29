import { allResultsSort, bookingPossible } from "./search.js";
import { Hotel } from "./store/domain/hotel.js";
import { renderSearchResultBlockBody, runBooking } from "./search-results.js";
import { toggleFavoriteItem } from "./toggleFavoriteItem.js";

export const getSortHotel = (itemSelected: string) => {
  const sortByPrice = (one: Hotel, two: Hotel) => {
    switch (itemSelected) {
      case "Сначала дешёвые": {
        if (one.price < two.price) {
          return -1;
        } else if (one.price > two.price) {
          return 1;
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
          if (one.remoteness < two.remoteness) {
            return -1;
          } else if (one.remoteness > two.remoteness) {
            return 1;
          } else {
            return 0;
          }
        } else {
          return 0;
        }
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

  allResultsSort.sort(sortByPrice);
  const elResultsList: Element | null = document.querySelector(".results-list");
  if (elResultsList) {
    elResultsList.innerHTML = "";
  }

  allResultsSort.forEach((item: Hotel) => {
    renderSearchResultBlockBody(item);
  });
  toggleFavoriteItem();
  document.querySelectorAll(".btn-booking").forEach((button) => {
    button.addEventListener("click", (event: Event) => {
      const { target } = event;
      bookingPossible && runBooking(target as HTMLFormElement);
    });
  });
};
