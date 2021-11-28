const configuredFetch = async (endpoint, token, option = undefined) => {
  return fetch(
    process.env.REACT_APP_API + endpoint,
    {
      headers: new Headers({
        Authorization: "Bearer " + token,
      }),
    },
    option
  ).then((res) => res.json());
};

export default configuredFetch;
