import React from "react";

function toggle() {
  return (
    <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect y="0.5" width="15" height="15" rx="7.5" fill="#696D8C" />
      <path fill-rule="evenodd" clip-rule="evenodd" d="M3.88729 6.77792C4.07035 6.59486 4.36715 6.59486 4.55021 6.77792L7.5 9.72771L10.4498 6.77792C10.6329 6.59486 10.9296 6.59486 11.1127 6.77792C11.2958 6.96098 11.2958 7.25777 11.1127 7.44083L7.83146 10.7221C7.6484 10.9051 7.3516 10.9051 7.16854 10.7221L3.88729 7.44083C3.70424 7.25777 3.70424 6.96098 3.88729 6.77792Z" fill="white" />
    </svg>
  );
}

export default React.memo(toggle);
