/*
 * The three personas from the business brief.
 * The app shows ONE persona at a time. To test as someone else, change
 * DEFAULT_PERSONA at the bottom of this file to 'marcus' or 'priya' and save.
 *
 * Everything here is made up for the exercise. Edit freely, or add a
 * fourth persona by copying one of the objects below.
 */

export type PersonaId = 'dana' | 'marcus' | 'priya';

export interface Persona {
  id: PersonaId;
  name: string;
  age: number;
  occupation: string;
  city: string;
  /** Two-letter US state code — matters for state-by-state cancellation rules. */
  stateCode: string;
  stateName: string;
  /** How long they have been a subscriber. */
  tenureMonths: number;
  plan: {
    name: string;
    monthlyPrice: number;
    /** Days until the next charge. */
    daysUntilBilling: number;
    /** Optional extra context shown on the plan card. */
    note?: string;
  };
  usage: {
    streakDays: number;
    classesCompleted: number;
    /** Minutes of activity, Monday → Sunday of this week. */
    weekMinutes: number[];
    favouriteCategory: string;
  };
  /** Who this person is, straight from the brief. */
  segment: string;
  story: string;
}

export const personas: Record<PersonaId, Persona> = {
  dana: {
    id: 'dana',
    name: 'Dana',
    age: 34,
    occupation: 'Marketing manager',
    city: 'Los Angeles',
    stateCode: 'CA',
    stateName: 'California',
    tenureMonths: 18,
    plan: { name: 'ThriveWell Plus', monthlyPrice: 19.99, daysUntilBilling: 12 },
    usage: {
      streakDays: 23,
      classesCompleted: 142,
      weekMinutes: [35, 0, 45, 30, 0, 60, 0],
      favouriteCategory: 'Strength',
    },
    segment: 'Loyal but frustrated',
    story:
      'Uses fitness classes weekly. Tried to pause during a busy work month, gave up after the third retention screen and left a frustrated review. Not trying to leave — the flow itself is the problem.',
  },
  marcus: {
    id: 'marcus',
    name: 'Marcus',
    age: 41,
    occupation: 'Small business owner',
    city: 'Denver',
    stateCode: 'CO',
    stateName: 'Colorado',
    tenureMonths: 3,
    plan: {
      name: 'ThriveWell Plus',
      monthlyPrice: 19.99,
      daysUntilBilling: 4,
      note: 'Joined on a promotional trial — now on the full price.',
    },
    usage: {
      streakDays: 0,
      classesCompleted: 6,
      weekMinutes: [0, 0, 12, 0, 0, 0, 0],
      favouriteCategory: 'HIIT',
    },
    segment: 'New, low-tenure, wants to leave',
    story:
      "Signed up on a promotional trial 3 months ago and decided it isn't a fit. Wants to cancel quickly. Colorado's cancellation law applies to him.",
  },
  priya: {
    id: 'priya',
    name: 'Priya',
    age: 29,
    occupation: 'Nurse, rotating shifts',
    city: 'Houston',
    stateCode: 'TX',
    stateName: 'Texas',
    tenureMonths: 8,
    plan: { name: 'ThriveWell Plus', monthlyPrice: 19.99, daysUntilBilling: 19 },
    usage: {
      streakDays: 5,
      classesCompleted: 48,
      weekMinutes: [20, 25, 0, 0, 40, 15, 0],
      favouriteCategory: 'Yoga',
    },
    segment: 'Price-sensitive, retention offer works',
    story:
      'Generally satisfied but price-sensitive. Considered cancelling twice and stayed after seeing the discount offer. The business case for keeping some kind of retention step.',
  },
};

/** Who the app shows. Change to 'marcus' or 'priya' to test as them. */
export const DEFAULT_PERSONA: PersonaId = 'dana';
