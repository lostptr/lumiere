import { useEffect, useState } from "react";
import { Snackbar as PaperSnackbar } from "react-native-paper";
import SnackbarService from "./service";

type SnackbarState = {
  visible: boolean,
  title?: string,
}

export default function Snackbar() {
  const [state, setState] = useState<SnackbarState>({ visible: false });

  useEffect(() => {
    SnackbarService.setListener((title) => setState({ visible: true, title }))
    return () => SnackbarService.setListener(undefined);
  }, []);

  return <PaperSnackbar
    visible={state.visible}
    onDismiss={() => setState({ ...state, visible: false })}>
    {state.title}
  </PaperSnackbar>
}