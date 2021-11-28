const configuredFetch = async (endpoint, token, option = undefined) => {
  return fetch(process.env.REACT_APP_API + endpoint, {
    ...option,
    headers: new Headers({
      ...option?.headers,
      Authorization: "Bearer " + token,
    }),
  }).then((res) => res.status !== 204 && res?.json());
};

export default configuredFetch;
