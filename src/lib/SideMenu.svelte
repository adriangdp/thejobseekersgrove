<script lang="ts">
    import AddApplicationButton from "@lib/AddApplicationButton.svelte";
    import SwitchView from "@lib/SwitchView.svelte";
    import BoardFilter from "@lib/BoardFilter.svelte";
    import LogInButton from "@lib/common/LogInButton.svelte";
    import ClearDataButton from "@lib/ClearDataButton.svelte";
    import Modal from "@lib/Modal.svelte";
    let { 
        isCardDisplay  = $bindable(),
        showAddApplicationModal = $bindable()
    }:{
        isCardDisplay:boolean,
        showAddApplicationModal:boolean,
    } = $props();

    let isOpen:boolean = $state(false)
</script>

<aside class="block xl:hidden">
    <button class={`z-30 ${!isOpen ? 'block' : 'hidden'} fixed top-2 right-2 p-1 aspect-square`}
        aria-label="open side menu"
        onclick={()=>isOpen = true}
    ><span class="block w-10 h-10 mx-auto bg-[url('/img/icon-menu.png')] bg-contain bg-center bg-no-repeat" aria-hidden="true"></span></button>
    {#if isOpen}
        <Modal bind:isOpen>
            <div class="self-end">
                <LogInButton />
            </div>
            
            <div class="mt-8">
                <AddApplicationButton bind:showAddApplicationModal />
                <div class="mt-8">
                    <SwitchView bind:isCardDisplay />            
                    <BoardFilter />                
                </div>
            </div>
            <div class="mt-5 md:mt-20 w-full">
                <ClearDataButton />
            </div> 

        </Modal>
    {/if}
    
</aside>

<aside class="hidden xl:block w-2/10">
    <div class="fixed top-0 right-0 xl:p-6 2xl:p-12 flex flex-col h-dvh bg-black/30">
        <span class="ml-auto">
            <LogInButton />
        </span>
        <span class="mt-10 w-full">
            <AddApplicationButton bind:showAddApplicationModal />
        </span>
        <div class="mt-5 w-full">              
                <SwitchView bind:isCardDisplay />            
                <BoardFilter />                
        </div>
        <div class="grow w-full flex flex-col-reverse h-full">
            <ClearDataButton />
        </div>
    </div>
</aside>


