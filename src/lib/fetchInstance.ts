type FetchConfig = Parameters<typeof fetch>[1];

class fetchInstance {
  baseURL: string;
  constructor(baseURL: string) {
    this.baseURL = baseURL;
    // todo: add timeout
    // todo: add withCredentials:
  }

  async request(
    endpoint: string,
    method: "PATCH" | "POST" | "GET" | "DELETE",
    data: string | null = null,
    headers = {}
  ) {
    const config: FetchConfig = {
      method: method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    };

    if (data) config.body = JSON.stringify(data);

    try {
      const response = await fetch(this.baseURL + endpoint, config);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  }

  get(endpoint: string, headers = {}) {
    return this.request(endpoint, "GET", null, headers);
  }

  post(endpoint: string, data: unknown, headers = {}) {
    const serializedData = JSON.stringify(data);
    return this.request(endpoint, "POST", serializedData, headers);
  }

  patch(endpoint: string, data: unknown, headers = {}) {
    const serializedData = JSON.stringify(data);
    return this.request(endpoint, "PATCH", serializedData, headers);
  }

  delete(endpoint: string, headers = {}) {
    return this.request(endpoint, "DELETE", null, headers);
  }
}

// Usage example:
export const googleApi = new fetchInstance(
  "https://www.google.com/recaptcha/api"
);
