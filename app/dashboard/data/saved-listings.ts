export const SAVED_LISTINGS_KEY = "nyangu-saved-listings";
export const SAVED_LISTINGS_EVENT = "nyangu:saved-listings-changed";

export function getSavedListingIds() {
  if (typeof window === "undefined") return [];

  try {
    const value: unknown = JSON.parse(
      window.localStorage.getItem(SAVED_LISTINGS_KEY) ?? "[]",
    );
    return Array.isArray(value) && value.every((id) => typeof id === "string")
      ? value
      : [];
  } catch {
    return [];
  }
}

export function setSavedListingIds(ids: string[]) {
  window.localStorage.setItem(SAVED_LISTINGS_KEY, JSON.stringify(ids));
  window.dispatchEvent(new Event(SAVED_LISTINGS_EVENT));
}

export function toggleSavedListing(id: string) {
  const ids = getSavedListingIds();
  const nextIds = ids.includes(id)
    ? ids.filter((savedId) => savedId !== id)
    : [...ids, id];
  setSavedListingIds(nextIds);
  return nextIds;
}
