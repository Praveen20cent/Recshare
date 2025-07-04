import { toNextJsHandler } from "better-auth/next-js";
import {auth} from "@/lib/auth"; // Adjust the import path as necessary

export const {GET, POST}=toNextJsHandler(auth.handler)