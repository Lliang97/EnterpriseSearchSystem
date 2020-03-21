import axios from 'axios';
import actions from '../constants/actions';
import configs from '../constants/configs';
const {
    GET_ENTERPRISE_WORDCLOUD_SUCCESS,
	GET_ENTERPRISE_WORDCLOUD_FAILURE,
} = actions;
const baseUrl = configs.baseUrl;
export function getEnterprise_wordcloud(query = '') {
	return async(dispatch) => {
		try {
			const data = (await axios.get(`${baseUrl}words/query.do${query}`)).data;
			dispatch({
				type: GET_ENTERPRISE_WORDCLOUD_SUCCESS,
				data: data
			});
		} catch (error) {
			dispatch({
				type: GET_ENTERPRISE_WORDCLOUD_FAILURE,
				error: new Error('词云获取失败, 请稍后再试')
			});
		}
	};
};