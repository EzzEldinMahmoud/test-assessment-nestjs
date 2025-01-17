import {  ConfigModule, ConfigService } from "@nestjs/config";
import {  JwtModule } from "@nestjs/jwt";
import { User } from "../../../interfaces/Auth.interface";
import { AuthService } from "../auth.services/auth.service"

import * as Joi from "@hapi/joi";
import { Test } from "@nestjs/testing";
import { DatabaseModule } from "../../../modules/database/database.module";
import { AuthModule } from "../auth.module";
import { UserService } from "./user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import UserEntity from "../../../Entities/user.entity";
import { HttpException, HttpStatus } from "@nestjs/common";

let userRANDOM: User = {email:"retryforc213ompletion@gmail.com",password:"testtest"};

describe("The AuthService",()=>{
    let authService:AuthService;
    let userService:UserService;

    beforeEach(async () => {
      const module = await Test.createTestingModule({
        imports: [
          AuthModule,TypeOrmModule.forFeature([UserEntity]),
          ConfigModule.forRoot({
            validationSchema: Joi.object({
              POSTGRES_HOST: Joi.string().required(),
              POSTGRES_PORT: Joi.number().required(),
              POSTGRES_USER: Joi.string().required(),
              POSTGRES_PASSWORD: Joi.string().required(),
              POSTGRES_DB: Joi.string().required(),
              JWT_SECRET: Joi.string().required(),
              JWT_EXPIRATION_TIME: Joi.string().required(),
              PORT: Joi.number(),
            })
          }),
          DatabaseModule,
          JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
              secret: configService.get('JWT_SECRET'),
              signOptions: {
                expiresIn: `${configService.get('JWT_EXPIRATION_TIME')}s`,
              },
            }),
          }),
        ],
        providers: [
          AuthService,UserService
        ],
      }).compile();
      authService = await module.get<AuthService>(AuthService);
      userService = await module.get<UserService>(UserService);

    })

    describe("it should register a new user with User as role",()=>{
        it("it should return the user info or User with that email already exists",async ()=>{
            const findUserByEmail = await userService.findUserByEmail(userRANDOM.email);

            if(!findUserByEmail) {
            expect(typeof (await authService.register(userRANDOM))).toEqual("object")

            } else {

            expect(typeof (await authService.register(userRANDOM))).toBe("string")

            }
        });
    });

    describe("it should make user login",()=>{
      it("it should return AccessToken string",async ()=>{
          expect(typeof await authService.login(userRANDOM)).toEqual('string')
      });
  });

})