export type GoogleSigninResponse = {
    clientId: string,
    credential: string,
    select_by: string,
};

export const initializeGoogleButton = (id: string, callBack?: (credential: string) => void ) => {
    const w = window as any;
    const google = w?.google;
    google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      callback: (response: GoogleSigninResponse) => {
          if(response && callBack) callBack(response.credential)
      },
    });
    google.accounts.id.renderButton(
      document.getElementById(id),
      { theme: "outline", size: "large" }
    );
};