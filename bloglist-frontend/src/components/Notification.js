import React from 'react'
import PropTypes from 'prop-types'
import './notification.css'

const Notification = ({ message, setNotification, color }) => {

	if (message === null) return null

  setTimeout(() => {
    setNotification(null)
  }, 5000)

	const colorStyle = {
		color: `${color.main}`,
		borderColor: `${color.main}`,
		backgroundColor: `${color.back}`
	}

	return (
		<div className="notification" style={colorStyle} >
			{message}
		</div>
	)

}

Notification.propTypes = {
  message: PropTypes.string,
  setNotification: PropTypes.func.isRequired,
  color: PropTypes.object.isRequired
}

export default Notification