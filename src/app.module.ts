import { Module } from '@nestjs/common';
//import { AppController } from './app.controller';
//import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BreedsModule } from './breeds/breeds.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ 
    
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',

      /* host: 'localhost', */
      host: process.env.POSTGRES_HOST,

      /* port: 5436, */
      port: parseInt(process.env.POSTGRES_PORT),

      /* username: 'postgres', */
      username: process.env.POSTGRES_USERNAME,

      /* password: 'postgres', */
      password: process.env.POSTGRES_PASSWORD,

      /* database: 'db_crud', */
      database: process.env.POSTGRES_DATABASE,

      autoLoadEntities: true,
      //entities: [],
      synchronize: true,

      //Codigo para las conexiones SSL
      ssl: process.env.POSTGRES_SSL === "true",
      extra: {
        ssl:
          process.env.POSTGRES_SSL === "true"
            ? {
                rejectUnauthorized: false,
              }
            : null,
      },

    }), CatsModule, BreedsModule, UsersModule, AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
