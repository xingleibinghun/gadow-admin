import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  CreateDateColumn,
  JoinTable,
  UpdateDateColumn
} from 'typeorm'
import { Permission } from '@/entities'

/**
 * 角色
 */
@Entity({
  name: 'role'
})
export class Role {
  constructor(partial: Partial<Role>) {
    Object.assign(this, partial)
  }

  @PrimaryGeneratedColumn()
  id: number

  @Column({
    length: 20
  })
  name: string

  @CreateDateColumn()
  createTime: Date

  @UpdateDateColumn()
  updateTime: Date

  @ManyToMany(() => Permission)
  @JoinTable({
    name: 'role_permission_relation',
    joinColumns: [{ name: 'role_id' }],
    inverseJoinColumns: [{ name: 'permission_id' }]
  })
  permissions: Permission[]
}
