export class DataModalGeneric {
  title: string | undefined;
  icon: string = 'info';
  message: string | undefined;
  url: string | undefined;
  userId: number | undefined;
  projectId: number | undefined;
  companyId: number | undefined;
  buttonPrimary: string = 'Aceptar';
  buttonSecondary: string = 'Cancelar';
}
