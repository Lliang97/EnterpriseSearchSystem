import axios from 'axios';
import actions from '../constants/actions';
import configs from '../constants/configs';

const {
    GET_ENTERPRISE_COPYRIGHT_SUCCESS,//查询公司著作权
	GET_ENTERPRISE_COPYRIGHT_FAILURE,
    GET_ENTERPRISE_SOFTWAREQUERYBYKEYWORD_SUCCESS,//关键字模糊查询软著
	GET_ENTERPRISE_SOFTWAREQUERYBYKEYWORD_FAILURE,
	GET_ENTERPRISE_SOFTWARECOMPANYNUMBER_SUCCESS,//关键字查询公司拥有的软著及数量
	GET_ENTERPRISE_SOFTWARECOMPANYNUMBER_FAILURE,
	GET_ENTERPRISE_SOFTWARETYPENUMBER_SUCCESS,//统计关键字所关联的著作权的类型及数量
	GET_ENTERPRISE_SOFTWARETYPENUMBER_FAILURE,
} = actions;
const baseUrl = configs.baseUrl;
export function getEnterprise_copyright(query = '') {
	return async(dispatch) => {
		try {
			const data = (await axios.get(`${baseUrl}workCopyright/query.do${query}`)).data;
			dispatch({
				type: GET_ENTERPRISE_COPYRIGHT_SUCCESS,
				data: data
			});
		} catch (error) {
			dispatch({
				type: GET_ENTERPRISE_COPYRIGHT_FAILURE,
				error: new Error('查询公司著作权获取失败, 请稍后再试')
			});
		}
	};
};
export function getEnterprise_softWareQueryByKeyWord(query = '') {
	return async(dispatch) => {
		try {
			const data = (await axios.get(`${baseUrl}software/queryByKeyword.do${query}`)).data;
			dispatch({
				type: GET_ENTERPRISE_SOFTWAREQUERYBYKEYWORD_SUCCESS,
				data: data
			});
		} catch (error) {
			dispatch({
				type: GET_ENTERPRISE_SOFTWAREQUERYBYKEYWORD_FAILURE,
				error: new Error('关键字模糊查询软著, 请稍后再试')
			});
		}
	};
};
export function getEnterprise_softWareCompanyNumber(query = '') {
	return async(dispatch) => {
		try {
			const data = (await axios.get(`${baseUrl}software/searchCompany.do${query}`)).data;
			dispatch({
				type: GET_ENTERPRISE_SOFTWARECOMPANYNUMBER_SUCCESS,
				data: data
			});
		} catch (error) {
			dispatch({
				type: GET_ENTERPRISE_SOFTWARECOMPANYNUMBER_FAILURE,
				error: new Error('关键字查询公司拥有的软著及数量, 请稍后再试')
			});
		}
	};
};
export function getEnterprise_softWareTypeNumber(query = '') {
	return async(dispatch) => {
		try {
			const data = (await axios.get(`${baseUrl}software/countType.do${query}`)).data;
			dispatch({
				type: GET_ENTERPRISE_SOFTWARETYPENUMBER_SUCCESS,
				data: data
			});
		} catch (error) {
			dispatch({
				type: GET_ENTERPRISE_SOFTWARETYPENUMBER_FAILURE,
				error: new Error('统计关键字所关联的著作权的类型及数量, 请稍后再试')
			});
		}
	};
};


