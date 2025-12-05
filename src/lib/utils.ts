import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const getValidParams = (params = {}) => {
    const validParams:{[k:string]:unknown}= {};
    for (const [k, v] of Object.entries(params)) {
      if (v !== undefined && v !== null) {
        if (Array.isArray(v)) {
          if (v.length) {
            validParams[k] = v.join(",");
          }
        } else {
          validParams[k] = v;
        }
      }
    }
    return validParams;
  };

    const buildUrl = (
      baseUrl="",
      queryParams= {},
      pathParams={}
    ) => {
      let url = baseUrl;

      // Append path parameters
      for (const [key, value] of Object.entries(pathParams)) {
        url =url.replace(`{${key}}`, `${value}`);
      }

      const queryString = new URLSearchParams(
        getValidParams(queryParams)as Record<string, string>).toString();
      if (queryString) {
        url += `?${queryString}`;
      }

      return url;
    };

  export const Utils = {
      buildUrl,
      getValidParams,
    };