import { last } from "lodash";
import { find } from "lodash";

type Season = {
    id: number;
    name: string;
    slug: string;
    color: string;
    notation: string;
    release: Date;
};

const SEASONS: Season[] = [
    // Year 1
    {
        id: 1,
        name: "Black Ice",
        slug: "black-ice",
        color: "#2E93B3",
        notation: "Y1S1",
        release: new Date("February 2, 2016"),
    },
    {
        id: 2,
        name: "Dust Line",
        slug: "dust-line",
        color: "#D0A344",
        notation: "Y1S2",
        release: new Date("May 10, 2016"),
    },
    {
        id: 3,
        name: "Skull Rain",
        slug: "skull-rain",
        color: "#47893B",
        notation: "Y1S3",
        release: new Date("August 2, 2016"),
    },
    {
        id: 4,
        name: "Red Crow",
        slug: "red-crow",
        color: "#BD1E2C",
        notation: "Y1S4",
        release: new Date("November 17, 2016"),
    },

    // Year 2
    {
        id: 5,
        name: "Velvet Shell",
        slug: "velvet-shell",
        color: "#723093",
        notation: "Y2S1",
        release: new Date("February 7, 2017"),
    },
    {
        id: 6,
        name: "Health",
        slug: "health",
        color: "#4E76A5",
        notation: "Y2S2",
        release: new Date("June 7, 2017"),
    },
    {
        id: 7,
        name: "Blood Orchid",
        slug: "blood-orchid",
        color: "#C6382C",
        notation: "Y2S3",
        release: new Date("September 5, 2017"),
    },
    {
        id: 8,
        name: "White Noise",
        slug: "white-noise",
        color: "#126345",
        notation: "Y2S4",
        release: new Date("December 5, 2017"),
    },

    // Year 3
    {
        id: 9,
        name: "Chimera",
        slug: "chimera",
        color: "#FFC113",
        notation: "Y3S1",
        release: new Date("March 6, 2018"),
    },
    {
        id: 10,
        name: "Para Bellum",
        slug: "para-bellum",
        color: "#949D47",
        notation: "Y3S2",
        release: new Date("June 7, 2018"),
    },
    {
        id: 11,
        name: "Grim Sky",
        slug: "grim-sky",
        color: "#8BA0BB",
        notation: "Y3S3",
        release: new Date("September 4, 2018"),
    },
    {
        id: 12,
        name: "Wind Bastion",
        slug: "wind-bastion",
        color: "#A48657",
        notation: "Y3S4",
        release: new Date("December 4, 2018"),
    },

    // Year 4
    {
        id: 13,
        name: "Burnt Horizon",
        slug: "burnt-horizon",
        color: "#E20144",
        notation: "Y4S1",
        release: new Date("March 6, 2019"),
    },
    {
        id: 14,
        name: "Phantom Sight",
        slug: "phantom-sight",
        color: "#304395",
        notation: "Y4S2",
        release: new Date("June 11, 2019"),
    },
    {
        id: 15,
        name: "Ember Rise",
        slug: "ember-rise",
        color: "#156309",
        notation: "Y4S3",
        release: new Date("September 11, 2019"),
    },
    {
        id: 16,
        name: "Shifting Tides",
        slug: "shifting-tides",
        color: "#089EB3",
        notation: "Y4S4",
        release: new Date("December 3, 2019"),
    },

    // Year 5
    {
        id: 17,
        name: "Void Edge",
        slug: "void-edge",
        color: "#946A97",
        notation: "Y5S1",
        release: new Date("March 10, 2020"),
    },
    {
        id: 18,
        name: "Steel Wave",
        slug: "steel-wave",
        color: "#2B7F9B",
        notation: "Y5S2",
        release: new Date("June 16, 2020"),
    },
    {
        id: 19,
        name: "Shadow Legacy",
        slug: "shadow-legacy",
        color: "#6CA511",
        notation: "Y5S3",
        release: new Date("September 10, 2020"),
    },
    // {
    //     id: 20,
    //     name: 'Neon Dawn',
    //     slug: 'neon-dawn',
    //     color: '#D14007',
    //     notation: 'Y5S4',
    //     release: new Date('...')
    // }
];

export class Seasons {
    static readonly all: Season[] = SEASONS;
    static readonly latest: Season = last(SEASONS)!;
    static readonly latestId: number = last(SEASONS)!.id;

    static findBySlug(seasonSlug: string): Season {
        const result = find(SEASONS, { slug: seasonSlug });
        if (result) {
            return result;
        }
        throw new Error(`Could not find any season with provided slug [${seasonSlug}]`);
    }

    static findByNotation(seasonNotation: string): Season {
        const result = find(SEASONS, { notation: seasonNotation });
        if (result) {
            return result;
        }
        throw new Error(`Could not find any season with provided notation [${seasonNotation}]`);
    }
}
