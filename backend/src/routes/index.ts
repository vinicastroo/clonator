import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import QuestionsRepository from '../repositories/QuestionsRepository';
import CreateQuestionService from '../services/CreateQuestionService';

const routes = Router();

routes.get('/', async (request, response) => {
  const questionsRepository = getCustomRepository(QuestionsRepository);

  const questions = await questionsRepository.find();

  return response.json(questions);
});

routes.get('/:id', async (request, response) => {
  const { id } = request.params;

  const questionsRepository = getCustomRepository(QuestionsRepository);

  const question = await questionsRepository.findById(id);

  return response.json(question);
});

routes.post('/', async (request, response) => {
  const { id, description, answer, nextQuestionId } = request.body;

  const createQuestionService = new CreateQuestionService();

  const question = await createQuestionService.execute({
    id,
    description,
    answer,
    nextQuestionId
  });

  return response.json(question);
});

export default routes;
