<script lang="ts">
    import { enumJobStatus } from "@data/enum";
    import { type JobEntry } from "@data/types";
    import { JobStyling } from "@data/jobStates";

    let {status}: {status:enumJobStatus} = $props()
    let borderColor = $derived(JobStyling[status].styles.badge.border)
    let bgColor = $derived(JobStyling[status].styles.badge.background)
    let textStyle = $derived(JobStyling[status].styles.badge.text)

</script>

<div class={`inline-flex items-center justify-center w-25 py-1 rounded-md border ${borderColor} ${bgColor} ${textStyle}`}>
    <p class={`${textStyle} capitalize`}>{JobStyling[status].state}</p>
</div>