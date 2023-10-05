import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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

  async findOne(id: number, parentQuantity: number = 1): Promise<any> {
    const nomenklature = await this.nomenklatureRepository.findOne({
        where: { id },
        relations: ["parentLinks", "parentLinks.nomenklature"],
    });

    if (!nomenklature) {
        throw new NotFoundException(`Product with id ${id} not found`);
    }

    let totalCost = nomenklature.cost * parentQuantity;
    const childProducts: any[] = [];

    if (nomenklature.parentLinks && nomenklature.parentLinks.length > 0) {
        for (const link of nomenklature.parentLinks) {
            const childProduct = link.nomenklature;
            const childQuantity = link.kol;
            const childCost = childProduct.cost * childQuantity;
            const childProductInfo = await this.findOne(childProduct.id, childQuantity);
            totalCost += childProductInfo.totalCost * parentQuantity;
            childProducts.push(childProductInfo);
        }
    }

    return {
        id: nomenklature.id,
        name: nomenklature.name,
        cost: nomenklature.cost,
        quantity: parentQuantity,
        totalCost,
        childProducts,
    };
  }
}

