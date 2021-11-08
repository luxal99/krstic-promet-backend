import {Injectable} from "@nestjs/common";
import {GenericService} from "../../util/generic/generic.service";
import {Conversion} from "../../entities/Conversion";
import {ConversionRepository} from "../../repository/ConversionRepository";

@Injectable()
export class ConversionService extends GenericService<Conversion> {

    constructor(private repository: ConversionRepository) {
        super(repository, []);
    }
}
