import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.services/product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import ProductEntity from 'src/Entities/product.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AdminRoleStrategy } from './Product_Guards/roles.guard';
import { UserService } from '../auth/auth.services/user.service';
import UserEntity from 'src/Entities/user.entity';

@Module({
  controllers: [ProductController],
  providers: [ProductService,ConfigService,AdminRoleStrategy,UserService],
  imports:[TypeOrmModule.forFeature([ProductEntity,UserEntity]),PassportModule,JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get('JWT_EXPIRATION_TIME')}s`,
        },
      }),
    }),]
})
export class productModule {}