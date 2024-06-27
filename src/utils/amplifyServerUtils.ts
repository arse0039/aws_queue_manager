import { createServerRunner } from '@aws-amplify/adapter-nextjs';
import outputs from '../../amplify_outputs.json'
import { cookies } from 'next/headers';
import { getCurrentUser } from 'aws-amplify/auth/server';

export const { runWithAmplifyServerContext } = createServerRunner({
    config: outputs
  });
  
  export const isAuthenticated = async () => {
    try {
      const result = await runWithAmplifyServerContext({
        nextServerContext: { cookies },
        operation: async (contextSpec) => {
          try {
            const user = await getCurrentUser(contextSpec);
            return !!user;
          } catch (error) {
            return false;
          }
        }
      });
      return result;
    } catch (error) {
      return false;
    }
  };
  