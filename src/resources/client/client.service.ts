import { Injectable } from "@nestjs/common";
import { GenericService } from "../../util/generic/generic.service";
import { Client } from "../../entities/Client";
import { ClientRepository } from "../../repository/ClientRepository";
import { PaginationDto } from "../../models/dto/PaginationDto";
import { DeliveryNoteService } from "../delivery-note/delivery-note.service";
import { DeliveryNote } from "../../entities/DeliveryNote";
import { ClientQueryDto } from "../../models/dto/ClientQueryDto";

@Injectable()
export class ClientService extends GenericService<Client> {
  constructor(
    genericRepository: ClientRepository,
    private deliveryNoteService: DeliveryNoteService
  ) {
    super(genericRepository, []);
  }

  async getAllWithPagination(
    pagination: PaginationDto
  ): Promise<[Client[], number]> {
    return this.genericRepository
      .createQueryBuilder("client")
      .take(pagination.rows)
      .skip(pagination.rows * pagination.page)
      .getManyAndCount();
  }

  async searchForClient(searchText: string): Promise<Client[]> {
    return await this.genericRepository
      .createQueryBuilder("client")
      .where("LOWER(client.firstName) like :firstName", {
        firstName: `%${searchText}%`,
      })
      .orWhere("LOWER(client.lastName) like :lastName", {
        lastName: `%${searchText}%`,
      })
      .getMany();
  }

  async getTotalDebtForClient(id: number): Promise<{ totalDebt: "0" }> {
    return await this.genericRepository
      .createQueryBuilder("client")
      .leftJoinAndSelect("client.listOfDeliveryNotes", "listOfDeliveryNotes")
      .leftJoinAndSelect("listOfDeliveryNotes.listOfArticles", "listOfArticles")
      .select(
        "SUM(listOfArticles.sellingPrice * listOfArticles.amount) as totalDebt"
      )
      .where("listOfDeliveryNotes.paidStatus = 'NOT_PAID'")
      .andWhere("client.id = :id", { id })
      .getRawOne();
  }

  async getTotalPaidForClient(id: number): Promise<{ totalPaid: "0" }> {
    return await this.genericRepository
      .createQueryBuilder("client")
      .leftJoinAndSelect("client.listOfDeliveryNotes", "listOfDeliveryNotes")
      .leftJoinAndSelect("listOfDeliveryNotes.listOfArticles", "listOfArticles")
      .select(
        "SUM(listOfArticles.sellingPrice * listOfArticles.payedAmount) as totalPaid"
      )
      .where("client.id = :id", { id })
      .getRawOne();
  }

  async getDeliveryNotesForClient(
    idClient: number,
    clientQuery: ClientQueryDto
  ): Promise<[DeliveryNote[], number]> {
    let query = this.deliveryNoteService.genericRepository
      .createQueryBuilder("deliveryNotes")
      .leftJoinAndSelect("deliveryNotes.listOfArticles", "listOfArticles")
      .leftJoinAndSelect("listOfArticles.idArticle", "idArticle")
      .leftJoinAndSelect("listOfArticles.idDeliveryNote", "idDeliveryNote")
      .leftJoinAndSelect("deliveryNotes.idClient", "idClient")
      .where("deliveryNotes.idClient.id = :idClient", { idClient })
      .take(clientQuery.pagination.rows)
      .skip(clientQuery.pagination.rows * clientQuery.pagination.page)
      .orderBy("deliveryNotes.dateOfDeliveryNote", "DESC");

    if (clientQuery.dateQueryDto) {
      query
        .andWhere("deliveryNotes.dateOfDeliveryNote >= :startDate", {
          startDate: clientQuery.dateQueryDto.startDate,
        })
        .andWhere("deliveryNotes.dateOfDeliveryNote <= :endDate", {
          endDate: clientQuery.dateQueryDto.endDate,
        });
    }

    return query.getManyAndCount();
  }
}
