import axios from 'axios';
import actions from '../constants/actions';
import configs from '../constants/configs';

const {
    GET_ENTERPRISE_CITY_SUCCESS,//得到城市企业分布数据
    GET_ENTERPRISE_CITY_FAILURE,
} = actions;
const baseUrl = configs.baseUrl;
export function getEnterprise_city(query = '') {
	return async(dispatch) => {
		try {
			//let headers = getTokenHeader({});
			const data = (await axios.get(`${baseUrl}/distribution/query.do${query}`)).data;
			dispatch({
				type: GET_ENTERPRISE_CITY_SUCCESS,
				data: data
			});
		} catch (error) {
			dispatch({
				type: GET_ENTERPRISE_CITY_FAILURE,
				error: new Error('城市企业数量获取失败, 请稍后再试')
			});
		}
	};
};