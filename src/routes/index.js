import React from "react";
import {Route, IndexRoute } from "react-router";
import App from "../pages/App";
import Home from "../pages/Home/Home";
import Search from "../pages/Search/Search";
import SearchResult from "../pages/SearchResult/SearchResult";
import SearchContent from "../pages/SearchContent";
import {fillStore} from "../untils/utils";


const routes = (
    <Route>
      <Route path="/" component={App}>
          <IndexRoute component={Home}/>
          <Route path="/search" component={Search} />
      </Route>
      <Route component={SearchContent}>
          <Route path="/search/result" component={SearchResult} />
      </Route>
   </Route>
);

function walk(routes, cb) {
  cb(routes);

  if (routes.childRoutes) {
    routes.childRoutes.forEach(route => walk(route, cb));
  }
  return routes;
}

export default store => {
  return walk(Route.createRouteFromReactElement(routes), route => {
    route.onEnter = nextState => {
      fillStore(store, nextState, [route.component]);
    };
  });
};
