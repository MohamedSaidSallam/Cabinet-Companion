import React, { useEffect, useRef } from "react";
import Header from "../components/Header";
import {
  Backdrop,
  CircularProgress,
  FormControl,
  IconButton,
  TextField,
} from "@mui/material";
import Button from "../components/_common/Button";
import DatePicker from "@mui/lab/DatePicker";
import styles from "./AddItem.module.css";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import ImageIcon from "@mui/icons-material/Image";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router";
import ClearIcon from "@mui/icons-material/Clear";
import { useFormik } from "formik";
import * as Yup from "yup";
import FormikTextField from "../components/_common/FormikTextField";
import useCreateItem from "../query/useCreateItem";
import { queryClient } from "../App";
import { useAuth0 } from "@auth0/auth0-react";

const UNITS = ["Kg", "Gram", "oz", "fl.oz", "Can", "Packet", "Box", "Bottle"];

const AddItem = (props) => {
  const navigate = useNavigate();

  const inputFile = useRef(null);
  const { isLoading, mutate, isSuccess, data } = useCreateItem();

  useEffect(() => {
    if (isSuccess) {
      queryClient.setQueryData("itemsList", (prevState) => {
        prevState.items.push(data.item);
        return prevState;
      });
      navigate("/");
    }
  }, [isSuccess, data, navigate]);

  const formik = useFormik({
    initialValues: {
      itemName: "",
      expireDate: new Date(),
      productionDate: new Date(),
      quantity: 1,
      unit: 1,
      image: undefined,
    },
    onSubmit: (newItem) => {
      mutate({ ...newItem, unit: UNITS[newItem.unit] });
    },
    validationSchema: Yup.object().shape({
      itemName: Yup.string().max(255, "Max Length (255)").required("Required"),
      quantity: Yup.number()
        .min(0, "Min: 0")
        .max(9999, "Max: 9999")
        .required("Required"),
    }),
  });

  const addImage = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      alert("Please Select an image");
      return;
    }
    const reader = new FileReader();

    reader.onload = function (event) {
      formik.setFieldValue("image", event.target.result, false);
    };
    reader.readAsDataURL(file);
  };

  const { isAuthenticated } = useAuth0();
  if (!isAuthenticated) {
    navigate("/");
  }
  return (
    <>
      <Header text="Add Item" />
      <Backdrop
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
        onClick={() => {}}
      >
        <CircularProgress />
      </Backdrop>
      <input
        type="file"
        id="file"
        ref={inputFile}
        style={{ display: "none" }}
        accept="image/*"
        onChange={addImage}
      />
      <div className={styles.wrapper}>
        {formik.values.image ? (
          <>
            <img
              src={formik.values.image}
              alt="User Uploaded"
              className={styles.itemImage}
            />
            <div className={styles.clearFile}>
              <IconButton
                aria-label="remove image"
                onClick={() => formik.setFieldValue("image", undefined, false)}
              >
                <ClearIcon sx={{ fontSize: 50 }} />
              </IconButton>
            </div>
          </>
        ) : (
          <div className={styles.addImage}>
            <IconButton
              aria-label="add image from camera"
              onClick={() => alert("WIP")}
            >
              <PhotoCameraIcon sx={{ fontSize: 60 }} />
            </IconButton>
            <IconButton
              aria-label="add image"
              onClick={() => inputFile.current.click()}
            >
              <ImageIcon sx={{ fontSize: 60 }} />
            </IconButton>
          </div>
        )}
        <FormikTextField
          formikKey="itemName"
          formik={formik}
          label="Item Name"
          variant="standard"
        />
        <DatePicker
          id="expireDate"
          name="expireDate"
          label="Expire Date"
          value={formik.values.expireDate}
          onChange={(e) => {
            formik.setFieldValue("expireDate", e, false);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              error={!!formik.errors.expireDate}
              helperText={formik.errors.expireDate}
            />
          )}
        />
        <DatePicker
          id="productionDate"
          name="productionDate"
          label="Production Date"
          value={formik.values.productionDate}
          onChange={(e) => {
            formik.setFieldValue("productionDate", e, false);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              error={!!formik.errors.productionDate}
              helperText={formik.errors.productionDate}
            />
          )}
        />
        <div className={styles.quantityRow}>
          <FormikTextField
            formikKey="quantity"
            formik={formik}
            label="Quantity"
            inputProps={{
              inputMode: "numeric",
              pattern: "[0-9]*",
              min: 0,
              max: 99999,
              type: "number",
            }}
            variant="standard"
          />
          <FormControl variant="standard" fullWidth>
            <InputLabel id="unit-select-label">Unit</InputLabel>
            <Select
              labelId="unit-select-label"
              id="unit"
              name="unit"
              value={formik.values.unit}
              label="Unit"
              onChange={formik.handleChange}
            >
              {UNITS.map((unit, index) => (
                <MenuItem key={unit} value={index + 1}>
                  {unit}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className={styles.buttons}>
          <Button
            variant="outlined"
            size="large"
            color="red"
            className={styles.cancelButton}
            onClick={() => navigate("/")}
          >
            Cancel
          </Button>
          <Button
            variant="outlined"
            size="large"
            className={styles.doneButton}
            onClick={formik.handleSubmit}
          >
            Done
          </Button>
        </div>
      </div>
    </>
  );
};

AddItem.propTypes = {};

export default AddItem;
