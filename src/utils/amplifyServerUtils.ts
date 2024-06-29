import { createServerRunner } from '@aws-amplify/adapter-nextjs';
import config from  "@/../amplify_outputs.json";
import {cookies} from 'next/headers';
import { getCurrentUser } from 'aws-amplify/auth/server';

export const { runWithAmplifyServerContext } = createServerRunner({
    config
});

// Access AWS server-side and check to see if a user is currently logged
// in to the application. 
export const isAuthenticated = async () => 
    await runWithAmplifyServerContext({
        nextServerContext: {cookies},
        async operation(contextSpec) {
            try {
                const user = await getCurrentUser(contextSpec)
                console.log(user.userId);
                return user.userId;
            } catch(error) {
                return false;
            }
        }
    })
