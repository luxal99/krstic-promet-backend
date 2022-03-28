import { Controller, Get, HttpStatus, Param, Req, Res } from "@nestjs/common";
import { ClientService } from "./client.service";
import { GenericController } from "../../util/generic/generic.controller";
import { Client } from "../../entities/Client";
import { Request, Response } from "express";
import { Pagination } from "../../annotations/annotations";

@Controller("client")
export class ClientController extends GenericController<Client> {
  constructor(private readonly clientService: ClientService) {
    super(clientService);
  }

  @Get("")
  async getAll(
    @Res() res: Response,
    @Req() req: Request,
    @Pagination() pagination
  ): Promise<void> {
    try {
      const clientResult: [Client[], number] =
        await this.clientService.getAllWithPagination(pagination);
      res.header("TOTAL", JSON.stringify(clientResult[1]));
      res.send(clientResult[0]);
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).send({ err });
    }
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
