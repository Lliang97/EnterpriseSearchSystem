import keyMirror from 'key-mirror';

export default keyMirror({
	GET_ENTERPRISE_SEARCH_SUCCESS: null,//获取公司信息  
    GET_ENTERPRISE_SEARCH_FALURE: null,
    GET_ENTERPRISE_NUMBER_SUCCESS: null,//获取查询的公司数量
    GET_ENTERPRISE_NUMBER_FAILURE: null,
    GET_ENTERPRISE_LITERATURE_SUCCESS: null,//查询公司科技文献
    GET_ENTERPRISE_LITERATURE_FAILURE: null,
    GET_ENTERPRISE_LITERATURENUMBER_SUCCESS: null,//查询公司科技文献条数
	GET_ENTERPRISE_LITERATURENUMBER_FAILURE: null,
    GET_ENTERPRISE_NEWS_SUCCESS: null,//查询公司新闻
    GET_ENTERPRISE_NEWS_FAILURE: null,
    GET_ENTERPRISE_NEWSNUMBER_SUCCESS: null,//查询新闻条数
	GET_ENTERPRISE_NEWSNUMBER_FAILURE: null,
    GET_ENTERPRISE_PATENT_SUCCESS: null,//查询公司专利
    GET_ENTERPRISE_PATENT_FAILURE: null,
    GET_ENTERPRISE_PATENTNUMBER_SUCCESS: null,//查询公司专利条数
	GET_ENTERPRISE_PATENTNUMBER_FAILURE: null,
    GET_ENTERPRISE_RECRUIT_SUCCESS: null,//查询公司招聘
    GET_ENTERPRISE_RECRUIT_FAILURE: null,
    GET_ENTERPRISE_RECRUITNUMBER_SUCCESS: null,//查询公司招聘条数
	GET_ENTERPRISE_RECRUITNUMBER_FAILURE: null,
    GET_ENTERPRISE_COPYRIGHT_SUCCESS: null,//查询公司著作权
	GET_ENTERPRISE_COPYRIGHT_FAILURE: null,
    GET_RELATIONSHIP_SUCCESS: null,//获取公司投资图
    GET_RELATIONSHIP_FAILURE: null,
    GET_ENTERPRISE_PATENTLIST_SUCCESS: null,//关键字模糊查询专利列表
	GET_ENTERPRISE_PATENTLIST_FAILURE: null,
	GET_ENTERPRISE_PATENTTYPENUMBER_SUCCESS: null,//统计关键字关联的专利的类型及数量
	GET_ENTERPRISE_PATENTTYPENUMBER_FAILURE: null,
	GET_ENTERPRISE_PATENTCOMPANYNUMBER_SUCCESS: null,//关键字查询公司拥有的专利及数量
    GET_ENTERPRISE_PATENTCOMPANYNUMBER_FAILURE: null,
    GET_ENTERPRISE_LITERATQUERYBYKEYWORD_SUCCESS: null,//关键字模糊查询文献
	GET_ENTERPRISE_LITERATQUERYBYKEYWORD_FAILURE: null,
	GET_ENTERPRISE_LITERATTYPENUMBER_SUCCESS: null,//统计关键字所关联的文献的类型及数量
	GET_ENTERPRISE_LITERATTYPENUMBER_FAILURE: null,
	GET_ENTERPRISE_LITERATCOMPANYNUMBER_SUCCESS: null,//关键字查询公司所拥有的文献及数量
    GET_ENTERPRISE_LITERATCOMPANYNUMBER_FAILURE: null,
    GET_ENTERPRISE_SOFTWAREQUERYBYKEYWORD_SUCCESS: null,//关键字模糊查询软著
	GET_ENTERPRISE_SOFTWAREQUERYBYKEYWORD_FAILURE: null,
	GET_ENTERPRISE_SOFTWARECOMPANYNUMBER_SUCCESS: null,//关键字查询公司拥有的软著及数量
	GET_ENTERPRISE_SOFTWARECOMPANYNUMBER_FAILURE: null,
	GET_ENTERPRISE_SOFTWARETYPENUMBER_SUCCESS: null,//统计关键字所关联的著作权的类型及数量
    GET_ENTERPRISE_SOFTWARETYPENUMBER_FAILURE: null,
    GET_ENTERPRISE_INDUSTRYDISTRIBUTION_SUCCESS: null,//查询行业分布情况及数量
	GET_ENTERPRISE_INDUSTRYDISTRIBUTION_FAILURE: null,
	GET_ENTERPRISE_CITYDISTRIBUTION_SUCCESS: null,//查询地区分布情况及数量
    GET_ENTERPRISE_CITYDISTRIBUTION_FAILURE: null,
    GET_STATICDATA_SUCCESS: null,//查询系统所有数据,包括公司数量，文献，专利，招聘，新闻
	GET_STATICDATA_FALURE: null,
});