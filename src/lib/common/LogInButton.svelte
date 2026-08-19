<script lang="ts">
    import { googleOAuth, LogOut } from "@service/auth.svelte";
    import { session } from "@store/session-store.svelte";

    const isLogged = $derived(session.user == null? false : true)
</script>

{#if !isLogged}
<button class="max-w-full px-6 flex gap-2 items-center button-outlined bg-accent-outer"
    onclick={()=>googleOAuth()} 
    aria-label="Log In with Google account"
>
    <img  src="/img/icon-google.png" aria-hidden="true" alt="" class="opacity-60 h-8 w-8 grow-0"/>
    <span class="grow">Log In with Google</span>
</button>
{:else}
<button class="max-w-full px-6 flex gap-2 items-center button-invisible group"
    onclick={()=>LogOut()} 
    aria-label="Log Out"
>
    <span aria-hidden="true"
        class="opacity-60 bg-[url('/img/icon-logout.png')] bg-cover h-8 w-8 grow-0 transition-transform duration-400 group-hover:-translate-x-6">
    </span>
    <span class="grow">Log Out</span>
</button>
{/if}