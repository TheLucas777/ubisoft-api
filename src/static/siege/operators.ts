import { Primary, Secondary } from './weapons';
import { filter, find } from 'lodash';

enum Position {
    ATTACKER = 'attacker',
    DEFENDER = 'defender',
}

enum Role {
    // Should sort
    ANCHOR = 'anchor',
    COVERING_FIRE = 'covering-fire',
    CROWD_CONTROL = 'crowd-control',
    INTEL_GATHERER = 'intel-gatherer',
    INTEL_DENIER = 'intel-denier',
    AREA_DENIAL = 'area-denial',
    FRONT_LINE = 'front-line',
    BACK_LINE = 'back-line',
    SECURE = 'secure',

    // Defenders
    TRAP = 'trap',
    ROAM = 'roam',
    FLANK = 'flank',
    ANTI_HARD_BREACH = 'anti-hard-breach',

    // Attackers
    HARD_BREACH = 'hard-breach',
    SOFT_BREACH = 'soft-breach',
    DISABLE = 'disable', // Disabling defender gadgets

    // Both Attackers and Defenders
    SHIELD = 'shield',
    ANTI_ROAM = 'anti-roam',
    BUFF = 'buff', // Rook, Doc and Finka (for now)
}

enum Gadget {
    // Placable (Attackers)
    BREACH_CHARGE = 'breach-charge',
    CLAYMORE = 'claymore',

    // Throwable (Attackers)
    FRAG_GRENADE = 'frag-grenade',
    STUN_GRENADE = 'stun-grenade',

    // Placable (Defenders)
    DEPLOYABLE_SHIELD = 'deployable-shield',
    BARBED_WIRE = 'barbed-wire',
    BULLETPROOF_CAMERA = 'bulletproof-camera',

    // Throwable (Defenders)
    NITRO_CELL = 'nitro-cell'
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
        name: 'Sledge',
        slug: 'sledge',
        position: Position.ATTACKER,
        loadouts: {
            primary: [Primary.L85A2, Primary.M590A1],
            secondary: [Secondary.P226_MK_25, Secondary.SMG_11],
            gadgets: [Gadget.FRAG_GRENADE, Gadget.STUN_GRENADE],
            ability: 'tactical-breaching-hammer',
        },
        roles: [Role.FLANK, Role.SOFT_BREACH],
        armor: 2,
        speed: 2,
        profile: {
            height: 192,
            weight: 95,
            realName: 'Seamus Cowden',
            birthDate: new Date('2 April 1982'),
        },
    },
    {
        name: 'Thatcher',
        slug: 'thatcher',
        position: Position.ATTACKER,
        loadouts: {
            primary: [Primary.AR33, Primary.L85A2, Primary.M590A1],
            secondary: [Secondary.P226_MK_25],
            gadgets: [Gadget.BREACH_CHARGE, Gadget.CLAYMORE],
            ability: 'emp-grenade',
        },
        roles: [Role.BACK_LINE, Role.DISABLE],
    },

    // SAS Defend
    {
    	name: 'Smoke',
    	slug: 'smoke',
        position: Position.DEFENDER,
        loadouts: {
            primary: [Primary.M590A1, Primary.FMG_9],
            secondary: [Secondary.P226_MK_25, Secondary.SMG_11],
            gadgets: [Gadget.DEPLOYABLE_SHIELD, Gadget.BARBED_WIRE],
            ability: 'remote-gas-grenade',
        },
        roles: [
            Role.ANCHOR,
            Role.AREA_DENIAL,
            Role.SECURE
        ],
    },
    {
    	name: 'Mute',
    	slug: 'mute',
        position: Position.DEFENDER,
        loadouts: {
            primary: [Primary.MP5K, Primary.M590A1],
            secondary: [Secondary.P226_MK_25, Secondary.SMG_11],
            gadgets: [Gadget.BULLETPROOF_CAMERA, Gadget.NITRO_CELL],
            ability: 'signal-disruptor',
        },
        roles: [
            Role.ANTI_HARD_BREACH,
            Role.INTEL_DENIER,
            Role.SECURE
        ],
    },



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
];

export class Operators {
    static readonly attackers: Operators[] = filter(OPERATORS, { position: Position.ATTACKER });
    static readonly defenders: Operators[] = filter(OPERATORS, { position: Position.DEFENDER });

    static findBySlug(slug: string) {
        const result = find(OPERATORS, { slug: slug });
        if (result) return result;
        throw new Error(`Could not find any operator with provided slug [${slug}]`);
    }
}
