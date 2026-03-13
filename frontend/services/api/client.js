const API_BASE = process.env.NEXT_PUBLIC_API_URL;

if (!API_BASE) {
  throw new Error("NEXT_PUBLIC_API_URL is not configured");
}

const NORMALIZED_API_BASE = API_BASE.replace(/\/$/, "");

export async function apiRequest(path, options = {}) {
  const response = await fetch(`${NORMALIZED_API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });

  const contentType = response.headers.get("content-type") || "";
  const responseBody = contentType.includes("application/json") ? await response.json() : null;

  if (!response.ok) {
    const error = new Error(responseBody?.message || `API request failed: ${response.status}`);
    error.status = response.status;
    error.body = responseBody;
    throw error;
  }

  return responseBody;
}
