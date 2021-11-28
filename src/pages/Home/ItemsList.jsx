import React from "react";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import styles from "./ItemsList.module.css";
import { useNavigate } from "react-router";
import useGetItem from "../../query/useGetItems";
import FullScreenProgress from "../../components/_common/FullScreenProgress";
import Item from "../../components/Item";

const ItemsList = (props) => {
  const navigate = useNavigate();

  const { isLoading, data } = useGetItem();
  return (
    <div className={styles.wrapper}>
      {isLoading ? (
        <FullScreenProgress />
      ) : (
        data?.items && (
          <div className={styles.itemsList}>
            {data.items.map(
              ({
                name,
                quantity,
                expireDate,
                imageUri,
                quantityUnit,
                itemId,
              }) => (
                <Item
                  name={name}
                  quantity={quantity}
                  expireDate={expireDate}
                  imageUri={imageUri}
                  quantityUnit={quantityUnit}
                  key={itemId}
                />
              )
            )}
          </div>
        )
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
