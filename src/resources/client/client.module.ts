import { Module } from "@nestjs/common";
import { ClientService } from "./client.service";
import { ClientController } from "./client.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClientRepository } from "../../repository/ClientRepository";
import { DeliveryNoteRepository } from "../../repository/DeliveryNoteRepository";
import { DeliveryNoteService } from "../delivery-note/delivery-note.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([ClientRepository, DeliveryNoteRepository]),
  ],
  controllers: [ClientController],
  providers: [ClientService, DeliveryNoteService],
})
export class ClientModule {}
