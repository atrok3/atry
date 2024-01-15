import React from "react";
import Canvas from "../classes/Canvas";
import Beam from "../classes/Beam";
import DLine from "../classes/DLine";
import PointLoad from "../classes/PointLoad";
import { useLocation } from "react-router-dom";
import { M, UDL as _UDL } from "../../../consts";
import UDL from "../classes/UDL";
import Moment from "../classes/Moment";

const useSolution = () => {

  const location = useLocation();

  React.useEffect(() => {
    Canvas.initialize();
    Beam.draw();
    DLine.draw();
  }, []);

  React.useEffect(() => {
    const { loads } = location.state;
    Beam.setLoads([]);
    Beam.setLabels([]);

    loads.forEach((item, i) => {
      let load;
      if(item.type == _UDL){
        load = new UDL(item.magPerPos, item.startPos, item.endPos, item.direction);
      }else if(item.type == M){
        load = new Moment(item.moment, item.pos, item.direction);
      }else load = new PointLoad(item.mag * 1, item.pos, item.direction);
      Beam.addLoad(load);
    });

  }, [location.state]);

  return{
  }
}

export default useSolution;
