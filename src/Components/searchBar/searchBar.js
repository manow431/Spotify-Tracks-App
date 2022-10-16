import React from 'react';
import "./SearchBar.css";

class searchBar extends React.Component {
    constructor(props) {
      super(props)
    
      this.state = {
         term:""
      };
      this.handleTermChange = this.handleTermChange.bind(this);
      this.search = this.search.bind(this);
      this.handleEnter = this.handleEnter.bind(this);
    }

    handleTermChange(event){
        this.setState({
            //using the 'event' keyword to get the value inside textBox the moment search entered changes, we trap the updated value
            term:event.target.value
        });
    }

    search(){
        // accessing on search and pass it to updated term
        this.props.onSearch(this.state.term);
    }

    handleEnter(event){
        // start one the user enters 13 characters
        if(event.keycode ===13){
            this.search();
        }
    }

  render() {
    return (
      <div className='searchBar'>
        <input placeholder='Enter Juz, Chapter or Verse' onChange={this.handleTermChange} onKeyUp={this.handleEnter} />
        <button className='searchButton' onClick={this.search}>Search</button>
      </div>
    );
  }
}

export default searchBar;