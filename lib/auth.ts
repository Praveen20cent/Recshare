import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '@/drizzle/db'; // Adjust the import path as necessary
import {schema} from '@/drizzle/schema'; // Adjust the import path as necessary
import { nextCookies } from 'better-auth/next-js';

export const auth=betterAuth({
    database: drizzleAdapter(db, { provider: 'pg',schema, }),
    socialProviders:{
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }
    },
    plugins:[nextCookies()],
    baseURL:process.env.NEXT_PUBLIC_BASE_URL!,
})