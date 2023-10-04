import { Nomenklature } from '../../nomenklatura/entities/nomenklatura.entity';

export class CreateLinkDto {
    nomenklatureId: Nomenklature;
    parentId: Nomenklature;
    kol: number;
}
