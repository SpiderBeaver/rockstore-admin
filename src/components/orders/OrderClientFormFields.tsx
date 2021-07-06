import { TextField } from '@material-ui/core';
import { FieldInputProps, FormikErrors, FormikTouched } from 'formik';
import React from 'react';
import * as Yup from 'yup';

export interface OrderClientValues {
  name: string;
  email: string;
  address: string;
  phoneNumber: string;
}

export const orderClientValuesValidationSchema = Yup.object({
  name: Yup.string().required('Required'),
  email: Yup.string().required('Required'),
  address: Yup.string().required('Required'),
  phoneNumber: Yup.string().required('Required'),
});

export interface OrderClientFormFieldsProps {
  // Since getFieldProps uses strings, in case of nested structures we need the prefix.
  fieldNamePrefix: string;
  getFieldProps: (nameOrOptions: any) => FieldInputProps<any>;
  errors: FormikErrors<OrderClientValues> | undefined;
  touched: FormikTouched<OrderClientValues> | undefined;
}
export default function OrderClientFormFields({
  fieldNamePrefix,
  getFieldProps,
  errors,
  touched,
}: OrderClientFormFieldsProps) {
  return (
    <>
      <TextField
        label="Name"
        variant="outlined"
        {...getFieldProps(fieldNamePrefix + 'name')}
        error={errors?.name !== undefined && touched?.name}
        helperText={errors?.name}
      ></TextField>
      <TextField
        label="Email"
        variant="outlined"
        {...getFieldProps(fieldNamePrefix + 'email')}
        error={errors?.email !== undefined && touched?.email}
        helperText={errors?.email}
      ></TextField>
      <TextField
        label="Address"
        variant="outlined"
        {...getFieldProps(fieldNamePrefix + 'address')}
        error={errors?.address !== undefined && touched?.address}
        helperText={errors?.address}
      ></TextField>
      <TextField
        label="Phone number"
        variant="outlined"
        {...getFieldProps(fieldNamePrefix + 'phoneNumber')}
        error={errors?.phoneNumber !== undefined && touched?.phoneNumber}
        helperText={errors?.phoneNumber}
      ></TextField>
    </>
  );
}
