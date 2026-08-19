<script lang="ts">

    let { isCardDisplay  = $bindable() } : {isCardDisplay:boolean} = $props();

</script>

<div class="flex gap-0 bg-accent-inner rounded-md max-w-fit p-2">
    <button onclick={()=>{isCardDisplay = true}} aria-label="Card view button"
        class={`aspect-square button-invisible ${isCardDisplay? 'bg-accent-outer':''} rounded-md hover:bg-accent-outer/50 group`}  
    >
        <span aria-hidden="true" class={`block w-full h-full group-hover:brightness-200 bg-[url('/img/icon-view-card.png')] bg-contain bg-no-repeat bg-center ${isCardDisplay? 'brightness-200' : 'brightness-100'}`}></span>
    </button>
    <button  onclick={()=>{isCardDisplay = false}} aria-label="Table view button"
        class={`aspect-square button-invisible ${!isCardDisplay? 'bg-accent-outer':''} rounded-md hover:bg-accent-outer/50 p-1 group`}
    >
        <span aria-hidden="true" class={`block w-full h-full group-hover:brightness-200 bg-[url('/img/icon-view-table.png')] bg-contain bg-no-repeat bg-center ${!isCardDisplay? 'brightness-200' : 'brightness-100'}`}></span>
    </button>
</div>