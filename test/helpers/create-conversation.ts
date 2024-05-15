import { ConversationModel, constants } from '../../src';
import { ConversationAttributes } from '../../src/interfaces';

interface Params extends Partial<ConversationAttributes> {
  conversationType?: string;
}

export default async (params: Params = {}) => {
  const query: Partial<ConversationAttributes> = {
    origin: params.origin || constants.ConversationOrigins.WEB,
    type: params.conversationType || constants.ConversationTypes.CHATGPT,
  };

  return ConversationModel.create({
    ...query,
    ...params,
  });
};
