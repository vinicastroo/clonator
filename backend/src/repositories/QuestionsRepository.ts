import { EntityRepository, Repository } from 'typeorm';
import { isUuid } from 'uuidv4';
import AppError from '../errors/AppError';
import Question from '../models/Question';

@EntityRepository(Question)
class QuestionsRepository extends Repository<Question> {
  public async findFirst(): Promise<Question | null> {
    const findQuestion = await this.findOne({
      relations: ['next_question_yes', 'next_question_no'],
      order: {
        created_at: 'ASC'
      }
    });

    return findQuestion || null;
  }

  public async findById(id: string): Promise<Question | null> {
    if (!isUuid(id)) {
      throw new AppError('Invalid ID.')
    }

    const findQuestion = await this.findOne({
      relations: ['next_question_yes', 'next_question_no'],
      where: { id },
    });

    return findQuestion || null;
  }
}

export default QuestionsRepository;
