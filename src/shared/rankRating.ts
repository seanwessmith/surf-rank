import { SurfRating } from '../store/surfContext';

const rankRating = (rating: SurfRating) => {
  const rankChart = {
    'FLAT': 0,
    'VERY POOR': 1,
    'POOR': 2,
    'POOR TO FAIR': 3,
    'FAIR': 4,
    'FAIR TO GOOD': 5,
    'GOOD': 6,
    'VERY GOOD': 7,
    'GOOD TO EPIC': 8,
    'EPIC': 9,
  };

  return rankChart[rating];
}

export default rankRating;
