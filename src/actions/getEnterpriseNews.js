import axios from 'axios';
import actions from '../constants/actions';
import configs from '../constants/configs';

const {
    GET_ENTERPRISE_NEWS_SUCCESS,//查询公司新闻
	GET_ENTERPRISE_NEWS_FAILURE,
	GET_ENTERPRISE_NEWSNUMBER_SUCCESS,//查询新闻条数
	GET_ENTERPRISE_NEWSNUMBER_FAILURE
} = actions;
const baseUrl = configs.baseUrl;
export function getEnterprise_news(query = '') {
	return async(dispatch) => {
		try {
			const data = (await axios.get(`${baseUrl}news/query.do${query}`)).data;
			dispatch({
				type: GET_ENTERPRISE_NEWS_SUCCESS,
				data: data
			});
		} catch (error) {
			dispatch({
				type: GET_ENTERPRISE_NEWS_FAILURE,
				error: new Error('查询公司新闻获取失败, 请稍后再试')
			});
		}
	};
};
export function getEnterprise_newsnumber(query = '') {
	return async(dispatch) => {
		try {
			const data = (await axios.get(`${baseUrl}news/total.do${query}`)).data;
			dispatch({
				type: GET_ENTERPRISE_NEWSNUMBER_SUCCESS,
				data: data
			});
		} catch (error) {
			dispatch({
				type: GET_ENTERPRISE_NEWSNUMBER_FAILURE,
				error: new Error('查询公司新闻条数获取失败, 请稍后再试')
			});
		}
	};
};

