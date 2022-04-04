import React from 'react';
import { bool, func } from 'prop-types';
import SVG from '../SVG';

const Detect = React.memo(({
                                Detected,
                                onClick,
                              }) => {
  return (
    <button
      type="button"
      className="image-gallery-icon image-gallery-detect-button"
      onClick={onClick}
      aria-label="Detect CurrentImg"
    >
      <SVG strokeWidth={2} icon={'pause'} />
    </button>
  );
});

Detect.displayName = 'Detect';

Detect.propTypes = {
  isPlaying: bool.isRequired,
  onClick: func.isRequired,
};


export default Detect;
