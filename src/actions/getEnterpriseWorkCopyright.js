import axios from 'axios';
import actions from '../constants/actions';
import configs from '../constants/configs';
import {
    getTokenHeader
} from '../untils/utils';
const {
    GET_ENTERPRISE_COPYRIGHT_SUCCESS,//查询公司著作权
	GET_ENTERPRISE_COPYRIGHT_FAILURE,
    GET_ENTERPRISE_SOFTWAREQUERYBYKEYWORD_SUCCESS,//关键字模糊查询软著
	GET_ENTERPRISE_SOFTWAREQUERYBYKEYWORD_FAILURE,
	GET_ENTERPRISE_SOFTWARECOMPANYNUMBER_SUCCESS,//关键字查询公司拥有的软著及数量
	GET_ENTERPRISE_SOFTWARECOMPANYNUMBER_FAILURE,
	GET_ENTERPRISE_SOFTWARETYPENUMBER_SUCCESS,//统计关键字所关联的著作权的类型及数量
	GET_ENTERPRISE_SOFTWARETYPENUMBER_FAILURE,
	GET_ENTERPRISE_COPYRIGHTSPECIFICINFO_SUCCESS,//查询著作权具体的信息
	GET_ENTERPRISE_COPYRIGHTSPECIFICINFO_FAILURE,
	GET_COPYRIGHTTOTAL_SUCCESS,//查询著作权数量
	GET_COPYRIGHTTOTAL_FAILURE,
	PUT_COPYRIGHT_SUCCESS,//修改软著
	PUT_COPYRIGHT_FAILURE,
	INSERT_COPYRIGHT_SUCCESS,//新增软著
	INSERT_COPYRIGHTE_FAILURE,
	DELETE_COPYRIGHT_SUCCESS,//删除软著
	DELETE_COPYRIGHT_FAILURE
} = actions;
const baseUrl = configs.baseUrl;
export function getEnterprise_copyright(query = '') {
	return async(dispatch) => {
		try {
			const data = (await axios.get(`${baseUrl}software/query.do${query}`)).data;
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
export function getEnterprise_copyrighttotal(query = '') {
    return async(dispatch) => {
        try{
            const data = (await axios.get(`${baseUrl}/software/total.do${query}`)).data;
            dispatch({
                type:GET_COPYRIGHTTOTAL_SUCCESS,
                data:data
            })
        }catch(error){
            dispatch({
                type:GET_COPYRIGHTTOTAL_FAILURE,
                error:Error("软著总数获取失败，请稍后再试")
            })
        }
    }
};
export function getEnterprise_softWareQueryByKeyWord(query = '') {
	return async(dispatch) => {
		try {
			const data = (await axios.get(`${baseUrl}software/queryByKeyword.do${query}`)).data;
			dispatch({
				type: GET_ENTERPRISE_SOFTWAREQUERYBYKEYWORD_SUCCESS,
				data: data
			});
		} catch (error) {
			dispatch({
				type: GET_ENTERPRISE_SOFTWAREQUERYBYKEYWORD_FAILURE,
				error: new Error('关键字模糊查询软著, 请稍后再试')
			});
		}
	};
};
export function getEnterprise_softWareCompanyNumber(query = '') {
	return async(dispatch) => {
		try {
			const data = (await axios.get(`${baseUrl}software/searchCompany.do${query}`)).data;
			dispatch({
				type: GET_ENTERPRISE_SOFTWARECOMPANYNUMBER_SUCCESS,
				data: data
			});
		} catch (error) {
			dispatch({
				type: GET_ENTERPRISE_SOFTWARECOMPANYNUMBER_FAILURE,
				error: new Error('关键字查询公司拥有的软著及数量, 请稍后再试')
			});
		}
	};
};
export function getEnterprise_softWareTypeNumber(query = '') {
	return async(dispatch) => {
		try {
			const data = (await axios.get(`${baseUrl}software/countType.do${query}`)).data;
			dispatch({
				type: GET_ENTERPRISE_SOFTWARETYPENUMBER_SUCCESS,
				data: data
			});
		} catch (error) {
			dispatch({
				type: GET_ENTERPRISE_SOFTWARETYPENUMBER_FAILURE,
				error: new Error('统计关键字所关联的著作权的类型及数量, 请稍后再试')
			});
		}
	};
};
export function getEnterprise_copyrightSpecificInfo(query = '') {
	return async(dispatch) => {
		try {
			const data = (await axios.get(`${baseUrl}software/query.do${query}`)).data;
			dispatch({
				type: GET_ENTERPRISE_COPYRIGHTSPECIFICINFO_SUCCESS,
				data: data
			});
		} catch (error) {
			dispatch({
				type: GET_ENTERPRISE_COPYRIGHTSPECIFICINFO_FAILURE,
				error: new Error('查询著作权具体的信息, 请稍后再试')
			});
		}
	};
};

export function applychange_copyright(config,query=''){
    return async(dispatch) => {
        try{
            let headers = getTokenHeader({})
            const data = (await axios.put(`${baseUrl}software/update.do${query}`,config,{
                headers:headers
            })).data;
            dispatch({
                type:PUT_COPYRIGHT_SUCCESS,
                data:data
            })
        }catch(error){
            dispatch({
                type:PUT_COPYRIGHT_FAILURE,
                error:Error("修改软著失败，请稍后再试")
            })
        }
    }
}
export function insert_copyright(config,query = '') {
    return async(dispatch) => {
        try{
            let headers = getTokenHeader({})
            const data = (await axios.post(`${baseUrl}/software/insert.do${query}`,config,{
                headers:headers
            })).data;
            dispatch({
                type:INSERT_COPYRIGHT_SUCCESS,
                data:data
            })
        }catch(error){
            dispatch({
                type:INSERT_COPYRIGHTE_FAILURE,
                error:Error("添加软著信息失败，请稍后再试")
            })
        }
    }
}
export function delete_coyright(query = '',config) {
    return async(dispatch) => {
        try{
            let headers = getTokenHeader({})
            const data = (await axios.delete(`${baseUrl}software/delete.do${query}`,{
                headers:headers
            },config)).data;
            dispatch({
                type:DELETE_COPYRIGHT_SUCCESS,
                data:data
            })
        }catch(error){
            dispatch({
                type:DELETE_COPYRIGHT_FAILURE,
                error:Error("删除软著失败，请稍后再试")
            })
        }
    }
}
