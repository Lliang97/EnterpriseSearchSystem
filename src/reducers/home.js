import actions from "../constants/actions";

const {
  GET_ENTERPRISE_SEARCH_SUCCESS,//获取公司信息
  GET_ENTERPRISE_NUMBER_SUCCESS,//获取查询的公司数量
  GET_ENTERPRISE_LITERATURE_SUCCESS,//查询公司科技文献
  GET_ENTERPRISE_LITERATURENUMBER_SUCCESS,//查询公司科技文献条数
  GET_ENTERPRISE_NEWS_SUCCESS,//查询公司新闻
  GET_ENTERPRISE_NEWSNUMBER_SUCCESS,//查询新闻条数
  GET_ENTERPRISE_PATENT_SUCCESS,//查询公司专利
  GET_ENTERPRISE_PATENTNUMBER_SUCCESS,//查询公司专利条数
  GET_ENTERPRISE_RECRUIT_SUCCESS,//查询公司招聘
  GET_ENTERPRISE_RECRUITNUMBER_SUCCESS,//查询公司招聘条数
  GET_ENTERPRISE_COPYRIGHT_SUCCESS,//查询公司著作权
  GET_RELATIONSHIP_SUCCESS,//获取公司投资图

  GET_ENTERPRISE_PATENTLIST_SUCCESS,//关键字模糊查询专利列表
  GET_ENTERPRISE_PATENTTYPENUMBER_SUCCESS,//统计关键字关联的专利的类型及数量
  GET_ENTERPRISE_PATENTCOMPANYNUMBER_SUCCESS,//关键字查询公司拥有的专利及数量

  GET_ENTERPRISE_LITERATQUERYBYKEYWORD_SUCCESS,//关键字模糊查询文献
  GET_ENTERPRISE_LITERATTYPENUMBER_SUCCESS,//统计关键字所关联的文献的类型及数量
  GET_ENTERPRISE_LITERATCOMPANYNUMBER_SUCCESS,//关键字查询公司所拥有的文献及数量

  GET_ENTERPRISE_SOFTWAREQUERYBYKEYWORD_SUCCESS,//关键字模糊查询软著
  GET_ENTERPRISE_SOFTWARECOMPANYNUMBER_SUCCESS,//关键字查询公司拥有的软著及数量
  GET_ENTERPRISE_SOFTWARETYPENUMBER_SUCCESS,//统计关键字所关联的著作权的类型及数量

  GET_ENTERPRISE_INDUSTRYDISTRIBUTION_SUCCESS,//查询行业分布
  GET_ENTERPRISE_CITYDISTRIBUTION_SUCCESS,//查询地区分布

  GET_STATICDATA_SUCCESS,//查询系统所有数据,包括公司数量，文献，专利，招聘，新闻

  GET_ENTERPRISE_WORDCLOUD_SUCCESS,//查询公司文献，专利，招聘，新闻词云

  GET_ENTERPRISE_PATENTSPECIFICINFO_SUCCESS,//查询专利具体的信息
} = actions;

