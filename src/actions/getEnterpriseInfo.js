import axios from 'axios';
import actions from '../constants/actions';
import configs from '../constants/configs';

const {
    GET_RELATIONSHIP_SUCCESS,//查询公司关系图
	GET_RELATIONSHIP_FAILURE,
} = actions;
const baseUrl = configs.baseUrl;
export function getRelationship(query = '') {
	return async(dispatch) => {
		try{
			const data = (await axios.get(`${baseUrl}/relationship/queryInvestmentRelationship.do${query}`)).data;
			dispatch({
				type:GET_RELATIONSHIP_SUCCESS,
				data:data
			})
		}catch(error) {
			dispatch({
				type:GET_RELATIONSHIP_FAILURE,
				error: new Error("公司投资关系获取失败，请稍后再试")
			})
		}
	}
}
