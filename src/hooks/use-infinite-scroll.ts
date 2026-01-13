import React from "react";

interface UseInfiniteScrollProps<T> {
  data: T[];
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

interface UseInfiniteScrollReturn<T> {
  items: T[];
  ref: (node: HTMLElement | null) => void;
}

export const useInfiniteScroll = <T>({
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: UseInfiniteScrollProps<T>): UseInfiniteScrollReturn<T> => {
  const observer = React.useRef<IntersectionObserver | null>(null);

  const ref = React.useCallback(
    (node: HTMLElement | null) => {
      if (isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasNextPage) {
            fetchNextPage();
          }
        },
        { threshold: 1.0 },
      );

      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, hasNextPage, fetchNextPage],
  );

  return { items: data, ref };
};
