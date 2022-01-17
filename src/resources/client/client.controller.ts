import { Controller } from "@nestjs/common";
import { ClientService } from "./client.service";
import { GenericController } from "../../util/generic/generic.controller";
import { Client } from "../../entities/Client";

@Controller("client")
export class ClientController extends GenericController<Client> {
  constructor(private readonly clientService: ClientService) {
    super(clientService);
  }
}
