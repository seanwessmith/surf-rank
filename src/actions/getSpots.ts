import surflineFetch from "../shared/surflineFetch";

const getSurfSpots = async (): Promise<void> => {
    const surfSpots = await surflineFetch('mapview', { south: '-90', west: '-180', north: '90', east: '180' });

    console.log(surfSpots);
}


export default getSurfSpots;
