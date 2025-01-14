import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Exclude,Expose } from 'class-transformer';
@Entity()
class UserEntity {
    @PrimaryGeneratedColumn("uuid")
    public id?: string;

    @Column({ unique: true })
    @Expose()
    public email: string;

    @Column()
    @Exclude()
    public password: string;
    
    @Column()
    @Expose()
    public role: string;

    @Column()
    @Expose()
    public createdAt: Date;

    @Column()
    @Expose()
    public updatedAt: Date;

    
}
export default UserEntity;
