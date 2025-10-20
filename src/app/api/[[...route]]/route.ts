import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { HealthController } from '@/services/controllers/health'

const app = new Hono().basePath('/api')

app.get('/health', (c) => HealthController(c))
app.get('/health/:id', (c) => HealthController(c))

export const GET = handle(app)
export const POST = handle(app)