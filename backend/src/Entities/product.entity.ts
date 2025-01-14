import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
class ProductEntity {
    @PrimaryGeneratedColumn("uuid")
    public id?: string;

    @Column()
    public name: string;

    @Column()
    public description: string;
    
    @Column('decimal', { precision: 10, scale: 2 })
    public price: number;

    @Column()
    public stock: number;
    

    @Column()
    public createdAt: Date;

    @Column()
    public updatedAt: Date;

    
}
export default ProductEntity;