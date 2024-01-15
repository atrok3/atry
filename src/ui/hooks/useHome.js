import React, { useEffect } from "react";
import Canvas from "../classes/Canvas";
import Beam from "../classes/Beam";
import { useHistory } from "react-router-dom";
import { solve } from "../lib/solve";

const useToggle = () => {
  const [open, setOpen] = React.useState(false);

  const onToggle = () => setOpen(!open);

  return {
    open,
    onToggle,
  }
}

const useDialogs = () => {

  const loadDialog = useToggle();
  const beamDialog = useToggle();
  const pLDialog = useToggle();
  const uDLDialog = useToggle();
  const activityDialog = useToggle();
  const mLDialog = useToggle();


  return {
    loadDialog,
    beamDialog,
    pLDialog,
    uDLDialog,
    activityDialog,
    mLDialog,
  }
}

const useHome = () => {

  const history = useHistory();

  React.useEffect(() => {
    Canvas.initialize();
    onClear();
  }, []);

  const onClear = () => {
    Beam.clear();
    Beam.drawMarked(0, 8);
  }

  const onSolve = async () => {
    dialogs.activityDialog.onToggle();
    const [loads, sfeqn, smeqn] = await solve();
    dialogs.activityDialog.onToggle();
    history.push({
      pathname: "/solution",
      state: {
        loads,
        sfeqn,
        smeqn
      }
    });
  }

  const dialogs = useDialogs();

  return {
    onSolve,
    onClear,
    dialogs,
  }
}

export default useHome;
