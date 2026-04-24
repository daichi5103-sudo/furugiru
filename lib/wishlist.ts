// localStorageベースの「欲しいリスト」管理
const KEY = "furugiru:wishlist";

export function getWishlist(): number[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr.filter((x) => typeof x === "number") : [];
  } catch {
    return [];
  }
}

export function isInWishlist(id: number): boolean {
  return getWishlist().includes(id);
}

export function toggleWishlist(id: number): boolean {
  const list = getWishlist();
  const idx = list.indexOf(id);
  if (idx >= 0) {
    list.splice(idx, 1);
    save(list);
    return false;
  } else {
    list.push(id);
    save(list);
    return true;
  }
}

export function removeFromWishlist(id: number) {
  const list = getWishlist().filter((x) => x !== id);
  save(list);
}

function save(list: number[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(list));
  // 同一タブ内の他コンポーネントへ通知
  window.dispatchEvent(new CustomEvent("wishlist-updated"));
}
