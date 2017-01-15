'use strict';
import { combineReducers }  from 'redux';
import { routerReducer }    from 'react-router-redux';

const getName = () => {
	return {
		name: 'baron'
	}
}
export default combineReducers({
	  routing: routerReducer,
		name: getName
});
