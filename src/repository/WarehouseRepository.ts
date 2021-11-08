import {EntityRepository, Repository} from "typeorm";
import {Warehouse} from "../entities/Warehouse";

@EntityRepository(Warehouse)
export class ArticleRepository extends Repository<Warehouse> {

}
