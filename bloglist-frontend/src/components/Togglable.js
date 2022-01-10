import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef(({ showLabel, hideLabel, initialVisibility, children }, ref) => {
  if (!initialVisibility) initialVisibility = false
  if (!hideLabel) hideLabel = 'Cancel'
  const [visible, setVisible] = useState(initialVisibility)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible} >
        <button onClick={toggleVisibility}>{showLabel}</button>
      </div>
      <div style={showWhenVisible} >
        {children}
        <button onClick={toggleVisibility}>{hideLabel}</button>
      </div>
    </div>
  )
})

Togglable.propTypes = {
  showLabel: PropTypes.string.isRequired,
  hideLabel: PropTypes.string,
  initialVisibility: PropTypes.bool
}

Togglable.displayName = 'Togglable'

export default Togglable
