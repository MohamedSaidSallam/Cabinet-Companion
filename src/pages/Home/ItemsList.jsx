import React, { useState } from "react";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import styles from "./ItemsList.module.css";
import { useNavigate } from "react-router";
import useGetItem from "../../query/useGetItems";
import FullScreenProgress from "../../components/_common/FullScreenProgress";
import Item from "../../components/Item";
import ItemDetails from "../../components/ItemDetails";

const ItemsList = (props) => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(undefined);

  const { isLoading, data } = useGetItem();
  return (
    <div className={styles.wrapper}>
      {isLoading ? (
        <FullScreenProgress />
      ) : data?.items.length ? (
        <>
          <div className={styles.itemsList}>
            {data.items.map((item) => (
              <Item
                name={item.name}
                quantity={item.quantity}
                expireDate={item.expireDate}
                imageUri={item.imageUri}
                quantityUnit={item.quantityUnit}
                key={item.itemId}
                onClick={() => {
                  setModalOpen(true);
                  setSelectedItem(item);
                }}
              />
            ))}
          </div>
          <ItemDetails
            open={modalOpen}
            handleClose={() => setModalOpen(false)}
            item={selectedItem}
          />
        </>
      ) : (
        <div className={styles.noItems}>
          <img
            src="https://c.tenor.com/IUbgjn8Ky74AAAAC/palla-deserto.gif"
            alt="tumbleweed"
            className={styles.tumbleweedImage}
          />
          <div className={styles.mainMessage}>You didn’t add any items yet</div>
          <div className={styles.secondaryMessage}>
            add some using the plus sign
          </div>
        </div>
      )}
      <div className={styles.fab}>
        <Fab
          color="primary"
          aria-label="add item"
          onClick={() => navigate("/addItem")}
        >
          <AddIcon />
        </Fab>
      </div>
    </div>
  );
};

ItemsList.propTypes = {};

export default ItemsList;
