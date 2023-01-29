import { getFavoritesAmount } from "./getFavoritesAmount.js";
import { renderUserBlock } from "./user.js";

export const toggleFavoriteItem = () => {
  let favoriteItemsMerged = [];
  const elResultsList = document.querySelector(".results-list");
  elResultsList?.querySelectorAll(".favorites").forEach((item) => {
    item.addEventListener("click", (event: Event) => {
      const { target } = event;
      (target as HTMLElement)?.classList.toggle("active");
      const favoriteItemName = (target as HTMLElement)?.parentElement
        ?.parentElement?.lastElementChild?.firstElementChild?.firstElementChild
        ?.textContent;

      const id = (target as HTMLElement)?.parentElement?.parentElement
        ?.parentElement?.dataset["id"];

      const favoriteItemImage = (target as HTMLElement)?.parentElement
        ?.lastElementChild;

      const currentSrc = (favoriteItemImage as HTMLImageElement).currentSrc;

      const favoriteItems: [] = JSON.parse(
        localStorage.getItem("favoriteItems") || String(null)
      );

      if (favoriteItems !== null) {
        const found = favoriteItems.find(
          (item: { id: string }) => item.id === id
        );

        if (found) {
          favoriteItemsMerged = favoriteItems.filter(
            (item: { id: string }) => item.id !== id
          );
          localStorage.setItem(
            "favoriteItems",
            JSON.stringify(favoriteItemsMerged)
          );
        } else {
          favoriteItemsMerged = [
            ...favoriteItems,
            ...[
              {
                id: id,
                name: favoriteItemName,
                img: currentSrc,
              },
            ],
          ];
          localStorage.setItem(
            "favoriteItems",
            JSON.stringify(favoriteItemsMerged)
          );
        }
      } else {
        favoriteItemsMerged = [
          {
            id: id,
            name: favoriteItemName,
            img: currentSrc,
          },
        ];
        localStorage.setItem(
          "favoriteItems",
          JSON.stringify(favoriteItemsMerged)
        );
      }
      renderUserBlock("Chica", "/img/avatar.png", +getFavoritesAmount());
    });
  });
};
