/**
 * Offline aptitude questions: number questions are generated fresh every time (so the answers are always
 * computed, never typed by hand), and reasoning/verbal questions come from a checked bank.
 */
import type { Difficulty, Mcq, Section } from './types';

type Rand = () => number;
const ri = (r: Rand, a: number, b: number) => a + Math.floor(r() * (b - a + 1));
const pick = <T,>(r: Rand, a: readonly T[]): T => a[Math.floor(r() * a.length)];
const shuffle = <T,>(r: Rand, arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
const inr = (n: number) => '₹' + n.toLocaleString('en-IN', { maximumFractionDigits: 2 });
const num = (n: number) => (Number.isInteger(n) ? String(n) : String(+n.toFixed(2)));

/** Four options with the right answer in a random place; distractors are typical slips. */
function mcq(r: Rand, topic: string, q: string, answer: number, slips: number[], show: (n: number) => string, explain: string): Mcq {
  const seen = new Set([show(answer)]);
  const wrong: string[] = [];
  for (const s of [...slips, answer * 1.1, answer * 0.9, answer + 1, answer - 1, answer * 1.2, answer + 2]) {
    const t = show(Math.round(s * 100) / 100);
    if (s > 0 && !seen.has(t) && wrong.length < 3) {
      seen.add(t);
      wrong.push(t);
    }
  }
  const options = shuffle(r, [show(answer), ...wrong]);
  return { q, options, answer: options.indexOf(show(answer)), explain, topic };
}

// Quantitative aptitude: generated

type Gen = (r: Rand, d: Difficulty) => Mcq;

const QUANT: Record<string, Gen> = {
  Percentages: (r, d) => {
    const p = pick(r, d === 'easy' ? [10, 20, 25, 50] : [12.5, 15, 35, 40, 60, 75]);
    const base = ri(r, 2, d === 'hard' ? 40 : 20) * 40;
    const a = (p * base) / 100;
    if (d === 'hard') {
      const up = pick(r, [10, 20, 25]);
      const down = pick(r, [10, 20]);
      const net = +((1 + up / 100) * (1 - down / 100) * 100 - 100).toFixed(2);
      return mcq(r, 'Percentages', `A price is raised by ${up}% and then reduced by ${down}%. What is the net change?`, Math.abs(net), [up - down, up + down, Math.abs(net) + 2], (n) => num(n) + (net >= 0 ? '% increase' : '% decrease'), `Net = (1 + ${up}/100) × (1 − ${down}/100) − 1 = ${net}%. Shortcut: a + b + ab/100 = ${up} − ${down} − ${(up * down) / 100} = ${net}%.`);
    }
    return mcq(r, 'Percentages', `What is ${num(p)}% of ${base}?`, a, [a * 2, a / 2, base - a], num, `${num(p)}% of ${base} = ${num(p)}/100 × ${base} = ${num(a)}.`);
  },
  'Profit and Loss': (r, d) => {
    const cp = ri(r, 4, 30) * 50;
    const p = pick(r, d === 'easy' ? [10, 20, 25] : [12, 15, 30, 35, 40]);
    const sp = (cp * (100 + p)) / 100;
    if (d !== 'easy' && r() < 0.5) {
      return mcq(r, 'Profit and Loss', `An article bought for ${inr(cp)} is sold for ${inr(sp)}. What is the profit percent?`, p, [((sp - cp) / sp) * 100, p + 5, p - 5], (n) => num(n) + '%', `Profit = ${inr(sp - cp)}. Profit % = ${sp - cp}/${cp} × 100 = ${p}%. Profit % is always on the cost price.`);
    }
    return mcq(r, 'Profit and Loss', `A shopkeeper buys an item for ${inr(cp)} and sells it at a ${p}% profit. What is the selling price?`, sp, [cp + p, cp * (1 - p / 100), sp + 50], inr, `SP = CP × (100 + ${p})/100 = ${cp} × ${100 + p}/100 = ${inr(sp)}.`);
  },
  'Simple and Compound Interest': (r, d) => {
    if (d === 'easy' || r() < 0.4) {
      const P = ri(r, 2, 20) * 500;
      const R = pick(r, [4, 5, 6, 8, 10, 12]);
      const T = ri(r, 2, 5);
      const si = (P * R * T) / 100;
      return mcq(r, 'Simple and Compound Interest', `What is the simple interest on ${inr(P)} at ${R}% per year for ${T} years?`, si, [si / T, si * 1.1, P + si], inr, `SI = P × R × T / 100 = ${P} × ${R} × ${T} / 100 = ${inr(si)}.`);
    }
    const P = ri(r, 1, 20) * 1000;
    const R = pick(r, [10, 20]);
    const ci = Math.round(P * ((1 + R / 100) ** 2 - 1));
    const si = (P * R * 2) / 100;
    return mcq(r, 'Simple and Compound Interest', `Find the compound interest on ${inr(P)} at ${R}% per year for 2 years, compounded yearly.`, ci, [si, ci + P, ci * 0.9], inr, `CI = P[(1 + R/100)^2 − 1] = ${P} × ${+((1 + R / 100) ** 2 - 1).toFixed(2)} = ${inr(ci)}. Shortcut for 2 years: 2R + R²/100 = ${2 * R + (R * R) / 100}%.`);
  },
  'Time and Work': (r, d) => {
    const pairs: [number, number, number][] = [[10, 15, 6], [12, 24, 8], [20, 30, 12], [6, 12, 4], [15, 30, 10], [12, 36, 9], [18, 36, 12], [10, 40, 8], [20, 60, 15], [24, 48, 16], [30, 60, 20], [12, 60, 10]];
    const [a, b, t] = pick(r, pairs);
    if (d === 'hard') {
      const left = (1 - 2 * (1 / a + 1 / b)) * a;
      if (left > 0 && Number.isInteger(+left.toFixed(6))) {
        return mcq(r, 'Time and Work', `A can finish a job in ${a} days and B in ${b} days. They work together for 2 days, then B leaves. In how many more days will A finish the job?`, left, [a - 2, t, left + 2], (n) => num(n) + ' days', `Together they do 1/${a} + 1/${b} = 1/${t} per day, so 2 days = ${2}/${t}. Work left = ${1 - 2 / t > 0 ? `1 − 2/${t}` : ''}; A alone needs (left) × ${a} = ${num(left)} days.`);
      }
    }
    return mcq(r, 'Time and Work', `A can finish a work in ${a} days and B in ${b} days. Working together, how many days will they take?`, t, [(a + b) / 2, a + b, Math.abs(b - a)], (n) => num(n) + ' days', `Together: 1/${a} + 1/${b} = 1/${t} per day, so ${t} days. Shortcut: ab/(a + b) = ${a * b}/${a + b} = ${t}.`);
  },
  'Speed, Time and Distance': (r, d) => {
    const S = pick(r, [36, 54, 72, 90, 108]);
    const ms = (S * 5) / 18;
    const t = ri(r, 6, 20);
    const L = ms * t;
    if (d !== 'easy' && r() < 0.5) {
      const P = ms * ri(r, 4, 10);
      const T = (L + P) / ms;
      return mcq(r, 'Speed, Time and Distance', `A ${L} m long train runs at ${S} km/h. How long will it take to cross a ${P} m long platform?`, T, [L / ms, P / ms, T + 4], (n) => num(n) + ' seconds', `${S} km/h = ${S} × 5/18 = ${ms} m/s. Distance = train + platform = ${L + P} m. Time = ${L + P}/${ms} = ${num(T)} s.`);
    }
    return mcq(r, 'Speed, Time and Distance', `A train ${L} m long runs at ${S} km/h. In how many seconds will it pass a pole?`, t, [L / S, t * 2, t + 3], (n) => num(n) + ' seconds', `${S} km/h = ${S} × 5/18 = ${ms} m/s. Time = length / speed = ${L}/${ms} = ${t} s.`);
  },
  Averages: (r) => {
    const n = ri(r, 4, 6);
    const avg = ri(r, 12, 60);
    const xs = Array.from({ length: n - 1 }, () => avg + ri(r, -9, 9));
    xs.push(avg * n - xs.reduce((s, x) => s + x, 0));
    return mcq(r, 'Averages', `Find the average of ${xs.join(', ')}.`, avg, [avg + 1, avg - 2, avg + 3], num, `Sum = ${avg * n}. Average = ${avg * n}/${n} = ${avg}.`);
  },
  'Ratio and Proportion': (r) => {
    const a = ri(r, 1, 7);
    let b = ri(r, 2, 9);
    if (b === a) b++;
    const unit = ri(r, 3, 30) * 10;
    const total = (a + b) * unit;
    return mcq(r, 'Ratio and Proportion', `${inr(total)} is divided between A and B in the ratio ${a}:${b}. What is A's share?`, a * unit, [b * unit, total / 2, a * unit + unit], inr, `Total parts = ${a + b}. One part = ${total}/${a + b} = ${unit}. A gets ${a} × ${unit} = ${inr(a * unit)}.`);
  },
  'Problems on Ages': (r) => {
    const b = ri(r, 8, 30);
    const x = ri(r, 2, 12);
    const s = 2 * b + x;
    return mcq(r, 'Problems on Ages', `Ravi is ${x} years older than Sita. The sum of their ages is ${s} years. How old is Ravi?`, b + x, [b, s / 2, b + 2 * x], (n) => num(n) + ' years', `Sita = (${s} − ${x})/2 = ${b}, so Ravi = ${b} + ${x} = ${b + x} years.`);
  },
  'Boats and Streams': (r) => {
    const s = ri(r, 1, 4);
    const b = s + ri(r, 4, 10);
    const t = ri(r, 2, 4);
    const down = (b + s) * t;
    const up = (b - s) * t;
    return mcq(r, 'Boats and Streams', `A boat goes ${down} km downstream in ${t} hours and ${up} km upstream in ${t} hours. What is the speed of the boat in still water?`, b, [s, b + s, (down + up) / t], (n) => num(n) + ' km/h', `Downstream speed = ${down}/${t} = ${b + s}, upstream = ${up}/${t} = ${b - s}. Boat = (${b + s} + ${b - s})/2 = ${b} km/h.`);
  },
  Discounts: (r) => {
    const m = ri(r, 4, 40) * 100;
    const d1 = pick(r, [10, 20, 25]);
    const d2 = pick(r, [10, 20]);
    const sp = m * (1 - d1 / 100) * (1 - d2 / 100);
    return mcq(r, 'Discounts', `An item marked ${inr(m)} gets successive discounts of ${d1}% and ${d2}%. What is the final price?`, sp, [m * (1 - (d1 + d2) / 100), sp + 50, m * (1 - d1 / 100)], inr, `${m} × ${(100 - d1) / 100} × ${(100 - d2) / 100} = ${inr(sp)}. Successive discounts are not added: ${d1}% + ${d2}% gives the wrong price.`);
  },
  'HCF and LCM': (r) => {
    const h = pick(r, [4, 6, 8, 9, 12, 14, 15]);
    const [x, y] = pick(r, [[2, 3], [3, 4], [3, 5], [4, 5], [2, 5], [5, 7]] as [number, number][]);
    const lcm = h * x * y;
    return r() < 0.5
      ? mcq(r, 'HCF and LCM', `What is the HCF of ${h * x} and ${h * y}?`, h, [h * 2, x * y, lcm], num, `${h * x} = ${h} × ${x} and ${h * y} = ${h} × ${y}; ${x} and ${y} share no factor, so HCF = ${h}.`)
      : mcq(r, 'HCF and LCM', `What is the LCM of ${h * x} and ${h * y}?`, lcm, [h, h * x * y * 2, h * x + h * y], num, `LCM = HCF × ${x} × ${y} = ${h} × ${x * y} = ${lcm}. Check: HCF × LCM = product of the numbers.`);
  },
};

// Logical reasoning: generated + bank

const LOGIC_GEN: Record<string, Gen> = {
  'Number Series': (r, d) => {
    const kinds = d === 'easy' ? ['add', 'mul'] : ['add2', 'sq', 'cube1', 'mul_add', 'fib'];
    const k = pick(r, kinds);
    let xs: number[] = [];
    let why = '';
    if (k === 'add') {
      const a = ri(r, 2, 20), s = ri(r, 3, 12);
      xs = Array.from({ length: 6 }, (_, i) => a + i * s);
      why = `Each term adds ${s}.`;
    } else if (k === 'mul') {
      const a = ri(r, 2, 5), m = pick(r, [2, 3]);
      xs = Array.from({ length: 6 }, (_, i) => a * m ** i);
      why = `Each term is multiplied by ${m}.`;
    } else if (k === 'add2') {
      const a = ri(r, 2, 10), s = ri(r, 2, 5);
      xs = [a];
      for (let i = 1; i < 6; i++) xs.push(xs[i - 1] + s * i);
      why = `The differences grow by ${s}: +${s}, +${2 * s}, +${3 * s}…`;
    } else if (k === 'sq') {
      const a = ri(r, 1, 6), c = pick(r, [0, 1, -1, 2]);
      xs = Array.from({ length: 6 }, (_, i) => (a + i) ** 2 + c);
      why = `Squares ${c ? (c > 0 ? 'plus ' + c : 'minus ' + -c) : ''}: ${a}², ${a + 1}², ${a + 2}²…`;
    } else if (k === 'cube1') {
      const a = ri(r, 1, 3);
      xs = Array.from({ length: 6 }, (_, i) => (a + i) ** 3 - 1);
      why = `Cubes minus 1: ${a}³ − 1, ${a + 1}³ − 1…`;
    } else if (k === 'mul_add') {
      const a = ri(r, 1, 5), m = 2, s = ri(r, 1, 3);
      xs = [a];
      for (let i = 1; i < 6; i++) xs.push(xs[i - 1] * m + s);
      why = `Each term = previous × ${m} + ${s}.`;
    } else {
      const a = ri(r, 1, 4), b = a + ri(r, 1, 3);
      xs = [a, b];
      for (let i = 2; i < 6; i++) xs.push(xs[i - 1] + xs[i - 2]);
      why = 'Each term is the sum of the two before it.';
    }
    const ans = xs[5];
    return mcq(r, 'Number Series', `What comes next? ${xs.slice(0, 5).join(', ')}, ?`, ans, [ans + (xs[4] - xs[3]), ans - 2, xs[4] + (xs[4] - xs[3])], num, why + ` Next = ${ans}.`);
  },
  'Coding-Decoding': (r) => {
    const words = ['CAT', 'DOG', 'BIRD', 'FISH', 'LION', 'BOOK', 'GAME', 'CODE', 'MIND', 'WORK', 'PLAN', 'TEAM', 'DATA', 'GOAL'];
    const [w1, w2] = shuffle(r, words);
    const k = pick(r, [1, 2, 3, -1]);
    const enc = (w: string, s: number) => w.replace(/[A-Z]/g, (c) => String.fromCharCode(((c.charCodeAt(0) - 65 + s + 26) % 26) + 65));
    const right = enc(w2, k);
    const opts = shuffle(r, [right, enc(w2, k + 1), enc(w2, k - 1 || 2), enc(w2, k).split('').reverse().join('')].filter((v, i, a) => a.indexOf(v) === i));
    while (opts.length < 4) opts.push(enc(w2, k + opts.length + 2));
    return { q: `If ${w1} is written as ${enc(w1, k)} in a code, how is ${w2} written in that code?`, options: opts, answer: opts.indexOf(right), explain: `Each letter moves ${Math.abs(k)} place${Math.abs(k) > 1 ? 's' : ''} ${k > 0 ? 'forward' : 'back'} in the alphabet, so ${w2} → ${right}.`, topic: 'Coding-Decoding' };
  },
  'Direction Sense': (r) => {
    const [a, b, c] = pick(r, [[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15], [8, 15, 17]] as [number, number, number][]);
    const dir = pick(r, ['north', 'south', 'east', 'west']);
    const turn = pick(r, ['right', 'left']);
    return mcq(r, 'Direction Sense', `Meera walks ${a} km ${dir}, turns ${turn} and walks ${b} km. How far is she from her starting point?`, c, [a + b, Math.abs(b - a), c + 1], (n) => num(n) + ' km', `The two walks are at right angles, so distance = √(${a}² + ${b}²) = √${a * a + b * b} = ${c} km.`);
  },
  'Ranking and Order': (r) => {
    const n = ri(r, 25, 60);
    const k = ri(r, 5, n - 5);
    return mcq(r, 'Ranking and Order', `In a row of ${n} students, Ravi is ${k}th from the left end. What is his position from the right end?`, n - k + 1, [n - k, n - k + 2, k], (x) => num(x) + 'th', `Position from right = total − position from left + 1 = ${n} − ${k} + 1 = ${n - k + 1}.`);
  },
  Clocks: (r) => {
    const h = ri(r, 1, 11);
    const m = pick(r, [0, 10, 20, 30, 40, 50]);
    let ang = Math.abs(30 * h - 5.5 * m);
    if (ang > 180) ang = 360 - ang;
    return mcq(r, 'Clocks', `What is the smaller angle between the hour and minute hands at ${h}:${String(m).padStart(2, '0')}?`, ang, [Math.abs(30 * h - 6 * m) % 360 || 30, ang + 15, 360 - ang === ang ? ang + 30 : Math.min(360 - ang, ang + 30)], (n) => num(n) + '°', `Angle = |30H − 5.5M| = |${30 * h} − ${5.5 * m}| = ${Math.abs(30 * h - 5.5 * m)}°${Math.abs(30 * h - 5.5 * m) > 180 ? `, and the smaller angle is 360 − that = ${ang}°` : ''}.`);
  },
};

type Fixed = [q: string, options: string[], answer: number, explain: string];

const LOGIC_BANK: Record<string, Fixed[]> = {
  'Blood Relations': [
    ['Pointing to a man, Neha says, "He is the son of my grandfather\'s only son." How is the man related to Neha?', ['Brother', 'Cousin', 'Uncle', 'Father'], 0, "Her grandfather's only son is her father; his son is her brother."],
    ['A is the brother of B. B is the sister of C. C is the father of D. How is A related to D?', ['Uncle', 'Father', 'Brother', 'Grandfather'], 0, "A is a brother of D's father C, so A is D's uncle."],
    ["Introducing a woman, Arjun says, \"She is the daughter of my mother's only son.\" How is the woman related to Arjun?", ['Daughter', 'Sister', 'Niece', 'Cousin'], 0, "His mother's only son is Arjun himself, so she is his daughter."],
    ['P is the mother of Q. Q is the sister of R. R is the son of S. How is S related to P?', ['Husband', 'Brother', 'Son', 'Father'], 0, 'P is the mother of Q and R; S is also their parent, so S is P\'s husband.'],
    ["Rohan's father is the only son of Mohan's father. How is Mohan related to Rohan?", ['Father', 'Uncle', 'Grandfather', 'Brother'], 0, "The only son of Mohan's father is Mohan himself, so Mohan is Rohan's father."],
  ],
  Syllogisms: [
    ['Statements: All pens are books. All books are bags. Conclusion I: All pens are bags. Conclusion II: Some bags are pens.', ['Both I and II follow', 'Only I follows', 'Only II follows', 'Neither follows'], 0, 'All pens ⊂ books ⊂ bags, so all pens are bags (I), and then some bags are pens (II).'],
    ['Statements: Some cats are dogs. No dog is a rat. Conclusion I: Some cats are not rats. Conclusion II: Some rats are cats.', ['Only I follows', 'Only II follows', 'Both follow', 'Neither follows'], 0, 'The cats that are dogs cannot be rats, so I follows. Nothing links rats to the other cats, so II does not.'],
    ['Statements: No apple is a mango. All mangoes are fruits. Conclusion I: No apple is a fruit. Conclusion II: Some fruits are not apples.', ['Only II follows', 'Only I follows', 'Both follow', 'Neither follows'], 0, 'Mangoes are fruits that are not apples, so II follows. Apples could still be other fruits, so I does not.'],
    ['Statements: All doctors are graduates. Some graduates are singers. Conclusion I: Some doctors are singers. Conclusion II: Some singers are graduates.', ['Only II follows', 'Only I follows', 'Both follow', 'Neither follows'], 0, 'II is the reverse of "some graduates are singers", so it follows. The singing graduates may not be doctors, so I does not.'],
  ],
  'Odd One Out': [
    ['Find the odd one out: 2, 3, 5, 9, 11', ['9', '2', '5', '11'], 0, 'All others are prime numbers; 9 = 3 × 3.'],
    ['Find the odd one out: Mercury, Venus, Moon, Mars', ['Moon', 'Mercury', 'Venus', 'Mars'], 0, 'The Moon is a satellite; the rest are planets.'],
    ['Find the odd one out: 121, 144, 169, 196, 210', ['210', '121', '169', '196'], 0, 'All the others are perfect squares (11², 12², 13², 14²).'],
    ['Find the odd one out: Python, Java, Excel, C++', ['Excel', 'Python', 'Java', 'C++'], 0, 'Excel is a spreadsheet app; the others are programming languages.'],
    ['Find the odd one out: 8, 27, 64, 100, 125', ['100', '8', '64', '125'], 0, 'The others are cubes (2³, 3³, 4³, 5³).'],
    ['Find the odd one out: Triangle, Square, Cube, Pentagon', ['Cube', 'Triangle', 'Square', 'Pentagon'], 0, 'A cube is a 3D solid; the others are flat shapes.'],
  ],
  'Seating Arrangement': [
    ['Five friends sit in a row. A is left of B, C is right of B, D is between A and B, and E is at the far right. Who is in the middle?', ['B', 'D', 'C', 'A'], 0, 'The order is A, D, B, C, E, so B is in the middle.'],
  ],
};

// Verbal ability: bank

const VERBAL_BANK: Record<string, Fixed[]> = {
  Synonyms: [
    ['Choose the word closest in meaning to ABUNDANT.', ['Plentiful', 'Scarce', 'Tiny', 'Hidden'], 0, 'Abundant means existing in large amounts: plentiful.'],
    ['Choose the word closest in meaning to METICULOUS.', ['Careful', 'Careless', 'Quick', 'Noisy'], 0, 'Meticulous means showing great attention to detail.'],
    ['Choose the word closest in meaning to CANDID.', ['Frank', 'Secretive', 'Sweet', 'Angry'], 0, 'Candid means truthful and straightforward.'],
    ['Choose the word closest in meaning to DILIGENT.', ['Hard-working', 'Lazy', 'Clever', 'Polite'], 0, 'Diligent means showing care and effort in work.'],
    ['Choose the word closest in meaning to OBSOLETE.', ['Outdated', 'Modern', 'Useful', 'Rare'], 0, 'Obsolete means no longer in use: outdated.'],
    ['Choose the word closest in meaning to RESILIENT.', ['Tough', 'Fragile', 'Rigid', 'Silent'], 0, 'Resilient means able to recover quickly from difficulties.'],
  ],
  Antonyms: [
    ['Choose the word opposite in meaning to VERBOSE.', ['Concise', 'Talkative', 'Loud', 'Detailed'], 0, 'Verbose means using too many words; concise is the opposite.'],
    ['Choose the word opposite in meaning to TRANSPARENT.', ['Opaque', 'Clear', 'Bright', 'Thin'], 0, 'Transparent lets light through; opaque does not.'],
    ['Choose the word opposite in meaning to ASCEND.', ['Descend', 'Climb', 'Rise', 'Float'], 0, 'Ascend means go up; descend means go down.'],
    ['Choose the word opposite in meaning to OPTIMISTIC.', ['Pessimistic', 'Hopeful', 'Cheerful', 'Realistic'], 0, 'An optimist expects good outcomes; a pessimist expects bad ones.'],
    ['Choose the word opposite in meaning to SCARCE.', ['Plentiful', 'Rare', 'Limited', 'Small'], 0, 'Scarce means in short supply; plentiful is the opposite.'],
  ],
  'Sentence Correction': [
    ['Choose the correct sentence.', ['Each of the students has submitted the form.', 'Each of the students have submitted the form.', 'Each of the student has submitted the form.', 'Each of the students were submitted the form.'], 0, '"Each" is singular, so it takes "has", and "of the students" is plural.'],
    ['Choose the correct sentence.', ['Neither the manager nor the employees were present.', 'Neither the manager nor the employees was present.', 'Neither the manager or the employees were present.', 'Neither of the manager nor the employees were present.'], 0, 'With neither…nor, the verb agrees with the nearer subject ("employees" → were).'],
    ['Choose the correct sentence.', ['She has been working here since 2019.', 'She is working here since 2019.', 'She has been working here for 2019.', 'She works here since 2019.'], 0, 'An action continuing from a past point uses the present perfect continuous with "since".'],
    ['Choose the correct sentence.', ['I look forward to hearing from you.', 'I look forward to hear from you.', 'I am looking forward to hear from you.', 'I look forward for hearing from you.'], 0, '"Look forward to" is followed by a gerund (-ing).'],
    ['Choose the correct sentence.', ['The data shows a clear trend.', 'The data show a clear trends.', 'The datas shows a clear trend.', 'The data are shows a clear trend.'], 0, 'In business English "data" is commonly treated as singular; the other options have clear errors.'],
  ],
  'Fill in the Blanks': [
    ['The project was completed ____ schedule, two days early.', ['ahead of', 'behind', 'on to', 'after'], 0, '"Ahead of schedule" means earlier than planned.'],
    ['She is good ____ solving puzzles.', ['at', 'in', 'on', 'for'], 0, 'The fixed phrase is "good at".'],
    ['Despite the rain, the match ____.', ['went ahead', 'went off', 'called in', 'gave up'], 0, '"Went ahead" means it happened as planned.'],
    ['The new policy will come ____ effect from Monday.', ['into', 'in', 'to', 'at'], 0, 'The fixed phrase is "come into effect".'],
  ],
  Idioms: [
    ['What does "to break the ice" mean?', ['To start a conversation in an awkward situation', 'To break something cold', 'To end a friendship', 'To make a mistake'], 0, 'It means making people feel more relaxed, usually by starting a conversation.'],
    ['What does "a blessing in disguise" mean?', ['Something good that first seemed bad', 'A hidden gift', 'A secret prayer', 'A false promise'], 0, 'A misfortune that turns out to be good.'],
    ['What does "to hit the nail on the head" mean?', ['To describe exactly what is right', 'To hurt yourself', 'To work very hard', 'To miss the point'], 0, 'It means saying exactly the right thing.'],
    ['What does "once in a blue moon" mean?', ['Very rarely', 'Every month', 'At night', 'Very quickly'], 0, 'It means something that happens very rarely.'],
  ],
};

export const SECTIONS: Section[] = [
  { id: 'quant', name: 'Quantitative aptitude', icon: 'calculator', color: 'var(--gold)', topics: Object.keys(QUANT) },
  { id: 'logic', name: 'Logical reasoning', icon: 'workflow', color: 'var(--violet)', topics: [...Object.keys(LOGIC_GEN), ...Object.keys(LOGIC_BANK)] },
  { id: 'verbal', name: 'Verbal ability', icon: 'book', color: 'var(--sky)', topics: Object.keys(VERBAL_BANK) },
];

const fromFixed = (r: Rand, topic: string, [q, options, answer, explain]: Fixed): Mcq => {
  const right = options[answer];
  const mixed = shuffle(r, options);
  return { q, options: mixed, answer: mixed.indexOf(right), explain, topic };
};

/** Builds a practice set from the chosen topics, spread evenly, without repeating a question. */
export function offlineSet(topics: string[], count: number, d: Difficulty, rand: Rand = Math.random): Mcq[] {
  const list = topics.length ? topics : SECTIONS.flatMap((s) => s.topics);
  const used = new Set<string>();
  const out: Mcq[] = [];
  let guard = 0;
  const order = shuffle(rand, list);
  while (out.length < count && guard++ < count * 30) {
    const topic = order[out.length % order.length] ?? pick(rand, list);
    const gen = QUANT[topic] ?? LOGIC_GEN[topic];
    const bank = LOGIC_BANK[topic] ?? VERBAL_BANK[topic];
    let q: Mcq | null = null;
    if (gen) q = gen(rand, d);
    else if (bank) {
      const free = bank.filter((b) => !used.has(b[0]));
      if (free.length) q = fromFixed(rand, topic, pick(rand, free));
    }
    if (!q) {
      order.push(pick(rand, Object.keys(QUANT)));
      continue;
    }
    if (used.has(q.q) || q.options.length !== 4 || q.answer < 0) continue;
    used.add(q.q);
    out.push(q);
  }
  return out;
}

export const sectionOf = (topic: string) => SECTIONS.find((s) => s.topics.includes(topic)) ?? SECTIONS[0];
