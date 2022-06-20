export const REGEX_CONSTANTS = {
  alphabetical: '^[a-zA-ZñÑáéíóúÁÉÍÓÚçäÄëïöÖÿÜü \'\`\´\-]+$',
  numeric: '/^[1-9]\d{6,10}$/',
  numbers: '^[0-9]+$',
  cuil: '^[0-9-]*$',
  postalCode: '^[0-9]{4}$|^[a-zA-Z]{1}[0-9]{4}[a-zA-Z]{3}$',
  password: '/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])([a-zA-Z0-9]){6,}$/',
  email: '/^\\S+@\\S+\\.\\S+$/',
}
