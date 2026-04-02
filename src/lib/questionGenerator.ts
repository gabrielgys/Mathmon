import { Question, Topic } from '../types';

const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export const generateQuestion = (topic: Topic, difficulty: 'Easy' | 'Medium' | 'Hard'): Question => {
  const id = Math.random().toString(36).substr(2, 9);
  let text = '';
  let answer = '';
  let explanation = '';

  switch (topic) {
    case 'Ratio & Proportion':
      if (difficulty === 'Easy') {
        const a = getRandomInt(1, 5);
        const b = getRandomInt(2, 6);
        const total = (a + b) * getRandomInt(5, 20);
        const shareA = (total / (a + b)) * a;
        text = `Divide $${total} in the ratio ${a}:${b}. What is the smaller share?`;
        answer = shareA.toString();
        explanation = `Total parts = ${a} + ${b} = ${a + b}. One part = ${total} / ${a + b} = ${total / (a + b)}. Smaller share = ${a} * ${total / (a + b)} = ${shareA}.`;
      } else {
        const a = getRandomInt(2, 4);
        const b = getRandomInt(3, 5);
        const c = getRandomInt(4, 6);
        const multiplier = getRandomInt(10, 30);
        const total = (a + b + c) * multiplier;
        const shareB = b * multiplier;
        text = `A sum of money is divided between A, B, and C in the ratio ${a}:${b}:${c}. If the total sum is $${total}, how much does B receive?`;
        answer = shareB.toString();
        explanation = `Total parts = ${a}+${b}+${c} = ${a + b + c}. Value per part = ${total}/${a + b + c} = ${multiplier}. B's share = ${b} * ${multiplier} = ${shareB}.`;
      }
      break;

    case 'Algebra':
      if (difficulty === 'Easy') {
        const a = getRandomInt(2, 5);
        const b = getRandomInt(1, 10);
        const x = getRandomInt(2, 8);
        const res = a * x + b;
        text = `Solve for x: ${a}x + ${b} = ${res}`;
        answer = x.toString();
        explanation = `Subtract ${b}: ${a}x = ${res - b}. Divide by ${a}: x = ${x}.`;
      } else {
        const x = getRandomInt(1, 5);
        const y = getRandomInt(1, 5);
        const eq1_res = x + y;
        const eq2_res = 2 * x - y;
        text = `Solve the simultaneous equations: x + y = ${eq1_res} and 2x - y = ${eq2_res}. What is the value of x?`;
        answer = x.toString();
        explanation = `Adding the equations: (x+y) + (2x-y) = ${eq1_res} + ${eq2_res} => 3x = ${eq1_res + eq2_res} => x = ${x}.`;
      }
      break;

    case 'Probability':
      const totalBalls = getRandomInt(10, 20);
      const redBalls = getRandomInt(2, 6);
      const blueBalls = totalBalls - redBalls - getRandomInt(1, 3);
      const greenBalls = totalBalls - redBalls - blueBalls;
      if (difficulty === 'Easy') {
        text = `A bag contains ${redBalls} red, ${blueBalls} blue, and ${greenBalls} green balls. What is the probability of picking a red ball? (Give answer as a fraction like a/b)`;
        answer = `${redBalls}/${totalBalls}`;
        explanation = `Probability = (Number of favorable outcomes) / (Total outcomes) = ${redBalls} / ${totalBalls}.`;
      } else {
        text = `A bag contains ${redBalls} red and ${blueBalls} blue balls. Two balls are picked without replacement. What is the probability both are red? (Give answer as a fraction like a/b)`;
        const num = redBalls * (redBalls - 1);
        const den = (redBalls + blueBalls) * (redBalls + blueBalls - 1);
        answer = `${num}/${den}`;
        explanation = `First red: ${redBalls}/${redBalls + blueBalls}. Second red: ${redBalls - 1}/${redBalls + blueBalls - 1}. Multiply them: ${num}/${den}.`;
      }
      break;

    case 'Quadratics':
      const p = getRandomInt(1, 5);
      const q = getRandomInt(1, 5);
      const b = p + q;
      const c = p * q;
      text = `Factorize x² + ${b}x + ${c}. What is one of the values of x if x² + ${b}x + ${c} = 0? (Enter the smaller magnitude value)`;
      answer = `-${Math.min(p, q)}`;
      explanation = `(x + ${p})(x + ${q}) = 0. So x = -${p} or x = -${q}.`;
      break;

    case 'Trigonometry':
      const angle = 30; // Keeping it simple for non-calc
      const hyp = getRandomInt(10, 20) * 2;
      const opp = hyp / 2; // sin(30) = 0.5
      text = `In a right-angled triangle, the hypotenuse is ${hyp}cm and the angle opposite to side 'h' is 30°. What is the length of side 'h'? (Use sin 30° = 0.5)`;
      answer = opp.toString();
      explanation = `sin(30°) = opp/hyp => 0.5 = h/${hyp} => h = ${hyp} * 0.5 = ${opp}.`;
      break;

    case 'Mensuration':
      const radius = getRandomInt(2, 5);
      const height = getRandomInt(5, 10);
      text = `Calculate the volume of a cylinder with radius ${radius}cm and height ${height}cm. Leave your answer in terms of π. (e.g., 50π)`;
      answer = `${radius * radius * height}π`;
      explanation = `Volume = πr²h = π * ${radius}² * ${height} = π * ${radius * radius} * ${height} = ${radius * radius * height}π.`;
      break;

    case 'Statistics':
      const nums = Array.from({ length: 5 }, () => getRandomInt(1, 10)).sort((a, b) => a - b);
      text = `Find the median of these numbers: ${nums.join(', ')}`;
      answer = nums[2].toString();
      explanation = `The median is the middle value when numbers are ordered: ${nums[2]}.`;
      break;

    case 'Geometry':
      const sides = getRandomInt(5, 8);
      const sum = (sides - 2) * 180;
      text = `What is the sum of the interior angles of a regular ${sides}-sided polygon?`;
      answer = sum.toString();
      explanation = `Sum of interior angles = (n - 2) * 180 = (${sides} - 2) * 180 = ${sides - 2} * 180 = ${sum}.`;
      break;

    case 'Vectors':
      const x1 = getRandomInt(1, 5);
      const y1 = getRandomInt(1, 5);
      text = `If vector a = (${x1}, ${y1}), what is the magnitude of 2a? (Give answer as a simplified square root like √50)`;
      const magSquared = (2 * x1) ** 2 + (2 * y1) ** 2;
      answer = `√${magSquared}`;
      explanation = `2a = (${2 * x1}, ${2 * y1}). Magnitude = √(${2 * x1}² + ${2 * y1}²) = √(${ (2 * x1) ** 2 } + ${ (2 * y1) ** 2 }) = √${magSquared}.`;
      break;

    default:
      text = "What is 2 + 2?";
      answer = "4";
      explanation = "Basic addition.";
  }

  return {
    id,
    topic,
    text,
    answer,
    explanation,
    difficulty
  };
};
