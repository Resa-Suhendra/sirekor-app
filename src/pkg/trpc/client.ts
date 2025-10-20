import { hc } from "hono/client";
import type { AppType } from "@/app/api/[[...route]]/route";
import { ENV } from "@/configs/env";

export const trpc = hc<AppType>(ENV.BASE_URL);