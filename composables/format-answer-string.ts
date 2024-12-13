import type { FormattedAnswerString } from '~/types/conversation';

export const formatAnswerString = (str: string): FormattedAnswerString => {
  const HTML_STRING_CHECK = {
    text: 'html',
    sliceNumber: 4,
  };
  const JS_STRING_CHECK = {
    text: 'javascript',
    sliceNumber: 10,
  };

  const htmlStr: string = str.slice(0, 4);
  const jsStr: string = str.slice(0, 10);

  const answer: FormattedAnswerString = {
    text: str,
    type: 'text',
  };

  if (htmlStr !== HTML_STRING_CHECK.text && jsStr !== JS_STRING_CHECK.text)
    return answer;

  if (htmlStr === HTML_STRING_CHECK.text) {
    answer.text = str.slice(HTML_STRING_CHECK.sliceNumber);
    answer.type = 'code';
  }

  if (jsStr === JS_STRING_CHECK.text) {
    answer.text = str.slice(JS_STRING_CHECK.sliceNumber);
    answer.type = 'code';
  }

  return answer;
};
