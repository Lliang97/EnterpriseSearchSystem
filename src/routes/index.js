import React from "react";
import {Route, IndexRoute } from "react-router";
import App from "../pages/App";
import Search2 from "../pages/Search/Search2";
import SearchResult from "../pages/SearchResult/SearchResult";
import Company from "../pages/Company/Company";
import Patent from "../pages/Patent/Patent";
import Literature from "../pages/Literature/Literature";
import Copyright from "../pages/Copyright/Copyright";
import Property from "../pages/Property/Property";
import Base from "../pages/Base/Base";
import {fillStore} from "../untils/utils";
import Admin from "../pages/Admin/Admin";
import AdminHome from "../pages/Admin/Home/AdminHome";
import AdminInformation from "../pages/Admin/Infomation/AdminInfomation";
import AdminUser from "../pages/Admin/User/AdminUser";
import AdminReset from "../pages/Admin/Reset/AdminReset";
import AdminBasic from "../pages/Admin/Basic/AdminBasic";
import AdminPatent from "../pages/Admin/Patent/AdminPatent";
import AdminLiterature from "../pages/Admin/Literature/AdminLiterature";
import AdminCopyright from "../pages/Admin/Copyright/AdminCopyright";
import AdminNews from "../pages/Admin/News/AdminNews";
import AdminPatner from "../pages/Admin/Patner/AdminPatner";
import AdminRecruit from "../pages/Admin/Recruit/AdminRecruit";
import AdminTrade from "../pages/Admin/Trade/AdminTrade";

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
          <Route path="/base" component={Base} />
      </Route>
      <Route component={Admin}>
        <Route  path="/admin/home" component={AdminHome}/>
        <Route  path="/admin/information" component={AdminInformation}/>
        <Route  path="/admin/user" component={AdminUser}/>    
          <Route  path="/admin/reset" component={AdminReset}>
            <IndexRoute  component={AdminBasic}/>
            <Route  path="/admin/reset/patent" component={AdminPatent}/>
            <Route  path="/admin/reset/literature" component={AdminLiterature}/>      
            <Route  path="/admin/reset/copyright" component={AdminCopyright}/>
            <Route  path="/admin/reset/news" component={AdminNews}/>  
            <Route  path="/admin/reset/patner" component={AdminPatner}/> 
            <Route  path="/admin/reset/recruit" component={AdminRecruit}/> 
            <Route  path="/admin/reset/trade" component={AdminTrade}/>    
          </Route>   
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
