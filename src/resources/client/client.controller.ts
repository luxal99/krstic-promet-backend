import { Controller, Get, HttpStatus, Param, Res } from "@nestjs/common";
import { ClientService } from "./client.service";
import { GenericController } from "../../util/generic/generic.controller";
import { Client } from "../../entities/Client";
import { Response } from "express";

@Controller("client")
export class ClientController extends GenericController<Client> {
  constructor(private readonly clientService: ClientService) {
    super(clientService);
  }

  @Get("/delivery-notes/:id")
  async findAllDeliveryNotesByClientId(
    @Param("id") id: number,
    @Res() res: Response
  ) {
    try {
      this.clientService.genericRepository
        .findOne({
          where: { id },
          relations: [
            "listOfDeliveryNotes",
            "listOfDeliveryNotes.idClient",
            "listOfDeliveryNotes.listOfArticles",
            "listOfDeliveryNotes.listOfArticles.idArticle",
          ],
        })
        .then((resp) => {
          if (resp) {
            res.send(resp.listOfDeliveryNotes);
          }
        });
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).send({ err });
    }
  }
}
