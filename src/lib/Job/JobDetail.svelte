<script lang="ts">
    import { enumJobStatus } from "@data/enum";
    import type { JobEntry, JobPost, JobStyle } from "@data/types";    
    import { applicationSchema } from "@data/validation-schemas";
    import { jobData } from "@store/data-store.svelte";
    import { dbUpdateJob, dbDeleteJob } from "@service/data-functions.svelte";
    import BadgeStatus from "@lib/common/BadgeStatus.svelte";
    import BadgeStatusChanger from "@lib/common/BadgeStatusChanger.svelte";
    import DeleteJobApplication from "@lib/DeleteJobApplication.svelte";
    import Modal from "@lib/Modal.svelte";


    let { 
        application, 
        applied_date,
        jobStyle,
        showDetail = $bindable() 
    } : { 
        application: JobEntry,
        applied_date: Date | null,
        jobStyle: JobStyle,
        showDetail: boolean,
    } = $props(); 
    let { 
        id,
        status, 
        position, 
        company, 
        mode, 
        salary, 
        link
    } = $derived(application);

    let editableDate = $derived(applied_date ?? new Date().toISOString().split('T')[0] );
    let editableSalary = $derived(salary);
    let editableLink = $derived(link);
    let editStatusFlag:boolean = $state(false);
    let editDataMode:boolean = $state(false)
    
    const handleModify = async(e:Event) =>{
        e.preventDefault();

        const formData:JobPost = {
            status: status as enumJobStatus,
            position,
            company,
            mode,
            salary: editableSalary ?? undefined,
            link: editableLink ?? undefined,
            applied_date: editableDate? new Date(editableDate) : undefined
        }
            const {data, error} = applicationSchema.safeParse(formData);

            if(data){
                const updateJob: JobEntry = {
                    id:id,
                    ...formData,
                    status: formData.status as enumJobStatus,
                    applied_date: formData.applied_date?.toISOString().split('T')[0] ?? undefined
                }
                await dbUpdateJob(updateJob)
                jobData.update(updateJob)
                editDataMode = false;
            }
            else{
               throw new Error(error.message)
            }
    }

    const handleBadgeChange = (newStatus:enumJobStatus) => {
        const job = {...application, status:newStatus}
        dbUpdateJob(job)
        jobData.update(job)
        editDataMode = false;
    }

    const handleDelete = async() =>{
        //add proper error handling
        await dbDeleteJob(id)
        jobData.remove(id)
        showDetail = false;
    }

</script>

