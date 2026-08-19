<script lang="ts">
    import { type JobEntry, type JobStyle } from "@data/types"
    import BadgeStatus from "@lib/common/BadgeStatus.svelte";
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
    let rowStyleString = `border py-3 px-5 border-accent-outer text-sm md:text-base text-center min-w-40 ${jobStyle.styles.badge.background}`
</script>

<tr onclick={()=>showDetail = true} class="cursor-pointer">
        <td class={rowStyleString + ' capitalize'}>
            {jobStyle.state}
        </td>
        <td class={rowStyleString}>{position}</td>
        <td class={rowStyleString}>{company}</td>
        <td class={rowStyleString}>{mode}</td>
        <td class={rowStyleString}>{salary}</td>
        <td class={rowStyleString}><a href={link}> Offer site </a></td>
        <td class={rowStyleString}>
            {
                applied_date ?
                    `${applied_date.getDate().toString().padStart(2,"0")}/${(applied_date.getMonth() + 1).toString().padStart(2,"0")}/${applied_date.getFullYear()}`
                :
                    `No date`   
            }
        </td>
    </tr>