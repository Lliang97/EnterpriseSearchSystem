import axios from 'axios';
import actions from '../constants/actions';
import configs from '../constants/configs';
import {
    getTokenHeader
} from '../../src/untils/utils';
const {
    GET_USERNUM_SUCCESS,//得到用户数量
    GET_USERNUM_FAILURE,
    POST_USER_SUCCESS,//添加用户
    POST_USER_FAILURE,
    GET_ALLUSER_SUCCESS,//查询所有用户
    GET_ALLUSER_FAILURE,
    DELETE_USER_SUCCESS,//通过id删除用户
    DELETE_USER_FAILURE,
} = actions;
const baseUrl = configs.baseUrl;
export function getEnterprise_user(query = '') {
	return async(dispatch) => {
		try {
            const data = (await axios.get(`${baseUrl}user/selectCountByCondition.do${query}`)).data;
			dispatch({
				type: GET_USERNUM_SUCCESS,
				data: data
			});
		} catch (error) {
			dispatch({
				type: GET_USERNUM_FAILURE,
				error: new Error('用户数量获取失败, 请稍后再试')
			});
		}
	};
};
export function insert_newuser(config,query = '') {
	return async(dispatch) => {
		try {
            let headers = getTokenHeader({})
            const data = (await axios.post(`${baseUrl}user/insertSelective.do${query}`,config,{
                headers:headers
            })).data;
			dispatch({
				type: POST_USER_SUCCESS,
				data: data
			});
		} catch (error) {
			dispatch({
				type: POST_USER_FAILURE,
				error: new Error('添加用户失败, 请稍后再试')
			});
		}
	};
};
export function get_alluser(query = '') {
	return async(dispatch) => {
		try {
			const data = (await axios.get(`${baseUrl}user/query.do${query}`)).data;
			dispatch({
				type: GET_ALLUSER_SUCCESS,
				data: data,
			});
		} catch (error) {
			dispatch({
				type: GET_ALLUSER_FAILURE,
				error: new Error('获取用户失败, 请稍后再试')
			});
		}
	};
};
export function delete_user(query = '',config) {
    return async(dispatch) => {
        try{
            let headers = getTokenHeader({})
            const data = (await axios.delete(`${baseUrl}user/deleteByPrimaryKey.do${query}`,{
                headers:headers
            },config)).data;
            dispatch({
                type:DELETE_USER_SUCCESS,
                data:data
            })
        }catch(error){
            dispatch({
                type:DELETE_USER_FAILURE,
                error:Error("删除用户失败，请稍后再试")
            })
        }
    }
}