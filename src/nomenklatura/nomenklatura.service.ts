import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateNomenklaturaDto } from './dto/create-nomenklatura.dto';
import { UpdateNomenklaturaDto } from './dto/update-nomenklatura.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Nomenklature } from './entities/nomenklatura.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NomenklaturaService {

  constructor(
    @InjectRepository(Nomenklature) private readonly nomenklatureRepository: Repository<Nomenklature>){

  }

  async create(createNomenklaturaDto: CreateNomenklaturaDto) {
    const existNomenklature = await this.nomenklatureRepository.findOne({
      where:{
        name: createNomenklaturaDto.name,

      }
    })
    if (existNomenklature) throw new BadRequestException("This item already exist")

    const nomenklature = await this.nomenklatureRepository.save({
      name: createNomenklaturaDto.name,
      cost: createNomenklaturaDto.cost,
    })
    return {nomenklature};
  }

  async findAll() {
    return await this.nomenklatureRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} nomenklatura`;
  }

  update(id: number, updateNomenklaturaDto: UpdateNomenklaturaDto) {
    return `This action updates a #${id} nomenklatura`;
  }

  remove(id: number) {
    return `This action removes a #${id} nomenklatura`;
  }
}
