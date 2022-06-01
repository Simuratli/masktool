import React from "react";

function toggle() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.5" y="0.5" width="25" height="25" rx="12.5" fill="#696D8C" />
      <path fill-rule="evenodd" clip-rule="evenodd" d="M6.97882 10.9632C7.28392 10.6581 7.77858 10.6581 8.08368 10.9632L13 15.8795L17.9163 10.9632C18.2214 10.6581 18.7161 10.6581 19.0212 10.9632C19.3263 11.2683 19.3263 11.763 19.0212 12.0681L13.5524 17.5368C13.2473 17.8419 12.7527 17.8419 12.4476 17.5368L6.97882 12.0681C6.67373 11.763 6.67373 11.2683 6.97882 10.9632Z" fill="white" />
    </svg>
  );
}

export default React.memo(toggle);
