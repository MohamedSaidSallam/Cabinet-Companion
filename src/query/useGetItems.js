import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "react-query";
import configuredFetch from "./configuredFetch";

const useGetItem = () => {
  const { getAccessTokenSilently } = useAuth0();
  return useQuery("itemsList", async () => {
    const token = await getAccessTokenSilently();
    return configuredFetch("/items", token);
  });
};

export default useGetItem;
