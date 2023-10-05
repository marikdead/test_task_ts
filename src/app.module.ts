import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NomenklaturaModule } from './nomenklatura/nomenklatura.module';
import { LinksModule } from './links/links.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '5666',
    database: 'Test_DB',
    logging: false,
    entities: [__dirname + '/**/*.entity{.js, .ts}'],
    synchronize: true,
  }), NomenklaturaModule, LinksModule,],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
