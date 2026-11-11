/*
 * Made-up product content: classes, recipes and coach messages.
 * This is here so ThriveWell feels like a real product people care about.
 */

export type Tone = 'brand' | 'energy' | 'calm' | 'sky' | 'rose';

/** Tailwind classes for each tone, so screens stay consistent. */
export const toneClasses: Record<Tone, { soft: string; solid: string; text: string }> = {
  brand: { soft: 'bg-brand-soft', solid: 'bg-brand', text: 'text-brand' },
  energy: { soft: 'bg-energy-soft', solid: 'bg-energy', text: 'text-energy' },
  calm: { soft: 'bg-calm-soft', solid: 'bg-calm', text: 'text-calm' },
  sky: { soft: 'bg-sky-soft', solid: 'bg-sky', text: 'text-sky' },
  rose: { soft: 'bg-rose-soft', solid: 'bg-rose', text: 'text-rose' },
};

// ---------------------------------------------------------------- Classes

export type ClassCategory = 'Strength' | 'Yoga' | 'HIIT' | 'Mobility' | 'Cardio';

export interface FitnessClass {
  id: string;
  title: string;
  category: ClassCategory;
  minutes: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  coach: string;
  tone: Tone;
}

export const classCategories: ClassCategory[] = ['Strength', 'Yoga', 'HIIT', 'Mobility', 'Cardio'];

export const classes: FitnessClass[] = [
  { id: 'c1', title: 'Full-Body Strength Builder', category: 'Strength', minutes: 35, level: 'Intermediate', coach: 'Jordan Ellis', tone: 'brand' },
  { id: 'c2', title: 'Slow Flow for Busy Days', category: 'Yoga', minutes: 20, level: 'Beginner', coach: 'Amara Lee', tone: 'calm' },
  { id: 'c3', title: '20-Minute Sweat Session', category: 'HIIT', minutes: 20, level: 'Advanced', coach: 'Theo Park', tone: 'energy' },
  { id: 'c4', title: 'Desk Reset: Hips & Back', category: 'Mobility', minutes: 12, level: 'Beginner', coach: 'Amara Lee', tone: 'sky' },
  { id: 'c5', title: 'Steady-State Cardio Ride', category: 'Cardio', minutes: 30, level: 'Intermediate', coach: 'Theo Park', tone: 'rose' },
  { id: 'c6', title: 'Lower-Body Power', category: 'Strength', minutes: 40, level: 'Advanced', coach: 'Jordan Ellis', tone: 'brand' },
  { id: 'c7', title: 'Post-Shift Wind Down', category: 'Yoga', minutes: 15, level: 'Beginner', coach: 'Amara Lee', tone: 'calm' },
  { id: 'c8', title: 'Tabata Ladder', category: 'HIIT', minutes: 25, level: 'Intermediate', coach: 'Theo Park', tone: 'energy' },
  { id: 'c9', title: 'Morning Mobility Routine', category: 'Mobility', minutes: 10, level: 'Beginner', coach: 'Jordan Ellis', tone: 'sky' },
];

// ---------------------------------------------------------------- Meals

export type MealType = 'Breakfast' | 'Lunch' | 'Dinner';

export interface Recipe {
  id: string;
  name: string;
  description: string;
  mealType: MealType;
  kcal: number;
  minutes: number;
  protein: number;
  tone: Tone;
  ingredients: string[];
  swaps: { id: string; label: string; detail: string }[];
}

