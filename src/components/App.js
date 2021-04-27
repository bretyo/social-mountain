import React, { Component } from 'react';

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import Post from './Post/Post'

import axios from 'axios'

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    axios.get(`https://practiceapi.devmountain.com/api/posts`)
    .then(response=>{ this.setState({ posts: response.data }) })
    .catch(err=>console.log(err))
  }

  updatePost(id, text) {
    axios.put(`https://practiceapi.devmountain.com/api/posts?id=${id}`, {text})
    .then(response=>{ this.setState({ posts: response.data }) })
    .catch(err=>console.log(err))
  }

  deletePost(id) {
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`)
    .then(response=>{ this.setState({ posts: response.data }) })
    .catch(err=>console.log(err))
  }

  createPost(text) {
    axios.post(`https://practiceapi.devmountain.com/api/posts`, {text})
    .then(response=>{ this.setState({ posts: response.data }) })
    .catch(err=>console.log(err))
  }

  searchPost = (text)=>{
    axios.get(`https://practiceapi.devmountain.com/api/posts/filter?text=${text}`)
    .then(response=>{ this.setState({ posts: response.data }) })
    .catch(err=>console.log(err))
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header searchPostsFn={this.searchPost} />

        <section className="App__content">

          <Compose createPostFn={this.createPost} />
          {posts.map((post)=>{
            console.log(post)
            return <Post 
              key={post.id} 
              text={post.text}
              date={post.date}
              id={post.id}
              updatePostFn={this.updatePost}
              deletePostFn={this.deletePost}
              />
          })}
          
        </section>
      </div>
    );
  }
}

export default App;
