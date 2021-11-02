import { EntityRepository, Repository } from 'typeorm';
import { isUuid } from 'uuidv4';
import AppError from '../errors/AppError';
import Question from '../models/Question';

@EntityRepository(Question)
class QuestionsRepository extends Repository<Question> {
    public async findById(id: string): Promise<Question | null> {
        if(!isUuid(id)) {
          throw new AppError('Invalid ID.')
        }

        const findQuestion = await this.findOne({
            where: { id },
        });

        return findQuestion || null;
    }
}

export default QuestionsRepository;
