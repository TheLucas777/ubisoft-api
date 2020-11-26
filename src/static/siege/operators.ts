import { Primary, Secondary } from "./weapons";
import { filter, find } from "lodash";

enum Position {
    ATTACKER = "attacker",
    DEFENDER = "defender",
}

enum Role {
    // Should sort
    ANCHOR = "anchor",
    COVERING_FIRE = "covering-fire",
    INTEL_GATHERER = "intel-gatherer",
    INTEL_DENIER = "intel-denier",
    AREA_DENIAL = "area-denial",
    FRONT_LINE = "front-line",
    BACK_LINE = "back-line",
    SECURE = "secure",

    // Defenders
    TRAP = "trap",
    ROAM = "roam",
    FLANK = "flank",
    ANTI_HARD_BREACH = "anti-hard-breach",

    // Attackers
    HARD_BREACH = "hard-breach",
    SOFT_BREACH = "soft-breach",
    DISABLE = "disable", // Disabling defender gadgets

    // Both Attackers and Defenders
    SHIELD = "shield",
    ANTI_ROAM = "anti-roam",
    BUFF = "buff", // Rook, Doc and Finka (for now)
    CROWD_CONTROL = "crowd-control",
}

enum Gadget {
    // Placable (Attackers)
    BREACH_CHARGE = "breach-charge",
    CLAYMORE = "claymore",
    SECONDARY_BREACHER = "secondary-breacher",

    // Throwable (Attackers)
    FRAG_GRENADE = "frag-grenade",
    STUN_GRENADE = "stun-grenade",
    SMOKE_GRENADE = "smoke-grenade",

    // Placable (Defenders)
    DEPLOYABLE_SHIELD = "deployable-shield",
    BARBED_WIRE = "barbed-wire",
    BULLETPROOF_CAMERA = "bulletproof-camera",

    // Throwable (Defenders)
    NITRO_CELL = "nitro-cell",
    PROXIMITY_ALARM = "proximity-alarm",
    IMPACT_GRENADE = "impact-grenade",
}

type SiegeOperator = {
    /**
     * @description Ubisoft unique identifier of the operator (Uses in old API calls)
     */
    // index: string;

    /**
     * @description Name could contain non-english letters like "Jäger"
     */
    name: string;

    /**
     * @description A URL friendly string from operator's name which can be used in routing of your web app
     */
    slug: string;
    position: Position;
    loadouts: {
        primary: Primary[];
        secondary: Secondary[];
        gadgets: Gadget[];
        ability: string;
    };
    roles: Role[];

    // TODO: remove optional and fill the fields
    armor?: 1 | 2 | 3;
    speed?: 1 | 2 | 3;
    profile?: {
        // TODO: add organization

        /**
         * @description Unit: Centimeter
         */
        height: number;

        /**
         * @description Unit: Kilogram
         */
        weight: number;

        /**
         * @description first name and last name
         */
        realName: string;

        birthDate: Date;
    };
};

