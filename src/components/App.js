import React, { Component } from 'react';

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import Post from './Post/Post'

import axios from 'axios';

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
    .then(res=> {
      this.setState({ posts: res.data })
    }).catch(err=> console.log(err))
  }

  updatePost(id, text) {
    axios.put(`https://practiceapi.devmountain.com/api/posts?id=${ id }`, { text })
    .then(res=>{
      this.setState({ posts: res.data})
    })
  }

  deletePost(id) {
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`)
    .then((res)=>{
      this.setState({ posts: res.data})
    }).catch(err=>console.log(err))
  }


  createPost(text) {
    axios.post(`https://practiceapi.devmountain.com/api/posts`, {text})
    .then(res=>{
      this.setState({ posts : res.data})
    }).catch(err=>console.log(err))
  }

  searchPosts = (text)=>{
    axios.get(`https://practiceapi.devmountain.com/api/posts/filter?text=${encodeURI(text)}`)
    .then(res=> {
      this.setState({ posts: res.data })
    }).catch(err=> console.log(err))
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header searchPostsFn={this.searchPosts} posts={posts}/>

        <section className="App__content">

          <Compose createPostFn={this.createPost}/>
          {posts.map((post)=>{
            return <Post 
              id={post.id} 
              updatePostFn={this.updatePost}
              text={post.text} 
              date={post.date} 
              key={post.id}
              deletePost={this.deletePost}
              
              />
          })}

        </section>
      </div>
    );
  }
}

export default App;
