import {EntityRepository, Repository} from "typeorm";
import {Warehouse} from "../entities/Warehouse";

@EntityRepository(Warehouse)
export class WarehouseRepository extends Repository<Warehouse> {

}
