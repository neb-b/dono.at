import React from "react";

const SvgCheckmark = (props) => (
  <svg height="1em" viewBox="0 0 15 11" width="1em" {...props}>
    <path
      d="M14 1L7.178 9.354c-.584.715-1.69.858-2.47.32a1.498 1.498 0 01-.186-.148L1 6.292"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
  </svg>
);

export default SvgCheckmark;
