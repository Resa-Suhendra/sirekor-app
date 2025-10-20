import prisma from "@/pkg/prisma/main";
import type { UserCreateSchemaType } from "../schemas/user.schema";

export const UserCreateUsecase = async (payload: UserCreateSchemaType) => {
    const result = await prisma.user.create({
        data: {
            name: payload.name,
            email: payload.email,
        }
    })
    return result;
}

export const UserListUsecase = async () => {
    const result = await prisma.user.findMany();
    return result;
}