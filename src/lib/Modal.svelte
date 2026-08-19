<script lang="ts">
    import type { Snippet } from "svelte";
    import CloseButton from "@lib/common/CloseButton.svelte";

    let {isOpen = $bindable(), backgroundColor, children} : {isOpen:boolean, backgroundColor?:string, children:Snippet}= $props()
    let isClosing : boolean = $state(false);
    let backgroundAlpha = $derived(backgroundColor ? backgroundColor:"bg-accent-outer")

    const handleClose = () =>{
        isClosing = true;
        setTimeout(()=>{
            isOpen = false
        }, 400);
    }

</script>

<dialog class="z-30 flex items-center justify-center fixed top-0 left-0 h-dvh w-dvw xl:p-10 bg-accent-outer/60 backdrop-blur-xs">
    <div class={`relative flex flex-col justify-center items-center ${backgroundAlpha} h-full w-full md:w-fit md:h-fit max-w-full max-h-full px-8 md:px-15 py-8 md:py-18 xl:p-10 overflow-x-hidden overflow-y-scroll lg:overflow-y-visible ${isClosing ? 'animate-falldown-reverse':'animate-falldown'} rounded-md`}>
            {@render children()}  
        <CloseButton handler={handleClose} positioning=""/>         
    </div>            
</dialog>