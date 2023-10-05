import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateNomenklaturaDto } from './dto/create-nomenklatura.dto';
import { UpdateNomenklaturaDto } from './dto/update-nomenklatura.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Nomenklature } from './entities/nomenklatura.entity';
import { Links } from 'src/links/entities/link.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NomenklaturaService {

  constructor(
    @InjectRepository(Nomenklature) private readonly nomenklatureRepository: Repository<Nomenklature>,
    @InjectRepository(Links) private readonly linksRepository: Repository<Links>){}

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

  async findOne(id: number): Promise<Nomenklature> {

    const nomenklature = await this.nomenklatureRepository.findOne({ where: { id }, relations: ['parentLinks']});
 
    if (nomenklature && nomenklature.parentLinks.length > 0) {
      const childNomenklatures: Nomenklature[] = await Promise.all(
          nomenklature.parentLinks.map(link => this.findOne(link.nomenklature.id))
      );
      nomenklature.parentLinks.forEach((link, index) => {
          link.nomenklature = childNomenklatures[index];
      });
  }

    return nomenklature
  }

  update(id: number, updateNomenklaturaDto: UpdateNomenklaturaDto) {
    return `This action updates a #${id} nomenklatura`;
  }

  remove(id: number) {
    return `This action removes a #${id} nomenklatura`;
  }
}
