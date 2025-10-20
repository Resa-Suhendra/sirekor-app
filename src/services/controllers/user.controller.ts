import type { Context } from "hono";
import type { UserCreateSchemaType } from "../schemas/user.schema";
import { RES } from "@/utils/response";
import { UserCreateUsecase, UserListUsecase } from "../usecases/user.usecase";

const UserCreateController = async (c: Context) => {
    try {
        const body = (c.req.valid as (type: "json") => unknown)("json") as UserCreateSchemaType;
        const results  = await UserCreateUsecase(body)
        return c.json(RES(201, results));
    } catch (error) {
        return c.json(RES(500, error));
    }
};

const UserListController = async (c: Context) => {
    try {
        const results = await UserListUsecase();
        return c.json(RES(200, results));
    } catch (error) {
        return c.json(RES(500, error));
    }
};

export { UserCreateController, UserListController };