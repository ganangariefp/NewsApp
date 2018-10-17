import React from 'react';
import {
	View,
	Text,
	TouchableHighlight
} from 'react-native';

export const Error = ({errorResponseData, onPress}) => {
	const { message } = errorResponseData;
	console.log('ERROR',message)
	return (
		<View style={styles.container}>
			<View style = {{margin: 16}}>
				<Text>{message}</Text>
			</View>
			<View style = {{margin: 16}}>
				<Text onPress = {onPress}>TRY AGAIN</Text>
			</View>
		</View>
	)
}

const styles = {
	container : {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
}