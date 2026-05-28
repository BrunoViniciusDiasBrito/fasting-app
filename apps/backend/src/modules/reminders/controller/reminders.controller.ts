import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guard';
import { CurrentUser } from '../../../shared/decorators/current-user.decorator';
import { RemindersService } from '../service/reminders.service';
import { CreateReminderDto } from '../dto/create-reminder.dto';
import { UpdateReminderDto } from '../dto/update-reminder.dto';

@Controller('reminders')
@UseGuards(JwtAuthGuard)
export class RemindersController {
  constructor(private readonly remindersService: RemindersService) {}

  @Post()
  create(@CurrentUser() user: { sub: string }, @Body() dto: CreateReminderDto) {
    return this.remindersService.create(user.sub, dto);
  }

  @Get()
  list(@CurrentUser() user: { sub: string }) {
    return this.remindersService.list(user.sub);
  }

  @Patch(':id')
  update(@CurrentUser() user: { sub: string }, @Param('id') id: string, @Body() dto: UpdateReminderDto) {
    return this.remindersService.update(user.sub, id, dto);
  }

  @Delete(':id')
  delete(@CurrentUser() user: { sub: string }, @Param('id') id: string) {
    return this.remindersService.delete(user.sub, id);
  }
}
