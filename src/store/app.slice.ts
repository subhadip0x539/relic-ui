import type { Action } from "@/store";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

export interface State {
  ctrl: {
    isCreateEnvironmentDialogOpen: boolean;
  };
}

const initialState: State = {
  ctrl: {
    isCreateEnvironmentDialogOpen: false,
  },
};

export const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setCtrl(state, action: PayloadAction<Action<State["ctrl"]>>) {
      const payload = action.payload;
      if (typeof payload === "function") {
        state.ctrl = payload(state.ctrl);
      } else {
        state.ctrl = payload;
      }
    },
    setIsCreateEnvironmentDialogOpen(
      state,
      action: PayloadAction<
        Action<State["ctrl"]["isCreateEnvironmentDialogOpen"]>
      >,
    ) {
      const payload = action.payload;
      if (typeof payload === "function") {
        state.ctrl.isCreateEnvironmentDialogOpen = payload(
          state.ctrl.isCreateEnvironmentDialogOpen,
        );
      } else {
        state.ctrl.isCreateEnvironmentDialogOpen = payload;
      }
    },
  },
});

export const actions = slice.actions;

export const reducer = slice.reducer;

export const selectors = {
  selectCtrl: (state: { app: State }) => state.app.ctrl,
};

export const useAppSelector = () => {
  const ctrl = useSelector(selectors.selectCtrl);

  return {
    ctrl,
  };
};

export const useAppActions = () => {
  const dispatch = useDispatch();

  return {
    setCtrl: (value: Action<State["ctrl"]>) => dispatch(actions.setCtrl(value)),
    resetCtrl: () => dispatch(actions.setCtrl(initialState.ctrl)),

    setIsCreateEnvironmentDialogOpen: (
      value: Action<State["ctrl"]["isCreateEnvironmentDialogOpen"]>,
    ) => dispatch(actions.setIsCreateEnvironmentDialogOpen(value)),
    resetisCreateEnvironmentDialogOpen: () =>
      dispatch(
        actions.setIsCreateEnvironmentDialogOpen(
          initialState.ctrl.isCreateEnvironmentDialogOpen,
        ),
      ),
  };
};

export const useAppStore = () => {
  const selectors = useAppSelector();
  const actions = useAppActions();

  return {
    ...selectors,
    actions,
  };
};
