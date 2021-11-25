import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter as Router } from 'react-router-dom/server'
import { Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { routes, renderRoutes } from "@resw/web";
import serialize from "javascript-serialize";

export default (req, store, context) => {
  const content = renderToString(
    <Provider store={store}>
      <Router context={context} location={req.url}>
        <Routes>
          {renderRoutes(routes)}
        </Routes>
      </Router>
    </Provider>
  );

  const { helmet } = context;
  const helmetTitle = (helmet && helmet.title) ? helmet.title.toString() : '';
  const helmetMeta = (helmet && helmet.meta) ? helmet.meta.toString() : '';
  const html = `<!DOCTYPE html>
  <html>
    <head>
      ${helmetTitle}
      ${helmetMeta}
      <link rel="stylesheet" href="public/main.css">
    </head>
    <body>
      <div id="app">${content}</div>
      <script>
        window.INITIAL_STATE = ${serialize(store.getState())}
      </script>
      <script src="public/bundle.js"></script>
    </body>
  </html>`;
  return html;
};