export const recipes: Recipe[] = [
  {
    id: 'r1', name: 'Overnight Oats', description: 'with blueberries, chia & almond butter', mealType: 'Breakfast',
    kcal: 410, minutes: 5, protein: 18, tone: 'calm',
    ingredients: ['Rolled oats', 'Oat milk', 'Chia seeds', 'Blueberries', 'Almond butter'],
    swaps: [
      { id: 'none', label: 'No change', detail: 'As planned' },
      { id: 'yogurt', label: 'Add Greek yogurt', detail: '+12g protein' },
      { id: 'gf', label: 'Gluten-free oats', detail: 'Same macros' },
    ],
  },
  {
    id: 'r2', name: 'Green Shakshuka', description: 'eggs, spinach, feta & toasted sourdough', mealType: 'Breakfast',
    kcal: 460, minutes: 20, protein: 26, tone: 'brand',
    ingredients: ['Eggs', 'Spinach', 'Leeks', 'Feta', 'Sourdough'],
    swaps: [
      { id: 'none', label: 'No change', detail: 'As planned' },
      { id: 'tofu', label: 'Swap eggs for tofu', detail: 'Plant-based' },
      { id: 'nobread', label: 'Skip the bread', detail: '−140 kcal' },
    ],
  },
  {
    id: 'r3', name: 'Crispy Chickpea Bowl', description: 'with quinoa, roasted veg & tahini', mealType: 'Lunch',
    kcal: 540, minutes: 25, protein: 22, tone: 'energy',
    ingredients: ['Chickpeas', 'Quinoa', 'Sweet potato', 'Red onion', 'Tahini'],
    swaps: [
      { id: 'none', label: 'No change', detail: 'As planned' },
      { id: 'chicken', label: 'Add chicken', detail: '+28g protein' },
      { id: 'double', label: 'Double it', detail: 'Lunch for tomorrow too' },
    ],
  },
  {
    id: 'r4', name: 'Miso Salmon Rice Bowl', description: 'with edamame, cucumber & sesame', mealType: 'Lunch',
    kcal: 590, minutes: 20, protein: 36, tone: 'sky',
    ingredients: ['Salmon', 'Brown rice', 'Edamame', 'Cucumber', 'White miso'],
    swaps: [
      { id: 'none', label: 'No change', detail: 'As planned' },
      { id: 'tofu', label: 'Swap salmon for tofu', detail: 'Plant-based' },
      { id: 'cauli', label: 'Cauliflower rice', detail: '−180 kcal' },
    ],
  },
  {
    id: 'r5', name: 'Turkey Chili', description: 'with black beans, peppers & lime crema', mealType: 'Dinner',
    kcal: 520, minutes: 35, protein: 40, tone: 'rose',
    ingredients: ['Ground turkey', 'Black beans', 'Bell peppers', 'Tomatoes', 'Greek yogurt'],
    swaps: [
      { id: 'none', label: 'No change', detail: 'As planned' },
      { id: 'veg', label: 'Make it vegetarian', detail: 'Extra beans' },
      { id: 'double', label: 'Double it', detail: 'Freeze half' },
    ],
  },
  {
    id: 'r6', name: 'Lemon Herb Chicken', description: 'with smashed potatoes & green beans', mealType: 'Dinner',
    kcal: 610, minutes: 40, protein: 44, tone: 'brand',
    ingredients: ['Chicken thighs', 'Baby potatoes', 'Green beans', 'Lemon', 'Fresh herbs'],
    swaps: [
      { id: 'none', label: 'No change', detail: 'As planned' },
      { id: 'breast', label: 'Chicken breast', detail: 'Leaner' },
      { id: 'salad', label: 'Swap potatoes for salad', detail: '−200 kcal' },
    ],
  },
];

/** A simple rotating weekly plan: one breakfast, lunch and dinner per day. */
export function mealsForDay(dayIndex: number): Recipe[] {
  const breakfasts = recipes.filter((r) => r.mealType === 'Breakfast');
  const lunches = recipes.filter((r) => r.mealType === 'Lunch');
  const dinners = recipes.filter((r) => r.mealType === 'Dinner');
  return [
    breakfasts[dayIndex % breakfasts.length],
    lunches[(dayIndex + 1) % lunches.length],
    dinners[dayIndex % dinners.length],
  ];
}

// ---------------------------------------------------------------- Coach

export const coach = {
  name: 'Jordan Ellis',
  role: 'Strength & habits coach',
  initials: 'JE',
};

export interface CoachMessage {
  id: string;
  from: 'coach' | 'me';
  text: string;
  time: string;
}

export function coachThread(firstName: string): CoachMessage[] {
  return [
    { id: 'm1', from: 'coach', text: `Hi ${firstName}! I've updated your plan for this week — two strength sessions and one mobility day.`, time: 'Mon 8:02 AM' },
    { id: 'm2', from: 'me', text: 'Thanks! This week is pretty packed at work, so I might only manage two.', time: 'Mon 8:15 AM' },
    { id: 'm3', from: 'coach', text: "Totally fine. Consistency beats intensity. If you're short on time, the 12-minute Desk Reset counts!", time: 'Mon 8:21 AM' },
  ];
}
