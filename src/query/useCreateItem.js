import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";
import configuredFetch from "./configuredFetch";

const useCreateItem = () => {
  const { getAccessTokenSilently } = useAuth0();
  return useMutation(async (item) => {
    const token = await getAccessTokenSilently();
    return configuredFetch("/items", token, {
      method: "POST",
      body: JSON.stringify({
        name: item.itemName,
        expireDate: item.expireDate,
        productionDate: item.productionDate,
        quantity: item.quantity,
        quantityUnit: item.unit,
        ...(item.imageUri && { imageUri: item.imageUri }),
      }),
    });
  });
};

export default useCreateItem;
