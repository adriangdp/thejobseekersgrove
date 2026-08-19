<script lang="ts">
    import { enumJobStatus } from "@data/enum";
    import type { JobStyle } from "@data/types";
 
    import BadgeStatus from "@lib/common/BadgeStatus.svelte";
    let{state, jobStyle, callback} : { 
        state: enumJobStatus, 
        jobStyle: JobStyle
        callback:(newStatus:enumJobStatus)=>void} 
    = $props();
    let background = $derived(jobStyle.styles.badge.background);
    let border = $derived(jobStyle.styles.badge.border);

</script>



<div class={`z-20 absolute top-[105%] left-0 w-fit h-fit p-3 rounded-md ${background} border ${border} flex flex-wrap gap-4 lg:gap-2 animate-fadeIn duration-[3s]`}>
   
    {#each Object.values(enumJobStatus) as enumStatus}
        {#if enumStatus !== state}
            <button class={`button-invisible cursor-pointer p-0 min-h-fit`}  onclick={()=>callback(enumStatus)}>
                <BadgeStatus status={enumStatus}></BadgeStatus>
            </button>   
        {/if}
        
    {/each}

</div>