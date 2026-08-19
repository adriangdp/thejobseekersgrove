import type { JobEntry, Job } from "@data/types"
import { enumJobStatus, enumSortModes } from "@data/enum"

export const filterStates = $state({
    showOffer: true,
    showApplied: true,
    showRejected: true,
    showInterview: true,
    showGhosted: true,
    showAccepted: true,
    sortBy:enumSortModes.default,
    isAscendent: false,
    textQuery:undefined as string | undefined
})


export const isAllFiltersOff = ():boolean =>{
    return !filterStates.showRejected &&
    !filterStates.showApplied &&
    !filterStates.showInterview &&
    !filterStates.showOffer &&
    !filterStates.showAccepted &&
    !filterStates.showGhosted
}

export const applyFiltersAndSort = (dataJobs:JobEntry[]):JobEntry[] =>{
    if(dataJobs.length <= 0){
        return [];
    }
    let jobs = [...dataJobs];
    if(filterStates.textQuery != undefined){
        jobs = filterByQueryText(filterStates.textQuery, jobs);
    }    
    jobs = filterByStatus(jobs);
    jobs = sortByModes(jobs);
    return jobs;
}

export const filterByQueryText = (query:string, jobs:JobEntry[]):JobEntry[] =>{
    const cleanString = query.toLowerCase().replace(/[\W_]/g," ").replace(/\s+/g, " ").trim();
    const words = cleanString.split(" ");

    return jobs.filter((job) =>{
        return containsQueryText(words, job)
    })
}

export const containsQueryText = (query:string[], job:JobEntry):boolean =>{
    const jobStringProperties = [
        job.company,
        job.position,
        job.mode,
        job.status,
        job.notes
    ].filter(val=> val !== undefined && typeof val === "string" );

    return jobStringProperties.some(jobProp =>{
        if(jobProp === undefined){return false}
        return query.some((q) =>{
            return jobProp.toLowerCase().includes(q)
        })
    });
}

const filterByStatus = (jobs:JobEntry[]):JobEntry[] =>{
    return jobs.filter((a:Job) =>
        a.status === enumJobStatus.offer && filterStates.showOffer ||
        a.status === enumJobStatus.applied && filterStates.showApplied ||
        a.status === enumJobStatus.rejected && filterStates.showRejected ||
        a.status === enumJobStatus.interview && filterStates.showInterview ||                
        a.status === enumJobStatus.ghosted && filterStates.showGhosted ||
        a.status === enumJobStatus.accepted && filterStates.showAccepted
    )
}


const sortByModes = (jobs:JobEntry[]) =>{
    switch(filterStates.sortBy){
        case(enumSortModes.salary) : { return sortBySalary(jobs)}
        case(enumSortModes.status) : { return sortByStatus(jobs)}
        case(enumSortModes.date) : {return sortByDate(jobs)}
        default: return jobs.sort((a,b)=> a.id-b.id)
    }
}

const sortBySalary = (jobs:JobEntry[]):JobEntry[] =>{
    
    return jobs.sort((a,b) =>{
        // Sorting rules for undefined type
        if(!a.salary && !b.salary){
            return 0
        } else if(a.salary?.toString() === "unknown"){
            return 1
        }else if(b.salary?.toString() === "unknown"){
            return -1
        }                  
        // Sorting rules for number type                 
        if(filterStates.isAscendent){
            return Number(a.salary) - Number(b.salary)
        }
        else{
            return Number(b.salary) - Number(a.salary)
        }
    })   
}

const sortByStatus = (jobs:JobEntry[]):JobEntry[] =>{
    return jobs.sort((a,b) =>
        filterStates.isAscendent ? a.status.localeCompare(b.status) : b.status.localeCompare(a.status)
    )
}

const sortByDate = (jobs:JobEntry[]):JobEntry[] =>{
    return jobs.sort((a,b) =>{
        const aDate = a.applied_date ?? "";
        const bDate = b.applied_date ?? "";

        return filterStates.isAscendent? 
            aDate.localeCompare(bDate)
        : 
            bDate.localeCompare(aDate)

    })
}