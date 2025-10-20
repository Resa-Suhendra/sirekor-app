/**
 * Converts a camelCase string to snake_case
 * @param str - The camelCase string to convert
 * @returns The snake_case version of the string
 *
 * @example
 * ```typescript
 * camelToSnake('adjustedHolidays') // 'adjusted_holidays'
 * camelToSnake('firstName') // 'first_name'
 * camelToSnake('XMLHttpRequest') // 'x_m_l_http_request'
 * ```
 */
function camelToSnake(str: string): string {
	return str
		.replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2") // Handle sequences like 'XMLHttpRequest'
		.replace(/([a-z\d])([A-Z])/g, "$1_$2") // Handle normal camelCase
		.toLowerCase();
}

/**
 * Type utility to convert camelCase keys to snake_case at the type level
 */
type CamelToSnakeCase<S extends string> = S extends `${infer T}${infer U}`
	? `${T extends Capitalize<T> ? "_" : ""}${Lowercase<T>}${CamelToSnakeCase<U>}`
	: S;

/**
 * Type utility to recursively transform all object keys from camelCase to snake_case
 */
type TransformKeysToSnakeCase<T> = T extends readonly unknown[]
	? { readonly [K in keyof T]: TransformKeysToSnakeCase<T[K]> }
	: T extends object
		? {
				[K in keyof T as CamelToSnakeCase<
					string & K
				>]: TransformKeysToSnakeCase<T[K]>;
			}
		: T;

/**
 * Recursively transforms all object keys from camelCase to snake_case
 *
 * @template T - The type of the input object
 * @param obj - The object to transform (can be an object, array, or primitive)
 * @returns A new object with all keys transformed to snake_case
 *
 * @example
 * ```typescript
 * const input = {
 *   firstName: 'John',
 *   lastName: 'Doe',
 *   contactInfo: {
 *     phoneNumber: '123-456-7890',
 *     emailAddress: 'john@example.com'
 *   },
 *   hobbies: ['reading', 'swimming']
 * };
 *
 * const result = transformKeys(input);
 * // Result type: {
 * //   first_name: string;
 * //   last_name: string;
 * //   contact_info: {
 * //     phone_number: string;
 * //     email_address: string;
 * //   };
 * //   hobbies: string[];
 * // }
 * ```
 */
export function transformKeys<T>(obj: T): TransformKeysToSnakeCase<T> {
	// Handle null and undefined
	if (obj === null || obj === undefined) {
		return obj as TransformKeysToSnakeCase<T>;
	}

	// Handle arrays
	if (Array.isArray(obj)) {
		return obj.map((item) =>
			transformKeys(item),
		) as TransformKeysToSnakeCase<T>;
	}

	// Handle Date objects and other built-in objects that shouldn't be transformed
	if (
		obj instanceof Date ||
		obj instanceof RegExp ||
		typeof obj === "function"
	) {
		return obj as TransformKeysToSnakeCase<T>;
	}

	// Handle primitive types
	if (typeof obj !== "object") {
		return obj as TransformKeysToSnakeCase<T>;
	}

	// Handle objects
	const transformed = {} as Record<string, unknown>;

	for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
		const snakeKey = camelToSnake(key);
		transformed[snakeKey] = transformKeys(value);
	}

	return transformed as TransformKeysToSnakeCase<T>;
}

/**
 * Alternative function name for better readability and export consistency
 * This is the same as transformKeys but with PascalCase naming
 */
export const TransformKeys = transformKeys;

// Type-only exports for advanced usage
export type { TransformKeysToSnakeCase, CamelToSnakeCase };
