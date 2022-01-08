import React from 'react'
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

export default Notification