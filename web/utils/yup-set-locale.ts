import * as yup from 'yup';

const translation = {
  mixed: {
    default: 'campo inválido',
    required: 'campo obligatorio',
    oneOf: 'debe ser uno de los siguientes valores: ${values}',
    notOneOf: 'no puede ser uno de los siguientes valores: ${values}',
  },
  string: {
    length: 'debe ser de ${length} caracteres',
    min: 'debe ser por lo menos ${min} caracteres',
    max: 'debe ser no mayor de ${max} caracteres',
    email: 'debe ser un email válido',
    url: 'debe ser una url válida',
    trim: 'no debe contener espacios al inicio o al final',
    lowercase: 'debe estar en mayúsculas',
    uppercase: 'debe estar en minúsculas',
  },
  number: {
    min: 'debe ser no menor que ${min}',
    max: 'debe ser no mayor que ${max}',
    lessThan: 'debe ser menor que ${less}',
    moreThan: 'debe ser mayor que ${more}',
    notEqual: 'no puede ser igual a ${notEqual}',
    positive: 'debe ser un número positivo',
    negative: 'debe ser un número negativo',
    integer: 'debe ser un número entero',
  },
  date: {
    min: 'debe ser despues de ${min}',
    max: 'debe ser antes de ${max}',
  },
  array: {
    min: 'debe contener mínimo ${min} elementos',
    max: 'debe contener máximo ${max} elementos',
  },
};

yup.setLocale(translation);
