import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from '../repository/users.repository';
import { UpdateMeDto } from '../dto/update-me.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getMe(userId: string) {
    const user = await this.usersRepository.findById(userId);
    if (!user) throw new NotFoundException('Usuário não encontrado.');

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      timezone: user.timezone,
      role: user.role,
      createdAt: user.createdAt,
    };
  }

  async updateMe(userId: string, dto: UpdateMeDto) {
    const updated = await this.usersRepository.updateProfile(userId, dto);
    return {
      id: updated.id,
      name: updated.name,
      email: updated.email,
      timezone: updated.timezone,
    };
  }

  async deleteMe(userId: string) {
    await this.usersRepository.softDelete(userId);
    return { success: true };
  }

  async exportData(userId: string) {
    const user = await this.getMe(userId);
    return {
      exportedAt: new Date().toISOString(),
      user,
      note: 'MVP: incluir sessões, protocolos, compras, consentimentos e logs em próximas iterações.',
    };
  }
}
