export type HTTPResponse<T, M = undefined> = {
	success: boolean; // True if the operation was successful
	message?: string; // Short, human-readable summary (localized if needed)
	results: T; // Main response data payload
	meta?: M; // Optional: Additional metadata (pagination, etc)
	timestamp: string; // ISO 8601 UTC timestamp of the response
};
