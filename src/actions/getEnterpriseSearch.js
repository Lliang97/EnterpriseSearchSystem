import axios from 'axios';
import actions from '../constants/actions';
import configs from '../constants/configs';

const {
    GET_ENTERPRISE_SEARCH_SUCCESS,
	GET_ENTERPRISE_SEARCH_FAILURE,
} = actions;
const baseUrl = configs.baseUrl;
export function getEnterprise_search(query = '') {
	return async(dispatch) => {
		try {
			const data = (await axios.get(`${baseUrl}company/query.do${query}`)).data;
			dispatch({
				type: GET_ENTERPRISE_SEARCH_SUCCESS,
				data: data
			});
		} catch (error) {
			dispatch({
				type: GET_ENTERPRISE_SEARCH_FAILURE,
				error: new Error('搜索信息获取失败, 请稍后再试')
			});
		}
	};
};