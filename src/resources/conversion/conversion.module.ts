import {Module} from "@nestjs/common";
import {ConversionService} from "./conversion.service";
import {ConversionController} from "./conversion.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConversionRepository} from "../../repository/ConversionRepository";

@Module({
    imports: [TypeOrmModule.forFeature([ConversionRepository])],
    controllers: [ConversionController],
    providers: [ConversionService]
})
export class ConversionModule {
}
