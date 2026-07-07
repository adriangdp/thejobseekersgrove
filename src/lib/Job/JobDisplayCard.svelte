<script lang="ts">
    import { type JobEntry, type JobStyle } from "@data/types"
    import { JobStyling } from "@data/jobStates";
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
</script>    

<button onclick={()=>showDetail = true}
    class={`relative w-full aspect-1/1.5 md:aspect-1/2 overflow-hidden ${jobStyle.styles.background} rounded-md`}
    >
    <div class={`w-full h-full px-5 py-4 lg:py-12 lg:px-6 rounded-xs border-3 ${jobStyle.styles.badge.border}`}>
        <div class="relative w-full lg:mb-10 mx-auto h-1/3 md:h-1/3 flex flex-col md:justify-center">
            <img src={jobStyle.icon} alt="" aria-hidden="true"
                class="mx-auto w-24 md:w-26 lg:w-32 brightness-80"/>
            <div class="mt-2">
                <strong class="text-base md:text-xl text-center inline"> {JobStyling[status].figureName}</strong>
            </div>            
        </div>
        <div class="z-20 relative mt-8 md:mt-4 lg:mt-4 w-full">
            <div class="w-full flex flex-col items-center">
                <span class="w-full text-xs md:text-base truncate text-text-darker">{company}</span>
                <span class="w-full text-xs md:text-base truncate text-text-darker">{position}</span>
            </div>
            <div class="w-full flex flex-col items-start mt-5 md:mt-8 lg:mt-5 gap-1 md:gap-4 lg:gap-3">
                <div>
                    <img src="/img/icon-mode.png" alt="" aria-hidden="true" class="w-6 md:w-9 inline" />
                    <span class="ml-2 md:ml-3 text-xs md:text-base">{mode}</span>
                </div>
                <div>
                    <img src="/img/icon-salary.png" alt="" aria-hidden="true"  class="w-6 md:w-9 inline" />
                    <span class="ml-2 md:ml-3 text-xs md:text-base">
                        { 
                            salary ? Number(salary).toLocaleString('es-ES')+" €" : "unknown"
                        }
                    </span>
                </div>
                <div>
                    <img src="/img/icon-date.png" alt="" aria-hidden="true"  class="w-5 md:w-9 inline" />
                    <span class="ml-2 md:ml-3 text-xs md:text-base">
                        {
                            applied_date ?
                                `${applied_date.getDate().toString().padStart(2,"0")}/${(applied_date.getMonth() + 1).toString().padStart(2,"0")}/${applied_date.getFullYear()}`
                            :
                                `No date`           
                        }
                    </span>
                </div>                
            </div>
        </div>
    </div>
    <div class={`overlay-noise opacity-35 pointer-events-none`}></div>

    <!--
    <div class={`w-full h-full absolute top-0 left-0 ${jobStyle.styles.bgGradient} mix-blend-overlay`}>
    </div>
    -->

    </button>