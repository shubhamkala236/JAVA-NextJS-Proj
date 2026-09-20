type ClassValue = string | false | null | undefined;

/** Joins class names, dropping falsy entries. */
export const cn = (...parts: ClassValue[]): string => parts.filter(Boolean).join(" ");
