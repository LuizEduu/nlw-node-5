import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Message } from './Message';

@Entity('users')
class User {
  @PrimaryColumn()
  id: string;

  @Column()
  email: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(type => Message, message => message.user)
  messages: Message[]

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { User };
