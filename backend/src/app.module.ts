import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { productModule } from './modules/product/product.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import Joi from '@hapi/joi';
import { DatabaseModule } from './modules/database/database.module';

@Module({
    imports: [productModule, AuthModule, ConfigModule.forRoot({
        validationSchema: Joi.object({
            POSTGRES_HOST: Joi.string().required(),
            POSTGRES_PORT: Joi.number().required(),
            POSTGRES_USER: Joi.string().required(),
            POSTGRES_PASSWORD: Joi.string().required(),
            POSTGRES_DB: Joi.string().required(),
            PORT: Joi.number(),
            ENIVERONMENT: Joi.string().required(),
            encryption: Joi.string().required()
        })
    }), DatabaseModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
