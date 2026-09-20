export type ApiErrorKind =
  /** Connection refused, DNS failure or timeout — the API or its database is down. */
  | "unreachable"
  /** The API's 500-means-missing-row signal on an id-scoped route. */
  | "not_found"
  /** A genuine non-2xx response. */
  | "server"
  /** 2xx, but the body would not parse as JSON. */
  | "bad_response";

export class ApiError extends Error {
  readonly kind: ApiErrorKind;
  readonly status: number | null;

  constructor(
    kind: ApiErrorKind,
    message: string,
    status: number | null = null,
    options?: ErrorOptions,
  ) {
    super(message, options);
    this.name = "ApiError";
    this.kind = kind;
    this.status = status;
  }
}

export const isApiError = (value: unknown): value is ApiError => value instanceof ApiError;

/** Turns any thrown value into copy that is safe to show a user. */
export const toUserMessage = (error: unknown): string => {
  if (!isApiError(error)) {
    return "Something went wrong. Please try again.";
  }

  switch (error.kind) {
    case "unreachable":
      return "Can't reach the Todo API. Make sure the Spring Boot app (port 5000) and Postgres are running.";
    case "not_found":
      return "That todo no longer exists. It may have been deleted somewhere else.";
    case "bad_response":
      return "The Todo API returned an unexpected response.";
    case "server":
      return "The Todo API returned an error. Check the Spring Boot console.";
  }
};
