import { Module } from "@nestjs/common";
import { WarehouseService } from "./warehouse.service";
import { WarehouseController } from "./warehouse.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WarehouseRepository } from "../../repository/WarehouseRepository";

@Module({
  imports: [TypeOrmModule.forFeature([WarehouseRepository])],
  controllers: [WarehouseController],
  providers: [WarehouseService],
})
export class WarehouseModule {}
