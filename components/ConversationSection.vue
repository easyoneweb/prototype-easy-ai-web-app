<template>
  <div class="flex justify-around w-1/4 mb-10">
    <button
      v-for="mode in modes"
      :key="mode.type"
      class="py-2 px-3 rounded-md"
      :class="{
        'bg-slate-300': mode.type !== activeMode,
        'bg-green-300': mode.type === activeMode,
      }"
      @click="changeMode(mode)"
    >
      {{ mode.text }}
    </button>
  </div>

  <div
    ref="conversation-div"
    class="snap-y overflow-auto w-1/2 min-h-64 flex flex-col justify-end rounded-md border border-slate-300 mb-10 py-2 px-3 shadow-2xl bg-slate-50"
  >
    <div
      v-for="(message, index) in conversation"
      :key="index"
      class="snap-end my-2 py-2 px-3 rounded-md"
      :class="{
        'bg-green-400': !message.self && !messageIsCode(message),
        'me-20': !message.self,
        'bg-blue-400': message.self && !messageIsCode(message),
        'ms-20': message.self,
        'bg-slate-200': messageIsCode(message),
      }"
    >
      <pre v-if="messageIsCode(message) && message?.text.trim().length">
          {{ message.text }}
        </pre
      >
      <span v-if="!messageIsCode(message)">
        {{ message.text }}
      </span>
    </div>

    <div
      v-if="loadingData"
      class="snap-end my-2 py-2 px-3 rounded-md w-10 bg-gray-200"
    >
      ...
    </div>
  </div>

  <div class="w-1/2 flex justify-center items-center mb-10">
    <input
      id=""
      v-model="question"
      class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 px-3 shadow-md focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm disabled:opacity-25"
      name="ask"
      placeholder="Задайте свой вопрос..."
      :disabled="loadingData"
    />
    <button
      class="rounded-full bg-purple-700 hover:bg-purple-800 active:bg-purple-900 text-white ms-3 px-3 py-2 disabled:opacity-25"
      :disabled="loadingData"
      @click="sendRequest"
    >
      Отправить
    </button>
  </div>
</template>

<script setup lang="ts">
import type { Response } from '~/types/responses';
import type {
  Message,
  Conversation,
  ActiveMode,
  Mode,
  Modes,
} from '~/types/conversation';

const conversationDiv = useTemplateRef('conversation-div');
const conversation: Ref<Conversation> = ref([]);
const question: Ref<string> = ref('');
const activeMode: Ref<ActiveMode> = ref('js');
const loadingData: Ref<boolean> = ref(false);

const modes: Modes = [
  {
    type: 'js',
    text: 'Разработчик JavaScript',
  },
  {
    type: 'all',
    text: 'Помощник',
  },
];

function changeMode(newMode: Mode): void {
  activeMode.value = newMode.type;
}

function addMessage(message: Message): void {
  conversation.value.push(message);
}

function messageIsCode(message: Message) {
  return message.type === 'code';
}

async function sendRequest(): Promise<void> {
  if (!question.value.length) return;

  loadingData.value = true;

  addMessage({
    self: true,
    text: question.value,
  });

  let answerArr: [string?] = [];

  try {
    const response: Response = await textGeneration(
      activeMode.value,
      question.value,
    );

    answerArr = response.answer.split('```') || [];
  } catch (error) {
    alert(error.message);
  }

  loadingData.value = false;

  if (!answerArr.length) return;

  question.value = '';

  answerArr.forEach((answer) => {
    const formattedAnswer = formatAnswerString(answer || '');

    addMessage({
      self: false,
      text: formattedAnswer.text,
      type: formattedAnswer.type,
    });
  });

  setTimeout(() => {
    if (conversationDiv.value)
      conversationDiv.value.scrollTop = conversationDiv.value.scrollHeight;
  }, 200);
}
</script>
