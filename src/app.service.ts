import { Injectable } from '@nestjs/common';
import { LeadsEntity } from './leads.entity';
import { leadsLocalDb } from './fakeLeadsDB';

@Injectable()
export class AppService {
  private leads: LeadsEntity[] = leadsLocalDb;

  private prospects: LeadsEntity[] = [];

  private simulateNetworkDelay<T>(result: T, delay: number): Promise<T> {
    return new Promise((resolve) => setTimeout(() => resolve(result), delay));
  }

  async findAllLeads(): Promise<LeadsEntity[]> {
    const leads = this.leads.filter((lead) => lead.status === 'pending');
    return this.simulateNetworkDelay(leads, 1000);
  }

  async findAllProspects(): Promise<LeadsEntity[]> {
    return this.simulateNetworkDelay(this.prospects, 1000);
  }

  validateLead(id: number): LeadsEntity | null {
    const lead = this.leads.find((lead) => lead.id === id);
    if (!lead) return null;

    lead.validationResults.nationalRegistryCheck = Math.random() > 0.1;

    lead.validationResults.judicialRecordsCheck = Math.random() > 0.1;

    if (
      lead.validationResults.nationalRegistryCheck &&
      lead.validationResults.judicialRecordsCheck
    ) {
      lead.validationResults.prospectQualificationScore = Math.floor(
        Math.random() * 101,
      );
      if (lead.validationResults.prospectQualificationScore > 60) {
        lead.status = 'qualified';
        lead.qualifiedAt = new Date().toISOString();
        console.log('lead', lead);
        this.prospects.push(lead);
        this.leads = this.leads.filter((l) => l.id !== id);
      } else {
        lead.status = 'disqualified';
      }
    } else {
      lead.status = 'disqualified';
    }

    return lead;
  }
}
