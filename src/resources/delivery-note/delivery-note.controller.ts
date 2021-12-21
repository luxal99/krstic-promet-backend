import { Controller } from '@nestjs/common';
import { DeliveryNoteService } from './delivery-note.service';

@Controller('delivery-note')
export class DeliveryNoteController {
  constructor(private readonly deliveryNoteService: DeliveryNoteService) {}
}
