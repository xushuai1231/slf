import * as actionTypes from '../constants/actionTypes';

export const getRecoveryList = (params, list) =>{

    params.page = parseInt(list.data.length/10)+1;
    list.isEnd = false;

    if(params == 'no'){
        return {
            type: actionTypes.GET_HOUSE_LIST,
            data: {data: []},
        }
    }else{
        return (dispatch)=>{
            Http.get(Ip+'api/recovery', params)
                .then((res)=>{
                    if(res.length<10){
                        list.isEnd = true;
                        list.data = list.data.concat(res);
                    }else{
                        list.data = list.data.concat(res);
                    }

                    dispatch({
                        type: actionTypes.GET_HOUSE_LIST,
                        data: {
                            params: list.params,
                            data : list.data,
                            isEnd: list.isEnd,
                        },
                    })
                })
        }
    }

};

export const getRecovery = (recoveryId) =>{

    if(recoveryId=='no'){
        return {
            type: actionTypes.GET_HOUSE,
            data: []
        }
    }else{
        return (dispatch)=>Http.get(Ip+'api/recovery/'+recoveryId)
            .then((res)=> {
                dispatch({
                    type: actionTypes.GET_HOUSE,
                    data: res
                })
            })
    }

};
