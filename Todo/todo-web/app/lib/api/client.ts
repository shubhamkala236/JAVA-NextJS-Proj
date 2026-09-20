import { API_BASE_URL } from "@/app/lib/env";
import { ApiError } from "@/app/lib/api/errors";

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
  /**
   * The API's service layer throws a bare RuntimeException("Todo not found")
   * for a missing row, which Spring renders as HTTP 500 with a body of
   * { timestamp, status, error, path } — no `message`, so the body can't be used
   * to tell the two apart. Only the caller knows whether a 500 on this route
   * could mean "missing row", so id-scoped calls opt in explicitly.
   */
  notFoundOn500?: boolean;
  /** DELETE /todos/{id} returns 200 with a zero-length body — never call .json(). */
  expectEmptyBody?: boolean;
};

/**
 * If Postgres is down but Spring is up, the TCP connect succeeds and the
 * connection pool blocks for ~30s before failing. Without a timeout the page
 * would hang for that whole time.
 */
const TIMEOUT_MS = 8_000;

export const request = async <T>(path: string, options: RequestOptions = {}): Promise<T> => {
  const { method = "GET", body, notFoundOn500 = false, expectEmptyBody = false } = options;
  const url = `${API_BASE_URL}${path}`;

  let response: Response;

  try {
    response = await fetch(url, {
      method,
      // Next 16's default fetch mode ("auto no cache") is fetched ONCE during
      // `next build` and the route is prerendered. `no-store` forces a real
      // request per render, and keeps `next build` working with the API down.
      cache: "no-store",
      headers: body === undefined ? undefined : { "Content-Type": "application/json" },
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
  } catch (cause) {
    throw new ApiError("unreachable", `Could not reach ${url}`, null, { cause });
  }

  if (!response.ok) {
    // Drain the body so the socket is released back to the pool.
    await response.body?.cancel();

    if (response.status === 500 && notFoundOn500) {
      throw new ApiError("not_found", `No todo at ${path}`, 500);
    }

    throw new ApiError("server", `${method} ${path} responded ${response.status}`, response.status);
  }

  if (expectEmptyBody) {
    await response.body?.cancel();
    return undefined as T;
  }

  try {
    return (await response.json()) as T;
  } catch (cause) {
    throw new ApiError(
      "bad_response",
      `${method} ${path} returned unparseable JSON`,
      response.status,
      { cause },
    );
  }
};
