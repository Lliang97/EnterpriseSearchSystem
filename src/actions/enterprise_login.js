import axios from 'axios';
import actions from '../constants/actions';
import configs from '../constants/configs';
import {
    toQuery,
    getTokenHeader
} from '../../src/untils/utils';
const {
    GET_USERS_SUCCESS,//得到用户账号密码和权限
    GET_USERS_FAILURE,
    GET_PIC_SUCCESS,//获取验证码验证码
    GET_PIC_FAILURE,
} = actions;
const baseUrl = configs.baseUrl;
export function getLog(query = ''){
    return async(dispatch) => {
        try{
            let headers = getTokenHeader({});
            const data = (await axios.get(`${baseUrl}/user/login.do${query}`)).data;
            dispatch({
                type:GET_USERS_SUCCESS,
                data:data
            });
        }catch(error){ 
            dispatch({
                type:GET_USERS_FAILURE,
                error:new Error('用户登录失败')
            });
        }
    }
}
export function getPic(query = ''){
    return async(dispatch) => {
        try{
            let headers = getTokenHeader({});
            const data = (await axios.get(`${baseUrl}/pic/getPic.do${query}`)).data;
            dispatch({
                type: GET_PIC_SUCCESS,
                data:data,
            })
        }catch(error){
            dispatch({
                type:GET_PIC_FAILURE,
                error: new Error('获取验证码失败'),
            })
        }
    }
}