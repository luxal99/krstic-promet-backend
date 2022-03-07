import { Injectable } from "@nestjs/common";
import { GenericService } from "../../util/generic/generic.service";
import { DeliveryNote } from "../../entities/DeliveryNote";
import { DeliveryNoteRepository } from "../../repository/DeliveryNoteRepository";
import { DeliveryNoteQueryDto } from "../../models/dto/DeliveryNoteQueryDto";
import { DeliveryNotePaidStatusEnum } from "../../enum/DeliveryNotePaidStatusEnum";

@Injectable()
export class DeliveryNoteService extends GenericService<DeliveryNote> {
  constructor(private repository: DeliveryNoteRepository) {
    super(repository, [
      "listOfArticles",
      "listOfArticles.idArticle",
      "listOfArticles.idDeliveryNote",
      "idClient",
    ]);
  }

  async getAllWithQuery(
    deliveryNoteQueryDto: DeliveryNoteQueryDto
  ): Promise<[DeliveryNote[], number]> {
    return await this.repository
      .createQueryBuilder("deliveryNote")
      .leftJoinAndSelect("deliveryNote.listOfArticles", "listOfArticles")
      .leftJoinAndSelect("listOfArticles.idArticle", "idArticle")
      .leftJoinAndSelect("listOfArticles.idDeliveryNote", "idDeliveryNote")
      .leftJoinAndSelect("deliveryNote.idClient", "idClient")
      .take(deliveryNoteQueryDto.pagination.rows)
      .skip(
        deliveryNoteQueryDto.pagination.page *
          deliveryNoteQueryDto.pagination.rows
      )
      .where(
        "deliveryNote.dateOfDeliveryNote >= :startDate AND deliveryNote.dateOfDeliveryNote <= :endDate",
        {
          startDate: deliveryNoteQueryDto.startDate,
          endDate: deliveryNoteQueryDto.endDate,
        }
      )
      .getManyAndCount();
  }

  async findById(id: number): Promise<DeliveryNote> {
    return await this.repository.findOne({
      where: { id },
      relations: this.getRelations,
    });
  }

  async findDeliveryNoteByPaidStatus(
    paidStatus: DeliveryNotePaidStatusEnum
  ): Promise<DeliveryNote[]> {
    return await this.repository.find({
      where: { paidStatus },
      relations: this.getRelations,
    });
  }

  async findDeliveryNoteByDeliveryStatus(
    deliveryStatus: DeliveryNotePaidStatusEnum
  ): Promise<DeliveryNote[]> {
    return await this.repository.find({
      where: { deliveryStatus },
      relations: this.getRelations,
    });
  }
}
