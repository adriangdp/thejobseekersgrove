<script lang="ts">
    import { googleOAuth, LogOut } from "@service/auth.svelte";
    import { session } from "@store/session-store.svelte";

    const isLogged = $derived(session.user == null? false : true)
</script>

{#if !isLogged}
<button onclick={()=>googleOAuth()} class="max-w-full px-6 flex gap-2 items-center button-outlined bg-accent-outer">
    <img  src="/img/icon-google.png" aria-hidden="true" alt="" class="opacity-60 h-8 w-8 grow-0"/>
    <span class="grow">Log In with Google</span>
</button>
{:else}
<button onclick={()=>LogOut()} class="max-w-full px-6 flex gap-2 items-center button-outlined bg-accent-outer">
    <img  src="/img/icon-logout.png" aria-hidden="true" alt="" class="opacity-60 h-8 w-8 grow-0"/>
    <span class="grow">Log Out</span>
</button>
{/if}