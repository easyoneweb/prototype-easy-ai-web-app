import type { Response } from '~/types/responses';
import type { ActiveMode } from '~/types/conversation.js';

export const textGeneration = (
  mode: ActiveMode,
  prompt: string,
): Promise<Response> => {
  return $fetch('/api/v1/text-generation', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: {
      mode,
      prompt,
    },
  });
};
