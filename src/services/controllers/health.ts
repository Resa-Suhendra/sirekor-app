import type { Context } from "hono";

export const HealthController = (c: Context) => {
    const id = c.req.param('id')
    return c.json({
        id,
        message: 'API is running',
    })
}