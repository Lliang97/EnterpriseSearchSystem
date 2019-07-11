import axios from 'axios';
import actions from '../constants/actions';
import configs from '../constants/configs';

const {
    GET_ENTERPRISE_RECRUIT_SUCCESS,//查询公司招聘
	GET_ENTERPRISE_RECRUIT_FAILURE,
	GET_ENTERPRISE_RECRUITNUMBER_SUCCESS,//查询公司招聘条数
	GET_ENTERPRISE_RECRUITNUMBER_FAILURE
} = actions;
const baseUrl = configs.baseUrl;
export function getEnterprise_recruit(query = '') {
	return async(dispatch) => {
		try {
			const data = (await axios.get(`${baseUrl}recruit/query.do${query}`)).data;
			dispatch({
				type: GET_ENTERPRISE_RECRUIT_SUCCESS,
				data: data
			});
		} catch (error) {
			dispatch({
				type: GET_ENTERPRISE_RECRUIT_FAILURE,
				error: new Error('查询索公司招聘获取失败, 请稍后再试')
			});
		}
	};
};
export function getEnterprise_recruitnumber(query = '') {
	return async(dispatch) => {
		try {
			const data = (await axios.get(`${baseUrl}recruit/total.do${query}`)).data;
			dispatch({
				type: GET_ENTERPRISE_RECRUITNUMBER_SUCCESS,
				data: data
			});
		} catch (error) {
			dispatch({
				type: GET_ENTERPRISE_RECRUITNUMBER_FAILURE,
				error: new Error('查询索公司招聘条数获取失败, 请稍后再试')
			});
		}
	};
};
