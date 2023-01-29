import { getSortHotel } from "./getSortHotel.js";

export const getSelected = () => {
  const elSelect = document.querySelector("select");
  elSelect?.addEventListener("change", (event: Event) => {
    const { target } = event;
    getSortHotel((target as HTMLFormElement)["value"]);
  });
};
