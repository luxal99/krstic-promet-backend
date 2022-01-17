import { Repository } from "typeorm";
import { Client } from "../entities/Client";

export class ClientRepository extends Repository<Client> {}
