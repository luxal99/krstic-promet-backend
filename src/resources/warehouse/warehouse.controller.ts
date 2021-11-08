import {Controller} from "@nestjs/common";
import {WarehouseService} from "./warehouse.service";
import {GenericController} from "../../util/generic/generic.controller";
import {Warehouse} from "../../entities/Warehouse";

@Controller("warehouse")
export class WarehouseController extends GenericController<Warehouse> {
    constructor(private readonly warehouseService: WarehouseService) {
        super(warehouseService);
    }
}
