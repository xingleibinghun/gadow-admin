import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

/**
 * 权限
 */
@Entity({
  name: 'permission'
})
export class Permission {
  constructor(partial: Partial<Permission>) {
    Object.assign(this, partial)
  }

  @PrimaryGeneratedColumn()
  id: number

  @Column({
    length: 50
  })
  name: string

  @Column({
    length: 100,
    nullable: true
  })
  desc: string
}
