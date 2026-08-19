<script lang="ts">

    import { dbClearUserRows } from "../service/data-functions.svelte";
    import { jobData } from "../store/data-store.svelte";

    let isFolded:boolean = $state(true)

    const handleunFold = async():Promise<void> =>{
        isFolded = false;
        setTimeout(()=>{isFolded = true}, 10 * 1000)
    }

    const handleClearTable = () =>{
        dbClearUserRows();
        jobData.clear();
        isFolded = true;
    }

</script>

<div class="relative w-full overflow-hidden">
     <button class={`fold ${isFolded? '':'unfold'} flex items-center justify-center gap-2 group`} onclick={handleunFold}>
        <span class="w-5 h-5 xl:w-8 xl:h-8 bg-[url('/img/icon-delete.png')] bg-cover group-hover:animate-bounce"></span>
        <span>Clear data</span>
    </button>
    <div class="flex items-center p-2 rounded-md gap-2 lg:gap-0 w-full h-full bg-card-rejected">
            <span class="grow min-w-fit">Are you sure?</span>
            <button onclick={handleClearTable} disabled={isFolded} aria-hidden={`${isFolded}`}
                class="button-invisible p-0 transition-all hover:-translate-y-1.5"
            >YES</button>
            <span>&nbsp;</span>
            <button onclick={()=>isFolded = true} disabled={isFolded} aria-hidden={`${isFolded}`}
                class="button-invisible p-0 transition-all hover:-translate-y-1.5"
            >NO</button>  
    </div> 
   
</div>


<style>
    .fold{
        position:absolute;
        top:0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: var(--color-accent-inner);
        border: 1px solid var(--color-accent-outer);
        transform: translateY(0%);
        transition: 2s 0s transform ease;
        z-index: 20;
        overflow: hidden;
    }

    .unfold{
        transform: translateY(-100%);
        transition: 1.2s 0s transform ease;
    }

</style>