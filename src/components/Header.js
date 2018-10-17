import React from 'react';
import NavigationBar from 'react-native-navbar';

export const Header = ({style, titleConfig, leftButtonConfig, rightButtonConfig}) => {
	return (
		<NavigationBar
			style = {style}
			title={titleConfig}
			leftButton={leftButtonConfig}
			rightButton={rightButtonConfig}
		/>
	)
}