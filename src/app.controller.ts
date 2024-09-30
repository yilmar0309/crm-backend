import { Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { LeadsEntity } from './leads.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('leads')
  async findAllLeads(): Promise<LeadsEntity[]> {
    return this.appService.findAllLeads();
  }

  @Get('prospects')
  async findAllProspects(): Promise<LeadsEntity[]> {
    return this.appService.findAllProspects();
  }

  @Post('leads/:id/validate')
  validateLead(@Param('id') id: number): LeadsEntity | string {
    const lead = this.appService.validateLead(Number(id));
    if (!lead) {
      return 'Lead not found';
    }
    return lead;
  }
}
