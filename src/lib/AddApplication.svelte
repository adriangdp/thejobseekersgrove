<script lang="ts">
    import { enumJobStatus } from "@data/enum";
    import { type Job, type JobEntry, type JobPost } from "@data/types";
    import { applicationSchema } from "@data/validation-schemas";
    import { jobData } from "../store/data-store.svelte";
    import { dbCreateJob } from "../service/data-functions.svelte";
    import BadgeStatus from "@lib/common/BadgeStatus.svelte";
    import { session } from "../store/session-store.svelte";


    let{ showAddApplicationModal = $bindable() } : {showAddApplicationModal : boolean}= $props()
  
    let status: enumJobStatus = $state(enumJobStatus.offer);
    let position: string|undefined = $state();
    let company: string|undefined = $state();
    let mode: string|undefined = $state();
    let salary: number|undefined = $state();
    let link: string|undefined = $state();
    let appliedDate: string|undefined = $state(new Date().toISOString().split("T")[0]);

    let formErrors:Record<string, string> = $state({});

    const handleNewApplication = async(e:Event) =>{
        e.preventDefault();
        //Reset errors
        formErrors = {}

        const formData:JobPost = {
            status,
            position,
            company: company ?? "",
            mode,
            salary,
            link,
            applied_date: appliedDate ? new Date(appliedDate) : undefined
        }

    
            const { data, success, error } = applicationSchema.safeParse(formData);

            if(success){
                const newJob = await dbCreateJob(data);

                if(newJob){
                    jobData.add(newJob)
                }
                showAddApplicationModal = false;
                // TODO: Handle optimistic update fail gracefully
            }
            else{
               const errors = error.issues;
                errors.forEach((err)=>{
                    const error = err.path[0] as string;
                    if(error && !formErrors[error]){
                        formErrors[error] = err.message;
                    }
                })
               console.table(errors)
            } 
    }

</script>

        <form onsubmit={handleNewApplication} class="flex flex-col gap-8 h-fit">
            <div class="flex flex-col items-center gap-2 xl:gap-4">
                <div>
                    <label for="input-status">Status</label>
                    <div class="flex flex-wrap items-center gap-2 xl:gap-5 mt-3">
                        {#each Object.keys(enumJobStatus) as key (key)}
                             <button
                                onclick={() => status = key as enumJobStatus}
                                type="button"
                                class={`button-invisible cursor-pointer ${status === key ? 'brightness-250' : ''} p-0`}
                            >
                                <BadgeStatus status={key as enumJobStatus} />
                            </button>                            
                        {/each}
                    </div>
                </div>
                <div class="w-full">
                    <label for="input-position" class="block">
                        Position
                        {#if formErrors.position}
                            <span class="text-card-rejected text-sm animate-falldown">{formErrors.position}</span>
                        {/if}
                    </label>
                    <input bind:value={position}
                        name="position" 
                        id="input-position" 
                        type="text" 
                        placeholder="Position / Job Title"
                        class="w-full" 
                    />
                </div>
                <div class="w-full">
                    <label for="input-company">
                        Company
                        {#if formErrors.company}
                            <span class="text-card-rejected text-sm animate-falldown">{formErrors.company}</span>
                        {/if}
                    </label>
                    <input bind:value={company} 
                        name="company"
                        id="input-company" 
                        type="text" 
                        placeholder="Company / Job Poster"
                        class="w-full"
                    />
                </div>                
                <div class="w-full">
                    <label for="input-mode">Mode (optional)</label>
                    <input bind:value={mode} 
                        name="mode" 
                        id="input-mode" 
                        type="text" 
                        placeholder="Office / Remote / Hybrid / Other"
                        class="w-full"
                    />
                </div>
                <div class="w-full">
                    <label for="input-salary">Salary (optional)</label>
                    <input bind:value={salary} 
                        name="salary" 
                        id="input-salary" 
                        type="number"
                        placeholder="Annual salary" 
                        class="w-full"                        
                    />
                </div>
                <div class="w-full">
                    <label for="input-link">
                        Link
                        {#if formErrors.link}
                            <span class="text-card-rejected text-sm animate-falldown">{formErrors.link}</span>
                        {/if}
                    </label>
                    <input bind:value={link} 
                        name="link" 
                        id="input-link" 
                        type="url" 
                        placeholder="Link to job posting"
                        class="w-full"
                    />
                </div>
                <div class="w-full">
                    <label for="input-date">Date applied</label>
                    <input bind:value={appliedDate}
                        type="date"                         
                        name="input-date"                         
                        class="w-full"                    
                        max={new Date().toISOString().split('T')[0]}
                        min={new Date().getFullYear()}
                    />
                </div>
            </div> 
            <button type="submit" class="w-full h-full button-outlined bg-accent-inner">Apply here</button>
            <div class={`overlay-noise opacity-20 pointer-events-none`}></div>
        </form>

<style>
    input::-webkit-calendar-picker-indicator{
        display: none;
    }
</style>
