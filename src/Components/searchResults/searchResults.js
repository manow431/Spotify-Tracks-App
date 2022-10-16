import React from 'react';
import "./TrackList.css";

import Track from "../TrackList/TrackList";
import TrackList from '../TrackList/TrackList';

class searchResults extends React.Component{
    render(){
        return(
            <div className='searchResults'>
                <h2>Results</h2>
                <TrackList tracks = {this.props.searchResults} onAdd={this.props.onAdd}/>
            </div>
        );

    }
}

export default searchResults;