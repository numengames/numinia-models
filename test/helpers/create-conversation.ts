import { ConversationModel, constants } from '../../src';
import { ConversationAttributes } from '../../src/interfaces';

interface Params extends Partial<ConversationAttributes> {
  conversationType?: string;
}

export default async (params: Params = {}) => {
  const query: Partial<ConversationAttributes> = {
    name: params.name || 'test',
    origin: params.origin || constants.ConversationOrigins.WEB,
    type: params.conversationType || constants.ConversationTypes.CHATGPT,
  };

  return ConversationModel.create({
    ...query,
    ...params,
  });
};
