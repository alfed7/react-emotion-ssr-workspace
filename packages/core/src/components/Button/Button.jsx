import { css } from "@emotion/react";
import { useTheme } from "@emotion/react";
import PropTypes from "prop-types";

//import styled from '@emotion/styled'

// const Button = styled.button`
//   padding: 32px;
//   background-color: hotpink;
//   font-size: 24px;
//   border-radius: 4px;
//   color: black;
//   font-weight: bold;
//   &:hover {
//     color: white;
//   }
// `

export const Button = ({ color, children }) => {
  const theme = useTheme();
  return (
    <button
      css={css`
        padding: 1em;
        background-color: ${theme.colors.primary};
        font-size: 1.2em;
        border: 0;
        border-radius: 5%;
        &:hover {
          color: ${color || "#ccc"};
        }
      `}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  /**
   * What text color to use
   */
  color: PropTypes.string,
  /**
   * What background color to use
   */
  backgroundColor: PropTypes.string,
  /**
   * Optional click handler
   */
  onClick: PropTypes.func,
};
export default Button;
