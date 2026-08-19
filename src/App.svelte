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
  <div class="fixed top-0 left-0 w-screen h-screen opacity-30 -z-15 mix-blend-screen bg-position-[50%_10%] bg-[url(/img/bg-login.webp)] bg-cover"></div>
  <div class="w-11/12 mx-auto">
    <Header />
    <Board />
  </div>
  
    
{/if}
  

