import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { reducers, Session } from "@resw/web";
import axios from "axios";
import config from "config";

export default (req, res) => {
  const session = Session.create(req, res);

  const axiosInstance = axios.create({
    baseURL: config.apiUrl,
    headers: {
      Authorization: {
        toString() {
          const token = session.getApiToken();
          return token;
        },
      },
    },
  });

  // const token = session.get();
  // const user =
  // const authState = user ? {auth: { loggedIn: true, user }} : {};

  const store = createStore(
    reducers,
    {}, //authState,
    applyMiddleware(thunk.withExtraArgument(axiosInstance))
  );

  return store;
};
