
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Colors from 'common/colors';

const StyledNews = styled.div`
  flex-grow: 1;
  max-width: 500px;
  margin: 5px;

  .news-index {
    padding: 8px;
    position: absolute;
    right: 10px;
    top: 10px;
    text-align: center;
    background: ${Colors.headerColor};
    border-radius: 50%;
    &:hover {
      transform: scale(1.04);
    }
  }

  .news-item {
    color: ${Colors.white};
    border: ${Colors.border};
    background: ${Colors.darkBlue};
    min-width: 300px;
    padding: 20px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;

    &:hover {
      cursor: pointer;
    }

    .title {
      font-size: 16px;
      font-weight: 600;
      max-width: calc(100% - 40px)
    }
    .date {
      color: ${Colors.lightGray};
      margin: 10px 0px 10px 0px;
    }

    .content {
      font-size: 12px;
    }
    .row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }
    .link {
      color: ${Colors.white};
      text-decoration: none;
      margin-top: 10px;
      padding: 5px;
      border: 1px solid ${Colors.white};
      border-radius: 9999px;
      text-align: center;
      font-size: 14px;
      display: flex;
      align-items: center;
      width: 150px;
      justify-content: center;
      &:hover {
        cursor: pointer;
        background: ${Colors.headerColor};
      }
    }

    .source {
      img {
        max-height: 10px;
      }
    }
  }
`;

const NEWS_URL = 'https://api.rss2json.com/v1/api.json?rss_url=https://www.espn.com/espn/rss/nfl/news';
const REFRESH_INTERVAL = 10000;


export function useNewsData(): any[] {
  const [newsData, setNewsData] = useState([]);
  useEffect(() => {
    const interval = setInterval(
      function newsInterval(): any {
        fetch(NEWS_URL)
          .then(res => res.json())
          .then(newsData => {
            setNewsData(newsData.items);
          })
      }(), REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, []);
  return newsData;
}

export function ESPNNews() {
  const [newsIndex, setNewsIndex] = useState(0);
  const newsData = useNewsData();

  return (
    <StyledNews>
      {newsData && newsData.map((item, i) => (
        <div
          className="news-item"
          style={{ display: newsIndex !== i ? 'none' : 'block' }}
          onClick={() => { setNewsIndex(newsIndex + 1 < newsData.length ? newsIndex + 1 : 0)}}
        >
          <div className="news-index"><sup>{newsIndex + 1}</sup>&frasl;<sub>{newsData.length}</sub></div>
          <div className="info">
            <div className="title">{item.title}</div>
            <div className="date">{new Date(item.pubDate).toDateString()}</div>
            {item.content !== "null" && <div className="content">{item.content}</div>}
          </div>
          <div className="row">
            <a className="link" href={item.link}>Learn More</a>
            <div className="source" ><img src="assets/espn.png" alt="espn" /></div>
          </div>
        </div>
      ))}
    </StyledNews>
  );
}