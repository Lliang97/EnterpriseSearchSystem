import axios from 'axios';
import actions from '../constants/actions';
import configs from '../constants/configs';
import {
    toQuery,
    getTokenHeader
} from '../../src/untils/utils';
const {
    GET_ENTERPRISE_ADINFO_SUCCESS,//管理员获取公司数据总条数
	GET_ENTERPRISE_ADINFO_FAILURE,
	GET_ENTERPRISE_ADINFODATA_SUCCESS,//管理员获取公司数据
	GET_ENTERPRISE_ADINFODATA_FAILURE,
	POST_COMPANY_INFORMATION_SUCCESS,//管理员修改公司数据
	POST_COMPANY_INFORMATION_FAILURE,
} = actions;
const baseUrl = configs.baseUrl;
export function getEnterprise_adinfo(query = '') {
	return async(dispatch) => {
		try {
			const data = (await axios.get(`${baseUrl}/company/total.do${query}`)).data;
			dispatch({
				type: GET_ENTERPRISE_ADINFO_SUCCESS,
				data: data
			});
		} catch (error) {
			dispatch({
				type: GET_ENTERPRISE_ADINFO_FAILURE,
				error: new Error('公司数量获取失败, 请稍后再试')
			});
		}
	};
};
export function getEnterprise_adinfodata(query = '') {
	return async(dispatch) => {
		try {
			const data = (await axios.get(`${baseUrl}/company/query.do${query}`)).data;
			dispatch({
				type: GET_ENTERPRISE_ADINFODATA_SUCCESS,
				data: data
			});
		} catch (error) {
			dispatch({
				type: GET_ENTERPRISE_ADINFODATA_FAILURE,
				error: new Error('公司信息获取失败, 请稍后再试')
			});
		}
	};
};
export function applychange_companyinformation(config,query=''){
	return async(dispatch) => {
		try{
			let headers = getTokenHeader({});
			const data = (await axios.put(`${baseUrl}company/update.do${query}`,config,{
			})).data
			dispatch({
				type: POST_COMPANY_INFORMATION_SUCCESS,
				data: data
			})
		}
		catch(error){
			dispatch({
				type: POST_COMPANY_INFORMATION_FAILURE,
				error: new Error("修改公司信息失败")
			})
		}
	}
}