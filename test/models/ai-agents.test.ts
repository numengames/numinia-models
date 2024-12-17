import { AIAgentDocument } from '../../src/models/ai-agents';
import { mongoose, AIAgentModel } from '../../src';
import createAIAgent from '../helpers/create-ai-agent';

const testDatabase = require('../test-db')(mongoose);

describe('AIAgent', () => {
  beforeAll(() => testDatabase.connect());

  afterAll(() => testDatabase.close());

  describe('cuando se crea un nuevo agente AI', () => {
    let aiAgentObject: AIAgentDocument;

    beforeAll(async () => {
      aiAgentObject = await createAIAgent();
    });

    afterAll(() => AIAgentModel.deleteOne({ _id: aiAgentObject.id }));

    test('debería contener todas las propiedades', async () => {
      const aiAgentDocument = <AIAgentDocument>await AIAgentModel.findById(aiAgentObject.id);

      expect(aiAgentDocument._id).toBeDefined();
      expect(aiAgentDocument.createdAt).toBeDefined();
      expect(aiAgentDocument.updatedAt).toBeDefined();
      expect(aiAgentDocument.name).toBe(aiAgentObject.name);
      expect(aiAgentDocument.provider).toBe(aiAgentObject.provider);
      expect(aiAgentDocument.aiAgentId).toBe(aiAgentObject.aiAgentId);
    });
  });
});
