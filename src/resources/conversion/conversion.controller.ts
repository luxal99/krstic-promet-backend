import { Controller } from "@nestjs/common";
import { ConversionService } from "./conversion.service";
import { GenericController } from "../../util/generic/generic.controller";
import { Conversion } from "../../entities/Conversion";

@Controller("conversion")
export class ConversionController extends GenericController<Conversion> {
  constructor(private readonly conversionService: ConversionService) {
    super(conversionService);
  }
}
