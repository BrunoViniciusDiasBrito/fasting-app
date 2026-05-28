import { Injectable } from '@nestjs/common';
import { CreateFastingProtocolDto } from '../dto/create-fasting-protocol.dto';
import { FastingProtocolsRepository } from '../repository/fasting-protocols.repository';

@Injectable()
export class FastingProtocolsService {
  constructor(private readonly protocolsRepository: FastingProtocolsRepository) {}

  create(userId: string, dto: CreateFastingProtocolDto) {
    return this.protocolsRepository.create(userId, dto);
  }

  list(userId: string) {
    return this.protocolsRepository.list(userId);
  }
}
