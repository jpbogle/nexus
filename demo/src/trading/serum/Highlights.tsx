
import styled from 'styled-components';
import Colors from 'common/colors';

const StyledHighlights = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px;
  margin-bottom: 50px;

  color: ${Colors.white};
  background: ${Colors.darkBlue};
  border: ${Colors.border};
  iframe { 
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 42vw;
  }
`;

export function Highlights() {
  return (
    <StyledHighlights>
      <iframe src='//www.hudl.com/embed/video/3/1636040/5721b651b019261f80ad2fbc' title="highlights" frameBorder='0' allowFullScreen />
    </StyledHighlights>
  );
}