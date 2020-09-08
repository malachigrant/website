//* @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useTheme } from 'hooks/Theme';

export const HoverMenu = ({ name, path, options }) => {
  const [isOpen, setOpen] = useState(false);
  const theme = useTheme();

  const Container = css`
    position: relative;
    border-right: 1px solid ${theme.color.neutral[3]};
    padding: 0.25rem 1rem;
  `;

  const List = css`
    position: absolute;
    display: flex;
    max-width: 350px;
    top: 1.74rem;
    left: 0;
    padding: 0.25rem 1rem;
    background-color: ${theme.color.neutral[0]};
    border: 1px solid ${theme.color.neutral[2]};
    border-radius: 0.5rem;
    border-top-left-radius: 0;
  `;

  const LinkStyle = css`
    cursor: pointer;
    text-decoration: none;
  `;

  const HeaderLink = css`${LinkStyle} color: ${theme.color.neutral[1]};`;

  const DropdownLink = css`
		${LinkStyle} color: ${theme.color.neutral[8]};
		white-space: nowrap;
	`;

  return (
    <div
      css={Container}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link css={HeaderLink} to={path}>
        {name}
      </Link>
      {isOpen && !!options && (
        <div css={List}>
          {options.map((option, i) => {
            return (
              <Link css={DropdownLink} key={i} to={path + option.path}>
                {option.name}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HoverMenu;
