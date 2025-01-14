import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.services/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserEntity from 'src/Entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './guard/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserService } from './auth.services/user.service';
import { JwtStrategy } from './guard/JwtStrategy.guard';

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
  providers: [AuthService, LocalStrategy,ConfigService,UserService,JwtStrategy]
})
export class AuthModule {}