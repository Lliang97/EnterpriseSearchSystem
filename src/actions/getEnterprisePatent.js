import axios from 'axios';
import actions from '../constants/actions';
import configs from '../constants/configs';

const {
    GET_ENTERPRISE_PATENT_SUCCESS,//查询公司专利
	GET_ENTERPRISE_PATENT_FAILURE,
	GET_ENTERPRISE_PATENTNUMBER_SUCCESS,//查询公司专利条数
	GET_ENTERPRISE_PATENTNUMBER_FAILURE
} = actions;
const baseUrl = configs.baseUrl;
export function getEnterprise_patent(query = '') {
	return async(dispatch) => {
		try {
			const data = (await axios.get(`${baseUrl}patent/query.do${query}`)).data;
			dispatch({
				type: GET_ENTERPRISE_PATENT_SUCCESS,
				data: data
			});
		} catch (error) {
			dispatch({
				type: GET_ENTERPRISE_PATENT_FAILURE,
				error: new Error('查询公司专利获取失败, 请稍后再试')
			});
		}
	};
};
export function getEnterprise_patentnumber(query = '') {
	return async(dispatch) => {
		try {
			const data = (await axios.get(`${baseUrl}patent/total.do${query}`)).data;
			dispatch({
				type: GET_ENTERPRISE_PATENTNUMBER_SUCCESS,
				data: data
			});
		} catch (error) {
			dispatch({
				type: GET_ENTERPRISE_PATENTNUMBER_FAILURE,
				error: new Error('查询公司专利条数获取失败, 请稍后再试')
			});
		}
	};
};
