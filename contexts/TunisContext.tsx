"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useReducer,
  ReactNode,
} from "react";
import { messagesByLocale, type Locale, type Messages } from "@/data/i18n";
import type { BlogPost } from "@/lib/types";

const ACTIONS = {
  NAV: "NAV",
  TOGGLE: "TOGGLE",
  COLOR: "COLOR",
  DIRECTION: "DIRECTION",
  POPUP: "POPUP",
  DARK: "DARK",
  LOCALE: "LOCALE",
} as const;

interface TunisState {
  nav: string;
  toggle: boolean;
  color: string;
  direction: string;
  popup: string | null;
  blogs: BlogPost[];
  dark: boolean;
  locale: Locale;
}

const initialState: TunisState = {
  nav: "home",
  toggle: false,
  color: "blue",
  direction: "top",
  popup: null,
  blogs: [],
  dark: true,
  locale: "en",
};

type Action =
  | { type: typeof ACTIONS.NAV; payload: string }
  | { type: typeof ACTIONS.TOGGLE; payload: boolean }
  | { type: typeof ACTIONS.COLOR; payload: string }
  | { type: typeof ACTIONS.DIRECTION; payload: string }
  | { type: typeof ACTIONS.POPUP; payload: string | null }
  | { type: typeof ACTIONS.DARK; payload: boolean }
  | { type: typeof ACTIONS.LOCALE; payload: Locale };

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
    case ACTIONS.LOCALE:
      return { ...state, locale: action.payload };
    default:
      return state;
  }
}

interface TunisContextValue extends TunisState {
  changeNav: (nav: string, toggle: boolean) => void;
  changeColor: (color: string) => void;
  changeDirection: (direction: string) => void;
  popupToggle: (popup: string | null) => void;
  darkToggle: (dark: boolean) => void;
  setLocale: (locale: Locale) => void;
  messages: Messages;
  t: Messages;
}

const TunisContext = createContext<TunisContextValue | undefined>(undefined);

export function useTunisContext() {
  const ctx = useContext(TunisContext);
  if (!ctx) {
    throw new Error("useTunisContext must be used within a TunisProvider");
  }
  return ctx;
}

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

  const setLocale = useCallback((locale: Locale) => {
    dispatch({ type: ACTIONS.LOCALE, payload: locale });
  }, []);

  const messages = messagesByLocale[state.locale];
  const value: TunisContextValue = {
    ...state,
    changeNav,
    changeColor,
    changeDirection,
    popupToggle,
    darkToggle,
    setLocale,
    messages,
    t: messages,
  };

  return <TunisContext.Provider value={value}>{children}</TunisContext.Provider>;
}
