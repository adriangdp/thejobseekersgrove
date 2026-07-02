<script lang="ts">
  import Header from '@lib/common/Header.svelte';
  import Board from '@lib/Board.svelte';
  import { dbGetAllJobs } from './service/data-functions.svelte';
  import { googleOAuth, LogOut } from './service/auth.svelte';
  import { session } from './store/session-store.svelte';
  import { jobData } from './store/data-store.svelte';
  import LogIn from '@lib/LogIn.svelte';
  import LogInButton from '@lib/common/LogInButton.svelte';

  $effect(()=>{
    if(session){
      dbGetAllJobs()
      .then(data => {
          jobData.set(data)
      })
    }
  })

    
</script>



{#if session.user == null}
  <LogIn />
{:else}
    <main class="w-11/12 mx-auto">
      <Header />
      <LogInButton />
      <Board />
    </main>
{/if}
  

