import axios from 'axios';
import actions from '../constants/actions';
import configs from '../constants/configs';

const {
    GET_ENTERPRISE_COPYRIGHT_SUCCESS,//查询公司著作权
	GET_ENTERPRISE_COPYRIGHT_FAILURE,

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
