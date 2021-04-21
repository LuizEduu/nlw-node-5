import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";
import { v4 as uuid } from 'uuid'

@Entity('messages')
class Message {

  @PrimaryColumn()
  id: string

  @Column()
  admin_id?: string

  @JoinColumn({ name: "user_id" })
  @ManyToOne(type => User)
  user: User

  @Column()
  user_id: string

  @Column()
  text: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }

}

export { Message }