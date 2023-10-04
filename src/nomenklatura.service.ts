import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Nomenklature } from './nomenklatura.entity';
import { Links } from './links.entity';

@Injectable()
export class NomenklaturaService {

    constructor(
        @InjectRepository(Nomenklature)
        private readonly nomenklatureRepository: Repository<Nomenklature>,
        @InjectRepository(Links)
        private readonly linksRepository: Repository<Links>,
    ) {}

    async getAllNomenklatures(): Promise<Nomenklature[]> {
        return await this.nomenklatureRepository.find();
    }

    getNomenklatureInfo(id: string): any {
    
    }

    addNomenklature(): any {
    
    }
}