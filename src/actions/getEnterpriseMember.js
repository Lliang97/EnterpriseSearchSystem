import axios from 'axios';
import actions from '../constants/actions';
import configs from '../constants/configs';
const {
    GET_ENTERPRISE_MEMBER_SUCCESS,//查询企业主要成员
	GET_ENTERPRISE_MEMBER_FAILURE,
} = actions;
const baseUrl = configs.baseUrl;
export function getEnterprise_member(query = '') {
	return async(dispatch) => {
		try {
			const data = (await axios.get(`${baseUrl}mainNumber/query.do${query}`)).data;
			dispatch({
				type: GET_ENTERPRISE_MEMBER_SUCCESS,
				data: data
			});
		} catch (error) {
			dispatch({
				type: GET_ENTERPRISE_MEMBER_FAILURE,
				error: new Error('企业主要成员获取失败, 请稍后再试')
			});
		}
	};
};