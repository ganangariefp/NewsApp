import React, { Component } from 'react';
import {
	View,
	TouchableHighlight,
	Image,
	FlatList,
	Text
} from 'react-native';
import Spinner from 'react-native-spinkit';

import { Header } from '../components/Header';
import { Article } from '../components/Article';

const { API_KEY } = require('../Util');

const search = require('../../assets/search.png');
const background = require('../../assets/background.jpg');
const back = require('../../assets/left-arrow.png');

export default class Articles extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			page: 1,
			totalResults: 0,
			articlesData: [],
			source: this.props.navigation.getParam('source'),
			error: false,
			errorResponseData: [],
			currentData: 0,
		}
	}

	componentDidMount() {
		this.getArticles();
	}

	getArticles() {
		const { source, page } = this.state; 

		fetch(`https://newsapi.org/v2/everything?sources=${source.id}&page=${page}&language=en&apiKey=${API_KEY}`)
		.then((response) => response.json())
		.then((json) => {
			this.setState(function(prevState) {
				return {
					articlesData : json.articles,
					totalResults: json.totalResults,
					page: prevState.page + 1,
					currentData: json.articles.length
				}	
			})
		}) 
		.catch(function (error) {
			console.log(error)
			this.setState({
				error: true,
				errorResponseData: error.response.data
			})
		})
	}
	loadMore() {
		const { source, page, totalResults, currentData } = this.state;

		console.log(currentData, "=" , totalResults)

		if (currentData < totalResults) {
			fetch(`https://newsapi.org/v2/everything?sources=${source.id}&page=${page}&language=en&apiKey=${API_KEY}`)
			.then((response) => response.json())
			.then((json) => {
				this.setState(function(prevState) {
					return {
						articlesData : prevState.articlesData.concat(json.articles),
						page: prevState.page + 1,
						currentData : prevState.currentData + json.articles.length
					}	
				})
			}) 
			.catch(function (error) {
				console.log(error)
			})
		}
	}
	onSearch(item) {
		this.props.navigation.navigate('Search', {
			source: item,
		});
	}
	renderHeader() {
		const { source } = this.state;
		return (
			<Header
				style={{backgroundColor: 'white', height: 56}}
				titleConfig = {{title: source.name }}
				leftButtonConfig={
					<TouchableHighlight
						style={{justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20}}
						underlayColor={'#ccc5'}
						onPress={() => this.props.navigation.pop()}>
						<Image source={back} style={{width: 15, height: 15}} resizeMode={'contain'}/>
					</TouchableHighlight>
				}      
				rightButtonConfig = {
					<TouchableHighlight
						style={styles.rightButtonConfig}
						underlayColor={'#ccc5'}
						onPress={() => this.onSearch(source)}>
						<Image source={search} style={{width: 15, height: 15}} resizeMode={'contain'}/>
					</TouchableHighlight>
				}
			/>
		)
	}
	onWebArticle(item) {
		this.props.navigation.navigate('WebArticle', {
			article: item,
		});
	}
	urlImage(item) {
		if (!item.urlToImage) {
			return background
		}
		if (!item.urlToImage.startsWith('http')) { 
			return {uri: new URL(item.urlToImage, this.state.source.url)}
		}
		return {uri: item.urlToImage} 
	}
	renderRow = ({item, index}) => {
		const urlImage = this.urlImage(item)

		if (index === 0) {
			return (
				<TouchableHighlight
					onPress = {()=>this.onWebArticle(item)}
					underlayColor={'#ccc5'}>
					<View style={styles.firstArticleContainer}>
						<Image source={urlImage} 
							defaultSource ={background}
							resizeMode = {'cover'} 
							style={{ height: '70%' }} 
						/>
						<View style = {{flex: 1, margin: 16, justifyContent: 'space-between'}}>
							<View>
								<Text numberOfLines={2} style={{fontSize: 16}}>{item.title}</Text>
							</View>
							<View>
								<View>
									<Text style = {{color: 'grey'}}>{item.author}</Text>
								</View>
							</View>
						</View>
					</View>
				</TouchableHighlight>
			)
		}
		return (
			<Article
				item ={item}
				urlImage={urlImage}
				onPress={()=> this.onWebArticle(item)}
			/>
		)
	}

	render() {
		const { error, errorResponseData, articlesData } = this.state; 

		let	renderArticles;
		
		if (articlesData.length) {
			renderArticles =
			<FlatList
				data={articlesData}
				bounces= {false}
				keyExtractor = { (item, index) => index.toString() }
				renderItem={this.renderRow.bind(this)}
				onEndReached={()=>this.loadMore()}
			/>
		} else if (error) {
			renderArticles = 
				<Error errorResponseData = {errorResponseData} onPress={()=> this.getArticles()}/>
		} else {
			renderArticles = 
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
				{renderArticles}
			</View>
		)
	}
}

const styles = {
	container : {
		flex: 1
	},
	firstArticleContainer: {
		flex: 1, 
		height: 300,
		backgroundColor: 'white',
	},
	rightButtonConfig : {
		justifyContent: 'center', 
		alignItems: 'center', 
		paddingHorizontal: 20
	},
}