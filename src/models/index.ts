export interface TeamInterface {
  id: number;
  name: string;
  region: {
    id: number;
    name: string;
  };
  pokeDex: {
    id: number;
    name: string;
  };
  pokemons?: Array<{}>;
  owner: {
    uid: string;
    email: string;
  };
}

export const initialState: TeamInterface = {
  id: 0,
  name: '',
  region: {
    id: 0,
    name: '',
  },
  pokeDex: {
    id: 0,
    name: '',
  },
  owner: {
    uid: '',
    email: '',
  },
};
