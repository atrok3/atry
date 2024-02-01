import React, { createContext } from "react";
import {
  Button,
} from "@material-ui/core";
import PointLoadDialog from "../components/PLDialog";
import AddLoadDialog from "../components/LoadDialog";
import useHome from "../hooks/useHome";
import Navbar from "../components/Navbar";
import BeamDialog from "../components/BeamDialog";
import UDLDialog from "../components/UDLDialog";
import ActivityDialog from "../components/ActivityDialog";
import Page from "../components/Page";
import Canvas from "../components/Canvas";
import MomentDialog from "../components/MomentDialog";
import PSDialog from "../components/PSDialog";

export const DialogContext = createContext();

function App() {

  const home = useHome();

  const {
    onSolve,
    dialogs,
  } = home;

  return (
    <DialogContext.Provider
      value={dialogs}
    >
      <Page>
        <Navbar
          {...home}
        />
        <Canvas
          parentStyle={{ height: "70vh" }}
        />
        <div style={{ padding: "20px" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={onSolve}
            fullWidth
          >
            Find reactions
          </Button>

          <AddLoadDialog />
          <PointLoadDialog />
          <BeamDialog {...home} />
          <UDLDialog />
          <ActivityDialog />
          <MomentDialog />
          <PSDialog />
        </div>
      </Page>
    </DialogContext.Provider>
  );
}

export default App;
