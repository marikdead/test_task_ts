import { Controller, Get, Param, Post, Body, NotFoundException } from '@nestjs/common';
import { NomenklaturaService } from './nomenklatura.service';
import { Nomenklature } from './nomenklatura.entity';

@Controller('nomenklatures')
export class NomenklaturaController {
  constructor(private readonly nomenklaturaService: NomenklaturaService) {}

    @Get()
    async getAllNomenklatures(): Promise<Nomenklature[]> {
        return await this.nomenklaturaService.getAllNomenklatures();
    }
}