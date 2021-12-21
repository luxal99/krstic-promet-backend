import {PrimaryGeneratedColumn} from "typeorm";

export class Base {
    @PrimaryGeneratedColumn({type: "int", name: "id"})
    id: number;
}
