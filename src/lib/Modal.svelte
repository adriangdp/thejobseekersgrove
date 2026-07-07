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

<dialog class="z-30 flex items-center justify-center fixed top-0 left-0 w-screen h-full bg-accent-outer/60 backdrop-blur-xs">
    <div class={`relative ${backgroundAlpha} rounded-md max-w-full max-h-full px-12 md:px-15 py-14 md:py-18 overflow-x-hidden overflow-y-scroll lg:overflow-y-visible ${isClosing ? 'animate-falldown-reverse':'animate-falldown'}`}>
        {@render children()}
        <CloseButton handler={handleClose} positioning=""/>         
    </div>            
</dialog>