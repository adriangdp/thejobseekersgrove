<script lang="ts">
    import { session } from "@store/session-store.svelte";
  import LogInButton from "@lib/common/LogInButton.svelte";

    const isLogged = $state(session.user);

</script>

<div class="w-full h-screen p-5 flex justify-center items-center bg-[url(/img/bg-login.webp)] bg-no-repeat bg-position-[50%_5%]">
        <div class="aspect-[1/1.1] p-10 max-h-[720px] flex flex-col justify-center items-center gap-5 bg-accent-outer/80 rounded-xl">
            <h1 class="text-2xl font-semibold text-header text-text-darker">The Jobseeker's Grove</h1>
            <p class="text-4xl font-light">Welcome!</p>
            <p class="text-lg">Log in with Google to continue.</p>            
            <LogInButton></LogInButton>
        </div>     
</div>

