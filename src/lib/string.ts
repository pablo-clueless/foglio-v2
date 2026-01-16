export const getInitials = (value?: string) => {
  if (!value) return "";
  return value
    .split(" ")
    .map((word) => word.substring(0, 1))
    .join("");
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const removeNullorUndefined = <T extends Record<string, any>>(params: T): T => {
  const result: Partial<T> = {};
  for (const key in params) {
    const value = params[key];
    if (value !== null && value !== undefined && value !== "") {
      result[key] = value;
    }
  }
  return result as T;
};

export const capitalize = (value?: string): string => {
  if (!value?.length) return "";
  return value.charAt(0).toUpperCase() + value.slice(1);
};

export const capitalizeWords = (value?: string): string => {
  if (!value?.length) return "";
  return value
    .split(" ")
    .map((word) => capitalize(word))
    .join(" ");
};

export const normalize = (path: string): string => {
  if (!path) return "";
  if (path.length <= 3) return path;

  let firstPart = "";
  let secondPart = "";
  let partCount = 0;
  const start = path.startsWith("/") ? 1 : 0;

  for (let i = start; i < path.length; i++) {
    if (path[i] === "/") {
      if (partCount === 0 && firstPart) {
        partCount++;
        continue;
      }
      if (partCount === 1 && secondPart) {
        break;
      }
      continue;
    }

    if (partCount === 0) {
      firstPart += path[i];
    } else if (partCount === 1) {
      secondPart += path[i];
    }
  }

  if (!firstPart) return "";
  if (!secondPart) return `/${firstPart}`;
  return `/${firstPart}/${secondPart}`;
};

export const formatDate = (date: Date | undefined) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-NG", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
