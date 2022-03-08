import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { GenericInterface } from "./generic.interface";
import { Repository } from "typeorm";

@Injectable()
export class GenericService<T> implements GenericInterface<T> {
  constructor(
    private readonly _genericRepository: Repository<T>,
    private relations: Array<string>
  ) {}

  async delete(id: number) {
    await this._genericRepository.delete(id);
  }

  async findAll(): Promise<T[]> {
    return await this._genericRepository.find({ relations: this.relations });
  }

  get genericRepository(): Repository<T> {
    return this._genericRepository;
  }

  async findOne(id: number): Promise<T> {
    return await this._genericRepository.findOne(id, {
      relations: this.relations,
    });
  }

  async save(entity: T): Promise<T> {
    try {
      //@ts-ignore
      return await this._genericRepository.save(entity);
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  async update(id: number, entity: T): Promise<T> {
    const responseAux: Object = await this._genericRepository.findOne(id);
    if (responseAux == null) throw new NotFoundException("Not exist");

    entity["id"] = Number(id);
    const mergeEntity: any = Object.assign(responseAux, entity);
    return await this._genericRepository.save(mergeEntity);
  }

  async deleteAll(ids: number[]) {
    await this._genericRepository.delete(ids);
  }

  get getRelations(): string[] {
    return this.relations;
  }
}
