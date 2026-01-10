export interface Option<T = number> {
  label: string;
  value: T;
}

type KeyMap<T, V extends keyof T, L extends keyof T> = {
  valueKey: V;
  labelKey: L;
};

export const convertToOptions = <T, V extends keyof T, L extends keyof T>(
  response: T[] | null | undefined,
  { labelKey, valueKey }: KeyMap<T, V, L>
): Option<T[V]>[] => {
  if (!response || !Array.isArray(response)) return [];

  return response.map((item) => ({
    label: String(item[labelKey]),
    value: item[valueKey],
  }));
};
