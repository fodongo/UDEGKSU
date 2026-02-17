export interface Researcher {
  id: string;
  name: string;
  photoUrl: string;
  researchLine: string;
  biography: string;
  institution: 'UDG' | 'KSU' | 'Other';
}

export type Institution = 'UDG' | 'KSU' | 'Other';