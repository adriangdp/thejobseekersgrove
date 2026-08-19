<script lang="ts">

import { filterStates } from "@store/filter-store.svelte";
let inputQuery = $state(undefined);
const handleChangeQuery = () =>{
    filterStates.textQuery = inputQuery
}

</script>
<div class="flex flex-col my-5 w-full">
    <label class="w-full">
        Search
        <input class="block w-full mt-1" 
            bind:value={inputQuery}
            type="text" 
            placeholder="Enter your query"
            oninput={handleChangeQuery}
        />
    </label>    
</div>