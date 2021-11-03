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

  @ManyToOne(() => Question, question => question.next_question)
  @JoinColumn({ name: 'next_question_id' })
  parent: Question;

  @OneToMany(() => Question, question => question.parent)
  next_question: Question[];

}

export default Question;
