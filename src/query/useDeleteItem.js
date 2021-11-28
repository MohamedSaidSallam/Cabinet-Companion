import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";
import configuredFetch from "./configuredFetch";

const useDeleteItem = () => {
  const { getAccessTokenSilently } = useAuth0();
  return useMutation(async (itemId) => {
    const token = await getAccessTokenSilently();
    return configuredFetch(`/items/${itemId}`, token, { method: "DELETE" });
  });
};

export default useDeleteItem;
