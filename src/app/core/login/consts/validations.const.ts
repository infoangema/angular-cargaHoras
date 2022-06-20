const TYPE = {
  REQUIRED: 'required',
  PATTERN: 'pattern',
  MINLENGTH: 'minlength',
  MAXLENGTH: 'maxlength',
}

export const VALIDATION_MESSAGES = {
  email:  [
    {
      type:  TYPE.REQUIRED,
      message:  'Ingrese su email',
    },
    {
      type: TYPE.PATTERN,
      message: 'El email ingresado no es un formato correcto'
    }
  ],
  password: [
    {
      type: TYPE.REQUIRED,
      message: 'La contraseña debe de ser más de 6 letras'
    },
    {
      type: TYPE.PATTERN,
      message: 'Password con formato incorrecto.'
    },
    {
      type: TYPE.MINLENGTH,
      message: 'El password debe tener al menos 6 caracteres.'
    },
    {
      type: TYPE.MAXLENGTH,
      message: 'El password debe tener como maximo 6 caracteres.'
    }
  ],
  name: [
    {
      type: TYPE.REQUIRED,
      message: 'El password es requerido.'
    }
  ],
};


