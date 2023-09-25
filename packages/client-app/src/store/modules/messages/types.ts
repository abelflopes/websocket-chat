interface Actions {
  reset: () => void;
  add: (text: string) => void;
}

export interface State {
  data: string[];
}

export type Module = State & Actions;
