import axios from 'axios';
import actions from '../constants/actions';
import configs from '../constants/configs';

const {
    GET_ENTERPRISE_PATENT_SUCCESS,//查询公司专利
	GET_ENTERPRISE_PATENT_FAILURE,
	GET_ENTERPRISE_PATENTNUMBER_SUCCESS,//查询公司专利条数
	GET_ENTERPRISE_PATENTNUMBER_FAILURE,
	GET_ENTERPRISE_PATENTLIST_SUCCESS,//关键字模糊查询专利列表
	GET_ENTERPRISE_PATENTLIST_FAILURE,
	GET_ENTERPRISE_PATENTTYPENUMBER_SUCCESS,//统计关键字关联的专利的类型及数量
	GET_ENTERPRISE_PATENTTYPENUMBER_FAILURE,
	GET_ENTERPRISE_PATENTCOMPANYNUMBER_SUCCESS,//关键字查询公司拥有的专利及数量
	GET_ENTERPRISE_PATENTCOMPANYNUMBER_FAILURE,
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
export function getEnterprise_patentlist(query = '') {
	return async(dispatch) => {
		try {
			const data = (await axios.get(`${baseUrl}patent/queryByKeyword.do${query}`)).data;
			dispatch({
				type: GET_ENTERPRISE_PATENTLIST_SUCCESS,
				data: data
			});
		} catch (error) {
			dispatch({
				type: GET_ENTERPRISE_PATENTLIST_FAILURE,
				error: new Error('关键字模糊查询专利列表, 请稍后再试')
			});
		}
	};
};
export function getEnterprise_patenttypenumber(query = '') {
	return async(dispatch) => {
		try {
			const data = (await axios.get(`${baseUrl}patent/countType.do${query}`)).data;
			dispatch({
				type: GET_ENTERPRISE_PATENTTYPENUMBER_SUCCESS,
				data: data
			});
		} catch (error) {
			dispatch({
				type: GET_ENTERPRISE_PATENTTYPENUMBER_FAILURE,
				error: new Error('统计关键字关联的专利的类型及数量, 请稍后再试')
			});
		}
	};
};
export function getEnterprise_patentcompanynumber(query = '') {
	return async(dispatch) => {
		try {
			const data = (await axios.get(`${baseUrl}patent/searchCompany.do${query}`)).data;
			dispatch({
				type: GET_ENTERPRISE_PATENTCOMPANYNUMBER_SUCCESS,
				data: data
			});
		} catch (error) {
			dispatch({
				type: GET_ENTERPRISE_PATENTCOMPANYNUMBER_FAILURE,
				error: new Error('关键字查询公司拥有的专利及数量, 请稍后再试')
			});
		}
	};
};
