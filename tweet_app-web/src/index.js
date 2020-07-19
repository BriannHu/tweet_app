import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {ProfileBadgeComponent} from './profiles'
import {FeedComponent, TweetsComponent, TweetDetailComponent} from './tweets'
import * as serviceWorker from './serviceWorker';

const appEl = document.getElementById('root')
if (appEl) {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    appEl
  );
}
const e = React.createElement
const tweetsEl = document.getElementById('tweet_app')
if (tweetsEl) {
  ReactDOM.render(e(TweetsComponent, tweetsEl.dataset), tweetsEl)
}

const tweetsFeedEl = document.getElementById('tweet_app-feed')
if (tweetsFeedEl) {
  ReactDOM.render(e(FeedComponent, tweetsFeedEl.dataset), tweetsFeedEl)
}

const tweetDetailElements = document.querySelectorAll(".tweet_app-detail")

tweetDetailElements.forEach(container=> {
  ReactDOM.render(
    e(TweetDetailComponent, container.dataset),
    container)

})

const userProfileBadgeElements = document.querySelectorAll(".tweet_app-profile-badge")

userProfileBadgeElements.forEach(container=> {
  ReactDOM.render(
    e(ProfileBadgeComponent, container.dataset),
    container)

})

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
