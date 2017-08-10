import React from 'react';
import PropTypes from 'prop-types';
import Waypoint from 'react-waypoint';
import './LoadMoreContents.scss';

const LoadMoreContents = (props) =>
  <Waypoint
    scrollableAncestor={window}
    onEnter={props.load}
    onLeave={props.load}
  >
    <div className="sampleContainer">
      <div className="loader">
          <span className="dot dot_1" />
          <span className="dot dot_2" />
          <span className="dot dot_1" />
          <span className="dot dot_4" />
      </div>
    </div>
  </Waypoint>

LoadMoreContents.propTypes = {
  load: PropTypes.func.isRequired
}

export default LoadMoreContents;
