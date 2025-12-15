export interface MedicalStaff {
  id: number; // identificatore univoco membro
  name: string; // nome + cognome
  date_of_birth: string; // formato ISO 8601
  role: string; // ruolo
  department: string; // reparto + codice unico (R...)
}
