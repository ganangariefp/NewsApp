import React, { Component } from 'react';
import {
  View,
	Text,
	TouchableHighlight,
	Image,
	FlatList
} from 'react-native';
import axios from 'axios';
import Spinner from 'react-native-spinkit';

import { Header } from '../components/Header';
import { Error } from '../components/Error';

const newsPaper = require('../../assets/newspaper.png');
const { API_KEY } = require('../Util');

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			newsData: [],
			error: false,
			errorResponseData: []
		}
	}
	componentDidMount() {
		this.getNews()
	}

	getNews() {
		axios.get(`https://newsapi.org/v2/sources?language=en&apiKey=${API_KEY}`)
		.then((response) => {
			this.setState({
				newsData : response.data.sources
			})
		})
		.catch((error) => {
			console.log(error.response.data)
			this.setState({
				error: true,
				errorResponseData: error.response.data
			})
		})
	}

	renderHeader() {
		return (
			<Header
				style={{backgroundColor: 'white', height: 56}}
				titleConfig = {{title: 'TOKPED NEWS'}}
			/>
		)
	}

	onArticles(item) {
		this.props.navigation.navigate('Articles', {
			source: item,
		});
	}

	renderRow = ({item}) => {
		return (
			<TouchableHighlight
				onPress = {() => this.onArticles(item)}
				underlayColor={'#ccc5'}
				style ={styles.newsSource}>
				<View style = {{flex: 1, flexDirection: 'row'}}>
					<Image source={{uri: `https://icon-locator.herokuapp.com/icon?url=${item.url}&size=70..120..200`}} 
						defaultSource ={newsPaper}
						resizeMode = {'cover'} 
						style={{ width: 50 }} 
					/>
					<View style ={{flex: 1, marginHorizontal: 8, marginTop: 2, width: "70%"}}>
						<View>
							<Text numberOfLines={2}>{item.name}</Text>
						</View>
						<View>
							<Text style = {{color: 'grey'}}>{item.category}</Text>
						</View>
					</View>
				</View>
			</TouchableHighlight>
		)
	}
	render() {
		const { error, errorResponseData, newsData } = this.state; 

		let	renderData;
		
		if (newsData.length) {
			renderData =
				<FlatList
					data={this.state.newsData}
					keyExtractor = { (item) => item.id.toString() }
					renderItem={this.renderRow.bind(this)}
					numColumns={2}
				/>
		} else if (error) {
			renderData = 
				<Error errorResponseData = {errorResponseData} onPress={()=> this.getNews()}/>
		} else {
			renderData = 
				<View style= {{flex:1, alignSelf: 'center', justifyContent: 'center'}}>
					<Spinner 
						style={{ alignSelf: 'center' }}
						isVisible={true} 
						size={37} 
						type={'ThreeBounce'} 
						color={'black'}/>
				</View>
		}

		return (
			<View style ={styles.container}>
				{this.renderHeader()}	
				{renderData}
			</View>
		)
	}
}

const styles = {
	container : {
		flex: 1
	},
	newsSource : {
		flex: 1, 
		height: 60,
		margin: 8,
		borderColor: 'black',
		borderWidth: 1,
		backgroundColor: 'white',
		borderRadius: 2
	},
	flatListContainer : {
		flex: 1,
		margin: 8
	},
}