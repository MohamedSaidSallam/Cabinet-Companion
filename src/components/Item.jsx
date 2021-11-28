import React from "react";
import PropTypes from "prop-types";
import style from "./Item.module.css";

const Item = ({
  name,
  quantity,
  expireDate,
  imageUri,
  quantityUnit,
  onClick,
}) => {
  return (
    <div className={style.wrapper} onClick={onClick}>
      <img
        src={imageUri || "https://via.placeholder.com/150"}
        alt="placeholder"
        className={style.img}
      />
      <div className={style.details}>
        <div className={style.title}>{name}</div>
        <div className={style.quantity}>
          Q: {quantity} {quantityUnit}
        </div>
        <div className={style.expireDate}>
          ex: {expireDate.split("T", 1)[0]}
        </div>
      </div>
    </div>
  );
};

Item.propTypes = {
  name: PropTypes.string.isRequired,
  expireDate: PropTypes.string.isRequired,
  imageUri: PropTypes.string,
  quantity: PropTypes.number.isRequired,
  quantityUnit: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

Item.defaultProp = {
  imageUri: undefined,
};

export default Item;
