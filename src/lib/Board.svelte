<script lang="ts">

    import { session } from "../store/session-store.svelte";
    import { jobData } from "../store/data-store.svelte";
    import { applyFiltersAndSort, isAllFiltersOff } from "../store/filter-store.svelte";
    import AddApplication from "@lib/AddApplication.svelte";
    import BoardFilter from "@lib/BoardFilter.svelte";
    import JobDisplay from "@lib/Job/JobDisplay.svelte";
    import Modal from "@lib/Modal.svelte";
    import SwitchView from "@lib/SwitchView.svelte";
    import ClearDataButton from "@lib/ClearDataButton.svelte";
    import SideMenu from "@lib/SideMenu.svelte";
    
    let filteredApplications = $derived(applyFiltersAndSort(jobData.values))

    let isCardDisplay: boolean = $state(true)
    let showAddApplicationModal:boolean = $state(false) 
    let preventScroll: boolean = $derived(showAddApplicationModal)

</script>

<div class={`relative ${preventScroll ? 'max-h-screen overflow-hidden':''} w-full pt-4 xl:flex xl:flex-row-reverse xl:gap-8`}>
    <SideMenu bind:isCardDisplay bind:showAddApplicationModal/>
    <div class="xl:w-10/12">
        {#if session.user && !session.loading}
            <div class="mb-3">
                <p>Showing {filteredApplications.length} of {jobData.values.length} applications</p>
            </div>
            {#if filteredApplications.length > 0}
                <!-- Display Card View-->
                {#if isCardDisplay}
                    <main class="mx-auto md:mx-0 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-3 lg:gap-6 max-w-62.5 md:max-w-full">
                        {#each filteredApplications as cardApplication}
                            <JobDisplay application={cardApplication} isCardDisplay={true}></JobDisplay>
                        {/each}
                    </main>
                {:else}
                <!-- Display Table View-->
                <main class="w-full overflow-x-auto">
                    <table class="lg:mx-auto lg:w-full">
                        <thead class="bg-accent-inner">
                            <tr>
                                <th class="border p-3 border-accent-outer text-text-darker text-sm md:text-base">Status</th>
                                <th class="border p-3 border-accent-outer text-text-darker text-sm md:text-base">Position</th>
                                <th class="border p-3 border-accent-outer text-text-darker text-sm md:text-base">Company</th>
                                <th class="border p-3 border-accent-outer text-text-darker text-sm md:text-base">Mode</th>
                                <th class="border p-3 border-accent-outer text-text-darker text-sm md:text-base">Salary</th>
                                <th class="border p-3 border-accent-outer text-text-darker text-sm md:text-base">Link</th>
                                <th class="border p-3 border-accent-outer text-text-darker text-sm md:text-base">Added Date</th>
                            </tr>
                        </thead>
                        <tbody>                
                            {#each filteredApplications as application }
                                <JobDisplay application={application} isCardDisplay={false}></JobDisplay>
                            {/each}
                    
                        </tbody>
                    </table>
                </main>

                {/if}
            {:else if jobData.length <= 0 && !isAllFiltersOff()}
                <span class="block my-8 text-center text-text-darker text-2xl font-rosarivo"> 
                    Approach, oh fretting soul, and add a 
                    <button onclick={()=>{showAddApplicationModal = true}}
                        class="button-invisible p-0 text-card-accepted decoration-card-accepted underline decoration-dotted underline-offset-7 lg:underline-offset-4 hover:decoration-card-offer hover:text-card-offer visited:text-card-accepted visited:decoration-card-accepted"
                    >
                    Job Application
                    </button> to recieve a reading.
                </span>
            {:else if isAllFiltersOff()}
                <span class="block mt-8 text-center text-text-darker text-2xl font-rosarivo">No creatures will appear with all filters turned off</span>
            {:else}
                <span class="block mt-8 text-center text-text-darker text-2xl font-rosarivo">No creatures have appeared— something unsettling is afoot.</span>
            {/if}
        {:else}
            <span class="block mt-8 text-center text-text-darker text-2xl font-rosarivo">Please, mysterious soul, identify yourself to witness your critters appear—</span>
        {/if}
    </div>
    
    {#if showAddApplicationModal}
        <Modal bind:isOpen={showAddApplicationModal}>
            <AddApplication bind:showAddApplicationModal={showAddApplicationModal} />
        </Modal>
    {/if}
    
    
</div>

