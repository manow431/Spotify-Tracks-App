import React from 'react';
import './App.css';

import Playlist from "./Playlist";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import Spotify from "../util/Spotify";

class App extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
       SearchResults:[],
       PlaylistName: "New Playlist",
       PlaylistTracks: [],
    };

    this.Search= this.Search.bind(this);
    this.addTrack= this.addTrack.bind(this);
    this.removeTrack= this.removeTrack.bind(this);
    this.savePlaylist= this.savePlaylist.bind(this);
    this.removeTrackSearch= this.removeTrackSearch.bind(this);
    this.doThese= this.doThese.bind(this);
  }

  Search(term){
    Spotify.search(term).then(SearchResults =>{
      this.setState({
        SearchResults: SearchResults
      });
    });
  }

  addTrack(track){
    let tracks = this.state.PlaylistTracks;
    if(tracks.find(savedTrack => savedTrack.id === track.id)){
      return;
    }
    //if the track not there, we'll use google variable, using JS method called push() to pudh current track to track array and then we'll update the state of PlaylistTrack
    tracks.push(track);
    this.setState({
      PlaylistTracks: tracks
    });
  
  }

  removeTrack(track){
    let tracks = this.state.PlaylistTracks;
    let trackSearch= this.state.SearchResults;
    //filter- remove certain values
    tracks= tracks.filter(currentTrack=> currentTrack.id !==track.id);
    // unshift() get rid of the track from the array
    trackSearch.unshif(track);
    this.setState({PlaylistTracks: track});
  }

  removeTrackSearch(track){
    let tracks= this.state.SearchResults;
    tracks= tracks.filter(currentTrack=> currentTrack.id !== track.id);
    this.setState({
      SearchResults: tracks
    });
  }

  doThese(track){
    this.addTrack(track);
    this.removeTrack(track);
  }

  updatePlaylistName(name){
    this.setState({
      updatePlaylistName: name
    });
  }

  savePlaylist(){
    const trackUris = this.state.PlaylistTracks.map( track => TrackEvent.uri);
    Spotify.savePlaylist(this.PlaylistName,trackUris).then(() =>{
      this.setState({
        updatePlaylistName: "New Playlist",
        PlaylistTracks: []
      });
    });
  }
}

function App(){
    return (
      <div>
        <h1>
          <a href='http://localhost3001'>Spotify Track App</a>
        </h1>
        <div className='App'>
          <SearchBar onSearch={this.search}/>
          <div className='App-playlist'>
            <SearchResults SearchResults={this.state.SearchResults}  onAdd={this.doThese}/>
            <Playlist PlaylistTracks={this.state.PlaylistTracks} onNameChange={this.updatePlaylistName} onRemove={this.removeTrack} onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    );
}

export default App;