import { Controller, Get, HttpStatus, Param, Req, Res } from "@nestjs/common";
import { ClientService } from "./client.service";
import { GenericController } from "../../util/generic/generic.controller";
import { Client } from "../../entities/Client";
import { Request, Response } from "express";
import { Pagination, QQuery, Search } from "../../annotations/annotations";
import { ClientQueryDto } from "../../models/dto/ClientQueryDto";
import { TOTAL_HEADER } from "../../constant/constant";

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
      res.header(TOTAL_HEADER, JSON.stringify(clientResult[1]));
      res.send(clientResult[0]);
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).send({ err });
    }
  }

  @Get("search")
  async searchForClient(
    @Res() res: Response,
    @Req() req: Request,
    @Search() search: string
  ): Promise<void> {
    try {
      res.send(await this.clientService.searchForClient(search));
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).send({ err });
    }
  }

  @Get("/delivery-notes/:id")
  async findAllDeliveryNotesByClientId(
    @Param("id") id: number,
    @Res() res: Response,
    @QQuery() qquery: ClientQueryDto
  ) {
    try {
      const result = await this.clientService.getDeliveryNotesForClient(
        id,
        qquery
      );

      res.setHeader(TOTAL_HEADER, result[1]);
      res.send(result[0]);
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).send({ err });
    }
  }

  @Get(":id/debt")
  async getTotalDebt(
    @Res() res: Response,
    @Req() req: Request,
    @Param("id") id: number
  ) {
    try {
      res.send(await this.clientService.getTotalDebtForClient(id));
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).send({ err });
    }
  }

  @Get(":id/paid")
  async getTotalPaid(
    @Res() res: Response,
    @Req() req: Request,
    @Param("id") id: number
  ) {
    try {
      res.send(await this.clientService.getTotalPaidForClient(id));
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).send({ err });
    }
  }
}
