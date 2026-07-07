import { supabaseClient } from "./supabase-client.svelte";
import { session } from "../store/session-store.svelte";

/**
 * Sets the user session as a global state
 */
supabaseClient.auth.onAuthStateChange(async(authEvent, currentSession)=>{
    session.loading = true;

     if (authEvent === "INITIAL_SESSION") {
        session.loading = false;
        return;
    } else if (authEvent === "SIGNED_IN" && currentSession) {
        session.user = currentSession.user;
        session.loading = false;
        return;
    } else if (authEvent === "SIGNED_OUT") {
        session.user = null;
        session.loading = false;
        return;
    } else if (authEvent === "TOKEN_REFRESHED" && currentSession) {
        session.user = currentSession.user;
        session.loading = false;
        return;
    }

    session.loading = false;
    console.table(session)
    return;

})


/**
 * Logs in using Google OAuth
 */
export async function googleOAuth(){
    const {data, error} = await supabaseClient.auth.signInWithOAuth({
        provider: "google",
        options: {
            redirectTo: `${window.location.origin}`,
            queryParams:{
                access_type:"offline",
                prompt:"consent"
            }
        }   
    })
}

/**
 * Ends the supabase session and cleans up store.
 */
export async function LogOut(){    
    const { error } = await supabaseClient.auth.signOut();
    session.user = null;
    session.loading = false;
    if(error) throw new Error(`ERROR ${error.code}:${error.message} || ${error.cause}`)   
}