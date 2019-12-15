import React from "react";
import {Route, IndexRoute } from "react-router";
import App from "../pages/App";
import Home from "../pages/Home/Home";
import Search from "../pages/Search/Search";
import Search2 from "../pages/Search/Search2";
import SearchResult from "../pages/SearchResult/SearchResult";
import Company from "../pages/Company/Company";
import Patent from "../pages/Patent/Patent";
import Literature from "../pages/Literature/Literature";
import Copyright from "../pages/Copyright/Copyright";
import Property from "../pages/Property/Property";
import {fillStore} from "../untils/utils";


const routes = (
    <Route>
      <Route path="/" component={App}>
          <IndexRoute component={Search2}/>
          <Route path="/result" component={SearchResult} />
          <Route path="/company" component={Company} />
          <Route path="/property" component={Property} />
          <Route path="/patent" component={Patent} />
          <Route path="/literature" component={Literature} />
          <Route path="/copyright" component={Copyright} />
      </Route>
      {/* <Route component={SearchContent}>

      </Route> */}
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
