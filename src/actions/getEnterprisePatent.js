import axios from 'axios';
import actions from '../constants/actions';
import configs from '../constants/configs';
import {
    getTokenHeader
} from '../../src/untils/utils';
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
	GET_ENTERPRISE_PATENTSPECIFICINFO_SUCCESS,//查询专利具体的信息
	GET_ENTERPRISE_PATENTSPECIFICINFO_FAILURE,
	PUT_PATENT_SUCCESS,//修改
	PUT_PATENT_FAILURE,
	INSERT_PATENT_SUCCESS,//添加
	INSERT_PATENT_FAILURE,
	DELETE_PATENT_SUCCESS,//删除
	DELETE_PATENT_FAILURE,
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
export function getEnterprise_patentSpecificInfo(query = '') {
	return async(dispatch) => {
		try {
			const data = (await axios.get(`${baseUrl}patent/query.do${query}`)).data;
			dispatch({
				type: GET_ENTERPRISE_PATENTSPECIFICINFO_SUCCESS,
				data: data
			});
		} catch (error) {
			dispatch({
				type: GET_ENTERPRISE_PATENTSPECIFICINFO_FAILURE,
				error: new Error('查询专利具体的信息, 请稍后再试')
			});
		}
	};
};
export function applychange_patent(config,query = ''){
    return async(dispatch) => {
        try{
            let headers = getTokenHeader({})
            const data = (await axios.put(`${baseUrl}/patent/update.do${query}`,config,{
                headers:headers
            })).data;
            dispatch({
                type:PUT_PATENT_SUCCESS,
                data:data
            })
        }catch(error){
            dispatch({
                type:PUT_PATENT_FAILURE,
                error:Error("修改专利失败，请稍后再试")
            })
        }
    }
}
export function insert_patent(config,query = '') {
    return async(dispatch) => {
        try{
            let headers = getTokenHeader({})
            const data = (await axios.post(`${baseUrl}/patent/insert.do${query}`,config,{
                headers:headers
            })).data;
            dispatch({
                type:INSERT_PATENT_SUCCESS,
                data:data
            })
        }catch(error){
            dispatch({
                type:INSERT_PATENT_FAILURE,
                error:Error("添加专利失败，请稍后再试")
            })
        }
    }
}
export function delete_patent(query = '',config) {
    return async(dispatch) => {
        try{
            let headers = getTokenHeader({})
            const data = (await axios.delete(`${baseUrl}patent/delete.do${query}`,{
                headers:headers
            },config)).data;
            dispatch({
                type:DELETE_PATENT_SUCCESS,
                data:data
            })
        }catch(error){
            dispatch({
                type:DELETE_PATENT_FAILURE,
                error:Error("删除专利失败，请稍后再试")
            })
        }
    }
}