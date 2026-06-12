"use client";

import { useState, useMemo } from "react";
import { useDebounce } from "./use-debounce";

interface SearchableItem {
  id: string;
  [key: string]: unknown;
}

type SearchField<T> = (item: T) => string;

interface UseSearchOptions<T> {
  fields: SearchField<T>[];
  debounceMs?: number;
  limit?: number;
}

export function useSearch<T extends SearchableItem>(
  items: T[],
  options: UseSearchOptions<T>
) {
  const { fields, debounceMs = 300, limit = 10 } = options;
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const debouncedQuery = useDebounce(query, debounceMs);

  const results = useMemo(() => {
    if (!debouncedQuery.trim()) return [];

    const q = debouncedQuery.toLowerCase().trim();
    return items
      .filter((item) => {
        return fields.some((field) => {
          const value = field(item).toLowerCase();
          // Support multi-word search
          return q.split(/\s+/).every((word) => value.includes(word));
        });
      })
      .slice(0, limit);
  }, [items, debouncedQuery, fields, limit]);

  const suggestions = useMemo(() => {
    if (!debouncedQuery.trim() || debouncedQuery.length < 2) return [];
    const q = debouncedQuery.toLowerCase();
    const allTexts = items.flatMap((item) =>
      fields.map((field) => field(item))
    );
    const unique = [...new Set(allTexts)];
    return unique
      .filter((text) => text.toLowerCase().includes(q) && text.toLowerCase() !== q)
      .slice(0, 5);
  }, [items, debouncedQuery, fields]);

  return {
    query,
    setQuery,
    debouncedQuery,
    results,
    suggestions,
    isFocused,
    setIsFocused,
    hasQuery: query.length > 0,
    hasResults: results.length > 0,
  };
}
