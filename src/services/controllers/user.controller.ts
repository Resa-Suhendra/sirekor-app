import type { Context } from "hono";
import type { UserCreateSchemaType } from "../schemas/user.schema";
import { RES } from "@/utils/response";

const UserCreateController = (c: Context) => {
	const body = (c.req.valid as (type: "json") => unknown)("json") as UserCreateSchemaType;
	return c.json(body);
};

const UserListController = (c: Context) => {
	return c.json(RES(200, []));
};

export { UserCreateController, UserListController };