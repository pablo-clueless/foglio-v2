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
  const qIndex = path.indexOf("?");
  const hIndex = path.indexOf("#");
  const end =
    qIndex === -1 ? (hIndex === -1 ? path.length : hIndex) : hIndex === -1 ? qIndex : Math.min(qIndex, hIndex);
  const cleanPath = path.slice(0, end);
  if (cleanPath.length <= 3) return cleanPath;

  let firstPart = "";
  let secondPart = "";
  let partCount = 0;
  const start = cleanPath.startsWith("/") ? 1 : 0;

  for (let i = start; i < cleanPath.length; i++) {
    if (cleanPath[i] === "/") {
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
      firstPart += cleanPath[i];
    } else if (partCount === 1) {
      secondPart += cleanPath[i];
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

/**
 * Converts a date string or Date object to ISO 8601 format (RFC3339).
 * Used for API requests that expect dates in "2006-01-02T15:04:05Z07:00" format.
 * @param date - A date string (e.g., "2023-01-02" from input[type="date"]) or Date object
 * @returns ISO 8601 formatted string or empty string if invalid
 */
export const toISODate = (date: string | Date | undefined | null): string => {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : date;
  if (isNaN(d.getTime())) return "";
  return d.toISOString();
};

/**
 * Converts a date to YYYY-MM-DD format for HTML date inputs.
 * @param date - An ISO date string, Date object, or any date string
 * @returns Date string in YYYY-MM-DD format or empty string if invalid
 */
export const toInputDate = (date: string | Date | undefined | null): string => {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : date;
  if (isNaN(d.getTime())) return "";
  return d.toISOString().split("T")[0];
};
