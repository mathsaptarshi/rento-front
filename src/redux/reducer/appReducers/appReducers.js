import createReducer from '../../../global/createReducer';
import * as constants from '../../action/appActions/constants';

const intialState = {
  jsonResp:[],  
  totalRecords:0,
};

export const appReducer = createReducer(intialState, {

	[constants.GET_JSON](state, action) {	
		alert(JSON.stringify(action));
		return Object.assign({}, state, {
			jsonResp: action,			
		});
	},
	[constants.DATA_IS_LOADING](state, action) {    
		return Object.assign({}, state, {
			jsonResp: [],			
		});
	},
	[constants.GET_ALLCABTYPES](state, action) {    
		// alert(JSON.stringify(action));
		return Object.assign({}, state, {
			getAllCabTypes: action,			
		});
	},
	// [constants.GET_SORTDATA](state, action) {
	// 	// console.log('inside reducer',action.jsonResp)
	// 	return Object.assign({}, state, {
	// 		jsonResp: action.jsonResp,
	// 	});
	// },
});
