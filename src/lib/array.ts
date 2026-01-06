/* eslint-disable @typescript-eslint/no-explicit-any */

export const paginate = <T>(data: T[], page: number, size: number, total: number): T[] => {
  const startIndex = (page - 1) * size;
  const endIndex = Math.min(startIndex + size, total);
  return data?.slice(startIndex, endIndex);
};

export const groupArray = <T, K extends keyof T>(data: T[], discriminator: K): Record<string, T[]> => {
  const groupedObjects = data.reduce(
    (acc, item) => {
      const key = item[discriminator] as string;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    },
    {} as Record<string, T[]>,
  );
  return groupedObjects;
};

export const validateArray = <T extends object, P extends keyof T>(
  data: T[],
  required: P[],
): { validRows: Record<string, any>[]; missingColumns: string[]; rowsMissingData: number[] } => {
  const missingColumnsSet = new Set<string>();
  const rowsMissingData: number[] = [];
  const requiredLower = required.map((k) => String(k).toLowerCase());

  const normalizedData = data.map((item) => {
    const normalized: Record<string, any> = {};
    Object.entries(item).forEach(([key, value]) => {
      normalized[key.toLowerCase()] = value;
    });
    return { original: item, normalized };
  });

  const validRows = normalizedData
    .filter(({ normalized }, index) => {
      let rowValid = true;
      for (const key of requiredLower) {
        if (normalized[key] === undefined || normalized[key] === null) {
          missingColumnsSet.add(key);
          rowValid = false;
        }
      }
      if (!rowValid) {
        rowsMissingData.push(index);
      }
      return rowValid;
    })
    .map(({ normalized }) => normalized);

  return {
    validRows,
    missingColumns: Array.from(missingColumnsSet),
    rowsMissingData,
  };
};
