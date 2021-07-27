import surflineFetch from "../shared/surflineFetch";
import { SurfConditions } from "../store/surfContext";
import surfSpots from "../data/surfSpots.json";

interface Tide {
  type: "LOW" | "HIGH";
  height: number;
  timestamp: number;
  utcOffset: number;
}

interface SurfSpot {
  _id: string;
  thumbnail: string;
  rank: [number, number];
  subregionId: string;
  lat: number;
  lon: number;
  name: string;
  tide: {
    previous: Tide;
    current: Tide;
    next: Tide;
  };
}

export interface SubRegion {
  id: string;
  name: string;
  forecasterEmail: string;
  country?: string;
  state?: string;
  territory?: string;
  subterritory?: string;
  subsubterritory?: string;
}

interface SurfSpot {
  _id: string;
  subregion: SubRegion;
}

const getSurfConditions = async (): Promise<SurfConditions[]> => {
  let surfConditions: SurfConditions[] = [];
  const surfSpot = ((surfSpots as unknown) as SurfSpot[]).slice(0, 500);
  const promArray = [];
  const subregions: SubRegion[] = [];

  for (const { subregion } of surfSpot) {
    try {
      promArray.push(surflineFetch("regions/forecasts/conditions", {
        subregionId: subregion.id,
      }));
      subregions.push(subregion);
    } catch (e) {
      console.log("getSurfConditions: error", e);
    }
  }

  const surfConditionsRaw = await Promise.all(promArray);
  for (const [indexStr, surfConditionRaw] of Object.entries(surfConditionsRaw)) {
    const index = parseInt(indexStr, 10);
    const surfCondition = surfConditionRaw.data?.conditions as any[];
    const newConditions = surfCondition && surfCondition.map(condition => ({
      ...condition,
      subregion: subregions[index],
    }));
    surfConditions = surfConditions.concat(newConditions);
  }

  console.log(`getSurfConditions: ${surfConditions.length} conditions`, surfConditions);

  return surfConditions;
};

export default getSurfConditions;
