import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";
import configuredFetch from "./configuredFetch";

const useEditItem = (queryConfig) => {
  const { getAccessTokenSilently } = useAuth0();
  return useMutation(async ({ itemId, item }) => {
    const token = await getAccessTokenSilently();
    return configuredFetch(`/items/${itemId}`, token, {
      method: "PATCH",
      body: JSON.stringify({
        name: item.itemName,
        expireDate: item.expireDate,
        productionDate: item.productionDate,
        quantity: item.quantity,
        quantityUnit: item.unit,
        ...(item.imageUri && { imageUri: item.imageUri }),
      }),
    });
  }, queryConfig);
};

export default useEditItem;
