import * as actionTypes from '../constants/actionTypes';

export const getJobList = (params, list) =>{

    params.page = parseInt(list.data.length/10)+1;
    list.isEnd = false;

    if(params == 'no'){
        return {
            type: actionTypes.GET_HOUSE_LIST,
            data: {data: []},
        }
    }else{
        return (dispatch)=>{
            Http.get(Ip+'api/job', params)
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

export const getJob = (jobId) =>{

    if(jobId=='no'){
        return {
            type: actionTypes.GET_HOUSE,
            data: []
        }
    }else{
        return (dispatch)=>Http.get(Ip+'api/job/'+jobId)
            .then((res)=> {
                dispatch({
                    type: actionTypes.GET_HOUSE,
                    data: res
                })
            })
    }

};
