import {
  useSelector as useReduxSelector,
  useDispatch as useReduxDispatch,
} from "react-redux";
import type { Dispatch, RootState } from "@/store";

export const useSelector = useReduxSelector.withTypes<RootState>();
export const useDispatch = useReduxDispatch.withTypes<Dispatch>();
