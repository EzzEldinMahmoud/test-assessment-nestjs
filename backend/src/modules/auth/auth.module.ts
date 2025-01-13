import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.services/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserEntity from 'src/Entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './auth.services/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports:[TypeOrmModule.forFeature([UserEntity]),PassportModule,JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get('JWT_SECRET'),
      signOptions: {
        expiresIn: `${configService.get('JWT_EXPIRATION_TIME')}s`,
      },
    }),
  }),],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy]
})
export class AuthModule {}