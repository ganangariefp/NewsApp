import React, { Component } from 'react';
import {
	View,
	Image,
	TouchableHighlight,
	WebView
} from 'react-native';

import { Header } from '../components/Header';

const back = require('../../assets/left-arrow.png')

export default class WebArticle extends Component {
	constructor(props) {
		super(props);
		this.state = {
			article : this.props.navigation.getParam('article'),
		}
	}
	renderHeader() {
		const { article } = this.state;

		return (
			<Header
				style={{backgroundColor: 'white', height: 56}}
				titleConfig = {{title: article.source.name }}
				leftButtonConfig={
					<TouchableHighlight
						style={{justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20}}
						underlayColor={'#ccc5'}
						onPress={() => this.props.navigation.pop()}>
						<Image source={back} style={{width: 15, height: 15}} resizeMode={'contain'}/>
					</TouchableHighlight>
				}      
			/>
		)
	}
	render() {
		const { article } = this.state;
		const uri = article.url;


		return (
			<View style ={styles.container}>
				{this.renderHeader()}	
				<WebView
					ref={(ref) => { this.webview = ref; }}
					source={{ uri }}
					style={{flex: 1}}
					onNavigationStateChange={(event) => {
						console.log('url',event.url)
					}}
				/>
			</View>
		)
	}
}

const styles = {
	container : {
		flex: 1
	},
}