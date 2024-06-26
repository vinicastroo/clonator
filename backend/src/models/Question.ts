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

  /**
   * Tem praia? -> SIM
   *    Floripa? -> NÃO então cai na coluna abaixo
   */

  @Column({ nullable: true })
  next_question_yes_id: string; // A ideia é que se a resposta pra pergunta for SIM mas a sugestão da arvore estiver errada cair aqui


  /**
   * Tem praia? -> NÃO
   *    Próxima pergunta então + cidade pensada.
   */
  @Column({ nullable: true })
  next_question_no_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne((type) => Question, (question) => question.questions_yes)
  @JoinColumn({ name: 'next_question_yes_id' })
  next_question_yes: Question;

  @ManyToOne((type) => Question, (question) => question.questions_no)
  @JoinColumn({ name: 'next_question_no_id' })
  next_question_no: Question;

  @OneToMany((type) => Question, (question) => question.next_question_yes)
  questions_yes: Question[];

  @OneToMany((type) => Question, (question) => question.next_question_yes)
  questions_no: Question[];

}

export default Question;
