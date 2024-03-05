import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable
} from 'typeorm'
import { Exclude, Expose } from 'class-transformer'
import { IsEmail } from 'class-validator'
import { USER_SEX_MAP } from '@/common/dictionary'
import { Role } from '@/entities'

const defaultData = {
  avatar: '',
  sex: 0,
  isActive: true,
  isBanned: false
}

/**
 * 用户
 */
@Entity({
  name: 'user'
})
export class User {
  constructor(partial: Partial<User>) {
    Object.assign(this, partial)
  }

  @PrimaryGeneratedColumn()
  userId: number

  @Column({
    length: 17,
    unique: true
  })
  username: string

  @Column()
  @Exclude()
  password: string

  @Column({ default: '' })
  avatar: string

  @Column({ default: 0 })
  sex: 0 | 1 | 2

  @Column({
    length: 80,
    unique: true
  })
  @IsEmail()
  email: string

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'user_role_relation'
  })
  roles?: Role[]

  @Column({
    type: 'boolean',
    default: true
  })
  isActive: boolean

  @Column({
    type: 'boolean',
    default: false
  })
  isBanned: boolean

  @Column({
    type: 'boolean',
    default: false
  })
  isAdmin: boolean

  @Expose()
  sexName() {
    return USER_SEX_MAP[this.sex || defaultData.sex]
  }
}
