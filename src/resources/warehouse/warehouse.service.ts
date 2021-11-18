import {Injectable} from "@nestjs/common";
import {GenericService} from "../../util/generic/generic.service";
import {Warehouse} from "../../entities/Warehouse";
import {WarehouseRepository} from "../../repository/WarehouseRepository";

@Injectable()
export class WarehouseService extends GenericService<Warehouse> {
    constructor(private repository: WarehouseRepository) {
        super(repository,
            [
                "articles", "articles.idArticleSubCategory",
                "articles.idArticleSubCategory.idArticleCategory",
                "articles.idConversion"
            ]);
    }
}
