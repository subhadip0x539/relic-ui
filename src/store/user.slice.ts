import type { Action } from "@/store";
import type { Me } from "@/types/domain";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

export interface State {
  me: Me;
}

const initialState: State = {
  me: {
    username: "",
    fname: "",
    lname: "",
  },
};

export const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setMe(state, action: PayloadAction<Action<State["me"]>>) {
      const payload = action.payload;
      if (typeof payload === "function") {
        state.me = payload(state.me);
      } else {
        state.me = payload;
      }
    },
  },
});

export const actions = slice.actions;

export const reducer = slice.reducer;

export const selectors = {
  selectMe: (state: { user: State }) => state.user.me,
};

export const useUserSelector = () => {
  const me = useSelector(selectors.selectMe);

  return { me };
};

export const useUserActions = () => {
  const dispatch = useDispatch();

  return {
    setMe: (value: Action<State["me"]>) => dispatch(actions.setMe(value)),
    resetMe: () => dispatch(actions.setMe(initialState.me)),
  };
};

export const useUserStore = () => {
  const selectors = useUserSelector();
  const actions = useUserActions();

  return {
    ...selectors,
    actions,
  };
};
