export class DataModalGeneric {
  title: string | undefined;
  icon: string = 'info';
  message: string | undefined;
  showCalendar: boolean = false;
  url: string | undefined;
  userId: number | undefined;
  projectId: number | undefined;
  companyId: number | undefined;
  buttonPrimary: string = 'Aceptar';
  buttonSecondary: string = 'Cancelar';
  showInputFile: boolean = false;
}
