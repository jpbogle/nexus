
import { useState } from 'react';
import statsDataJson from './stats.json';
import styled from 'styled-components';
import Colors from 'common/colors';

const StyledStats = styled.div`
  overflow: scroll;
  margin: 5px;
  color: ${Colors.white};
  background: ${Colors.darkBlue};
  border: ${Colors.border};
  padding: 20px;
  font-family: -apple-system,BlinkMacSystemFont;
  flex-grow: 3;
  min-width: 300px;

  .header {
    color: ${Colors.lightGray};
    display: flex;
    justify-content: space-between;
    padding-bottom: 15px;
    margin-bottom: 8px;
    border-bottom: ${Colors.border};
    div {
      padding: 2px;
    }
  }

  .row {
    padding: 5px;
    div {
      flex: 1;
      text-align: center;
    }
    display: flex;
    justify-content: space-between;
  }

  #stats {
    font-size: 12px;
    text-align: center;
    padding-top: 10px;
    color: ${Colors.lightGray};
    .row:nth-child(even) {
      background-color: ${Colors.headerColor} !important;
    }
  }
`;

// const DATA_URL = 'https://www.rotowire.com/football/ajax/player-page-data.php?id=12886&pos=RB&team=CLE&opp=CHI';
// const REFRESH_INTERVAL = 10000;


export function useStatsData(): any[] {
  const [statsData] = useState(statsDataJson.basic.body);
  // useEffect(() => {
  //   const interval = setInterval(
  //     function newsInterval(): any {
  //       fetch(DATA_URL)
  //         .then(res => res.json())
  //         .then(statsData => {
  //           setStatsData(statsData.basic.body);
  //         })
  //     }(), REFRESH_INTERVAL);
  //   return () => clearInterval(interval);
  // }, []);
  return statsData;
}

export function ESPNStats() {
  const statsData = useStatsData();
  console.log(statsData);
  return (
    <StyledStats>
      <div className="row header">
        <div>Yr</div>
        <div>Team</div>
        <div>GP</div>
        {/* <div>Age</div> */}
        <div>Rush ATT</div>
        <div>Rush YDS</div>
        <div>Rush TD</div>
        {/* <div>Rush AVG</div> */}
        <div>Rec</div>
        <div>Rec YDS</div>
        <div>Rec TD</div>
        {/* <div>Rec AVG</div> */}
      </div>
      <div id="stats">
        {statsData && statsData.map((stat) => (
          <div className="row" key={stat.season}>
            <div>{stat.season}</div>
            <div>{stat.team}</div>
            <div>{stat.games}</div>
            {/* <div>{stat.age}</div> */}
            <div>{stat.rushAtt}</div>
            <div>{stat.rushYds}</div>
            <div>{stat.rushTD}</div>
            {/* <div>{stat.rushAvg}</div> */}
            <div>{stat.rec}</div>
            <div>{stat.recYds}</div>
            <div>{stat.recTD}</div>
            {/* <div>{stat.recAvg}</div> */}
          </div>
        ))}
      </div>
    </StyledStats>
  );
}