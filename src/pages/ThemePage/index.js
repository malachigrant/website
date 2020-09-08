/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useTheme } from 'hooks/Theme';
import { getOppositeColor } from 'utils/color';

const ColorCell = ({ color }) => {
  const Cell = css`
    background-color: ${color};
    height: 4rem;
    width: 4rem;
    color: ${getOppositeColor(color)};
  `;

  return <div css={Cell}>{color}</div>;
};

const ColorGroup = ({ colors, header }) => {
  const Container = css`
    display: flex;
    flex-direction: row;
  `;

  return (
    <div>
      {header && <h3>{header}</h3>}
      <div css={Container}>
        {colors.map((color, i) => (
          <ColorCell key={i} color={color} />
        ))}
      </div>
    </div>
  );
};

export const ThemePage = () => {
  const { color } = useTheme();
  return (
    <div>
      {Object.keys(color).map((key, i) => (
        <ColorGroup
          key={i}
          header={key}
          colors={Array.isArray(color[key]) ? color[key] : [color[key]]}
        />
      ))}
    </div>
  );
};

export default ThemePage;
