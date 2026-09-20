/**
 * Server-only configuration. Every module that reads these values is imported
 * exclusively from Server Components and Server Actions, so the values never
 * reach the browser bundle.
 */

const rawBaseUrl = process.env.TODO_API_BASE_URL ?? "http://localhost:5000";

/** Trailing slashes are stripped: Spring Boot 3+ removed trailing-slash route
 *  matching, so `/todos/` is a 404 while `/todos` is correct. */
export const API_BASE_URL = rawBaseUrl.replace(/\/+$/, "");

/** Sent as `createdBy` on create. The API has no auth — this is a label. */
export const DEFAULT_AUTHOR = process.env.TODO_DEFAULT_AUTHOR ?? "web";
