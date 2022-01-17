import { Module } from "@nestjs/common";
import { DeliveryNoteService } from "./delivery-note.service";
import { DeliveryNoteController } from "./delivery-note.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DeliveryNoteRepository } from "../../repository/DeliveryNoteRepository";

@Module({
  imports: [TypeOrmModule.forFeature([DeliveryNoteRepository])],
  controllers: [DeliveryNoteController],
  providers: [DeliveryNoteService],
})
export class DeliveryNoteModule {}
