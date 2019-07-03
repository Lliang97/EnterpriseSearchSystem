import axios from 'axios';
import actions from '../constants/actions';
import configs from '../constants/configs';

const {
    GET_ENTERPRISE_MESSAGE_SUCCESS,
	GET_ENTERPRISE_MESSAGE_FALURE,
} = actions;
const baseUrl = configs.baseUrl;
export function getAllDat(query = '') {
	return async(dispatch) => {
		try {
			const data = (await axios.get(`${baseUrl}company/query.do${query}`)).data;
			dispatch({
				type: GET_ENTERPRISE_MESSAGE_SUCCESS,
				data: data
			});
		} catch (error) {
			dispatch({
				type: GET_ENTERPRISE_MESSAGE_FALURE,
				error: new Error('获取所有数据失败, 请稍后再试')
			});
		}
	};
};