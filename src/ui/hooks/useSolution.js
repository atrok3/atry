import React from "react";
import Canvas from "../classes/Canvas";
import Beam from "../classes/Beam";
import DLine from "../classes/DLine";
import PointLoad from "../classes/PointLoad";
import { useLocation } from "react-router-dom";
import { UDL as _UDL } from "../../../consts";
import UDL from "../classes/UDL";

const useSolution = () => {

  const location = useLocation();

  React.useEffect(() => {
    Canvas.initialize();
    Beam.draw();
    DLine.draw();
  }, []);

  React.useEffect(() => {
    const { loads } = location.state;
    loads.forEach((item, i) => {
      if(item.type == _UDL){
        new UDL(item.mag, item.startPos, item.pos, item.direction);
      }else new PointLoad(item.mag * 1, item.pos, item.direction);
    });

  }, [location.state]);

  return{
  }
}

export default useSolution;
