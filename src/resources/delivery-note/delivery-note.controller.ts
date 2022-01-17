import { Body, Controller, HttpStatus, Post, Res } from "@nestjs/common";
import { DeliveryNoteService } from "./delivery-note.service";
import { DeliveryNote } from "../../entities/DeliveryNote";
import { Response } from "express";

@Controller("delivery-note")
export class DeliveryNoteController {
  constructor(private readonly deliveryNoteService: DeliveryNoteService) {}
}
