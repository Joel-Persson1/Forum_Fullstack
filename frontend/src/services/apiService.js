const BASE_URL = "http://localhost:3000";

export const fetchData = async ({
  endpoint,
  id = null,
  method = "GET",
  body = null,
  headers = { "Content-Type": "application/json" },
  errMsg = "Failed to fetch data",
  timeout = 5000, // 5 seconds timeout
}) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const url = new URL(`${BASE_URL}${endpoint}${id ? `${id}` : ""}`);

    const options = {
      method,
      headers,
      signal: controller.signal,
      ...(body && { body: JSON.stringify(body) }),
    };

    const response = await fetch(url, options);
    clearTimeout(timeoutId);

    if (!response.ok) throw new Error(`${errMsg} (HTTP ${response.status})`);

    const data = await response.json();

    return { success: true, data };
  } catch (error) {
    console.error("Fetch error:", error.message);
    return { success: false, error: error.message };
  }
};
