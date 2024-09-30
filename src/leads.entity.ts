export interface LeadsEntity {
  id: number;
  nationalId: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  email: string;
  status: 'pending' | 'qualified' | 'disqualified';
  validationResults: {
    nationalRegistryCheck: boolean | null;
    judicialRecordsCheck: boolean | null;
    prospectQualificationScore: number | null;
  };
  qualifiedAt?: string;
}
