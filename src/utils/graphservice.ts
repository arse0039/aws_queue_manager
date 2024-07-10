// src/utils/graphService.ts

import { Client } from "@microsoft/microsoft-graph-client";
import { AuthenticationResult, InteractionRequiredAuthError, PublicClientApplication } from "@azure/msal-browser";

const msalConfig = {
  auth: {
    clientId: process.env.NEXT_PUBLIC_AZURE_CLIENT_ID!,
    authority: `https://login.microsoftonline.com/${process.env.NEXT_PUBLIC_AZURE_TENANT_ID}`,
    redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URI
  }
};

const msalInstance = new PublicClientApplication(msalConfig);

const loginRequest = {
  scopes: ["User.Read", "Chat.Create", "ChatMessage.Send"]
};

export async function getAccessToken(): Promise<string> {
  const accounts = msalInstance.getAllAccounts();
  if (accounts.length > 0) {
    try {
      const silentRequest = {
        ...loginRequest,
        account: accounts[0]
      };
      const response: AuthenticationResult = await msalInstance.acquireTokenSilent(silentRequest);
      return response.accessToken;
    } catch (error) {
      if (error instanceof InteractionRequiredAuthError) {
        const response: AuthenticationResult = await msalInstance.acquireTokenPopup(loginRequest);
        return response.accessToken;
      }
      throw error;
    }
  } else {
    const response: AuthenticationResult = await msalInstance.loginPopup(loginRequest);
    return response.accessToken;
  }
}

export async function sendTeamsMessage(recipientEmail: string, message: string): Promise<boolean> {
  const accessToken = await getAccessToken();
  const client = Client.init({
    authProvider: (done) => {
      done(null, accessToken);
    }
  });

  const chatMessage = {
    body: {
      content: message
    }
  };

  try {
    // First, create a new chat or get existing chat
    const chat = await client.api("/chats")
      .post({
        chatType: "oneOnOne",
        members: [
          {
            "@odata.type": "#microsoft.graph.aadUserConversationMember",
            roles: ["owner"],
            "user@odata.bind": `https://graph.microsoft.com/v1.0/users('${recipientEmail}')`
          }
        ]
      });

    // Then, send a message to this chat
    await client.api(`/chats/${chat.id}/messages`)
      .post(chatMessage);

    return true;
  } catch (error) {
    console.error('Error sending Teams message:', error);
    return false;
  }
}