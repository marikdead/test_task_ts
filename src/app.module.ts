import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NomenklaturaController } from './nomenklatura.controller';
import { NomenklaturaService } from './nomenklatura.service'

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '5666',
    database: 'Test_DB',
    logging: true,
    entities: [__dirname + '/**/*.entity{.js, .ts}'],
    synchronize: true,
  }),],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
