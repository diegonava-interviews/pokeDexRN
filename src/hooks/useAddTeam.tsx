import * as React from 'react';

interface Team {
  id: number;
  name: string;
  regionName: string;
  pokemons: Array<{}>;
}

export default function useTeam(existingTeam: null | Team = null) {
  const [team, setTeam] = React.useState(existingTeam);

  return [team, setTeam];
}
