import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('question')
class Question {

	@PrimaryGeneratedColumn('uuid')
	id: string;

  @Column()
  description: string;

  @Column()
  answer: string;

  @Column({ nullable: true })
  next_question_id: string;

  @ManyToOne(type => Question, question => question.question)
  @JoinColumn({name: 'next_question_id'})
  parent: Question;

  @OneToMany(type => Question, question => question.parent)
  question: Question[];

}

export default Question;
