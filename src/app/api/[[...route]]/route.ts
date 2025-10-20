import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { HealthController } from '@/services/controllers/health'
import { ZERROR } from '@/utils/error-zod';
import { UserCreateSchema } from '@/services/schemas/user.schema';
import { zValidator } from "@hono/zod-validator";
import { UserCreateController, UserListController } from '@/services/controllers/user.controller';

const CREATE_USER_SCHEMA = zValidator("json", UserCreateSchema, ZERROR);

const app = new Hono().basePath('/api')
    .get('/health', (c) => HealthController(c))
    .post('/user/create', CREATE_USER_SCHEMA, (c) => UserCreateController(c))
    .get('/user/list', (c) => UserListController(c))

export const GET = handle(app)
export const POST = handle(app)
export type AppType = typeof app