const OPERATORS: SiegeOperator[] = [
    // SAS Attack
    {
        name: "Sledge",
        slug: "sledge",
        position: Position.ATTACKER,
        loadouts: {
            primary: [Primary.L85A2, Primary.M590A1],
            secondary: [Secondary.P226_MK_25, Secondary.SMG_11],
            gadgets: [Gadget.FRAG_GRENADE, Gadget.STUN_GRENADE],
            ability: "tactical-breaching-hammer",
        },
        roles: [Role.FLANK, Role.SOFT_BREACH],
        armor: 2,
        speed: 2,
        profile: {
            height: 192,
            weight: 95,
            realName: "Seamus Cowden",
            birthDate: new Date("2 April 1982"),
        },
    },
    {
        name: "Thatcher",
        slug: "thatcher",
        position: Position.ATTACKER,
        loadouts: {
            primary: [Primary.AR33, Primary.L85A2, Primary.M590A1],
            secondary: [Secondary.P226_MK_25],
            gadgets: [Gadget.BREACH_CHARGE, Gadget.CLAYMORE],
            ability: "emp-grenade",
        },
        roles: [Role.BACK_LINE, Role.DISABLE],
    },

    // SAS Defend
    {
        name: "Smoke",
        slug: "smoke",
        position: Position.DEFENDER,
        loadouts: {
            primary: [Primary.M590A1, Primary.FMG_9],
            secondary: [Secondary.P226_MK_25, Secondary.SMG_11],
            gadgets: [Gadget.DEPLOYABLE_SHIELD, Gadget.BARBED_WIRE],
            ability: "remote-gas-grenade",
        },
        roles: [Role.ANCHOR, Role.AREA_DENIAL, Role.SECURE],
    },
    {
        name: "Mute",
        slug: "mute",
        position: Position.DEFENDER,
        loadouts: {
            primary: [Primary.MP5K, Primary.M590A1],
            secondary: [Secondary.P226_MK_25, Secondary.SMG_11],
            gadgets: [Gadget.BULLETPROOF_CAMERA, Gadget.NITRO_CELL],
            ability: "signal-disruptor",
        },
        roles: [Role.ANTI_HARD_BREACH, Role.INTEL_DENIER, Role.SECURE],
    },

    // FBI Attack
    {
        name: "Ash",
        slug: "ash",
        position: Position.ATTACKER,
        loadouts: {
            primary: [Primary.G36C, Primary.R4_C],
            secondary: [Secondary._5_7_USG, Secondary.M45_MEUSOC],
            gadgets: [Gadget.BREACH_CHARGE, Gadget.STUN_GRENADE],
            ability: "breaching-rounds",
        },
        roles: [Role.DISABLE, Role.FLANK, Role.FRONT_LINE, Role.SOFT_BREACH],
    },
    {
        name: "Thermite",
        slug: "thermite",
        position: Position.ATTACKER,
        loadouts: {
            primary: [Primary.M1014, Primary._556XI],
            secondary: [Secondary._5_7_USG, Secondary.M45_MEUSOC],
            gadgets: [Gadget.CLAYMORE, Gadget.STUN_GRENADE],
            ability: "exothermic-charge",
        },
        roles: [Role.BACK_LINE, Role.HARD_BREACH],
    },

    // FBI Defend
    {
        name: "Castle",
        slug: "castle",
        position: Position.DEFENDER,
        loadouts: {
            primary: [Primary.UMP45, Primary.M1014],
            secondary: [Secondary._5_7_USG, Secondary.SUPER_SHORTY],
            gadgets: [Gadget.PROXIMITY_ALARM, Gadget.IMPACT_GRENADE],
            ability: "armor-panel",
        },
        roles: [Role.ANCHOR, Role.SECURE],
    },
    {
        name: "Pulse",
        slug: "pulse",
        position: Position.DEFENDER,
        loadouts: {
            primary: [Primary.UMP45, Primary.M1014],
            secondary: [Secondary._5_7_USG, Secondary.M45_MEUSOC],
            gadgets: [Gadget.BARBED_WIRE, Gadget.NITRO_CELL],
            ability: "heartbeat-sensor",
        },
        roles: [Role.INTEL_GATHERER, Role.ROAM],
    },

    // GIGN Attack
    {
        name: "Twitch",
        slug: "twitch",
        position: Position.ATTACKER,
        loadouts: {
            primary: [Primary.F2, Primary._417, Primary.SG_CQB],
            secondary: [Secondary.P9, Secondary.LFP586],
            gadgets: [Gadget.BREACH_CHARGE, Gadget.CLAYMORE],
            ability: "shock-drones",
        },
        roles: [Role.BACK_LINE, Role.DISABLE, Role.FRONT_LINE, Role.INTEL_GATHERER],
    },
    {
        name: "Montagne",
        slug: "montagne",
        position: Position.ATTACKER,
        loadouts: {
            primary: [Primary.LE_ROCK_SHIELD],
            secondary: [Secondary.P9, Secondary.LFP586],
            gadgets: [Gadget.SECONDARY_BREACHER, Gadget.SMOKE_GRENADE],
            ability: "le-rock-shield",
        },
        roles: [Role.SHIELD],
    },

    // GIGN Defend
    {
        name: "Doc",
        slug: "doc",
        position: Position.DEFENDER,
        loadouts: {
            primary: [Primary.MP5, Primary.P90, Primary.SG_CQB],
            secondary: [Secondary.P9, Secondary.LFP586],
            gadgets: [Gadget.BULLETPROOF_CAMERA, Gadget.BARBED_WIRE],
            ability: "stim-pistol",
        },
        roles: [Role.ANCHOR, Role.BUFF],
    },
    {
        name: "Rook",
        slug: "rook",
        position: Position.DEFENDER,
        loadouts: {
            primary: [Primary.MP5, Primary.P90, Primary.SG_CQB],
            secondary: [Secondary.P9, Secondary.LFP586],
            gadgets: [Gadget.PROXIMITY_ALARM, Gadget.IMPACT_GRENADE],
            ability: "armor-pack",
        },
        roles: [Role.ANCHOR, Role.BUFF],
    },

    // Spetsnaz Attack
    {
        name: "Glaz",
        slug: "glaz",
        position: Position.ATTACKER,
        loadouts: {
            primary: [Primary.OTS_3],
            secondary: [Secondary.PMM, Secondary.GSH_18],
            gadgets: [Gadget.SMOKE_GRENADE, Gadget.FRAG_GRENADE],
            ability: "flip-sight",
        },
        roles: [Role.BACK_LINE, Role.COVERING_FIRE, Role.SOFT_BREACH],
    },
    {
        name: "Fuze",
        slug: "fuze",
        position: Position.ATTACKER,
        loadouts: {
            primary: [Primary.AK_12, Primary._6P41, Primary.BALLISTIC_SHIELD],
            secondary: [Secondary.PMM, Secondary.GSH_18],
            gadgets: [Gadget.BREACH_CHARGE, Gadget.SECONDARY_BREACHER],
            ability: "cluster-charge",
        },
        roles: [Role.AREA_DENIAL, Role.DISABLE, Role.FLANK],
    },

    // Spetsnaz Defend
    {
        name: "Kapkan",
        slug: "kapkan",
        position: Position.DEFENDER,
        loadouts: {
            primary: [Primary._9X19VSN, Primary.SASG_12],
            secondary: [Secondary.PMM, Secondary.GSH_18],
            gadgets: [Gadget.IMPACT_GRENADE, Gadget.NITRO_CELL],
            ability: "entry-denial-device",
        },
        roles: [Role.TRAP],
    },
    {
        name: "Tachanka",
        slug: "tachanka",
        position: Position.DEFENDER,
        loadouts: {
            primary: [Primary.DP27, Primary._9X19VSN],
            secondary: [Secondary.PMM, Secondary.GSH_18],
            gadgets: [Gadget.BARBED_WIRE, Gadget.PROXIMITY_ALARM],
            ability: "shumikha-launcher",
        },
        roles: [Role.ANCHOR, Role.COVERING_FIRE],
    },

    // GSG 9 Attack
    {
        name: "Blitz",
        slug: "blitz",
        position: Position.ATTACKER,
        loadouts: {
            primary: [Primary.G52_TACTICAL_SHIELD],
            secondary: [Secondary.P12],
            gadgets: [Gadget.SMOKE_GRENADE, Gadget.BREACH_CHARGE],
            ability: "flash-shield",
        },
        roles: [Role.ANTI_ROAM, Role.CROWD_CONTROL, Role.FRONT_LINE, Role.SHIELD],
    },
    {
        name: "IQ",
        slug: "iq",
        position: Position.ATTACKER,
        loadouts: {
            primary: [Primary.AUG_A2, Primary._552_COMMANDO, Primary.G8A1],
            secondary: [Secondary.P12],
            gadgets: [Gadget.BREACH_CHARGE, Gadget.CLAYMORE],
            ability: "electronics-detector",
        },
        roles: [Role.DISABLE, Role.FLANK, Role.FRONT_LINE, Role.INTEL_GATHERER],
    },

    // GSG 9 Defend
    {
        name: "Jäger",
        slug: "jager",
        position: Position.DEFENDER,
        loadouts: {
            primary: [Primary.M870, Primary._416_C_CARBINE],
            secondary: [Secondary.P12],
            gadgets: [Gadget.BARBED_WIRE, Gadget.BULLETPROOF_CAMERA],
            ability: "active-defense-system",
        },
        roles: [Role.ROAM, Role.SECURE],
    },
    {
        name: "Bandit",
        slug: "bandit",
        position: Position.DEFENDER,
        loadouts: {
            primary: [Primary.MP7, Primary.M870],
            secondary: [Secondary.P12],
            gadgets: [Gadget.BARBED_WIRE, Gadget.NITRO_CELL],
            ability: "shock-wire",
        },
        roles: [Role.ANTI_HARD_BREACH, Role.ROAM, Role.SECURE],
    },

    // JTF2 Attack
    {
        name: "Buck",
        slug: "buck",
        position: Position.ATTACKER,
        loadouts: {
            primary: [Primary.C8_SFW, Primary.CAMRS],
            secondary: [Secondary.MK1_9MM],
            gadgets: [Gadget.CLAYMORE, Gadget.STUN_GRENADE],
            ability: "skeleton-key",
        },
        roles: [Role.FLANK, Role.SOFT_BREACH],
    },

    // JTF2 Defend
    {
        name: "Frost",
        slug: "frost",
        position: Position.DEFENDER,
        loadouts: {
            primary: [Primary.SUPER_90, Primary._9MM_C1],
            secondary: [Secondary.MK1_9MM, Secondary.ITA12S],
            gadgets: [Gadget.BULLETPROOF_CAMERA, Gadget.DEPLOYABLE_SHIELD],
            ability: "welcome-mate", // I'm aware that it's welcome "mat", not sure why Ubisoft API returns "mate"
        },
        roles: [Role.CROWD_CONTROL, Role.TRAP],
    },

    // Navy SEALs Attack
    // TODO: Blackbeard

    // Navy SEALs Defend
    // TODO: Valkyrie

    // BOPE Attack
    // TODO: Capitao

    // BOPE Defend
    // TODO: Caveira

    // SAT Attack
    // TODO: Hibana

    // SAT Defend
    // TODO: Echo

    // GEO Attack
    // TODO: Jackal

    // GEO Defend
    // TODO: Mira

    // SDU Attack
    // TODO: Ying

    // SDU Defend
    // TODO: Lesion

    // GROM Attack
    // TODO: Zofia

    // GROM Defend
    // TODO: Ela

    // 707th SMB Attack
    // TODO: Dokkaebi

    // 707th SMB Defend
    // TODO: Vigil

    // CBRN Attack
    // TODO: Lion
    // TODO: Finka

    // GIS Defend
    // TODO: Maestro
    // TODO: Alibi

    // GSUTR Attack
    // TODO: Maverick

    // GSUTR Defend
    // TODO: Clash

    // GIGR Attack
    // TODO: Nomad

    // GIGR Defend
    // TODO: Kaid

    // SASR Attack
    // TODO: Gridlock

    // SASR Defend
    // TODO: Mozzie

    // Jaeger Corps Attack
    // TODO: Nokk

    // Secret Service Defend
    // TODO: Warden

    // APCA Attack
    // TODO: Amaru

    // FES Defend
    // TODO: Goyo

    // NIGHTHAVEN Attack
    // TODO: Kali

    // NIGHTHAVEN Defend
    // TODO: Wamai

    // REU Attack
    // TODO: Iana

    // GIGR (unofficially) Defend
    // TODO: Oryx

    // NIGHTHAVEN Attack
    // TODO: Ace

    // ITF Defend
    // TODO: Melusi

    // ROS Attack
    // TODO: Zero

    // NIGHTHAVEN Defend
    // TODO: Aruni

    // {
    // 	name: '',
    // 	slug: '',
    //     position: Position.ATTACKER,
    //     loadouts: {
    //         primary: [],
    //         secondary: [],
    //         gadgets: [],
    //         ability: '',
    //     },
    //     roles: [],
    // },
    // {
    // 	name: '',
    // 	slug: '',
    //     position: Position.DEFENDER,
    //     loadouts: {
    //         primary: [],
    //         secondary: [],
    //         gadgets: [],
    //         ability: '',
    //     },
    //     roles: [],
    // },
];

export class Operators {
    static readonly attackers: SiegeOperator[] = filter(OPERATORS, { position: Position.ATTACKER });
    static readonly defenders: SiegeOperator[] = filter(OPERATORS, { position: Position.DEFENDER });

    static findBySlug(slug: string): SiegeOperator {
        const result = find(OPERATORS, { slug: slug });
        if (result) {
            return result;
        }
        throw new Error(`Could not find any operator with provided slug [${slug}]`);
    }
}
