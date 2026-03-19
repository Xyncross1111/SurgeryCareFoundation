import { useState, useEffect, useCallback } from "react";

/** Lightweight shape for causes bookmarked in localStorage. */
export interface SavedCause {
  id: string;
  slug: string;
  title: string;
  summary: string;
  coverImageUrl: string | null;
  goalAmount: number;
  raisedAmount: number;
  donationCount: number;
  category: string;
  savedOn: string;
}

const STORAGE_KEY = "surgery-care:saved-causes";

function readFromStorage(): SavedCause[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeToStorage(causes: SavedCause[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(causes));
}

export function useSavedCauses() {
  const [causes, setCauses] = useState<SavedCause[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load from localStorage on mount
  useEffect(() => {
    setCauses(readFromStorage());
    setIsLoading(false);
  }, []);

  const saveCause = useCallback((cause: SavedCause) => {
    setCauses((prev) => {
      if (prev.some((c) => c.id === cause.id)) return prev;
      const next = [...prev, cause];
      writeToStorage(next);
      return next;
    });
  }, []);

  const removeCause = useCallback((id: string) => {
    setCauses((prev) => {
      const next = prev.filter((c) => c.id !== id);
      writeToStorage(next);
      return next;
    });
  }, []);

  const isSaved = useCallback(
    (id: string) => causes.some((c) => c.id === id),
    [causes],
  );

  return { causes, isLoading, saveCause, removeCause, isSaved };
}
