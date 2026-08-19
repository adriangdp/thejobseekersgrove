<script lang="ts">
    import { JobStyling } from "@data/jobStates";
    import { enumSortModes } from "@data/enum";
    import { filterStates } from "../store/filter-store.svelte";
</script>

<div class="my-5">
    <div class="flex gap-x-4">
            <select bind:value={filterStates.sortBy}
                class="grow-0 bg-accent-inner"            
            >
                <option value={enumSortModes.default}>Default</option>
                <option value={enumSortModes.date}>Date</option>
                <option value={enumSortModes.salary}>Salary</option>
                <option value={enumSortModes.status}>Status</option>
            </select>


            <select bind:value={filterStates.isAscendent} 
                class="grow md:grow-0 bg-accent-inner"
            >
                <option value={false}>
                    Desc./Newest
                </option>
                <option value={true}>
                    Asc./Oldest
                </option>
            </select>

    </div>
    <ul class="mt-5 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-2 gap-2">     
        <li class="col-span-1">
            <button onclick={()=>filterStates.showOffer = !filterStates.showOffer}
                class={`w-full h-full ${filterStates.showOffer? 'opacity-100':'button-outlined opacity-80'} ${filterStates.showOffer? '':'border-accent-outer/50'}`}
            >
                <img src={JobStyling.offer.icon} 
                    alt={`Filter by ${JobStyling.offer.state} icon`}
                    class="inline w-5"
                />
                <span>{JobStyling.offer.state}</span>
            </button>
        </li>
        <li class="col-span-1">
            <button onclick={()=>filterStates.showApplied = !filterStates.showApplied}
                class={`w-full h-full ${filterStates.showApplied? 'opacity-100':'button-outlined opacity-80'} ${filterStates.showApplied? '':'border-accent-outer/50'}`}
            >
                <img src={JobStyling.applied.icon} 
                    alt={`Filter by ${JobStyling.applied.state} icon`}
                    class="inline w-5"
                />
                <span>{JobStyling.applied.state}</span>
            </button>
        </li>
        <li class="col-span-1">
            <button onclick={()=>filterStates.showInterview = !filterStates.showInterview}
                class={`w-full h-full ${filterStates.showInterview? 'opacity-100':'button-outlined opacity-80'} ${filterStates.showInterview? '':'border-accent-outer/50'}`}
            >
                <img src={JobStyling.interview.icon} 
                    alt={`Filter by ${JobStyling.interview.state} icon`}
                    class="inline w-5"
                />
                <span>{JobStyling.interview.state}</span>
            </button>
        </li>
        <li class="col-span-1">
            <button onclick={()=>filterStates.showRejected = !filterStates.showRejected}
                class={`w-full h-full ${filterStates.showRejected? 'opacity-100':'button-outlined opacity-80'} ${filterStates.showRejected? '':'border-accent-outer/50'}`}
            >
                <img src={JobStyling.rejected.icon} 
                    alt={`Filter by ${JobStyling.rejected.state} icon`}
                    class="inline w-5"
                />
                <span>{JobStyling.rejected.state}</span>
            </button>
        </li>
        <li class="col-span-1">
            <button onclick={()=>filterStates.showGhosted = !filterStates.showGhosted}
                class={`w-full h-full ${filterStates.showGhosted? 'opacity-100':'button-outlined opacity-80'} ${filterStates.showGhosted? '':'border-accent-outer/50'}`}
            >
                <img src={JobStyling.ghosted.icon} 
                    alt={`Filter by ${JobStyling.ghosted.state} icon`}
                    class="inline w-5"
                />
                <span>{JobStyling.ghosted.state}</span>
            </button>
        </li>       
        <li class="col-span-1">
            <button onclick={()=>filterStates.showAccepted = !filterStates.showAccepted}
                class={`w-full h-full ${filterStates.showAccepted? 'opacity-100':'button-outlined opacity-80'} ${filterStates.showAccepted? '':'border-accent-outer/50'}`}
            >
                <img src={JobStyling.accepted.icon} 
                    alt={`Filter by ${JobStyling.accepted.state} icon`}
                    class="inline w-5"
                />
                <span>{JobStyling.accepted.state}</span>
            </button>
        </li>
        
    </ul>
</div>