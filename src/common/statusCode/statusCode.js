/*
属性说明：
needAlertMessage：是否需要提示，true/false，true表示需要，false表示不需要
tips:提示的内容
desc:状态码的描述
messageType：消息提示的类型，不传默认是error
*/
export const statusCode = {
  397: {
    needAlertMessage: true,
    tips: 'visualization.Cannotaddrepeatedcontents',
    desc: "不能添加重复内容"
  },
  392: {
    messageType: 'warning',
    needAlertMessage: true,
    tips: 'visualization.Sincetheresourcepermissionschangeyoufailedtosubmitthemodification',
    desc: "因资源权限变更，修改提交失败"
  },
  394: {
    needAlertMessage: true,
    tips: 'visualization.Theservicehavebeendeleted',
    desc: "服务已经被删除"
  },
  387: {
    needAlertMessage: true,
    tips: 'visualization.InvalidOGCservicePleasecheckit',
    desc: "无效的OGC服务，请检查"
  },
  388: {
    needAlertMessage: true,
    tips: 'visualization.LocalhostisnotallowedastheIPaddressoftheGISserver',
    desc: "暂不允许以127.0.0.1或localhost作为GIS服务器的IP地址"
  },
  399: {
    needAlertMessage: true,
    tips: 'visualization.TheURLaddressisincorrectlytypedortheservice',
    desc: "URL地址输入错误或服务未启动或类型与地址不匹配"
  },
  396: {
    needAlertMessage: true,
    tips: 'visualization.IncorrectURLaddressoperationfailed',
    desc: "url地址不正确,操作不成功"
  },
  395: {
    needAlertMessage: true,
    tips: 'visualization.Thecurrentservicedoesnotsupportthisfunctionnow',
    desc: "当前服务暂不支持此功能"
  },
  390: {
    messageType: 'warning',
    needAlertMessage: true,
    tips: "visualization.TheCurrentOperationFailedSinceTheResourceStatusChanged",
    desc: "因资源状态变更，当前操作不成功"
  },
  391: {
    messageType: 'warning',
    needAlertMessage: true,
    tips: "myCenter.Asthepermissionsoftheresourcechangeyouhavenopermissionstoviewit",
    desc: "因资源权限变更，您无权限查看该资源"
  },
  389: {
    needAlertMessage: true,
    tips: 'visualization.Theresourcecontributordoesnotmatchthecurrentuser',
    desc: "资源贡献者与当前登录人不符"
  },
  298: {
    needAlertMessage: true,
    tips: 'visualization.Failedtogeneratetheproxyaddress',
    desc: "生成代理地址失败,请检查代理服务器IP和端口号是否正确"
  },
  299: {
    needAlertMessage: true,
    tips: 'visualization.FailedPleasecheckwhethertheIPandportnumberarecorrect',
    desc: "失败,请检查IP和端口号是否正确"
  },
  998: {
    needAlertMessage: true,
    tips: 'visualization.Thegroupissettonotallowanyonetojoin',
    desc: "此群被设置为不允许任何人添加"
  },
  997: {
    needAlertMessage: true,
    tips: 'visualization.Cannotapplyrepeatedly',
    desc: "不能重复申请"
  },
  996: {
    needAlertMessage: true,
    messageType: "success",
    tips: 'visualization.YoucanjointhegroupwithoutbeingreviewedJoinedsuccessfully',
    desc: "该群不需要审核即可加入，已入群成功"
  },
  901: {
    needAlertMessage: true,
    tips: 'visualization.Thegroupdoesnotexist',
    desc: "该群组不存在"
  },
  902: {
    needAlertMessage: true,
    tips: 'visualization.Thegroupisnotallowedtojoin',
    desc: "该群不允许申请加入"
  },
  995: {
    needAlertMessage: true,
    tips: 'visualization.Youhavebeeninthegroup',
    desc: "您已经在群组中"
  },
  903: {
    needAlertMessage: true,
    tips: 'visualization.Youhavenopermissiontomanagethegroup',
    desc: "您无权限管理该群组"
  },
  1017: {
    needAlertMessage: true,
    tips: 'visualization.DatabaseConnectionFailed',
    desc: "数据库连接失败"
  },
  1007: {
    needAlertMessage: true,
    tips: 'visualization.TheDatabaseExistsTheCreationFailed',
    desc: "无法创建数据库，数据库存在"
  },
}