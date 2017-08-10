import React from 'react';
import PropTypes from 'prop-types';
import './ContentFrame.scss';

const ContentFrame = (props) =>
  <div className="ContentFrame">
    <div className="container">
      <div className="row">
        { props.children }
      </div>
    </div>
  </div>;

ContentFrame.WhiteBox = (props) =>
  <div className="WhiteBox">
    {props.children}
  </div>;

ContentFrame.LeftPanel = (props) =>
  <div className="col-8 left-panel">
    {props.children}
  </div>

ContentFrame.RightPanel = (props) =>
  <div className="col-4 right-panel">
    {props.children}
  </div>

ContentFrame.WhiteBox.displayName = "ContentFrame.WhiteBox"
ContentFrame.LeftPanel.displayName = "ContentFrame.LeftPanel"
ContentFrame.RightPanel.displayName = "ContentFrame.RightPanel"

export default ContentFrame;


ContentFrame.propTypes = {
  children: PropTypes.array
}
ContentFrame.WhiteBox.propTypes = {
  children: PropTypes.array
}
ContentFrame.LeftPanel.propTypes = {
  children: PropTypes.array
}
ContentFrame.RightPanel.propTypes = {
  children: PropTypes.array
}
