import React, { useState, useImperativeHandle } from 'react'

const Togglable = React.forwardRef(( { showLabel, hideLabel, initialVisibility, children }, ref ) => {
  const [ visible, setVisible ] = useState(initialVisibility ?? false)

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
        <button onClick={toggleVisibility}>{hideLabel ?? 'Cancel'}</button>  
      </div>
    </div>
  )
})

export default Togglable
