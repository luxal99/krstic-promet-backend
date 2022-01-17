import { EntityRepository, Repository } from "typeorm";
import { Conversion } from "../entities/Conversion";

@EntityRepository(Conversion)
export class ConversionRepository extends Repository<Conversion> {}
