const output = document.getElementById('output');
const input = document.getElementById('input');

const state = {
  step: 'start',
  ingredients: '',
  dish: '',
  skill: '',
  time: '',
  vibe: ''
};

const roasts = [
  "That's not cooking, that's a felony against flavor.",
  "Gordon Ramsay just felt a sharp pain in his soul from across the ocean.",
  "Your dead grandma is disappointed and she's been dead since '98.",
  "This deserves the electric chair for taste buds.",
  "Michelin inspectors are writing your obituary right now.",
  "Congrats, you invented sadness on a plate."
];

const saves = [
  "Throw in acid (lime/lemon) and call it 'deconstructed' — critics eat that shit up.",
  "Label it 'rustic' and charge your friends $28 like the bougie fraud you are.",
  "More avocado/cheese. Panic fades, fat is forever.",
  "Soup it is. Everything becomes soup if you add tears and broth.",
  "Thin slices = carpaccio. Confidence is the real ingredient.",
  "Not burnt — 'charred for depth'. Say it like you mean it, punk."
];

const skillLevels = ['beginner','mediocre','pro','psycho'];
const timeOptions = ['quick','medium','long'];
const vibeOptions = ['lazy','impress','drunk','sad','horny','rage','beach','whatever'];

function println(text, className='') {
  const line = document.createElement('div');
  if (className) line.className = className;
  line.textContent = text;
  output.appendChild(line);
  output.scrollTop = output.scrollHeight;
}

function chefSay(text, type='chef') {
  println(`👹 ${text}`, type);
}

function getRoast() { return roasts[Math.floor(Math.random()*roasts.length)]; }
function getSave() { return saves[Math.floor(Math.random()*saves.length)]; }

function generateRecipe() {
  const ingsLower = state.ingredients.toLowerCase().split(',').map(s=>s.trim()).filter(Boolean);
  let title = state.dish || 'Untitled War Crime';
  let twist = '';

  // Basic pattern matching (expand this forever later)
  if (ingsLower.some(i=>i.includes('chicken')) && ingsLower.some(i=>i.includes('rice')) && 
      ingsLower.some(i=>i.includes('avocado')) && ingsLower.some(i=>i.includes('lime'))) {
    title = "Spicy Lime Chicken Avocado Rice Bowl";
    twist = "Santa Barbara beach classic — fresh, zesty, perfect for post-surf munchies.";
  } else if (ingsLower.some(i=>i.includes('avocado')) && ingsLower.some(i=>i.includes('lime'))) {
    title = "Loaded Cali Avocado Smash";
    twist = "Lazy beach vibes. Mash, slap, done.";
  } else if (ingsLower.some(i=>i.includes('taco') || i.includes('fish') || i.includes('shrimp'))) {
    title = "Drunk Beach Tacos";
    twist = "Messy, spicy, sunset-approved chaos.";
  }

  // Vibe/time/skill adjustments
  if (state.vibe === 'drunk') twist += " Extra hot sauce. Regret tomorrow is tomorrow's problem.";
  if (state.vibe === 'impress') twist += " Plate it fancy. Drizzle like you actually care.";
  if (state.vibe === 'lazy') twist += " Minimal dishes. Maximum Netflix.";
  if (state.time === 'quick') twist += " Under 20 min version — no excuses, bitch.";
  if (state.skill === 'beginner') twist += " Idiot-proof steps. Don't fuck this up.";

  chefSay(`Recipe unlocked: ${title}`, 'roast');
  chefSay(`Initial verdict: ${getRoast()}`, 'roast');

  println("\nYOUR INGREDIENTS:");
  println(state.ingredients.split(',').map(s=>`  - ${s.trim()}`).join('\n'));

  println("\nSTEPS (don't burn the house down):");
  println("1. Cook your protein/rice/base like a functioning adult (or microwave, coward).");
  println("2. Smash avocado with lime, salt, hot sauce — taste as you go, punk.");
  println("3. Throw everything together in a bowl. Mix like you mean it.");
  println("4. Top with whatever chaos you have left (cilantro? Tears? Both?).");
  println("5. Eat before it ghosts you.");

  if (twist) chefSay(`Vibe twist: ${twist}`);
  if (Math.random() < 0.7) chefSay(`When you inevitably fuck it: ${getSave()}`, 'save');

  chefSay("Done. Eat. Post pic. Tag me so I can roast it publicly.");
  chefSay("Type 'again' for round 2 or crawl away in shame.");
}

function processInput(text) {
  if (!text.trim()) return;
  println(`> ${text}`);
  const lower = text.toLowerCase().trim();

  if (['quit','exit','q','fuck off'].includes(lower)) {
    chefSay("Finally. Get out of my kitchen, you disaster.");
    input.disabled = true;
    return;
  }

  if (state.step === 'start' || lower === 'again') {
    state.step = 'ingredients';
    chefSay("Round 2, Santa Barbara menace. Throw ingredients (comma separated):");
    state.ingredients = state.dish = state.skill = state.time = state.vibe = '';
    return;
  }

  if (state.step === 'ingredients') {
    state.ingredients = text;
    chefSay("Bold garbage selection. Now name this abomination:");
    state.step = 'dish';
  } else if (state.step === 'dish') {
    state.dish = text || 'Untitled War Crime';
    chefSay("Skill level? (beginner / mediocre / pro / psycho)");
    state.step = 'skill';
  } else if (state.step === 'skill') {
    state.skill = skillLevels.includes(lower) ? lower : 'mediocre';
    chefSay("Time you actually have? (quick / medium / long)");
    state.step = 'time';
  } else if (state.step === 'time') {
    state.time = timeOptions.includes(lower) ? lower : 'medium';
    chefSay("Vibe we're cooking? (lazy / impress / drunk / sad / horny / rage / beach / whatever)");
    state.step = 'vibe';
  } else if (state.step === 'vibe') {
    state.vibe = vibeOptions.includes(lower) ? lower : 'whatever';
    generateRecipe();
    state.step = 'done';
  }

  input.value = '';
}

input.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    e.preventDefault();
    processInput(input.value);
  }
});

// Boot up – pure Diablo energy
setTimeout(() => {
  chefSay("WAKE THE FUCK UP, SANTA BARBARA");
  chefSay("I'm Chef Diablo. I roast. I save. Now I BUILD recipes.");
  chefSay("Throw your ingredients (comma separated), punk. Let's see what kind of disaster we're working with.");
}, 400);