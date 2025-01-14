import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Expose } from 'class-transformer';

@Entity()
class ProductEntity {
    @PrimaryGeneratedColumn("uuid")
    public id?: string;

    @Column()
    @Expose()
    public name: string;

    @Column()
    @Expose()
    public description: string;
    
    @Column('decimal', { precision: 10, scale: 2 })
    @Expose()
    public price: number;

    @Column()
    @Expose()
    public stock: number;
    

    @Column()
    @Expose()
    public createdAt: Date;

    @Column()
    @Expose()
    public updatedAt: Date;

    
}
export default ProductEntity;