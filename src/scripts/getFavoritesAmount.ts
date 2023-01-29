export const getFavoritesAmount = () => {
  const favoritesAmount: number = JSON.parse(
    localStorage.getItem("favoriteItems") || "0"
  )?.length;

  if (favoritesAmount == null) {
    return favoritesAmount + "";
  }
  return favoritesAmount;
};
