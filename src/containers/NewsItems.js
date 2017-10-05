import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import GridIt from "../components/GridIt.js";
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';

import "../styles/newsItems.css";

import { fetchMultiNews, changeAmountOfArticlesShown } from "../actions/multiNewsAsync.js";


class NewsItems extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isDrawerOpen : false
        }
    }

    componentDidMount() {
        this.props.fetchMultiSources(this.props.sources);     //Fetches latest news items from NewsApi's
    }
    
  
    toggleDrawer = () => {
        this.setState({
            isDrawerOpen : this.state.isDrawerOpen ? false : true
        })
    }

    changeArticleNumber = (e) => {
        let amount = e.target.value > 9 ? e.target.value : 10;        
        this.props.changeNumberOfArticlesShown(amount);
          this.props.fetchMultiSources(this.props.sources);
    }

    handleEnter = (e) => {
        if (e.keyCode === 13){
            this.toggleDrawer();
        }
    }

    render() {
        return (
            <div id="news-items">
                <AppBar 
                    style={{textAlign:"left", backgroundColor:"#FF6F00", width: "97%", margin:"0 auto"}} 
                    title="News"
                    iconElementLeft={<div></div>}
                    iconElementRight={
                        <FlatButton onTouchTap={this.toggleDrawer}><i className="fa fa-ellipsis-h"></i></FlatButton>
                    }  
                />
                <GridIt articles={this.props.articles} loading={this.props.multiNewsLoading}/>
                <Drawer onRequestChange={() => {this.setState({isDrawerOpen:false})}} docked={false} open={this.state.isDrawerOpen}>
                    <MenuItem  style={{background: "rebeccaPurple", color: "white"}} onTouchTap={this.toggleDrawer}>Articles Available:  {this.props.articlesAvailable}</MenuItem>
                    <MenuItem>
                        Show: <TextField onKeyDown={this.handleEnter} onChange={this.changeArticleNumber} style={{marginLeft:"10px"}} hintText="min: 10" />
                    </MenuItem>
                </Drawer>
            </div>
        )

    }
}


NewsItems.propTypes = {
    articles: PropTypes.array,
    sources: PropTypes.array,
    multiNewsLoading: PropTypes.bool,
    articlesAvailable: PropTypes.number
}

const mapStateToProps = (state, ownProps) => {
  return {
    articles : state.multiNewsReducer.multiSourceNews,
    sources : state.multiNewsReducer.multiSources,
    multiNewsLoading : state.multiNewsReducer.isLoading,
    articlesAvailable : state.multiNewsReducer.howManyArticlesAreThere
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMultiSources : (sources) => {
            dispatch(fetchMultiNews(sources))
        },
    changeNumberOfArticlesShown : (amount) => {
        dispatch(changeAmountOfArticlesShown(amount))
    }
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(NewsItems);