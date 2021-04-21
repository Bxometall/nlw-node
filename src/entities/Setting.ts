import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'

class Setting {

  @PrimaryColumn()
  id: string;

  /**
   * if you have a table with stranger names, like BRT_USERNAME and wanna use only username on your Class you can use
   * @Column({ name: 'BRT_USERNAME'})
   * username: string;
   */
  @Column()
  username: string;

  @Column()
  chat: boolean;

  @CreateDateColumn()
  updated_at: Date;
  
  @UpdateDateColumn()
  created_at: Date;
}

export { Setting }