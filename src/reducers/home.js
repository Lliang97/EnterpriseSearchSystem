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

  GET_ENTERPRISE_COPYRIGHTSPECIFICINFO_SUCCESS,//查询著作权具体的信息

  GET_ENTERPRISE_LITERATURESPECIFICINFO_SUCCESS,//查询文献具体的信息

  GET_ENTERPRISE_MEMBER_SUCCESS,//查询企业主要成员

  GET_ENTERPRISE_PARTNER_SUCCESS,//查询企业股东投资

  GET_USERS_SUCCESS,//得到用户账号密码和权限
  GET_PIC_SUCCESS,//获取验证码

  GET_ENTERPRISE_CITY_SUCCESS,//得到城市企业分布数据

  GET_ENTERPRISE_ADINFO_SUCCESS,//管理员获取公司数据总条数
  GET_ENTERPRISE_ADINFODATA_SUCCESS,//管理员获取公司数据
  POST_COMPANY_INFORMATION_SUCCESS,//管理员修改公司数据

  GET_USERNUM_SUCCESS,//得到用户数量
  POST_USER_SUCCESS,//添加用户
  GET_ALLUSER_SUCCESS,//查询所有用户
  DELETE_USER_SUCCESS,//通过id删除用户

  PUT_PATENT_SUCCESS,//修改专利信息
  INSERT_PATENT_SUCCESS,//添加专利信息
  DELETE_PATENT_SUCCESS,//删除专利

  PUT_LITERATURE_SUCCESS,//修改文献
  INSERT_LITERATURE_SUCCESS,//添加文献
  DELETE_LITERATURE_SUCCESS,//删除文献

  PUT_NEWS_SUCCESS,//修改新闻
  INSERT_NEWS_SUCCESS,//新增新闻
  DELETE_NEWS_SUCCESS,//删除新闻

  GET_PARTNERTOTAL_SUCCESS,//获取股东数量
  PUT_PARTNER_SUCCESS,//修改股东信息
  INSERT_PARTNER_SUCCESS,//新增股东信息
  DELETE_PARTNER_SUCCESS,//删除股东信息

  PUT_RECRUIT_SUCCESS,//修改招聘信息
  INSERT_RECRUIT_SUCCESS,//新增招聘信息
  DELETE_RECRUIT_SUCCESS,//删除招聘信息

  GET_TRADETOTAL_SUCCESS,//查询商标总数
  GET_TRADEDATA_SUCCESS,//查询商标数据
  PUT_TRADE_SUCCESS,//修改商标
  INSERT_TRADE_SUCCESS,//新增商标数据
  DELETE_TRADE_SUCCESS,//删除商标数据

  GET_COPYRIGHTTOTAL_SUCCESS,//查询著作权数量
	PUT_COPYRIGHT_SUCCESS,//修改软著
	INSERT_COPYRIGHT_SUCCESS,//新增软著
	DELETE_COPYRIGHT_SUCCESS,//删除软著

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
    case GET_ENTERPRISE_COPYRIGHTSPECIFICINFO_SUCCESS://查询著作权具体的信息
      return {
        ...state,
        EnCopyrightSpecificData: action.data
      };
    case GET_ENTERPRISE_LITERATURESPECIFICINFO_SUCCESS://查询文献具体的信息
      return {
        ...state,
        EnLiteratureSpecificData: action.data
      };
    case GET_ENTERPRISE_MEMBER_SUCCESS://查询企业主要成员
      return {
        ...state,
        EnMemberData: action.data
      };
    case GET_ENTERPRISE_PARTNER_SUCCESS://查询企业股东投资
      return {
        ...state,
        EnPartnerData: action.data
      };
    case GET_USERS_SUCCESS://得到用户账号密码和权限
      return {
        ...state,
        userLog: action
      };
    case GET_PIC_SUCCESS://获取验证码
      return {
        ...state,
        userPic: action.data
      };
    case GET_ENTERPRISE_CITY_SUCCESS://得到城市企业分布数据
      return {
        ...state,
        EntCityData: action.data
      };
    case GET_ENTERPRISE_ADINFO_SUCCESS://管理员获取公司数据总条数
      return {
        ...state,
        Entadinfototal: action.data
      };
    case GET_ENTERPRISE_ADINFODATA_SUCCESS://管理员获取公司数据
      return {
        ...state,
        Entadinfodata: action.data
      }
    case POST_COMPANY_INFORMATION_SUCCESS://管理员修改公司数据
      return {
        ...state,
        code: action.data.code
      }
    case GET_USERNUM_SUCCESS://得到用户数量
      return {
        ...state,
        usernum: action.data
      }
    case POST_USER_SUCCESS://添加用户
      return {
        ...state,
        insert_user_code: action.data.code
      }
    case GET_ALLUSER_SUCCESS://查询所有用户
      return {
        ...state,
        alluser: action.data
      }
    case DELETE_USER_SUCCESS://通过id删除用户
      return {
        ...state,
        deleteusercode: action.data.code
      }
    case PUT_PATENT_SUCCESS:
      return {
        ...state,
        patentcode: action.data.code
      }
    case INSERT_PATENT_SUCCESS:
      return {
        ...state,
        insertpatentcode: action.data.code
      }
    case DELETE_PATENT_SUCCESS:
      return {
        ...state,
        deletepatentcode: action.data.code
      }
    case PUT_LITERATURE_SUCCESS://修改文献
      return {
        ...state,
        literaturecode: action.data.code
      }
    case INSERT_LITERATURE_SUCCESS://新增文献
      return {
        ...state,
        insertliteraturecode: action.data.code
      }
    case DELETE_LITERATURE_SUCCESS://删除文献
      return {
        ...state,
        deleteliteraturecode: action.data.code
      }
    case PUT_NEWS_SUCCESS://修改新闻
      return {
        ...state,
        newscode: action.data.code
      }
    case INSERT_NEWS_SUCCESS://新增新闻
      return {
        ...state,
        insertnewscode: action.data.code
      }
    case DELETE_NEWS_SUCCESS://删除新闻
      return {
        ...state,
        deletenewscode: action.data.code
      }
    case GET_PARTNERTOTAL_SUCCESS://得到股东数量
      return {
        ...state,
        partnertotal: action.data
      }
    case PUT_PARTNER_SUCCESS://修改股东信息
      return {
        ...state,
        partnercode: action.data.code
      }
    case INSERT_PARTNER_SUCCESS://新增股东信息
      return {
        ...state,
        insertpartnercode: action.data.code
      }
    case DELETE_PARTNER_SUCCESS://删除股东信息
      return {
        ...state,
        deletepartnercode: action.data.code
      }
    case PUT_RECRUIT_SUCCESS://修改招聘信息
      return {
        ...state,
        recruitcode: action.data.code
      }
    case INSERT_RECRUIT_SUCCESS://新增招聘信息
      return {
        ...state,
        insertrecruitcode: action.data.code
      }
    case DELETE_RECRUIT_SUCCESS://删除招聘信息
      return {
        ...state,
        deleterecruitcode: action.data.code
      }
    case GET_TRADETOTAL_SUCCESS://查询商标总数
      return {
        ...state,
        tradetotal: action.data
      }
    case GET_TRADEDATA_SUCCESS://查询商标数据     
      return {
        ...state,
        tradedata: action.data
      }
    case PUT_TRADE_SUCCESS://修改商标数据
      return {
        ...state,
        tradecode: action.data.code
      }
    case INSERT_TRADE_SUCCESS://新增商标信息
      return {
        ...state,
        inserttradecode: action.data.code
      }
    case DELETE_TRADE_SUCCESS://删除商标
      return {
        ...state,
        deletetradecode: action.data.code
      }
      case GET_COPYRIGHTTOTAL_SUCCESS://查询软著总数
      return {
        ...state,
        copyrighttotal: action.data
      }
    case PUT_COPYRIGHT_SUCCESS://修改软著数据
      return {
        ...state,
        copyrightcode: action.data.code
      }
    case INSERT_COPYRIGHT_SUCCESS://新增软著信息
      return {
        ...state,
        insertcopyrightcode: action.data.code
      }
    case DELETE_COPYRIGHT_SUCCESS://删除软著
      return {
        ...state,
        deletecopyrightcode: action.data.code
      }
    default:
      return state;
  }
};