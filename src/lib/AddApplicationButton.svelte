<script lang="ts">
    import { session } from "../store/session-store.svelte";
    let {showAddApplicationModal = $bindable()}:{showAddApplicationModal:boolean} = $props();
</script>

{#if !session.loading && session.user}
    <button onclick={()=>{showAddApplicationModal = !showAddApplicationModal}}
        class="flex items-center gap-3"
        aria-label="Add job application button"
    > 
        <span class="w-7 h-7 bg-[url('img/icon-add.png')] bg-cover"
            aria-hidden="true"
        ></span>
        <span aria-hidden="true">Add Job Application</span>
    </button>
{/if}