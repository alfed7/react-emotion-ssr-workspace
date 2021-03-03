import App from "../App";
import { HomeView, AboutView } from "../views";

export default [
  {
    ...App,
    routes: [
      {
        ...HomeView,
        //layout: LandLayout,
        path: "/",
        exact: true,
      },
      {
        ...AboutView,
        //layout: LandLayout,
        path: "/about",
        exact: true,
      },
    ],
  },
];
