import React from 'react';
import {
	View,
	Image,
	Text,
	TouchableHighlight
} from 'react-native';

const background = require('../../assets/background.jpg');

export const Article = ({item, urlImage, onPress}) => {
	return (
		<TouchableHighlight
			onPress = {onPress}
			underlayColor={'#ccc5'}
			style={styles.articleContainer}>
			<View style = {{flex: 1, flexDirection: 'row'}}>
				<Image source={urlImage} 
					defaultSource ={background}
					resizeMode = {'cover'} 
					style={{ width: '30%',height: '100%' }} 
				/>
				<View style ={{flex: 1, justifyContent: 'space-between', margin: 16, width: "80%"}}>
					<View>
						<Text numberOfLines={2}>{item.title}</Text>
					</View>
					<View>
						<Text style = {{color: 'grey'}}>{item.author}</Text>
					</View>
				</View>
			</View>
		</TouchableHighlight>
	)
}

const styles = {
	articleContainer : {
		flex: 1, 
		height: 100,
		margin: 8,
		borderColor: 'black',
		borderWidth: 1,
		backgroundColor: 'white',
		borderRadius: 2
	},
}


