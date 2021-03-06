import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  Modal,
  Paper,
  Slide,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import styles from "./ItemDetails.module.css";
import CloseIcon from "@mui/icons-material/Close";
import Button from "./_common/Button";
import useDeleteItem from "../query/useDeleteItem";
import { queryClient } from "../App";
import { useStore } from "../store/GlobalStore";
import ReducerActions from "../store/ReducerActions";
import { useNavigate } from "react-router";

const ItemDetails = ({ open, handleClose, item }) => {
  const navigate = useNavigate();
  const [, dispatch] = useStore();

  const [expireDate, createdAt, productionDate] = useMemo(
    () =>
      item
        ? [
            new Date(item.expireDate).toLocaleDateString(),
            new Date(item.createdAt).toLocaleDateString(),
            new Date(item.productionDate).toLocaleDateString(),
          ]
        : ["", "", ""],
    [item]
  );
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);

  const { isLoading, mutate } = useDeleteItem();
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="item details modal"
        aria-describedby="full details of the selected item"
        keepMounted
        closeAfterTransition
      >
        <Slide in={open} direction="up">
          <div className={styles.modal}>
            {item && (
              <>
                <div className={styles.imgWrapper}>
                  <div className={styles.closeButton}>
                    <IconButton
                      aria-label="close item details modal"
                      onClick={handleClose}
                    >
                      <CloseIcon color="offWhite" sx={{ fontSize: 60 }} />
                    </IconButton>
                  </div>
                  <img
                    src={item.imageUri || "https://via.placeholder.com/150"}
                    alt="Item"
                    className={styles.img}
                  />
                  <div className={styles.itemName}>{item.name}</div>
                </div>
                <div className={styles.InfoWrapper}>
                  <div className={styles.Info}>Info</div>
                  <TableContainer component={Paper}>
                    <Table aria-label="info Table">
                      <TableBody>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Quantity
                          </TableCell>
                          <TableCell>
                            {item.quantity} {item.quantityUnit}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Expire Date
                          </TableCell>
                          <TableCell>{expireDate}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Date Added
                          </TableCell>
                          <TableCell>{createdAt}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Production Date
                          </TableCell>
                          <TableCell>{productionDate}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <div className={styles.buttons}>
                    <Button
                      variant="outlined"
                      size="large"
                      color="red"
                      className={styles.deleteButton}
                      onClick={() => setDeleteDialogVisible(true)}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      className={styles.editButton}
                      onClick={() => {
                        dispatch({
                          type: ReducerActions.setSelectedItem,
                          payload: item,
                        });
                        navigate("/addItem");
                      }}
                      color="blue"
                    >
                      Edit
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </Slide>
      </Modal>
      <Dialog
        open={deleteDialogVisible}
        onClose={() => setDeleteDialogVisible(false)}
        aria-labelledby="alert-dialog-delete-item"
        aria-describedby="alert-dialog-delete-selected-item"
      >
        {isLoading ? (
          <CircularProgress size={60} />
        ) : (
          <>
            <DialogTitle id="alert-dialog-title">
              Are you sure you want to delete this item ?
            </DialogTitle>
            <DialogActions>
              <Button
                onClick={() => {
                  mutate(item.itemId);
                  queryClient.setQueryData("itemsList", (prevState) => {
                    const deletedItemIndex = prevState.items.findIndex(
                      (prevStateItem) => prevStateItem.itemId === item.itemId
                    );
                    prevState.items.splice(deletedItemIndex, 1);
                    return prevState;
                  });
                  setDeleteDialogVisible(false);
                  handleClose();
                }}
                color="red"
              >
                Remove
              </Button>
              <Button
                onClick={() => setDeleteDialogVisible(false)}
                autoFocus
                color="offBlack"
              >
                Nevermind
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  );
};

ItemDetails.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default ItemDetails;
