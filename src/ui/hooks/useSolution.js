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
    console.log(Beam.len);
    Beam.draw();
    DLine.draw();
  }, []);

  React.useEffect(() => {
    const { loads } = location.state;
    Beam.setLoads([]);
    Beam.setLabels([]);

    loads.forEach((item, i) => {
      let load;
      let {
        index,
        direction,
        pos,
        mag,
      } = item;
      if(item.type == _UDL){
        load = new UDL({ 
          mag: item.magPerPos, 
          startPos: item.startPos, 
          pos: item.endPos, 
          direction,
          index,
      });
      }else if(item.type == M){
        load = new Moment({ 
            mag: item.moment, 
            pos, 
            direction,
            index, 
          });
      }else load = new PointLoad({
        mag, 
        pos, 
        direction,
        index,
      });
      Beam.addLoad(load);
    });

  }, [location.state]);

  return{
  }
}

export default useSolution;
