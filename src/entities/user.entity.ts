import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, ManyToMany, JoinTable, BeforeInsert } from "typeorm";
import { Property } from "./property.entity";
import * as bcrypt from 'bcrypt';
import { Role } from "src/auth/enum/role";
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: "text" })
  firstName: string

  @Column({ type: "text" })
  lastName: string

  @Column({ unique: true })
  email: string

  @Column({ type: "text" ,nullable:true})
  avatarUrl: string

  @CreateDateColumn()
  createdAt: Date

  @Column({ nullable: true })
  hashedRefreshToken: string;

  @OneToMany(() => Property, (property) => property.user)
  properties: Property[]
  @Column({
    type: "enum",
    enum: Role,
    default: Role.USER,
    comment: "The user's role in the application" 
  })
    
  role:Role
  @Column()
  password: string;

  @ManyToMany(() => Property, (property) => property.likedBy)
  @JoinTable({ name: 'user_liked_properties' })
  likedProperties: Property[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}