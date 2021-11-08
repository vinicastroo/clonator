import { getCustomRepository } from 'typeorm';
import { isUuid } from 'uuidv4';

// import AppError from '../errors/AppError';
import Question from '../models/Question';
import QuestionsRepository from '../repositories/QuestionsRepository';

interface RequestDTO {
  id: string;
  description: string;
  answer: string;
  typeQuestion: 'YES' | 'NO';
}

class CreateQuestionService {
    public async execute({ id, description, answer, typeQuestion }: RequestDTO): Promise<Question> {
        const questionsRepository = getCustomRepository(QuestionsRepository);

        const question = questionsRepository.create({
          description,
          answer,
        });

        await questionsRepository.save(question);

        if(isUuid(id)) {
          const parentQuestion = await questionsRepository.findOne({
            where: {id}
          });


          if(parentQuestion) {
            parentQuestion[
              typeQuestion === 'YES' ? 'next_question_yes_id' : 'next_question_no_id'
            ] = question.id;

            await questionsRepository.save(parentQuestion);
          }
        }

        return question;
    }
}

export default CreateQuestionService;
