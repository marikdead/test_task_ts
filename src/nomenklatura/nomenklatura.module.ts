import { Module } from '@nestjs/common';
import { NomenklaturaService } from './nomenklatura.service';
import { NomenklaturaController } from './nomenklatura.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nomenklature } from './entities/nomenklatura.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Nomenklature])
  ],
  controllers: [NomenklaturaController],
  providers: [NomenklaturaService],
})
export class NomenklaturaModule {}
