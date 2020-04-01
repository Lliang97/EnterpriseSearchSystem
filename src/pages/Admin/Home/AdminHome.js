import React from "react";

import MapChart from "../../../components/echarts/MapChart";
export default class AdminHome extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object
  };
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
  }
  render() {
    return (
        <div><MapChart/></div>
    );
  }
}
