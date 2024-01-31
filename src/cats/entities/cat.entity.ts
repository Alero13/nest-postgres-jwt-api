import { Breed } from "../../breeds/entities/breed.entity";
import { User } from "../../users/entities/user.entity";
import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne } from "typeorm"

@Entity()
export class Cat {
    //@PrimaryGeneratedColumn()
    @Column( {primary: true, generated: true} )
    id: number;

    @Column()
    name: string;

    @Column()
    age: number;

    /* @Column()
    breed: string; */

    @DeleteDateColumn()
    deletedAte: Date;

    @ManyToOne( () => Breed , (breed) => breed.id, {
        eager: true
    } )
    /* breed_id: number */
    breed: Breed

    @ManyToOne( () => User )
    @JoinColumn( {name: 'userEmail', referencedColumnName: 'email'} )
    Usuario: User;

    @Column()
    userEmail: string
}
