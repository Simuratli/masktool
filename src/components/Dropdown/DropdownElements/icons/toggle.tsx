import React from "react";

function toggle() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="20" height="20" rx="10" fill="#1A4F95" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.18306 8.37056C5.42714 8.12648 5.82286 8.12648 6.06694 8.37056L10 12.3036L13.9331 8.37056C14.1771 8.12648 14.5729 8.12648 14.8169 8.37056C15.061 8.61464 15.061 9.01036 14.8169 9.25444L10.4419 13.6294C10.1979 13.8735 9.80214 13.8735 9.55806 13.6294L5.18306 9.25444C4.93898 9.01036 4.93898 8.61464 5.18306 8.37056Z"
        fill="white"
      />
    </svg>
  );
}

export default React.memo(toggle);
