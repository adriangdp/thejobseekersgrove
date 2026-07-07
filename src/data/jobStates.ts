import { type JobStylingDictionary } from "@data/types";
import { enumJobStatus } from "@data/enum";

export const JobStyling:JobStylingDictionary = {
    offer:{
        state: enumJobStatus.offer,
        figureName:"Eye",
        icon: "/img/icon-no-art-yet.webp",
        styles:{
            color:"color-card-offer",
            background:"bg-card-offer",
            border:"border-card-offer",
            text:"text-card-offer",
            bgGradient:"",
            badge:{
                text:"text-card-offer-lighter",
                border:"border-card-offer-lighter",
                background:"bg-card-offer-darker",
            }
        }
    },

    applied:{
        state: enumJobStatus.applied,
        figureName:"Water",
        icon: "/img/icon-applied.webp",
        styles:{
            color:"color-card-applied",
            background:"bg-card-applied",
            border:"border-card-applied",
            text:"text-card-applied",
            bgGradient:"bg-radial-[at_50%_35%] from-card-applied/55 to-card-applied/75 to-40% brightness-65",
            badge:{
                text:"text-card-applied-lighter",
                border:"border-card-applied-lighter",
                background:"bg-card-applied-darker",
            }
        }
    },
    rejected:{
        state: enumJobStatus.rejected,
        figureName:"Broken Pot",
        icon: "/img/icon-no-art-yet.webp",
        styles:{
            color:"color-card-rejected",
            background:"bg-card-rejected",
            border:"border-card-rejected",
            text:"text-card-rejected",
            bgGradient:"bg-radial-[at_50%_35%] from-card-rejected/45 to-card-rejected/65 to-40% brightness-65",
            badge:{
                text:"text-card-rejected-lighter",
                border:"border-card-rejected-lighter",
                background:"bg-card-rejected-darker",
            }
        },
    },
    interview:{
        state: enumJobStatus.interview,
        figureName:"The Fruit",
        icon: "/img/icon-no-art-yet.webp",
        styles:{
            color:"color-card-interview",
            background:"bg-card-interview",
            border:"border-card-interview",
            text:"text-card-interview",
            bgGradient:"bg-radial-[at_50%_35%] from-card-interview/60 to-card-interview/80 to-40% brightness-65",
            badge:{
                text:"text-card-interview-lighter",
                border:"border-card-interview-lighter",
                background:"bg-card-interview-darker",
            }
        }
    },
    ghosted:{        
        state: enumJobStatus.ghosted,
        figureName:"The Ghost",
        icon: "/img/icon-ghost.webp",
        styles:{
            color:"color-card-ghosted",
            background:"bg-card-ghosted",
            border:"border-card-ghosted",
            text:"text-card-ghosted",
            bgGradient:"bg-radial-[at_50%_35%] from-card-ghosted/60 to-card-ghosted/80 to-40% brightness-65",
        badge:{
                text:"text-card-ghosted-lighter",
                border:"border-card-ghosted-lighter",
                background:"bg-card-ghosted-darker",
            }
        }
    },
    accepted:{
        state: enumJobStatus.accepted,
        figureName:"The Growth",
        icon: "/img/icon-no-art-yet.webp",
        styles:{
            color:"color-card-accepted",
            background:"bg-card-accepted",
            border:"border-card-accepted",
            text:"text-card-accepted",
            bgGradient:"bg-radial-[at_50%_35%] from-card-accepted/60 to-card-accepted/80 to-40% brightness-65",
        badge:{
                text:"text-card-accepted-lighter",
                border:"border-card-accepted-lighter",
                background:"bg-card-accepted-darker",
            }
        }
    }
}