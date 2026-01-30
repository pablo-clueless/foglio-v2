import React from "react";

interface UseStackComponentOptions<T> {
  initialItems?: T[];
  onChange?: (items: T[]) => void;
  getItemId?: (item: T) => string;
}

interface StackActions<T> {
  moveUp: (index: number) => void;
  moveDown: (index: number) => void;
  moveTo: (fromIndex: number, toIndex: number) => void;
  swap: (indexA: number, indexB: number) => void;
  moveToTop: (index: number) => void;
  moveToBottom: (index: number) => void;
  add: (item: T, index?: number) => void;
  remove: (index: number) => void;
  removeById: (id: string) => void;
  update: (index: number, item: T) => void;
  setItems: (items: T[]) => void;
  clear: () => void;
  duplicate: (index: number) => void;
  reverse: () => void;
}

interface UseStackComponentReturn<T> extends StackActions<T> {
  items: T[];
  canMoveUp: (index: number) => boolean;
  canMoveDown: (index: number) => boolean;
  getIndexById: (id: string) => number;
  getItemById: (id: string) => T | undefined;
  count: number;
  isEmpty: boolean;
}

export const useStackComponent = <T>(options: UseStackComponentOptions<T> = {}): UseStackComponentReturn<T> => {
  const { initialItems = [], onChange, getItemId } = options;

  const [items, setItemsState] = React.useState<T[]>(initialItems);

  const setItems = React.useCallback(
    (newItems: T[]) => {
      setItemsState(newItems);
      onChange?.(newItems);
    },
    [onChange],
  );

  const moveUp = React.useCallback(
    (index: number) => {
      if (index <= 0 || index >= items.length) return;
      const newItems = [...items];
      [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];
      setItems(newItems);
    },
    [items, setItems],
  );

  const moveDown = React.useCallback(
    (index: number) => {
      if (index < 0 || index >= items.length - 1) return;
      const newItems = [...items];
      [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
      setItems(newItems);
    },
    [items, setItems],
  );

  const moveTo = React.useCallback(
    (fromIndex: number, toIndex: number) => {
      if (
        fromIndex < 0 ||
        fromIndex >= items.length ||
        toIndex < 0 ||
        toIndex >= items.length ||
        fromIndex === toIndex
      ) {
        return;
      }
      const newItems = [...items];
      const [removed] = newItems.splice(fromIndex, 1);
      newItems.splice(toIndex, 0, removed);
      setItems(newItems);
    },
    [items, setItems],
  );

  const swap = React.useCallback(
    (indexA: number, indexB: number) => {
      if (indexA < 0 || indexA >= items.length || indexB < 0 || indexB >= items.length || indexA === indexB) {
        return;
      }
      const newItems = [...items];
      [newItems[indexA], newItems[indexB]] = [newItems[indexB], newItems[indexA]];
      setItems(newItems);
    },
    [items, setItems],
  );

  const moveToTop = React.useCallback(
    (index: number) => {
      if (index <= 0 || index >= items.length) return;
      moveTo(index, 0);
    },
    [items.length, moveTo],
  );

  const moveToBottom = React.useCallback(
    (index: number) => {
      if (index < 0 || index >= items.length - 1) return;
      moveTo(index, items.length - 1);
    },
    [items.length, moveTo],
  );

  const add = React.useCallback(
    (item: T, index?: number) => {
      const newItems = [...items];
      if (index !== undefined && index >= 0 && index <= items.length) {
        newItems.splice(index, 0, item);
      } else {
        newItems.push(item);
      }
      setItems(newItems);
    },
    [items, setItems],
  );

  const remove = React.useCallback(
    (index: number) => {
      if (index < 0 || index >= items.length) return;
      const newItems = items.filter((_, i) => i !== index);
      setItems(newItems);
    },
    [items, setItems],
  );

  const removeById = React.useCallback(
    (id: string) => {
      if (!getItemId) {
        console.warn("removeById requires getItemId option to be set");
        return;
      }
      const newItems = items.filter((item) => getItemId(item) !== id);
      setItems(newItems);
    },
    [items, setItems, getItemId],
  );

  const update = React.useCallback(
    (index: number, item: T) => {
      if (index < 0 || index >= items.length) return;
      const newItems = [...items];
      newItems[index] = item;
      setItems(newItems);
    },
    [items, setItems],
  );

  const clear = React.useCallback(() => {
    setItems([]);
  }, [setItems]);

  const duplicate = React.useCallback(
    (index: number) => {
      if (index < 0 || index >= items.length) return;
      const item = items[index];
      const duplicatedItem = JSON.parse(JSON.stringify(item)) as T;
      add(duplicatedItem, index + 1);
    },
    [items, add],
  );

  const reverse = React.useCallback(() => {
    setItems([...items].reverse());
  }, [items, setItems]);

  const canMoveUp = React.useCallback(
    (index: number) => {
      return index > 0 && index < items.length;
    },
    [items.length],
  );

  const canMoveDown = React.useCallback(
    (index: number) => {
      return index >= 0 && index < items.length - 1;
    },
    [items.length],
  );

  const getIndexById = React.useCallback(
    (id: string) => {
      if (!getItemId) {
        console.warn("getIndexById requires getItemId option to be set");
        return -1;
      }
      return items.findIndex((item) => getItemId(item) === id);
    },
    [items, getItemId],
  );

  const getItemById = React.useCallback(
    (id: string) => {
      if (!getItemId) {
        console.warn("getItemById requires getItemId option to be set");
        return undefined;
      }
      return items.find((item) => getItemId(item) === id);
    },
    [items, getItemId],
  );

  return {
    items,
    moveUp,
    moveDown,
    moveTo,
    swap,
    moveToTop,
    moveToBottom,
    add,
    remove,
    removeById,
    update,
    setItems,
    clear,
    duplicate,
    reverse,
    canMoveUp,
    canMoveDown,
    getIndexById,
    getItemById,
    count: items.length,
    isEmpty: items.length === 0,
  };
};
