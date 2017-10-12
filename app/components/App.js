import React from 'react';
// var yelp = require('../../server/yelp');
var api = require('../utils/api');

function BusinessList (props) {
  // var miles = props.business.distance*0.000621371192;
  return (
    <ul className='biz-list'>
      {props.businesses.map(function (business, index) {
        return (
          <li key={business.name} className='biz-item'>
            <div className='biz-name'>{business.name}</div>
            <ul className='space-list-items'>
              <li>
                <img
                  className='biz-image'
                  src={business.image_url}
                  alt={'Image for ' + business.name} />
              </li>
              <li className='left'>{business.rating} stars | ({business.review_count} reviews)</li>
              <li className='left'>Eating in <span className='green-text'>15 minutes</span></li>
              <li className='left'>Additional Drive Time: <span className='red-text'>20 minutes</span></li>
              <li className='left'>Distance: {(business.distance*0.000621371192)}</li>
              <li><a className='button' href={business.url} target='_blank'>
                        View On Yelp
                  </a>
              </li>
            </ul>
          </li>
        )
      })}
    </ul>
  )
}

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      businesses: null
    };
  }
  componentDidMount () {
    api.getRestaurants()
      .then(function (businesses) {
        this.setState(function () {
          return {
            businesses: businesses
          }
        })
      }.bind(this));
  }
  render () {
    return (
      <div>
        {!this.state.businesses
          ? <p>LOADING!</p>
          : <BusinessList businesses={this.state.businesses} />}
      </div>
    )
  }
}

module.exports = App;