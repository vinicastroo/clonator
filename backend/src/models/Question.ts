import {
  Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';

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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne((type) => Question, (question) => question.question)
  @JoinColumn({ name: 'next_question_id' })
  parent: Question;

  @OneToMany((type) => Question, (question) => question.parent)
  question: Question[];
}

export default Question;
