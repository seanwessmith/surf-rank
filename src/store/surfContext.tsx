import React, { useEffect, useReducer } from "react";

import parseISO from 'date-fns/parseISO';
import formatISO from 'date-fns/formatISO';
import isEqual from 'date-fns/isEqual';
import getSurfConditions, { SubRegion } from '../actions/getConditions';

export type SurfRating =
| 'FLAT'
| 'VERY POOR'
| 'POOR'
| 'POOR TO FAIR'
| 'FAIR'
| 'FAIR TO GOOD'
| 'GOOD'
| 'VERY GOOD'
| 'GOOD TO EPIC'
| 'EPIC';

interface SurfDetails {
  maxHeight: number;
  minHeight: number;
  plus: boolean;
  humanRelation: string;
  occasionalHeight: null | number;
  rating: SurfRating;
}

export interface SurfConditions {
  location: string;
  am: SurfDetails;
  pm: SurfDetails;
  forecaster: {
    name?: string;
    avatar?: string;
  }
  human: boolean;
  observation: string;
  timestamp: number;
  subregion: SubRegion;
}

type SurfState = {
  conditions: SurfConditions[];
  modified_on?: string;
  accessToken?: string;
};

const reducer = (surfData: SurfState, newSurfData: SurfState) => {
  if (surfData === null) {
    localStorage.removeItem("surfData");

    return initialState;
  }

  return { ...surfData, ...newSurfData };
};

export const initialState: SurfState = {
  conditions: [],
  modified_on: undefined,
  accessToken: undefined,
};

const localState = JSON.parse(
  localStorage.getItem('surfData') || JSON.stringify(initialState)
);

const SurfContext = React.createContext<{
  conditions: SurfConditions[];
  modified_on?: string;
  accessToken?: string;
}>({} as any);

interface Props {
  children: JSX.Element;
}

function SurfProvider(props: Props) {
  const [surfData, setSurfData] = useReducer(reducer, localState);
  const today = (new Date()).setUTCHours(0,0,0,0);
  const modifiedOnDay = surfData.modified_on ? parseISO(surfData.modified_on).setUTCHours(0,0,0,0) : undefined;

  useEffect(() => {
    const getConditions = async () => {
      const newConditions = await getSurfConditions();
      setSurfData({
        conditions: newConditions,
        modified_on: formatISO(today),
      });
    };
    if (!modifiedOnDay || !isEqual(modifiedOnDay, today)) {
      getConditions();
    }
    localStorage.setItem("surfData", JSON.stringify(surfData));
  }, [surfData]);

  return (
    <SurfContext.Provider value={surfData}>
      {props.children}
    </SurfContext.Provider>
  );
}

export { SurfContext, SurfProvider };
