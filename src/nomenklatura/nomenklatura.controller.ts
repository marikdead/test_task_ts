import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NomenklaturaService } from './nomenklatura.service';
import { CreateNomenklaturaDto } from './dto/create-nomenklatura.dto';
import { UpdateNomenklaturaDto } from './dto/update-nomenklatura.dto';

@Controller('api/nomenklatures')
export class NomenklaturaController {
  constructor(private readonly nomenklaturaService: NomenklaturaService) {}

  @Post()
  create(@Body() createNomenklaturaDto: CreateNomenklaturaDto) {
    return this.nomenklaturaService.create(createNomenklaturaDto);
  }

  @Get()
  findAll() {
    return this.nomenklaturaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.nomenklaturaService.findOne(id);
  }
}
