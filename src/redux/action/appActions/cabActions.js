import * as constants from './constants';
import axios from 'axios';



export function actionGetAllCab(response){    
	return {
        type: constants.GET_ALL_CAB,
        response
	};
}
export function actionGetCabById(response){
    return {
		type: constants.GET_CAB_BY_ID,
		response
	};
}
export function actionInsertCab(response){
    return {
		type: constants.INSERT_CAB,
		response
	};
}

export function actionUpdateCab(response){
    return {
		type: constants.UPDATE_CAB,
		response
	};
}

export function getallcab() {    
    return dispatch => {        
        return axios.get('http://localhost:4000/api/cab')		
        .then(response => 
        {            
            if(response){
                if(response.status === 200 && response.statusText === "OK"){                  
                    dispatch(actionGetAllCab(response));
                    return response                
                }
                else{
                    // console.log("SignIn Failed Response::",response);                    
                    return "Err"
                }                
            }            			
        })
        .catch((response)=>{
            console.log("I am in catch block",response)
        })
    }
}

export function getcabbyid(id) {    
    // alert(id);
    return dispatch => {        
        return axios.get('http://localhost:4000/api/cab/getcabbyid/'+id).then((response) => {   
            if(response){
                if(response.status === 200 && response.statusText === "OK"){                  
                    dispatch(actionGetCabById(response));
                    return response                
                }
                else{
                    // console.log("SignIn Failed Response::",response);                    
                    return "Err"
                }                
            }            			
        })
        .catch((response)=>{
            console.log("I am in catch block",response)
        })
    }
}

export function insertcab(cabData) {    
    return dispatch => {        
                return axios.post('http://localhost:4000/api/cab/create',cabData)		
                .then(response => 
                {            
                    if(response){
                        if(response.status === 200 && response.statusText === "OK"){                  
                            dispatch(actionInsertCab(response));
                            return response                
                        }
                        else{
                            console.log("SignIn Failed Response::",response);                    
                            return "Err"
                        }                
                    }            			
                })
                .catch((response)=>{
                    console.log("I am in catch block",response)
                })
            }
}

export function updatecab(cabId,cabData) {    
    return dispatch => {        
        return axios.put('http://localhost:4000/api/cab/cabupdate/'+cabId,cabData)
                .then(response => 
                {            
                    if(response){
                        if(response.status === 200 && response.statusText === "OK"){                  
                            dispatch(actionUpdateCab(response));
                            return response                
                        }
                        else{
                            console.log("SignIn Failed Response::",response);                    
                            dispatch(actionUpdateCab(response));
                            return "Err"
                        }                
                    }            			
                })
                .catch((response)=>{
                    console.log("I am in catch block",response)
                })
            }
}


// export function signup(userData){           
//     return dispatch => {        
//         return axios.post('http://localhost:4000/api/auth/signup',userData)		
//         .then(response => 
//         {            
//             if(response){
//                 if(response.status === 200 && response.statusText === "OK"){                  
//                     dispatch(actionSignup(response));
//                     return response                
//                 }
//                 else{
//                     console.log("SignIn Failed Response::",response);                    
//                     return "Err"
//                 }                
//             }            			
//         })
//         .catch((response)=>{
//             console.log("I am in catch block",response)
//         })
//     }
// }