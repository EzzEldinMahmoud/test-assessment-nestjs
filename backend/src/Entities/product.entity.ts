import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Expose } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

@Entity()
class ProductEntity {
    @PrimaryGeneratedColumn("uuid")
    public id?: string;

    @Column()
    @Expose()
    @ApiProperty({
        type: String,
        description: 'This is an name property',
      })
    public name: string;

    @Column()
    @Expose()
    @ApiProperty({
        type: String,
        description: 'This is an description property',
      })
    public description: string;
    
    @Column('decimal', { precision: 10, scale: 2 })
    @Expose()
    @ApiProperty({
        type: Number,
        description: 'This is an price property',
      })
    public price: number;

    @Column()
    @Expose()
    @ApiProperty({
        type: Number,
        description: 'This is an stock property',
    })
    public stock: number;
    

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
export default ProductEntity;