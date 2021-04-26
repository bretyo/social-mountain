import React, { Component } from 'react';

import './Search.css';

import SearchIcon from 'react-icons/lib/md/search';

//////////////////////////////////////////////////////// THIS COMPONENT IS BEING RENDERED IN THE *HEADER* COMPONENT

export default class Search extends Component {
  constructor(props){
    super(props);

    this.state = {
      userInput: ''
    }
  }
  render() {
    const {userInput} = this.state;
    const {searchPostsFn} = this.props;
    return (
      <section className="Search__parent">

        <div className="Search__content">
          <input onChange={e=>this.setState({ userInput: e.target.value })} placeholder="Search Your Feed" />

          <SearchIcon onClick={()=>searchPostsFn(userInput)} id="Search__icon" />
        </div>
        
      </section>
    )
  }
}