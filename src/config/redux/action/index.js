import firebase from '../../firebase'

export const actionUserName = () => (dispatch) => {

    setTimeout(() => {
        return dispatch({ type: "CHANGE_USER", value: "prawito hudoro" })
    }, 500)
}

export const registerUserApi = (data) => (dispatch)=> {
    return new Promise((resolve, reject)=>{
        dispatch({type: 'CHANGE_LOADING', value: true})
        console.log("Data: ",data);
        console.log("dispatch :" , dispatch);
        firebase.auth().createUserWithEmailAndPassword(data.email, data.password).then(res=>{
            console.log('berhasil:',res)
            dispatch({type: 'CHANGE_LOADING', value: false})
            resolve(true)
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log("erorr registrar :",errorCode,errorMessage);
            // ...
            dispatch({type: 'CHANGE_LOADING', value: false})
            reject(false)
        })
    })
}

export const loginUserAPI = (data) => (dispatch)=> {

    return new Promise((resolve,reject)=>{
        dispatch({type: 'CHANGE_LOADING', value: true})
        console.log("Data: ",data);
        console.log("dispatch :" , dispatch);
        firebase.auth().signInWithEmailAndPassword(data.email, data.password)
        .then(res=>{
            console.log('berhasil:',res)
            const dataUser = {
                email: res.user.email,
                uid: res.user.uid,
                emailVerified: res.user.emailVerified
            }
            dispatch({type: 'CHANGE_LOADING', value: false})
            dispatch({type: 'CHANGE_ISLOGIN', value: true})
            dispatch({type: 'CHANGE_USER', value: dataUser})
            resolve(true)
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode,errorMessage);
            // ...
            dispatch({type: 'CHANGE_LOADING', value: false})
            dispatch({type: 'CHANGE_ISLOGIN', value: false})
            reject(false)
        })
    })
    
}