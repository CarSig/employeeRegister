import axios from "axios";

const getUser = (params, hook) => {
  axios
    .get(`/api/users/${params.id}`)
    .then(async (response) => {
      const data = await response.data;

      hook(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

const testFunction = (arg) => {
  return arg;
};

export { getUser, testFunction };
