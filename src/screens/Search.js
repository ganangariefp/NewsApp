import React, { Component } from 'react';
import {
	View,
	TouchableHighlight,
	Image,
	FlatList,
	TextInput,
} from 'react-native';
import Spinner from 'react-native-spinkit';

import { Header } from '../components/Header';
import { Article } from '../components/Article';

const { API_KEY } = require('../Util');

const search = require('../../assets/search.png');
const back = require('../../assets/left-arrow.png');

export default class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			page: 1,
			totalResults: 0,
			articlesData: [],
			query: '',
			source: this.props.navigation.getParam('source'),
			loading: false
		}
	}

	onSubmitQuery() {
		const { query, source } = this.state;
		
		this.setState({page:1, currentData:0, loading: true})
		
		if (query) {
			fetch(`https://newsapi.org/v2/everything?sources=${source.id}&page=1&language=en&q=${query}&apiKey=${API_KEY}`)
			.then((response) => response.json())
			.then((json) => {
				this.setState(function(prevState) {
					return {
						articlesData : json.articles,
						totalResults: json.totalResults,
						page: prevState.page + 1,
						currentData: json.articles.length,
						loading: false
					}
				})
			}) 
			.catch(function (error) {
				console.log(error)
			})
		}
	}

	loadMore() {
		const { query, source, page, totalResults, currentData } = this.state;

		console.log(currentData, "=" , totalResults)

		if (currentData < totalResults) {
			fetch(`https://newsapi.org/v2/everything?sources=${source.id}&page=${page}&language=enq=${query}&apiKey=${API_KEY}`)
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
	onQueryChange(event) {
		this.setState({query: event})
	}
	renderHeader() {
		return (
			<Header
				style={{backgroundColor: 'white', height: 56}}
				titleConfig = {
					<View style={styles.searchContainer}>
						<TextInput
							ref = 'search'
							style={styles.searchInput}
							value={this.state.query}
							onChange={(event) => this.onQueryChange(event.nativeEvent.text)}
							highlightColor={'black'}
							placeholder={'Search here'}/>
						<TouchableHighlight
							style={styles.rightButtonConfig}
							underlayColor={'#ccc5'}
							onPress={() => this.onSubmitQuery()}>
							<Image source={search} style={{width: 15, height: 15}} resizeMode={'contain'}/>
						</TouchableHighlight>
					</View>
				}
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
		return {uri:item.urlToImage} 
	}
	renderRow = ({item, index}) => {
		const urlImage = this.urlImage(item)
		return (
			<Article
				item ={item}
				urlImage={urlImage}
				onPress={()=> this.onWebArticle(item)}
			/>
		)
	}
	render() {
		const { articlesData, loading } = this.state;
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
		} 
		if (loading) {
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
	searchContainer : {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		height: 40,
		width: 240,
		borderColor: 'black',
		borderWidth: 1,
		backgroundColor: 'white',
		borderRadius: 18
	},
	searchInput : {
		marginLeft: 16,
		marginTop: 2,
		height: 36,
		width: 180,
	},
	rightButtonConfig : {
		justifyContent: 'center', 
		alignItems: 'center', 
		paddingHorizontal: 16
	},
}