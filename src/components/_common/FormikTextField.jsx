import React from "react";
import PropTypes from "prop-types";
import { TextField } from "@mui/material";

const FormikTextField = ({ formikKey, formik, ...props }) => {
  return (
    <TextField
      id={formikKey}
      name={formikKey}
      label="Quantity"
      value={formik.values[formikKey]}
      onChange={formik.handleChange}
      error={!!formik.errors[formikKey]}
      helperText={formik.errors[formikKey]}
      {...props}
    />
  );
};

FormikTextField.propTypes = {
  formikKey: PropTypes.string.isRequired,
  formik: PropTypes.object.isRequired,
};

export default FormikTextField;
