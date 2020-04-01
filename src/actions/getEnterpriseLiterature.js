import axios from 'axios';
import actions from '../constants/actions';
import configs from '../constants/configs';
import {
    getTokenHeader
} from '../../src/untils/utils';
const {
    GET_ENTERPRISE_LITERATURE_SUCCESS,//查询公司科技文献
	GET_ENTERPRISE_LITERATURE_FAILURE,
	GET_ENTERPRISE_LITERATURENUMBER_SUCCESS,//查询公司科技文献条数
	GET_ENTERPRISE_LITERATURENUMBER_FAILURE,
	GET_ENTERPRISE_LITERATQUERYBYKEYWORD_SUCCESS,//关键字模糊查询文献
	GET_ENTERPRISE_LITERATQUERYBYKEYWORD_FAILURE,
	GET_ENTERPRISE_LITERATTYPENUMBER_SUCCESS,//统计关键字所关联的文献的类型及数量
	GET_ENTERPRISE_LITERATTYPENUMBER_FAILURE,
	GET_ENTERPRISE_LITERATCOMPANYNUMBER_SUCCESS,//关键字查询公司所拥有的文献及数量
	GET_ENTERPRISE_LITERATCOMPANYNUMBER_FAILURE,
	GET_ENTERPRISE_LITERATURESPECIFICINFO_SUCCESS,//查询文献具体的信息    
	GET_ENTERPRISE_LITERATURESPECIFICINFO_FAILURE,//查询文献具体的信息
	PUT_LITERATURE_SUCCESS,//修改文献
	PUT_LITERATURE_FAILURE,
	INSERT_LITERATURE_SUCCESS,//添加文献
	INSERT_LITERATURE_FAILURE,
	DELETE_LITERATURE_SUCCESS,//删除文献
	DELETE_LITERATURE_FAILURE,
} = actions;
const baseUrl = configs.baseUrl;
export function getEnterprise_literature(query = '') {
	return async(dispatch) => {
		try {
			const data = (await axios.get(`${baseUrl}literature/query.do${query}`)).data;
			dispatch({
				type: GET_ENTERPRISE_LITERATURE_SUCCESS,
				data: data
			});
		} catch (error) {
			dispatch({
				type: GET_ENTERPRISE_LITERATURE_FAILURE,
				error: new Error('查询公司科技文献获取失败, 请稍后再试')
			});
		}
	};
};
export function getEnterprise_literaturenumber(query = '') {
	return async(dispatch) => {
		try {
			const data = (await axios.get(`${baseUrl}literature/total.do${query}`)).data;
			dispatch({
				type: GET_ENTERPRISE_LITERATURENUMBER_SUCCESS,
				data: data
			});
		} catch (error) {
			dispatch({
				type: GET_ENTERPRISE_LITERATURENUMBER_FAILURE,
				error: new Error('查询公司科技文献条数获取失败, 请稍后再试')
			});
		}
	};
};
export function getEnterprise_literatureQueryByKeyword(query = '') {
	return async(dispatch) => {
		try {
			const data = (await axios.get(`${baseUrl}literature/queryByKeyword.do${query}`)).data;
			dispatch({
				type: GET_ENTERPRISE_LITERATQUERYBYKEYWORD_SUCCESS,
				data: data
			});
		} catch (error) {
			dispatch({
				type: GET_ENTERPRISE_LITERATQUERYBYKEYWORD_FAILURE,
				error: new Error('关键字模糊查询文献, 请稍后再试')
			});
		}
	};
};
export function getEnterprise_literaturetypenumber(query = '') {
	return async(dispatch) => {
		try {
			const data = (await axios.get(`${baseUrl}literature/countType.do${query}`)).data;
			dispatch({
				type: GET_ENTERPRISE_LITERATTYPENUMBER_SUCCESS,
				data: data
			});
		} catch (error) {
			dispatch({
				type: GET_ENTERPRISE_LITERATTYPENUMBER_FAILURE,
				error: new Error('统计关键字所关联的文献的类型及数量, 请稍后再试')
			});
		}
	};
};
export function getEnterprise_literatureCompanyNumber(query = '') {
	return async(dispatch) => {
		try {
			const data = (await axios.get(`${baseUrl}literature/searchCompany.do${query}`)).data;
			dispatch({
				type: GET_ENTERPRISE_LITERATCOMPANYNUMBER_SUCCESS,
				data: data
			});
		} catch (error) {
			dispatch({
				type: GET_ENTERPRISE_LITERATCOMPANYNUMBER_FAILURE,
				error: new Error('关键字查询公司所拥有的文献及数量, 请稍后再试')
			});
		}
	};
};
export function getEnterprise_literatureSpecificInfo(query = '') {
	return async(dispatch) => {
		try {
			const data = (await axios.get(`${baseUrl}literature/query.do${query}`)).data;
			dispatch({
				type: GET_ENTERPRISE_LITERATURESPECIFICINFO_SUCCESS,
				data: data
			});
		} catch (error) {
			dispatch({
				type: GET_ENTERPRISE_LITERATURESPECIFICINFO_FAILURE,
				error: new Error('查询专利具体的信息, 请稍后再试')
			});
		}
	};
};
export function applychange_literature(config,query = ''){
    return async(dispatch) => {
        try{
            let headers = getTokenHeader({})
            const data = (await axios.put(`${baseUrl}/literature/update.do${query}`,config,{
                headers:headers
            })).data;
            dispatch({
                type:PUT_LITERATURE_SUCCESS,
                data:data
            })
        }catch(error){
            dispatch({
                type:PUT_LITERATURE_FAILURE,
                error:Error("修改文献失败，请稍后再试")
            })
        }
    }
}
export function insert_literature(config,query = '') {
    return async(dispatch) => {
        try{
            let headers = getTokenHeader({})
            const data = (await axios.post(`${baseUrl}/literature/insert.do${query}`,config,{
                headers:headers
            })).data;
            dispatch({
                type:INSERT_LITERATURE_SUCCESS,
                data:data
            })
        }catch(error){
            dispatch({
                type:INSERT_LITERATURE_FAILURE,
                error:Error("添加论文失败，请稍后再试")
            })
        }
    }
}
export function delete_literature(query = '',config) {
    return async(dispatch) => {
        try{
            let headers = getTokenHeader({})
            const data = (await axios.delete(`${baseUrl}/literature/delete.do${query}`,{
                headers:headers
            },config)).data;
            dispatch({
                type:DELETE_LITERATURE_SUCCESS,
                data:data
            })
        }catch(error){
            dispatch({
                type:DELETE_LITERATURE_FAILURE,
                error:Error("删除论文失败，请稍后再试")
            })
        }
    }
}