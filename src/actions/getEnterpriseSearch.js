import axios from 'axios';
import actions from '../constants/actions';
import configs from '../constants/configs';

const {
    GET_ENTERPRISE_SEARCH_SUCCESS,//获取公司信息
	GET_ENTERPRISE_SEARCH_FAILURE,
	GET_ENTERPRISE_NUMBER_SUCCESS,//获取查询的公司数量
	GET_ENTERPRISE_NUMBER_FAILURE,
	GET_ENTERPRISE_INDUSTRYDISTRIBUTION_SUCCESS,//查询行业分布及数量
	GET_ENTERPRISE_INDUSTRYDISTRIBUTION_FAILURE,
	GET_ENTERPRISE_CITYDISTRIBUTION_SUCCESS,//查询地区分布及数量
	GET_ENTERPRISE_CITYDISTRIBUTION_FAILURE,
} = actions;
const baseUrl = configs.baseUrl;
export function getEnterprise_search(query = '') {
	return async(dispatch) => {
		try {
			const data = (await axios.get(`${baseUrl}company/conditions.do${query}`)).data;
			dispatch({
				type: GET_ENTERPRISE_SEARCH_SUCCESS,
				data: data
			});
		} catch (error) {
			dispatch({
				type: GET_ENTERPRISE_SEARCH_FAILURE,
				error: new Error('查询公司信息获取失败, 请稍后再试')
			});
		}
	};
};
export function getEnterprise_number(query = '') {
	return async(dispatch) => {
		try {
			//let headers = getTokenHeader({});
			const data = (await axios.get(`${baseUrl}company/conditionsTotal.do${query}`)).data;
			dispatch({
				type: GET_ENTERPRISE_NUMBER_SUCCESS,
				data: data
			});
		} catch (error) {
			dispatch({
				type: GET_ENTERPRISE_NUMBER_FAILURE,
				error: new Error('查询公司条数获取失败, 请稍后再试')
			});
		}
	};
};
export function getEnterprise_searchIndustryDistribution(query = '') {
	return async(dispatch) => {
		try {
			const data = (await axios.get(`${baseUrl}company/queryIndustry.do${query}`)).data;
			dispatch({
				type: GET_ENTERPRISE_INDUSTRYDISTRIBUTION_SUCCESS,
				data: data
			});
		} catch (error) {
			dispatch({
				type: GET_ENTERPRISE_INDUSTRYDISTRIBUTION_FAILURE,
				error: new Error('查询行业分布获取失败, 请稍后再试')
			});
		}
	};
};
export function getEnterprise_searchCityDistribution(query = '') {
	return async(dispatch) => {
		try {
			const data = (await axios.get(`${baseUrl}company/queryCity.do${query}`)).data;
			dispatch({
				type: GET_ENTERPRISE_CITYDISTRIBUTION_SUCCESS,
				data: data
			});
		} catch (error) {
			dispatch({
				type: GET_ENTERPRISE_CITYDISTRIBUTION_FAILURE,
				error: new Error('查询地区获取失败, 请稍后再试')
			});
		}
	};
};