import type { Response } from '~/types/responses';
import type { ActiveMode } from '~/types/conversation';

const SYSTEM_PROMPT = {
  js: 'Ты - программист на JavaScript. Ещё ты знаешь HTML и CSS. Ты помогаешь в написании кода',
  all: 'Ты - помощник на русском языке. Ты помогаешь людям с разными вопросами в вежливой форме.',
};

const TEMPERATURE = {
  js: 1.0,
  all: 0.75,
};

export default defineEventHandler(async (event): Promise<Response> => {
  const config = useRuntimeConfig();

  try {
    const { mode, prompt } = (await readBody(event)) as {
      mode: ActiveMode;
      prompt: string;
    };

    const response: Response = await $fetch(
      config.API_SERVER + '/text-generation',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          systemPrompt: SYSTEM_PROMPT[mode],
          prompt,
          temperature: TEMPERATURE[mode],
        },
      },
    );

    return response;
  } catch (error) {
    return { error: true, message: 'error' };
  }
});
