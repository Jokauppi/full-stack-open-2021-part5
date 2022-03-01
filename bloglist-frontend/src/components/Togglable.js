import React, { useState, useImperativeHandle } from "react";
import PropTypes from "prop-types";
import { Button, Stack } from "react-bootstrap";

const Togglable = React.forwardRef(
  ({ showLabel, hideLabel, initialVisibility, children }, ref) => {
    if (!initialVisibility) initialVisibility = false;
    if (!hideLabel) hideLabel = "Cancel";
    const [visible, setVisible] = useState(initialVisibility);

    const hideWhenVisible = { display: visible ? "none" : "" };
    const showWhenVisible = { display: visible ? "" : "none" };

    const toggleVisibility = () => {
      setVisible(!visible);
    };

    useImperativeHandle(ref, () => {
      return {
        toggleVisibility,
      };
    });

    return (
      <div>
        <div style={hideWhenVisible}>
          <Button onClick={toggleVisibility}>{showLabel}</Button>
        </div>
        <div style={showWhenVisible}>
          <Stack gap={2}>
            <div>
              {children}
            </div>
            <Button variant="outline-primary" onClick={toggleVisibility}>{hideLabel}</Button>
          </Stack>
        </div>
      </div>
    );
  }
);

Togglable.propTypes = {
  showLabel: PropTypes.string.isRequired,
  hideLabel: PropTypes.string,
  initialVisibility: PropTypes.bool,
};

Togglable.displayName = "Togglable";

export default Togglable;