export default (state = {}, action) => {
    switch (action.type) {
      case GET_ENTERPRISE_SEARCH_SUCCESS://获取公司信息
        return {
          ...state,
          EnSearchData: action.data
        };
        case GET_ENTERPRISE_NUMBER_SUCCESS://获取查询的公司数量
          return {
          ...state,
          EnNumberData: action.data
        };
        case GET_ENTERPRISE_LITERATURE_SUCCESS://查询公司科技文献
          return {
          ...state,
          EnLiteratureData: action.data
        };
        case GET_ENTERPRISE_LITERATURENUMBER_SUCCESS://查询公司科技文献条数
        return {
          ...state,
          EnLiteratureNumberData: action.data
        };
        case GET_ENTERPRISE_NEWS_SUCCESS://查询公司新闻
          return {
          ...state,
          EnNewsData: action.data
        };
        case GET_ENTERPRISE_NEWSNUMBER_SUCCESS://查询公司新闻条数
        return {
          ...state,
          EnNewsNumberData: action.data
        };
        case GET_ENTERPRISE_PATENT_SUCCESS://查询公司专利
          return {
          ...state,
          EnPatentData: action.data
        };
        case GET_ENTERPRISE_PATENTNUMBER_SUCCESS://查询公司专利条数
        return {
          ...state,
          EnPatentNumberData: action.data
        };
        case GET_ENTERPRISE_RECRUIT_SUCCESS://查询公司招聘
          return {
          ...state,
          EnRecruitData: action.data
        };
        case GET_ENTERPRISE_RECRUITNUMBER_SUCCESS://查询公司招聘条数
        return {
          ...state,
          EnRecruitNumberData: action.data
        };
        case GET_ENTERPRISE_COPYRIGHT_SUCCESS://查询公司著作权
          return {
          ...state,
          EnCopyrightData: action.data
        };
        case GET_RELATIONSHIP_SUCCESS://查询公司投资图
        return {
          ...state,
          EnRelationshipData: action.data
        };
        case GET_ENTERPRISE_PATENTLIST_SUCCESS://关键字模糊查询专利列表
        return {
          ...state,
          EnPatentListData: action.data
        };
        case GET_ENTERPRISE_PATENTTYPENUMBER_SUCCESS://统计关键字关联的专利的类型及数量
        return {
          ...state,
          EnPatentTypeNumberData: action.data
        };
        case GET_ENTERPRISE_PATENTCOMPANYNUMBER_SUCCESS://关键字查询公司拥有的专利及数量
        return {
          ...state,
          EnPatentCompanyNumberData: action.data
        };
        case GET_ENTERPRISE_LITERATQUERYBYKEYWORD_SUCCESS://关键字模糊查询文献
        return {
          ...state,
          EnLiteratureQueryByKeyWordData: action.data
        };
        case GET_ENTERPRISE_LITERATTYPENUMBER_SUCCESS://统计关键字所关联的文献的类型及数量
        return {
          ...state,
          EnLiteratureTypeNumberData: action.data
        };
        case GET_ENTERPRISE_LITERATCOMPANYNUMBER_SUCCESS://关键字查询公司所拥有的文献及数量
        return {
          ...state,
          EnLiteratureCompanyNumberData: action.data
        };
        case GET_ENTERPRISE_SOFTWAREQUERYBYKEYWORD_SUCCESS://关键字模糊查询软著
        return {
          ...state,
          EnSoftWareByKeyWordData: action.data
        };
        case GET_ENTERPRISE_SOFTWARECOMPANYNUMBER_SUCCESS://关键字查询公司拥有的软著及数量
        return {
          ...state,
          EnSoftWareCompanyNumberData: action.data
        };
        case GET_ENTERPRISE_SOFTWARETYPENUMBER_SUCCESS://统计关键字所关联的著作权的类型及数量
        return {
          ...state,
          EnSoftWareTypeNumberData: action.data
        };
        case GET_ENTERPRISE_INDUSTRYDISTRIBUTION_SUCCESS://查询行业分布，哪些行业以及行业数量
        return {
          ...state,
          EnIndustryDistriButionData: action.data
        };
        case GET_ENTERPRISE_CITYDISTRIBUTION_SUCCESS://查询地区分布，哪些地区以及地区数量
        return {
          ...state,
          EnCityDistributionData: action.data
        };
        case GET_STATICDATA_SUCCESS://查询系统所有数据,包括公司数量，文献，专利，招聘，新闻
        return {
          ...state,
          EnSystemStaticData: action.data
        };
        case GET_ENTERPRISE_WORDCLOUD_SUCCESS://查询公司文献，专利，招聘，新闻词云
        return {
          ...state,
          EnWordCloudData: action.data
        };
        case GET_ENTERPRISE_PATENTSPECIFICINFO_SUCCESS://查询专利具体的信息
        return {
          ...state,
          EnPatentSpecificData: action.data
        };
        default:
            return state;
        }
};