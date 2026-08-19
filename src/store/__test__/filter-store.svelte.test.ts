import {describe, it, expect, beforeAll} from "vitest";
import type { JobEntry, Job } from "@data/types"
import { enumJobStatus, enumSortModes } from "@data/enum"
import { 
    applyFiltersAndSort, 
    filterStates, 
    isAllFiltersOff, 
    filterByQueryText, 
    containsQueryText 
} from "@store/filter-store.svelte";

const jobEntries:JobEntry[] = [
    {
        id: 1,
        status: enumJobStatus.applied,
        company:"The Highest paying company",
        position: "Front End Developer",
        mode: "remoto",
        salary: 35000,
        link: "https://www.google.com",
        notes: "Parece interesante",
        applied_date: "2026-06-01"
    },
    {
        id: 2,
        status: enumJobStatus.ghosted,
        company:"The Oldest Company",
        position: "Analyst",
        mode: "híbrido",
        salary: 32000,
        notes: "Dijeron que llamarían",
        applied_date: "1992-05-21"
    },
    {
        id: 3,
        status: enumJobStatus.applied,
        company:"The Good Company",
        position: "Web Content Manager",
        salary: 27000,
        applied_date: "2026-04-12"
    },
    {
        id: 4,
        status: enumJobStatus.offer,
        company:"The Lost Company",
        position: "Archive Clerk",
        applied_date: "2026-03-18"
    },
    {
        id: 5,
        status: enumJobStatus.offer,
        company:"The Lowest paying Company",
        position: "Archive Clerk",
        salary:1,
        applied_date: "2026-03-18"
    }
]

describe("Sort functions", ()=>{
    beforeAll(()=>{
        filterStates.showOffer = true,
        filterStates.showApplied = true,
        filterStates.showRejected = true,
        filterStates.showInterview = true,
        filterStates.showGhosted = true,
        filterStates.showAccepted = true,
        filterStates.sortBy = enumSortModes.default,
        filterStates.isAscendent = false
    })
    it("Sorted from highest salary", ()=>{
        filterStates.sortBy = enumSortModes.salary;
        filterStates.isAscendent = false;

        const filtered = applyFiltersAndSort(jobEntries)
        expect(filtered[0].company).toBe("The Highest paying company")
    })
    it("Sorted from lowest salary", ()=>{
        filterStates.sortBy = enumSortModes.salary;
        filterStates.isAscendent = true;

        const filtered = applyFiltersAndSort(jobEntries)
        expect(filtered[0].salary).toBe(1)
    })
    it("Sorted from oldest date", ()=>{
        filterStates.sortBy = enumSortModes.date;
        filterStates.isAscendent = true;

        const filtered = applyFiltersAndSort(jobEntries)
        expect(filtered[0].company).toBe("The Oldest Company")
    })
    it("Sorted from state alphabetically", ()=>{
        filterStates.sortBy = enumSortModes.status;
        filterStates.isAscendent = true;

        const filtered = applyFiltersAndSort(jobEntries)
        expect(filtered[0].status).toBe(enumJobStatus.applied)
        expect(filtered[1].status).toBe(enumJobStatus.applied)
        expect(filtered[2].status).toBe(enumJobStatus.ghosted)
        expect(filtered[3].status).toBe(enumJobStatus.offer)
        expect(filtered[4].status).toBe(enumJobStatus.offer)
    })
    it("Default sorting by id", ()=>{
        filterStates.sortBy = enumSortModes.default;
        const filtered = applyFiltersAndSort(jobEntries)
        expect(filtered).toEqual(jobEntries)
    })
})

describe("Query JobEntries by text", ()=>{
    it("Returns true if any string in the array matches any string value in the JobEntry", ()=>{
        const query = ["oldest","tomato","fruit","momo"];
        expect(containsQueryText(query, jobEntries[1])).toBe(true)
    })

    it("Returns a JobEntry[] where any element property matches any word in the given string", ()=>{
        const query = "Highest potato loWest"
        const filtered = filterByQueryText(query, jobEntries)
        expect(filtered.length).equal(2);
        expect(filtered[0].company).toBe("The Highest paying company");
        expect(filtered[1].company).toBe("The Lowest paying Company");
    })
})

describe("Filter functions", ()=>{
    beforeAll(()=>{
        filterStates.showOffer = false,
        filterStates.showApplied = false,
        filterStates.showRejected = false,
        filterStates.showInterview = false,
        filterStates.showGhosted = false,
        filterStates.showAccepted = false,
        filterStates.sortBy = enumSortModes.default,
        filterStates.isAscendent = false
    })

    it("Returns true if all filters are turned off", ()=>{
        expect(isAllFiltersOff()).toBe(true)
    })

    it("Returns the array of elements whose status is set true in filterStates", ()=>{
        filterStates.showGhosted = true;
        filterStates.showOffer = true;

        let filtered = applyFiltersAndSort(jobEntries)

        expect(filtered.every(e=>
            e.status === enumJobStatus.ghosted || enumJobStatus.offer
        )).toBe(true)


        filterStates.showGhosted = false;
        filterStates.showOffer = false;

        filtered = applyFiltersAndSort(jobEntries)

        expect(filtered.length).toBe(0)
    })

    it("Returns elements matching text query with all filters on", ()=>{
        filterStates.showOffer = true,
        filterStates.showApplied = true,
        filterStates.showRejected = true,
        filterStates.showInterview = true,
        filterStates.showGhosted = true,
        filterStates.showAccepted = true,
        filterStates.sortBy = enumSortModes.default,
        filterStates.isAscendent = true,
        filterStates.textQuery = "Oldest !!!! >>> good !!!!!!"

        const filtered = applyFiltersAndSort(jobEntries)
        console.table(filtered)
        
        expect(filtered.length).toBe(2)
        expect(filtered[0].company).toBe("The Oldest Company");
        expect(filtered[1].company).toBe("The Good Company");
    })
})


