import type { Context } from "hono";
import type { HTTPResponse } from "@/types/http.type";
import { HTTP_STATUS_MESSAGES, type HTTPStatusCode } from "./response";

export interface ZodValidationError {
	issues: unknown;
	name: string;
}
export interface ZodValidationResult {
	success: boolean;
	error?: ZodValidationError;
}
export function RES_ZOD<T>(
	error: T,
	status: HTTPStatusCode = 400,
	options?: { message?: string },
): HTTPResponse<T> {
	return {
		success: false,
		message:
			options?.message ?? HTTP_STATUS_MESSAGES[status] ?? "Validation Error",
		results: error,
		timestamp: new Date().toISOString(),
	};
}
export function ZERROR(result: ZodValidationResult, c: Context) {
	if (!result.success && result.error) {
		return c.json(
			RES_ZOD(
				{
					issues: result.error.issues,
					name: result.error.name,
				},
				400,
			),
			400,
		);
	}
}
