type Message = {
  self: boolean,
  text: string,
  type?: 'text' | 'code'
}

type Conversation = [ Message? ]

type ActiveMode = 'js' | 'all'

type Mode = {
  type: ActiveMode,
  text: string
}

type Modes = [ Mode? ]

type FormattedAnswerString = {
  text: string,
  type: 'text' | 'code'
}

export {
  Message,
  Conversation,
  ActiveMode,
  Mode,
  Modes,
  FormattedAnswerString
}