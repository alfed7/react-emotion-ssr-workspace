import finalhandler from "finalhandler";
import http from "http";
import serveStatic from "serve-static";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import process from "process";
import path from "path";
import parseUrl from "parseurl";

import { createStore, renderHtml } from "./ssr";
import { matchRoutes } from "react-router-config";
import { routes } from "@resw/web";

const parseResult = dotenv.config();
if (parseResult.error) {
  console.log(parseResult.error);
}

const port = process.env.PORT || 3000;

const publicDir = path.resolve(__dirname);
const ssr = (req, res, next) => {
  const url_parts = parseUrl(req);
  const urlSearch = url_parts ? url_parts.search : "";

  const store = createStore(req, res);

  const promises = matchRoutes(routes, req.path)
    .map(({ route }) => {
      return route.loadData ? route.loadData(store, urlSearch) : null;
    })
    .map((promise) => {
      if (promise) {
        return new Promise((resolve, reject) => {
          promise.then(resolve).catch(resolve);
        });
      }
    });
  Promise.all(promises)
    .then(() => {
      const context = {};
      const content = renderHtml(req, store, context);

      // It's better to handle redirects on a client because of browser cache.
      // if(context.url) {
      //   return res.redirect(301, context.url);
      // }
      if (context.pageNotFound) {
        res.statusCode = 404;
        next("Not found");
      }

      res.send(content);
      next();
    })
    .catch((err) => {
      res.send("Error happens: " + err);
      next();
    });
};

const parseCookies = cookieParser();
const serve = serveStatic(publicDir, { fallthrough: false });
// Create server
var server = http.createServer(function onRequest(req, res) {
  res.send = (content) => {
    res.statusCode = res.statusCode || 200;
    res.setHeader("Content-Type", "text/html; charset=UTF-8");
    res.end(content);
  };
  parseCookies(req, res, () =>
    serve(req, res, () => ssr(req, res, finalhandler(req, res)))
  );
});

server.listen(port, () => {
  console.log(`listyenning on port ${port}`);
});
