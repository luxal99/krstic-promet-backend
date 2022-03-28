import { Injectable } from "@nestjs/common";
import { GenericService } from "../../util/generic/generic.service";
import { Client } from "../../entities/Client";
import { ClientRepository } from "../../repository/ClientRepository";
import { PaginationDto } from "../../models/dto/PaginationDto";
@Injectable()
export class ClientService extends GenericService<Client> {
  constructor(genericRepository: ClientRepository) {
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
}
