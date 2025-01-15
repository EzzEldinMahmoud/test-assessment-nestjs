import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Exclude,Expose } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
@Entity()
class UserEntity {
    @PrimaryGeneratedColumn("uuid")
    public id?: string;

    @Column({ unique: true })
    @Expose()
    @ApiProperty({
            type: String,
            description: 'This is an email property',
        })
    public email: string;

    @Column()
    @Exclude()
    @ApiProperty({
        type: String,
        description: 'This is password property',
    })
    public password: string;
    
    @Column()
    @Expose()
    @ApiPropertyOptional({
        type: String,
        description: 'This is role property',
    })
    public role: string;

    @Column()
    @Expose()
    @ApiPropertyOptional({
        type: Date,
        description: 'This is an createdAt optional property',
    })
    public createdAt: Date;

    @Column()
    @Expose()
    @ApiPropertyOptional({
        type: Date,
        description: 'This is an updatedAt optional property',
    })
    public updatedAt: Date;

    
}
export default UserEntity;
