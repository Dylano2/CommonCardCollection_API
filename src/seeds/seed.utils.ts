import { ForbiddenException } from '@nestjs/common';
import { stdin as input, stdout as output } from 'node:process';
import * as readline from 'node:readline/promises';
import { base, en, Faker, fr } from '@faker-js/faker';


const rl = readline.createInterface({ input, output });


export const faker: Faker = new Faker({
  locale: [fr, en, base],
});

export const askQuestion = async (
  question: string,
  defaultAnswer: string | number,
  expectedType: 'string' | 'number' | 'yes/no',
  options?: {
    min?: number;
    max?: number;
  },
) => {
  let answer: string | number | boolean = await rl.question(question);

  if (answer === '') {
    answer = String(defaultAnswer);
  }

  if (expectedType === 'number') {
    const parsedAnswer = Number(answer);

    if (isNaN(parsedAnswer)) {
      console.error(`Invalid value: (${answer}) - expected a number`);
      throw new ForbiddenException('Invalid value');
    }

    if (!!options?.min && parsedAnswer < options?.min) {
      console.error(
        `Invalid value: (${answer}) - expected a value greater or equal to ${options?.min}`,
      );
      throw new ForbiddenException('Invalid value');
    }
    if (!!options?.max && parsedAnswer > options?.max) {
      console.error(
        `Invalid value: (${answer}) - expected a value lesser or equal to ${options?.max}`,
      );
      throw new ForbiddenException('Invalid value');
    }

    answer = parsedAnswer;
  } else if (expectedType === 'string') {
    console.error(`Invalid value: (${answer}) - expected a string`);
    throw new ForbiddenException('Invalid value');
  } else if (expectedType === 'yes/no') {
    if (answer === '') {
      answer = defaultAnswer;
    }
    if (
      String(answer).toLowerCase() === 'y' ||
      String(answer).toLowerCase() === 'n'
    ) {
      answer = String(answer).toLowerCase() === 'y';
    } else {
      console.error(`Invalid value : (${answer}) - expected "y" or "no"`);
      throw new ForbiddenException('Invalid value');
    }
  }
  return answer;
};

export const closeReadline = () => {
  rl.close();
};

export function logStart(entity: string) {
  process.stdout.write(`⚠️ Seeding ${entity}`);
}

export function logEnd() {
  process.stdout.write(`🆗`);
  process.stdout.write('\r🌱\n');
}

export function logProgress() {
  process.stdout.write('.');
}