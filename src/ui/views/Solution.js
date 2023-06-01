import React from "react";
import { useLocation } from "react-router-dom";
import useSolution from "../hooks/useSolution";
import Backbar from "../components/Backbar";
import Working from "../components/Working";
import Page from "../components/Page";
import Canvas from "../components/Canvas";

function Solution() {

  const location = useLocation();

  const {
    smeqn: sm,
    sfeqn
  } = location.state;

  useSolution();

  return (
    <Page>
      <Backbar />
      <Canvas 
        height={300}
      />
      <div>
        <div>
          <Working
            eqn={sm}
            title="Finding A"
          />
          <Working
            eqn={sfeqn}
            title="Finding B"
          />
        </div>
      </div>
    </Page>
  );
}

export default Solution;
