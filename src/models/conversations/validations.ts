import { CallbackWithoutResultAndOptionalError } from 'mongoose';

import { ConversationAttributes, ConversationDocument } from '.';

function validateModelOrAssistant(this: ConversationDocument, next: CallbackWithoutResultAndOptionalError) {
  const doc = this as ConversationAttributes;

  if (!doc.model && !doc.assistant) {
    next(new Error('ConversationError - Either model or assistant must be present'));
  } else {
    next();
  }
}

export { validateModelOrAssistant };
