require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import { connect } from 'react-redux';

class AppComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <main>
        {this.props.children}
      </main>
    );
  }
  componentDidMount() {
    console.log(this.props.name);
  }
}

const test = (state) => {
  return {
    name: state.name
  }
}

AppComponent.defaultProps = {
};

export default connect(test)(AppComponent);
