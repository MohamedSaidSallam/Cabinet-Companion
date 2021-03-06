import React, { useRef } from "react";
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
import useUploadFile from "../query/useUploadFile";
import { useStore } from "../store/GlobalStore";
import ReducerActions from "../store/ReducerActions";
import useEditItem from "../query/useEditItem";

const UNITS = ["Kg", "Gram", "oz", "fl.oz", "Can", "Packet", "Box", "Bottle"];

const AddItem = (props) => {
  const navigate = useNavigate();
  const [{ selectedItem }, dispatch] = useStore();

  const inputFile = useRef(null);
  const { mutate: getUploadUrlMutate, isLoading: isGettingUploadUrlLoading } =
    useUploadFile({
      onSuccess: () => {
        itemCreatedCallback();
      },
    });
  const { isLoading: isCreateItemLoading, mutate: createItemMutate } =
    useCreateItem({
      onSuccess: (data) => {
        if (formik.values.image) {
          getUploadUrlMutate({
            itemId: data.item.itemId,
            file: formik.values.image,
          });
        } else {
          itemCreatedCallback();
        }
      },
    });
  const { isLoading: isEditItemLoading, mutate: editItemMutate } = useEditItem({
    onSuccess: () => {
      if (formik.values.image) {
        getUploadUrlMutate({
          itemId: selectedItem.itemId,
          file: formik.values.image,
        });
      } else {
        itemCreatedCallback();
      }
    },
  });
  const itemCreatedCallback = () => {
    if (selectedItem.itemId) {
      dispatch({ type: ReducerActions.clearSelectedItem });
    }
    queryClient.invalidateQueries("itemsList");
    navigate("/");
  };

  const formik = useFormik({
    initialValues: {
      itemName: selectedItem?.name || "",
      expireDate: selectedItem?.expireDate || new Date(),
      productionDate: selectedItem?.productionDate || new Date(),
      quantity: selectedItem?.quantity || 1,
      unit: selectedItem?.quantityUnit
        ? UNITS.indexOf(selectedItem?.quantityUnit)
        : 1,
      image: undefined,
      imagePreview: selectedItem?.imageUri || undefined,
    },
    onSubmit: (newItem) => {
      const newItemBackend = { ...newItem, unit: UNITS[newItem.unit - 1] };
      if (selectedItem?.itemId) {
        editItemMutate({ itemId: selectedItem.itemId, item: newItemBackend });
      } else {
        createItemMutate(newItemBackend);
      }
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
    formik.setFieldValue("image", file);
    formik.setFieldValue("imagePreview", URL.createObjectURL(file));
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
        open={
          isCreateItemLoading || isEditItemLoading || isGettingUploadUrlLoading
        }
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
        {formik.values.imagePreview ? (
          <>
            <img
              src={formik.values.imagePreview}
              alt="User Uploaded"
              className={styles.itemImage}
            />
            <div className={styles.clearFile}>
              <IconButton
                aria-label="remove image"
                onClick={() => {
                  formik.setFieldValue("image", undefined, false);
                  formik.setFieldValue("imagePreview", undefined, false);
                }}
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
            onClick={() => {
              if (selectedItem.itemId) {
                dispatch({ type: ReducerActions.clearSelectedItem });
              }
              navigate("/");
            }}
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
