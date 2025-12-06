type OptionTypes = {
  days?: number;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: "Lax";
};
const defaultOptions: OptionTypes = {
  days: 30, // number of days until expiration
  path: "/", // cookie path
  domain: "/", // cookie domain
  secure: false, // if true, only sent over HTTPS
  sameSite: "Lax", // can be "Strict", "Lax", or "None"
};

export class CookieManager {
  static set(name: string, value: unknown, options = defaultOptions) {
    let serialized;

    if (value instanceof Map) {
      serialized = JSON.stringify({ __type: "Map", value: [...value] });
    } else if (Array.isArray(value)) {
      serialized = JSON.stringify({ __type: "Array", value });
    } else if (typeof value === "object" && value !== null) {
      serialized = JSON.stringify({ __type: "Object", value });
    } else {
      serialized = JSON.stringify({ __type: "Primitive", value });
    }

    let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(
      serialized
    )}`;

    if (options.days) {
      const date = new Date();
      date.setTime(date.getTime() + options.days * 24 * 60 * 60 * 1000);
      cookie += `; expires=${date.toUTCString()}`;
    }

    cookie += `; path=${options.path || "/"}`;
    if (options.domain) cookie += `; domain=${options.domain}`;
    if (options.secure) cookie += "; secure";
    if (options.sameSite) cookie += `; samesite=${options.sameSite}`;

    document.cookie = cookie;
  }

  static get(name: string) {
    const cookies = document.cookie.split("; ");
    for (const c of cookies) {
      const [key, val] = c.split("=");
      if (decodeURIComponent(key) === name) {
        try {
          const parsed = JSON.parse(decodeURIComponent(val));
          switch (parsed.__type) {
            case "Map":
              return new Map(parsed.value);
            case "Array":
              return parsed.value;
            case "Object":
              return parsed.value;
            case "Primitive":
              return parsed.value;
            default:
              return parsed;
          }
        } catch {
          return decodeURIComponent(val);
        }
      }
    }
    return null;
  }

  // static update(name:string ,value:unknown, options:OptionTypes);
  // }

  static clear(name: string, path = "/") {
    document.cookie = `${encodeURIComponent(
      name
    )}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path}`;
  }

  static clearAll() {
    const cookies = document.cookie.split("; ");
    for (const c of cookies) {
      const [key] = c.split("=");
      this.clear(decodeURIComponent(key));
    }
  }
}
