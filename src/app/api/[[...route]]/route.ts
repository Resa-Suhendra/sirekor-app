import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { HealthController } from '@/services/controllers/health'

const app = new Hono().basePath('/api')
.get('/health', (c) => HealthController(c))
.get('/resa/:id', (c) => {
    const id = c.req.param('id')
    return c.json({
        message: `Hello World Resa ${id}`
    })
})


export const GET = handle(app)
export const POST = handle(app)
export type AppType = typeof app