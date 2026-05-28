import { Body, Controller, Delete, Get, Patch, UseGuards } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guard';
import { CurrentUser } from '../../../shared/decorators/current-user.decorator';
import { UpdateMeDto } from '../dto/update-me.dto';

@Controller()
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  getMe(@CurrentUser() user: { sub: string }) {
    return this.usersService.getMe(user.sub);
  }

  @Patch('me')
  patchMe(@CurrentUser() user: { sub: string }, @Body() dto: UpdateMeDto) {
    return this.usersService.updateMe(user.sub, dto);
  }

  @Delete('me')
  deleteMe(@CurrentUser() user: { sub: string }) {
    return this.usersService.deleteMe(user.sub);
  }

  @Get('me/export-data')
  exportData(@CurrentUser() user: { sub: string }) {
    return this.usersService.exportData(user.sub);
  }
}
