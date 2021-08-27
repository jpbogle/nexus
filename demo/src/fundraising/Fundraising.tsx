import styled from 'styled-components';
import Colors from 'common/colors';
import Select from 'react-select';
import { useState } from 'react';

const Header = styled.div`
  width: 96%;
  height: 40px;
  position: sticky;
  // background: ${Colors.darkBlue};
  color: ${Colors.white};
  padding: 10px 2%;
  display: flex;
  align-items: center;
  justify-content: space-between;


  #left {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  #right {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  #logo {
    height: 30px;
  }
`;

const Layout = styled.div`
  width: width: 100%;
  max-width: 1024px;
  margin: 0px auto;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`;

// const Selector = styled.div`
//   background: ${Colors.darkBlue};
//   border: ${Colors.border};
//   color: ${Colors.white};
//   border-radius: 10px;
//   overflow: hidden;
//   width: 310px;
//   max-width: calc(100% - 10px);
//   position: sticky;
//   width: 100%;
//   z-index: 2;
//   #top {

//   }
//   .header {
//     background: ${Colors.headerColor};
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     padding: 10px;
//   }
//   .details {
//     padding: 20px;
//   }
//   .prompt {
//     margin: 20px 0px 10px 0px;
//   }
// `;

const Selector2 = styled.div`
  background: ${Colors.darkBlue};
  color: ${Colors.white};
  position: sticky;
  margin: 0px auto;
  max-width: calc(100% - 20px);
  z-index: 2;
  #top {

  }
  .header {
    background: ${Colors.headerColor};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
  }
  .details {
    padding: 20px;
  }
  .prompt {
    margin: 20px 0px 10px 0px;
  }
`;

const Fundraisers = styled.div`
  margin: 0px auto;
  max-width: 950px;
`;

type Selectable = {
  selected?: boolean,
}

const Favorite = styled.div<Selectable>`
  position: absolute;
  top: 10px;
  right: 3%;
  margin: 10px 0px 10px 0px;
  border: 1px solid ${Colors.white};
  border-radius: 9999px;
  text-align: center;
  font-size: 14px;
  display: flex;
  align-items: center;
  width: 30px;
  justify-content: center;
  background: ${(props) => props.selected ? Colors.lightGray : 'none'};
  transition: .1s all;

  &:hover {
    cursor: pointer;
    background: ${Colors.lightGray};
  }

  svg {
    height: 20px;
    width: 20px;
    vertical-align: middle;
    margin: 5px;
    path {
      fill: ${(props) => props.selected ? Colors.white : 'none'};
      stroke: ${Colors.white};
      stroke-width: .3px;
    }
  }
`;

const Fundraiser = styled.div`
  display: flex;
  color: ${Colors.white};
  margin: 50px 30px;
  border-radius: 40px;
  transition: .2s all;
  position: relative;
  // &:hover {
  //   background: ${Colors.darkBlue};
  //   cursor: pointer;
  //   transform: scale(1.005);
  // }

  .image { 
    img {
      width: 180px;
      height: 180px;
      border-radius: 50%;
      border: ${Colors.border};
      object-fit: cover;
    }
  }

  .title {
    font-size: 18px;
    margin-bottom: 6px;
  }

  .info {
    height: 100%;
    flex-grow: 2;
    padding: 10px 30px;
  }

  .subtitle {
    color: ${Colors.lightGray};
    max-width: 90%;
  }

  .tags {
    display: flex;
    align-items: center;
    margin-top: 10px;
    font-size: 12px;
    color: ${Colors.lightGray};

    .tag {
      border: ${Colors.border};
      border-radius: 16px;
      padding: 5px 10px;  
      margin: 5px;
      transition: .1s all;
      &:hover {
        background: ${Colors.darkBlue} !important;
        color: ${Colors.lightGray} !important;
        cursor: pointer;
      }
    }
  }

  .details-btn {
    color: ${Colors.white};
    text-decoration: none;
    margin: 10px 0px;
    padding: 5px;
    border: ${Colors.border};
    border-radius: 9999px;
    text-align: center;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${Colors.btnDisabled};
    width: 100px;
    &:hover {
      cursor: pointer;
    }
  }

  .progress-outer {
    width: 100%;
    height: 20px;
    border: ${Colors.border};
    border-radius: 16px;
    overflow: hidden;
    background: ${Colors.darkBlue};
    &:hover {
      cursor: pointer;
    }

    .progress {
      height: 100%;
      background: ${Colors.green};
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        cursor: pointer;
      }
    }
  }
`;

const StyledSelect = styled(Select)`
  div {
    color: ${Colors.white};
    background: ${Colors.darkBlue};
    border-color: ${Colors.lightGray};
  }
`;

