import {Column, Entity} from "typeorm";
import {Base} from "../util/generic/base.entity";
import {DeliveryNoteStatusEnum} from "../enum/DeliveryNoteStatusEnum";

@Entity()
export class DeliveryNote extends Base {

    @Column("timestamp", {
        name: "created_date",
        nullable: true,
        default: () => "CURRENT_TIMESTAMP",
    })
    createdDate: Date | null;

    @Column({
        type: "enum",
        default: DeliveryNoteStatusEnum.NOT_PAID,
        enum: DeliveryNoteStatusEnum,
        name: "paid_status"
    })
    public paidStatus: DeliveryNoteStatusEnum;
}
