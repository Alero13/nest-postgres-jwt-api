/* import { Role } from "src/common/role.enum"; */
import { Role } from "../../common/enums/role.enum";
import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    /* @Column({ primary: true, generated: true }) */
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string

    @Column({ unique: true, nullable: false })
    email: string;

    /* @Column({ nullable: false }) */
    @Column({ nullable: false, select: false })
    password: string;

    /* @Column({ default: 'user'})
    role: string; */
    @Column({ type: 'enum', default: Role.USER, enum: Role})
    role: Role;
    
    @DeleteDateColumn()
    deleteAt: Date;

}