const fundraisers = [
  {
    id: 'smash',
    title: 'Smash William',
    subtitle: 'Running Back | Carolina Panthers',
    tags: ["Basketball", "NCAA"],
    img: 'assets/headshots/smash.png',
    progress: '90%',
  },
  {
    id: 'hpyg',
    title: 'Happy Gilmore',
    subtitle: 'PGA Tour Golfer',
    tags: ["Golf", "PGA"],
    img: 'assets/headshots/happy_gilmore.jpg',
    progress: '22%',
  },
  {
    id: 'rocky',
    title: 'Rocky Balboa',
    subtitle: 'Boxer',
    tags: ["Boxing"],
    img: 'assets/headshots/rocky_balboa.jpg',
    progress: '12%',
  },
  {
    id: 'jbahmra',
    title: 'Jess Bahmra',
    subtitle: 'Forward | AXA',
    tags: ["Soccer", "NWSL"],
    img: 'assets/headshots/jess_bahmra.jpg',
    progress: '35%',
  },
  {
    id: 'jgirard',
    title: 'Jean Girard',
    subtitle: 'NASCAR Drive',
    tags: ["NASCAR"],
    img: 'assets/headshots/jean_girard.jpeg',
    progress: '18%',
  },
  {
    id: 'tj',
    title: 'Trevor John',
    subtitle: 'Point Guard | Drexel',
    tags: ["Basketball", "NBA"],
    img: 'assets/headshots/trevor_john.jpg',
    progress: '45%',
  },
]

// const statuses = [
//   { value: 'all', label: 'All' },
//   { value: 'live', label: 'Live' },
//   { value: 'pending', label: 'Pending' },
//   { value: 'Complete', label: 'Complete' },
// ];

const StyledLink = styled.a<Selectable>`
  color: ${(props) => props.selected ? Colors.white : Colors.lightGray};
  margin: 20px;
  transition: .1s all;
  text-decoration: none;

  &:hover {
    color: ${Colors.white};
    cursor: pointer;
  }
`;

export default function Fundraising() {
  const [tags, setTags] = useState([]);
  const [favorites, setFavorites] = useState([]);
  console.log(favorites);
  const filteredFundraisers = tags.length > 0 ? fundraisers.filter((f) => tags.some(t => f.tags.includes(t))) : fundraisers;
  console.log(filteredFundraisers);
  const sortedFundraises = [...filteredFundraisers].sort((f1, f2) => {
    if (favorites.includes(f1.id) && favorites.includes(f2.id)) return 0;
    else if (favorites.includes(f1.id)) return -1
    else if (favorites.includes(f2.id)) return 1
    else return 0;
  });
  return (
  <div>
    <Header>
      <div id="left">
        <img id="logo" src="assets/logo_titled_white.png" alt="NEXUS" />
      </div>
      <div id="right">
         <StyledLink selected>FUNDRAISE</StyledLink>
         <StyledLink href="/">TRADE</StyledLink>
      </div>
    </Header>
    <Layout>
      <div className="col1">
        {/* <Selector>
          <div className="header">Filters</div>
          <div className="details">
            <div className="prompt">Status</div>
            <StyledSelect 
              options={statuses}
              defaultValue={statuses[0]}
              placeholder="Status"
            />
            <div className="prompt">Tags</div>
            <StyledSelect
              isMulti
              // options={fundraisers.reduce((acc, f) => acc.concat(f.tags.map((t) => ({ label: t, value: t }))), [])}
              options={Array.from(fundraisers.reduce((acc, f) => {
                f.tags.forEach(acc.add, acc);
                return acc;
              }, new Set())).map((t) => ({label: t, value: t}))}
              onChange={(v) => setTags(v.map((t) => t.value))}
              value={tags.map((t) => ({label: t, value: t}))}
              placeholder="Tags..."
            />
          </div>
        </Selector> */}
        <Selector2>
          <StyledSelect
            isMulti
            // options={fundraisers.reduce((acc, f) => acc.concat(f.tags.map((t) => ({ label: t, value: t }))), [])}
            options={Array.from(fundraisers.reduce((acc, f) => {
              f.tags.forEach(acc.add, acc);
              return acc;
            }, new Set())).map((t) => ({label: t, value: t}))}
            onChange={(v) => setTags(v.map((t) => t.value))}
            value={tags.map((t) => ({label: t, value: t}))}
            placeholder="Find..."
          />
        </Selector2>
      </div>
      <div className="col2">
        <Fundraisers>
          {sortedFundraises.map(f => (
            <Fundraiser>
              <div className="image">
                <img src={f.img} alt={f.title} />
              </div>
              <div className="info">
                <div className="title">{f.title}</div>
                <div className="subtitle">{f.subtitle}</div>
                <div className="tags">{f.tags.map((t) => (<div className="tag" style={{ background: tags.includes(t) ? Colors.white : 'none', color: tags.includes(t)? Colors.darkBlue : Colors.white }} onClick={() => tags.includes(t) ? setTags(tags.filter((t1) => t1 !== t)) : setTags([...tags, t])}>{t}</div>))}</div>
                <Favorite onClick={() => favorites.includes(f.id) ? setFavorites(favorites.filter((fav) => fav !== f.id)) : setFavorites([...favorites, f.id])} selected={favorites.includes(f.id)}>
                  <svg className="Icon_icon__2NnUo inline-block mr-1 h-3 w-3 align-baseline PlayerSummary_favoritedDisabled__3-f5T" role="img" aria-label="Favorite Player Button Star" xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8">
                    <path fillRule="evenodd" d="M4 6L1.649 7.236l.449-2.618L.196 2.764l2.628-.382L4 0l1.176 2.382 2.628.382-1.902 1.854.45 2.618z"></path>
                  </svg>
                </Favorite>
                <div className="details-btn">
                  Details
                </div>
                <div className="progress-outer">
                  <div className="progress" style={{ width: f.progress }}>
                    <span>{f.progress}</span>
                  </div>
                </div>
              </div>
            </Fundraiser>
          ))}
        </Fundraisers>
      </div>
    </Layout>

  </div>
  )
}