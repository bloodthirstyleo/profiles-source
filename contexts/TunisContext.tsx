"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  ReactNode,
} from "react";
import type { BlogPost } from "@/lib/types";

/* ------------------------------------------------------------------
 * Action Types
 * ------------------------------------------------------------------ */
const ACTIONS = {
  NAV: "NAV",
  TOGGLE: "TOGGLE",
  COLOR: "COLOR",
  DIRECTION: "DIRECTION",
  POPUP: "POPUP",
  DARK: "DARK",
} as const;

/* ------------------------------------------------------------------
 * State Shape
 * ------------------------------------------------------------------ */
interface TunisState {
  nav: string;
  toggle: boolean;
  color: string;
  direction: string;
  popup: string | null;
  blogs: BlogPost[];
  dark: boolean;
}

const initialState: TunisState = {
  nav: "home",
  toggle: false,
  color: "blue",
  direction: "top",
  popup: null,
  blogs: [],
  dark: true,
};

/* ------------------------------------------------------------------
 * Reducer
 * ------------------------------------------------------------------ */
type Action =
  | { type: typeof ACTIONS.NAV; payload: string }
  | { type: typeof ACTIONS.TOGGLE; payload: boolean }
  | { type: typeof ACTIONS.COLOR; payload: string }
  | { type: typeof ACTIONS.DIRECTION; payload: string }
  | { type: typeof ACTIONS.POPUP; payload: string | null }
  | { type: typeof ACTIONS.DARK; payload: boolean };

function tunisReducer(state: TunisState, action: Action): TunisState {
  switch (action.type) {
    case ACTIONS.NAV:
      return { ...state, nav: action.payload };
    case ACTIONS.TOGGLE:
      return { ...state, toggle: action.payload };
    case ACTIONS.COLOR:
      return { ...state, color: action.payload };
    case ACTIONS.DIRECTION:
      return { ...state, direction: action.payload };
    case ACTIONS.POPUP:
      return { ...state, popup: action.payload };
    case ACTIONS.DARK:
      return { ...state, dark: action.payload };
    default:
      return state;
  }
}

/* ------------------------------------------------------------------
 * Context
 * ------------------------------------------------------------------ */
interface TunisContextValue extends TunisState {
  changeNav: (nav: string, toggle: boolean) => void;
  changeColor: (color: string) => void;
  changeDirection: (direction: string) => void;
  popupToggle: (popup: string | null) => void;
  darkToggle: (dark: boolean) => void;
}

const TunisContext = createContext<TunisContextValue | undefined>(undefined);

export function useTunisContext() {
  const ctx = useContext(TunisContext);
  if (!ctx) {
    throw new Error("useTunisContext must be used within a TunisProvider");
  }
  return ctx;
}

/* ------------------------------------------------------------------
 * Provider
 * ------------------------------------------------------------------ */
export function TunisProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(tunisReducer, initialState);

  const changeNav = useCallback((nav: string, toggle: boolean) => {
    dispatch({ type: ACTIONS.NAV, payload: nav });
    dispatch({ type: ACTIONS.TOGGLE, payload: toggle });
  }, []);

  const changeColor = useCallback((color: string) => {
    dispatch({ type: ACTIONS.COLOR, payload: color });
  }, []);

  const changeDirection = useCallback((direction: string) => {
    dispatch({ type: ACTIONS.DIRECTION, payload: direction });
  }, []);

  const popupToggle = useCallback((popup: string | null) => {
    dispatch({ type: ACTIONS.POPUP, payload: popup });
  }, []);

  const darkToggle = useCallback((dark: boolean) => {
    dispatch({ type: ACTIONS.DARK, payload: dark });
  }, []);

  const value: TunisContextValue = {
    ...state,
    changeNav,
    changeColor,
    changeDirection,
    popupToggle,
    darkToggle,
  };

  return (
    <TunisContext.Provider value={value}>{children}</TunisContext.Provider>
  );
}
