import { useContext } from "react";

// import { SubRegion } from '../../actions/getConditions';
import { SurfContext, SurfConditions } from "../../store/surfContext";
import rankRating from "../../shared/rankRating";

const SurfRanks = () => {
  const { conditions } = useContext(SurfContext);
  const ratingCount: any = {};
  for (const condition of conditions) {
    if (!ratingCount[condition?.am.rating]) {
      ratingCount[condition?.am.rating] = 1;
    } else {
      ratingCount[condition?.am.rating]++;
    }
  }
  console.log(ratingCount);
  const sortedConditions = conditions.sort((a, b) => {
    if (!a?.am?.rating || !b?.am?.rating || a?.am?.rating === b?.am?.rating) {
      return 0;
    }
    if (rankRating(a?.am?.rating) > rankRating(b?.am?.rating)) {
      return -1;
    }
    return 1;
  });
  const topTen = sortedConditions.slice(0, 10);

  console.log("topTen: ", topTen);

  const row = (surf: SurfConditions) => {
    const path = surf.subregion.name.replace(/\s/g, "-").toLowerCase();

    return (
      <div key={surf.subregion.id} className="surf-row">
        <a target='_blank' href={`https://www.surfline.com/surf-report/${path}/${surf.subregion.id}`}>
          {`${surf.subregion.country} ${surf.subregion.state} ${surf.subregion.territory} ${surf.subregion.subterritory} ${surf.subregion.subsubterritory}`}
        </a>
        <div className="conditions-summary">
          <div className="conditions">
            <div
              className={`condition condition-${surf.am.rating.toLowerCase()}`}
            >
              <span className="condition_rating">{surf.am.rating}</span>
              <span className="condition_ampm">AM</span>
            </div>
            <div
              className={`condition condition-${surf.pm.rating.toLowerCase()}`}
            >
              <span className="condition_ampm">PM</span>
              <span className="condition_rating">{surf.pm.rating}</span>
            </div>
          </div>
          <div className="summary_wave">
            <div className="summary_ampm">
              <span className="quiver-surf-height">
                {surf.am.maxHeight}
                <sup>FT</sup>+
              </span>
              <div className="human-relation">
                {surf.am.humanRelation}
              </div>
            </div>
            <div className="summary_ampm">
              <span className="quiver-surf-height">
                {surf.pm.maxHeight}
                <sup>FT</sup>
              </span>
              <div className="human-relation">
                {surf.pm.humanRelation}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="surf-ranks">
      <section className="header">
        <h3>Surf Ranks</h3>
      </section>
      <article className="d-flex">{topTen.map(row)}</article>
    </div>
  );
};

export default SurfRanks;
