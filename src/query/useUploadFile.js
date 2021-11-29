import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";
import configuredFetch from "./configuredFetch";

const useUploadFile = (queryConfig) => {
  const { getAccessTokenSilently } = useAuth0();
  return useMutation(async ({ itemId, file }) => {
    const token = await getAccessTokenSilently();
    const { uploadUrl } = await configuredFetch(
      `/items/${itemId}/attachment`,
      token,
      { method: "POST" }
    );
    return fetch(uploadUrl, { method: "PUT", body: file }).then((res) => {});
  }, queryConfig);
};

export default useUploadFile;
