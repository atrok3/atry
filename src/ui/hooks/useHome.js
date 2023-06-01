import React from "react";
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
    Beam.len = 8;
    Beam.drawMarked(0, 8);
    Beam.loads = [];
  }, []);

  const onClear = () => {
    Canvas.context.clearRect(0, 0, Canvas.width, Canvas.height);
    Beam.drawMarked(Beam.s1.textOffset, Beam.s2.textOffset);
    Beam.loads = [];
  }

  const onSolve = async () => {
    dialogs.activityDialog.onToggle();
    const [A, B, sfeqn, smeqn] = await solve();
    dialogs.activityDialog.onToggle();
    history.push({
      pathname: "/solution",
      state: {
        loads: [
          ...Beam.loads,
          A,
          B,
        ],
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
