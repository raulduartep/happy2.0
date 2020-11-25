import * as Yup from 'yup';

interface ValidationErrors {
  [name: string]: string[];
}

async function dataValidation(schema: Yup.ObjectSchema, data: any) {
  try {
    await schema.validate(data, {
      abortEarly: false,
    });

    return null;
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      const errors: ValidationErrors = {};

      error.inner.forEach((err) => {
        errors[err.path] = err.errors;
      });

      return errors;
    }

    throw error;
  }
}

export default dataValidation;