<Modal bind:isOpen = {showDetail} backgroundColor={jobStyle.styles.background}>
    <div class="flex flex-col aspect-[1/1.5] w-[260px] md:w-[300px] lg:w-[450px] max-w-full">
        <div class="flex flex-col justify-center items-center md:gap-6 w-full">
            <img src={jobStyle.icon} alt={`${status} icon status`} class="brightness-80 w-24 md:w-26 lg:w-32"/>
            <div class="w-full max-w-full flex flex-col items-center justify-center">
                {#if !editDataMode}
                <span class="block font-rosarivo text-center text-wrap text-lg md:text-2xl lg:text-xl text-text-darker">{company}</span>              
                {:else}
                <input class="block font-rosarivo text-center text-wrap text-lg md:text-2xl lg:text-xl text-text-darker" bind:value={company}/>               
                {/if}
                <p class="min-w-10 max-w-full font-rosarivo text-center text-wrap wrap-break-word text-lg md:text-2xl lg:text-xl">{jobStyle.figureName}</p>
            </div>
        </div>
        <div class="absolute top-4 left-4">
            <button class="button-invisible p-0 relative" onclick={()=>{editStatusFlag = !editStatusFlag}}>
                <BadgeStatus status={status as enumJobStatus} />   
                {#if editStatusFlag}
                    <BadgeStatusChanger state={status} callback={handleBadgeChange} jobStyle={jobStyle}></BadgeStatusChanger>
                {/if}
            </button>
        </div>  
        <div class="mt-8 xl:mt-3 flex flex-col gap-5 md:gap-6 xl:gap-2">              
                <div>                    
                    {#if !editDataMode && position}
                    <span class="ml-2 md:ml-3 md:text-lg text-text-darker">{position}</span>
                    {:else if !editDataMode}
                    <span class="ml-2 md:ml-3 md:text-lg lg:text-base text-text-darker">unknown</span>
                    {:else}
                    <input class="ml-2 md:ml-3 md:text-lg lg:text-base text-text-darker" bind:value={position} />
                    {/if}
                </div>
                <div>
                    <img src="/img/icon-mode.png" alt="work mode icon"  class="w-8 md:w-9 inline" />
                    {#if !editDataMode}
                        <span class="ml-2 md:ml-3 text-text md:text-lg lg:text-base">{mode? `${mode}`:'Unkown'}</span>
                    {:else}
                        <input class="ml-2 md:ml-3 text-text md:text-lg lg:text-base" bind:value={mode} />
                    {/if}
                </div>
                <div>
                    <img src="/img/icon-salary.png" alt="salary icon"  class="w-8 md:w-9 inline" />
                    {#if !editDataMode}
                        <span class="ml-2 md:ml-3 text-text md:text-lg lg:text-base">
                            { 
                                salary ? Number(salary).toLocaleString('es-ES')+" €" : "unknown"
                            }
                        </span>
                    {:else}
                        <input type="number" class="ml-2 md:ml-3 text-text md:text-lg lg:text-base" bind:value={editableSalary} />
                    {/if}
                </div>
                <div>
                    <img src="/img/icon-date.png" alt="added date icon"  class="w-8 md:w-9 inline" />
                    {#if !editDataMode}
                        <span class="ml-2 md:ml-3 text-text md:text-lg lg:text-base">
                            {
                                applied_date ?
                                    `${applied_date.getDate().toString().padStart(2,"0")}/${(applied_date.getMonth() + 1).toString().padStart(2,"0")}/${applied_date.getFullYear()}`
                                :
                                    `No date`  
                            }
                        </span>
                    {:else}
                        <input
                        class="ml-2 md:ml-3 text-text md:text-lg lg:text-base"
                        type="date"                         
                        name="input-date"                                          
                        max={new Date().toISOString().split('T')[0]}
                        min={new Date().getFullYear()}
                        bind:value={editableDate}
                    />
                    {/if}
                </div>
                <div>
                    <img src="/img/icon-link.png" alt="added date icon"  class="w-8 md:w-9 inline" />
                    {#if !editDataMode && link}
                        <a href={link} class="ml-2 md:ml-3 text-text md:text-lg lg:text-base">Link to offer</a>
                    {:else if !editDataMode}
                        <span class="ml-2 md:ml-3 text-text md:text-lg lg:text-base">No link recorded</span>
                    {:else if editDataMode}
                        <input class="ml-2 md:ml-3 text-text md:text-lg lg:text-base" bind:value={editableLink} />
                    {/if}
                </div>     
        </div>
        <div class="mt-12 w-full flex gap-3">
            {#if editDataMode == false}
            <button 
                class={`grow flex items-center justify-center gap-1 w-1/2 button-outlined ${jobStyle.styles.background}`}
                onclick={()=> editDataMode = true}
            >
                <img src="/img/icon-edit.png" 
                    class="w-[25px] h-[25px]" 
                    alt="edit button icon"
                />
                <span>
                    Edit
                </span> 
            </button>
            {:else}
            <button 
                class={`grow flex items-center justify-center gap-1 w-1/2 button-outlined ${jobStyle.styles.background}`}
                onclick={handleModify}
            >
                <img src="/img/icon-edit.png" 
                    class="w-[25px] h-[25px]" 
                    alt="apply changes button icon"
                />
                <span>
                    Apply changes
                </span> 
            </button>
            {/if}
            <DeleteJobApplication id={id} handleDelete={handleDelete}/>           
        </div>
       <div class={`overlay-noise opacity-25 pointer-events-none`}></div>
    </div>
</Modal>

<style>
    input::-webkit-calendar-picker-indicator{
        display: none;
    }
</style>