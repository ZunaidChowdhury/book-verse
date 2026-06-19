import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

import { jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db('BookVerse');
export const auth = betterAuth({
    user: {
        additionalFields: {
            role: {
                required: true,      // Set to true if field cannot be null
                default: "reader", // Optional: fallback database state
                // input: true,          // Allows client-side signUp methods to pass this field
            },
        },
    },
    emailAndPassword: {
        enabled: true,
    },

    database: mongodbAdapter(db, {
        // Optional: if you don't provide a client, database transactions won't be enabled.
        client
    }),
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        },
    },

    session: {
        cookieCache: {
            enabled: true,
            strategy: 'jwt',
            maxAge: 60 * 60 * 24 * 7    // 7 days
        }
    },


    plugins: [
        jwt()
    ],



});
