import type { TRequestIntercepter } from "../request.http";
import { apiIntercepter } from "./api.intercepter";
import { contentTypeIntercepter } from "./contentType.intercepter";

export const intercepters: TRequestIntercepter[] = [
    apiIntercepter,
    contentTypeIntercepter
]
