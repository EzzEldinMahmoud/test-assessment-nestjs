import { UUID } from "crypto";
import { Column, Entity, PrimaryGeneratedColumn, Timestamp } from "typeorm";

@Entity()
class UserEntity {
    @PrimaryGeneratedColumn("uuid")
    public id?: string;

    @Column({ unique: true })
    public email: string;

    @Column()
    public password: string;
    
    @Column()
    public role: string;

    @Column()
    public createdAt: Date;

    @Column()
    public updatedAt: Date;

    
}
export default UserEntity;
