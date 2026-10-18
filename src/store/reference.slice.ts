import type { Action } from "@/store";
import type { Environment, Service, Workspace } from "@/types/domain";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

export interface State {
  workspaces: Workspace[];
  services: Record<string, Service>;
  environments: Record<string, Environment>;
}

const initialState: State = {
  workspaces: [],
  services: {},
  environments: {},
};

export const slice = createSlice({
  name: "reference",
  initialState,
  reducers: {
    setWorkspaces(state, action: PayloadAction<Action<State["workspaces"]>>) {
      const payload = action.payload;
      if (typeof payload === "function") {
        state.workspaces = payload(state.workspaces);
      } else {
        state.workspaces = payload;
      }
    },
    setServices(state, action: PayloadAction<Action<State["services"]>>) {
      const payload = action.payload;
      if (typeof payload === "function") {
        state.services = payload(state.services);
      } else {
        state.services = payload;
      }
    },
    setEnvironments(
      state,
      action: PayloadAction<Action<State["environments"]>>,
    ) {
      const payload = action.payload;
      if (typeof payload === "function") {
        state.environments = payload(state.environments);
      } else {
        state.environments = payload;
      }
    },
  },
});

export const actions = slice.actions;

export const reducer = slice.reducer;

export const selectors = {
  selectWorkspaces: (state: { reference: State }) => state.reference.workspaces,
  selectServices: (state: { reference: State }) => state.reference.services,
  selectEnvironments: (state: { reference: State }) =>
    state.reference.environments,
};

export const useReferenceSelector = () => {
  const workspaces = useSelector(selectors.selectWorkspaces);
  const services = useSelector(selectors.selectServices);
  const environments = useSelector(selectors.selectEnvironments);

  return {
    workspaces,
    services,
    environments,
  };
};

export const useReferenceActions = () => {
  const dispatch = useDispatch();

  return {
    setWorkspaces: (value: Action<State["workspaces"]>) =>
      dispatch(actions.setWorkspaces(value)),
    resetWorkspaces: () =>
      dispatch(actions.setWorkspaces(initialState.workspaces)),

    setServices: (value: Action<State["services"]>) =>
      dispatch(actions.setServices(value)),
    resetServices: () => dispatch(actions.setServices(initialState.services)),

    setEnvironments: (value: Action<State["environments"]>) =>
      dispatch(actions.setEnvironments(value)),
    resetEnvironments: () =>
      dispatch(actions.setEnvironments(initialState.environments)),
  };
};

export const useReferenceStore = () => {
  const selectors = useReferenceSelector();
  const actions = useReferenceActions();

  return {
    ...selectors,
    actions,
  };
};
