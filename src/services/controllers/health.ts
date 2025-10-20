import type { Context } from "hono";

export const HealthController = (c: Context) => {
    return c.json({
        message: 'API is running',
    })
}