// Type definitions for Winxin JS-JDK
// Project: https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html
// Definitions by: Harry Yang 

/* *****************************************************************************
Copyright (c) Limited. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

/** wx.Config参数类型 */
type TConfig = {
    /**开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。 */
    debug: boolean; 
    /**必填，公众号的唯一标识*/
    appId: string; 
    /**必填，生成签名的时间戳 */
    timestamp: number;
    /**必填，生成签名的随机串 */
    nonceStr: string; 
    /**必填，签名*/
    signature: string; 
    /**必填，需要使用的JS接口列表*/
    jsApiList: Array<TOperNameList>; 
};

//***********基础数据***************

/** 所有接口名称列表，版本 1.6.0 接口*/
type TOperNameList =
    "checkJsApi" | 
    "updateAppMessageShareData" |
    "updateTimelineShareData" |
    "onMenuShareWeibo" |
    "onMenuShareQZone" |
    "startRecord" |
    "stopRecord" |
    "onVoiceRecordEnd" |
    "playVoice" |
    "pauseVoice" |
    "stopVoice" |
    "onVoicePlayEnd" |
    "uploadVoice" |
    "downloadVoice" |
    "chooseImage" |
    "previewImage" |
    "uploadImage" |
    "downloadImage" |
    "translateVoice" |
    "getNetworkType" |
    "openLocation" |
    "getLocation" |
    "hideOptionMenu" |
    "showOptionMenu" |
    "hideMenuItems" |
    "showMenuItems" |
    "hideAllNonBaseMenuItem" |
    "showAllNonBaseMenuItem" |
    "closeWindow" |
    "scanQRCode" |
    "chooseWXPay" |
    "openProductSpecificView" |
    "addCard" |
    "chooseCard" |
    "openCard";

/** 所有菜单项列表*/
type TMenuItemNameList =
    //基本类
    "exposeArticle" |  //举报
    "setFont" |  //调整字体
    "dayMode" |  //日间模式
    "nightMode" |  //夜间模式
    "refresh" |  //刷新
    "profile" |  //查看公众号（已添加）
    "addContact" |  //查看公众号（未添加）
    //传播类
    "shareappMessage" |  //发送给朋友
    "sharetimeline" |  //分享到朋友圈
    "shareqq" |  //分享到QQ
    "shareweiboApp" |  //分享到Weibo
    "favorite" |  //收藏
    "sharefacebook" |  //分享到FB
    "QZone" |  //分享到 QQ 空间 "menuItem
    //保护类
    "editTag" |  //编辑标签
    "delete" |  //删除
    "copyUrl" |  //复制链接
    "originPage" |  //原网页
    "readMode" |  //阅读模式
    "openWithQQBrowser" |  //在QQ浏览器中打开
    "openWithSafari" |  //在Safari中打开
    "shareemail" |  //邮件
    "sharebrand"; //一些特殊公众号



//***返回值类型定义

//ErrMsg类型定义
//接口调用成功或用户取消的返回类型
type TErrMsgSuccessOrCancel = {
    [K in TOperNameList]: "ok" | "cancel";
}
//接口返回类型，错误时候返回错误信息
/** ErrMsg类型定义*/
type TErrMsg = TErrMsgSuccessOrCancel | string;

/** 接口调用返回对象类型*/
interface IResponse {
    errMsg: TErrMsg;
}

/** 接口传递参数类型定义*/
interface IParameter<T extends IResponse> {    
    success?: (res?: T) => void;
    fail?: (res?: T) => void;
    complete?: (res?: T) => void;
    cancel?: (res?: T) => void;
    trigger?: (res?: T) => void;
}

/** 判断当前客户端版本是否支持指定JS接口-传递参数*/
interface ICheckJsApiParameter extends IParameter<ICheckJsApiResponse> {
    jsApiList: string[];    // 需要检测的JS接口列表，所有JS接口列表见附录2,
}
type TCheckJsApiResult = {
    [K in TOperNameList]: boolean;
};
/** 判断当前客户端版本是否支持指定JS接口-返回参数*/
interface ICheckJsApiResponse extends IResponse {
    /**
     * 以键值对的形式返回，可用的api值true，不可用为false
     * 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
     * */   
    checkResult: TCheckJsApiResult;
}

//*******系统接口*******

/** 获取网络类型接口*/
interface IGetNetworkTypeResponse extends IResponse {
    /** 返回网络类型2g，3g，4g，wifi*/
    networkType: string; 
}

//************分享接口***********************************

/**
 * 自定义“分享给朋友”及“分享到QQ”按钮的分享内容（1.4.0）
 * 需在用户可能点击分享按钮前就先调用，放在wx.ready中
 * */
interface IUpdateAppMessageShareDataParameter extends IParameter<IResponse> {
    /** 分享标题 */
    title: string; 
    /** 分享描述 */
    desc: string; 
    /** 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致 */
    link: string; 
    /** 分享图标*/
    imgUrl: string;
}

/** 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容（1.4.0）
 * 需在用户可能点击分享按钮前就先调用，放在wx.ready中
 * */
interface IUpdateTimelineShareDataParameter extends IParameter<IResponse> {
    /** 分享标题*/
    title: string;
    /** 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致*/
    link: string;
    /** 分享图标*/
    imgUrl: string;
}

//********图片接口******************

/**拍照或从手机相册中选图接口-传递参数*/
interface IChooseImageParameter extends IParameter<IChooseImageResponse> {
    /** 数量，默认9 */
    count: number;
    /** 可以指定是原图还是压缩图，默认二者都有*/
    sizeType: Array<"original" | "compressed">;
    /** 可以指定来源是相册还是相机，默认二者都有 */
    sourceType: Array<"album" | "camera">;   
}
/**拍照或从手机相册中选图接口-返回参数*/
interface IChooseImageResponse extends IResponse {
    /**返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片 */
    localIds: string[];
}

/**预览图片-传递参数*/
interface IPreviewImageParameter extends IParameter<IResponse> {
    /** 当前显示图片的http链接*/
    current: string;
    /** 需要预览的图片http链接列表*/
    urls: string[];
}

/**上传图片-传递参数*/
interface IUploadImageParameter extends IParameter<IUploadImageResponse> {
    /**需要上传的图片的本地ID，由chooseImage接口获得 */
    localId: string; 
    /**默认为1，显示进度提示 */
    isShowProgressTips: number; 
}
/**上传图片-返回参数*/
interface IUploadImageResponse extends IResponse {
    /**返回图片的服务器端ID */
    serverId: string; 
}

/**下载图片-传递参数*/
interface IDownloadImageParameter extends IParameter<IDownloadImageResponse> {
    /**需要下载的图片的服务器端ID，由uploadImage接口获得 */
    serverId: string;
    /**默认为1，显示进度提示 */
    isShowProgressTips: number;
}
/**下载图片-返回参数*/
interface IDownloadImageResponse extends IResponse {
    /** 返回图片下载后的本地ID*/
    localId: string; 
}

/**获取本地图片-传递参数*/
interface IGetLocalImgDataParameter extends IParameter<IGetLocalImgDataResponse> {
    /**图片的localID */
    localId: string;
}
/**获取本地图片-返回参数*/
interface IGetLocalImgDataResponse extends IResponse {
    /**localData是图片的base64数据，可以用img标签显示 */
    localData: string; 
}

//******音频接口************

/**停止录音-传递参数*/
interface IStopRecordResponse extends IResponse {
    /**语音localId */
    localId: string;
}

/**
 * 监听录音自动停止接口
 * 
 * 录音时间超过一分钟没有停止的时候会执行 complete 回调*/
interface IOnVoiceRecordEndResponse extends IResponse {
    /**语音localId */
    localId: string;
}


/**播放录音接口-传递参数*/
interface IPlayVoiceParameter extends IParameter<IResponse> {
    /** 需要播放的音频的本地ID，由stopRecord接口获得*/
    localId: string; 
}


/**暂停播放接口-传递参数*/
interface IPauseVoiceParameter extends IParameter<IResponse> {
    /**需要停止的音频的本地ID，由stopRecord接口获得 */
    localId: string;
}

/**停止播放接口-传递参数*/
interface IStopVoiceParameter extends IParameter<IResponse> {
    /**需要停止的音频的本地ID，由stopRecord接口获得 */
    localId: string;
}

/**监听语音播放完毕接口-返回参数*/
interface IOnVoicePlayEndResponse extends IResponse {
    /**返回音频的本地ID */
    localId: string;
}

/**上传语音接口-传递参数*/
interface IUploadVoiceParameter extends IParameter<IUploadVoiceResponse> {
    /**需要上传的音频的本地ID，由stopRecord接口获得 */
    localId: string;
    /**默认为1，显示进度提示 */
    isShowProgressTips: number;
}
/**上传语音接口-返回参数*/
interface IUploadVoiceResponse extends IResponse {
    /**返回音频的服务器端ID */
    serverId: string; 
}

/**下载语音接口-传递参数*/
interface IDownloadVoiceParameter extends IParameter<IDownloadVoiceResponse> {
    /**需要下载的音频的服务器端ID，由uploadVoice接口获得 */
    serverId: string; 
    /**默认为1，显示进度提示 */
    isShowProgressTips: number;
}
/**下载语音接口-返回参数*/
interface IDownloadVoiceResponse extends IResponse {
    /**返回音频的本地ID */
    localId: string;
}

/**音频识别（声音转文字）接口-传递参数*/
interface ITranslateVoiceParameter extends IParameter<ITranslateVoiceResponse> {
    /**需要识别的音频的本地Id，由录音相关接口获得 */
    localId: string; 
    /**默认为1，显示进度提示 */
    isShowProgressTips: number;
}
/**音频识别（声音转文字）接口-返回参数*/
interface ITranslateVoiceResponse extends IResponse {
    /**语音识别的结果 */
    translateResult: string;
}

//********地理位置********

/**使用微信内置地图查看位置接口*/
interface IOpenLocationParameter extends IParameter<IResponse> {
    /**纬度，浮点数，范围为90 ~ -90 */
    latitude: number; 
    /**经度，浮点数，范围为180 ~ -180 */
    longitude: number;    
    /**位置名 */
    name: string; 
    /**地址详情说明 */
    address: string; 
    /**地图缩放级别,整形值,范围从1~28。默认为最大 */
    scale: number; 
    /**在查看位置界面底部显示的超链接,可点击跳转 */
    infoUrl: string; 
}

/**获取地理位置接口-传递参数*/
interface IGetLocationParameter extends IParameter<IGetLocationResponse> {
    /**默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02' */
    type: string;  
}
/**获取地理位置接口-返回参数*/
interface IGetLocationResponse extends IResponse {
    /**纬度，浮点数，范围为90 ~ -90 */
    latitude: number;
    /**经度，浮点数，范围为180 ~ -180 */
    longitude: number;
    /**速度，以米/每秒计 */
    speed: number;
    /**位置精度 */
    accuracy: number;
}

//******摇一摇周边，这部分还要参考摇一摇周边获取设备信息***********

/**开启查找周边ibeacon设备接口*/
interface IStartSearchBeaconsParameter extends IParameter<IResponse> {
    /**摇周边的业务ticket, 系统自动添加在摇出来的页面链接后面 */
    ticket: string; 
}

//******界面操作*********

/**批量隐藏功能按钮接口*/
interface IHideMenuItemsParameter extends IParameter<IResponse> {
    /**要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3 */
    menuList: TMenuItemNameList[]; 
}

/**批量显示功能按钮接口*/
interface IShowMenuItemsParameter extends IParameter<IResponse> {
    /**要显示的菜单项，所有menu项见附录3 */
    menuList: TMenuItemNameList[];  
}

//*********微信扫一扫******

/**调起微信扫一扫接口-传递参数*/
interface IScanQRCodeParameter extends IParameter<IScanQRCodeResponse> {
    /**默认为0，扫描结果由微信处理，1则直接返回扫描结果 */
    needResult: 0; 
    /**可以指定扫二维码还是一维码，默认二者都有 */
    scanType: Array<"qrCode" | "barCode">;  
}
/**调起微信扫一扫接口-返回参数*/
interface IScanQRCodeResponse extends IResponse {
    /**当needResult 为 1 时，扫码返回的结果 */
    resultStr: string;
}

//******微信小店*********

/**跳转微信商品页接口*/
interface IOpenProductSpecificViewParameter extends IParameter<IResponse> {
    productId: string; // 商品id
    viewType: string; // 0.默认值，普通商品详情页1.扫一扫商品详情页2.小店商品详情页
}

//********微信卡券***********
/**卡券类型 */
type TCard = { cardId: string; cardExt: string; code: string; };


/**拉取适用卡券列表并获取用户选择信息-传递参数*/
interface IChooseCardParameter extends IParameter<IChooseCardResponse> {
    /**门店Id */
    shopId: string; 
    /**卡券类型 */
    cardType: string; 
    /**卡券Id */
    cardId: string; 
    /**卡券签名时间戳 */
    timestamp: number; 
    /**卡券签名随机串 */
    nonceStr: string; 
    /**签名方式，默认'SHA1' */
    signType: string; 
    /**卡券签名 */
    cardSign: string; 
}
/**拉取适用卡券列表并获取用户选择信息-返回参数*/
interface IChooseCardResponse extends IResponse {
    /**用户选中的卡券列表信息 */
    cardList: TCard[]; 
}


/**批量添加卡券接口-传递参数*/
interface IAddCardParameter extends IParameter<IAddCardResponse> {
    /**要添加的卡券列表 */
    cardList: TCard[];
}
/**批量添加卡券接口-返回参数*/
interface IAddCardResponse extends IResponse {
    /**成功添加的卡券列表 */
    cardList: TCard[];
}


/**查看微信卡包中的卡券接口-传递参数*/
interface IOpenCardParameter extends IParameter<IResponse> {
    /**要查看的卡券列表 */
    cardList: TCard[];
}

//***********微信支付************

/**发起一个微信支付请求-传递参数*/
interface IChooseWXPayParameter extends IParameter<IResponse> {
    /**支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符 */
    timestamp: number; 
    /**支付签名随机串，不长于 32 位 */
    nonceStr: string; 
    /**统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*） */
    package: string; 
    /**签名方式，默认为'SHA1'，使用新版支付需传入'MD5' */
    signType: string; 
    /**支付签名 */
    paySign: string; 
}

//***********快速输入*************

/**共享收货地址接口-返回参数*/
interface IOpenAddressResponse extends IResponse {
    /** 收货人姓名 */
    userName: string; 
    /**邮编 */
    postalCode: string; 
    /**国标收货地址第一级地址（省） */
    provinceName: string; 
    /**国标收货地址第二级地址（市） */
    cityName: string; 
    /**国标收货地址第三级地址（国家） */
    countryName: string; 
    /**详细收货地址信息 */
    detailInfo: string; 
    /**收货地址国家码 */
    nationalCode: string;  
    /**收货人手机号码 */
    telNumber: string; 
}

/**WX-JDK统一调用接口*/
interface IJWeixin {
    /**
     * 配置jdk运行环境
     * 
     * @param configuration 一个对象，包含是否调试，appid，时间戳，随机串，签名，接口列表等
     */
    config(configuration: TConfig): void;
    ready(): void;
    error(res: IResponse): void;

    /**
     * 判断当前客户端版本是否支持指定JS接口
     * 
     * @param para 一个对象，包含需要检测的接口名称列表，返回键值对形式的接口是否可用
     */
    checkJsApi(para: ICheckJsApiParameter): void; 

    //******系统接口
    /**
     * 返回网络类型
     * 
     * @param para 返回值中包含网络类型2g，3g，4g，wifi
     */
    getNetworkType(para: IParameter<IGetNetworkTypeResponse>): void;

    //*********分享接口
    /**
     * 自定义“分享给朋友”及“分享到QQ”按钮的分享内容（1.4.0）
     * 
     * @param para 一个对象，包含分享的标题，描述，链接与图表
     */
    updateAppMessageShareData(para: IUpdateAppMessageShareDataParameter): void;
    /**
     * 自定义“分享给朋友”及“分享到QQ”按钮的分享内容（1.4.0）
     * 
     * @param para 一个对象，包含分享的标题，链接和图标
     */
    updateTimelineShareData(para: IUpdateTimelineShareDataParameter): void; 

    //*******图像接口
    /**
     * 拍照或从手机相册中选图接口
     * 
     * @param para 一个对象，包含选择的图像数量，是否压缩，来源，返回图像的localId列表
     */
    chooseImag(para: IChooseImageResponse): void;
    /**
     * 预览图片
     * 
     * @param para 一个对象，包含当前图像http链接和所有图片http链接列表
     */
    previewImage(para: IPreviewImageParameter): void; 
    /**
     * 上传图片
     * 
     * @param para 一个对象，包含图像localId，返回图像的serverId
     */
    uploadImage(para: IUploadImageParameter): void; 
    /**
     * 下载图片
     * 
     * @param para 一个对象，包含图像serverId，返回图像的localId
     */
    downloadImage(para: IDownloadImageParameter): void; 
    /**
     * 获取本地图片
     * 
     * @param para 一个对象，包含图像localId, 返回图像的localData，可供img标签使用
     */
    getLocalImgData(para: IGetLocalImgDataParameter): void; 

    //*******音频接口
    /**
     * 开始录音
     * */
    startRecord(): void; 
    /**
     * 停止录音
     * 
     * @param para 返回录音的localId
     */
    stopRecord(para: IParameter<IStopRecordResponse>): void; 
    /**
     * 监听录音自动停止接口
     * 
     * @param para 返回录音的localId
     */
    onVoiceRecordEnd(para: IParameter<IOnVoiceRecordEndResponse>): void; 
    /**
     * 播放语音接口
     * 
     * @param para 一个对象，包含录音的localId
     */
    playVoice(para: IPlayVoiceParameter): void;
    /**
     * 暂停播放语音接口
     * 
     * @param para 一个对象，包含录音的localId
     */
    pauseVoice(para: IPauseVoiceParameter): void;
    /**
     * 停止播放接口
     * 
     * @param para 一个对象，包含录音的localId
     */
    stopVoice(para: IStopVoiceParameter): void; 
    /**
     * 监听语音播放完毕接口
     * 
     * @param para 返回录音的locaId
     */
    onVoicePlayEnd(para: IParameter<IOnVoicePlayEndResponse>): void; 
    /**
     * 上传语音接口
     * 
     * @param para 一个对象，包含语音的localId，返回录音的serverId
     */
    uploadVoice(para: IUploadVoiceParameter): void; 
    /**
     * 下载语音接口
     * 
     * @param para 一个对象，包含语音的serverId, 返回录音的localId
     */
    downloadVoice(para: IDownloadVoiceParameter): void; 
    /**
     * 语音识别接口
     * 
     * @param para 一个对象，包含录音的localId，返回语音识别的文本
     */
    translateVoice(para: ITranslateVoiceParameter): void; 

    //*******地理位置
    /**
     * 使用微信内置地图打开地理位置
     * 
     * @param para 一个对象，包含经度、维度、位置名、地址说明、缩放级别、底部跳转链接
     */
    openLocation(para: IOpenLocationParameter): void; 
    /**
     * 获取地理位置接口
     * 
     * @param para 一个对象，包含类型（wgs84或gcj02），返回经度、维度、速度（米/秒）、位置经度
     */
    getLocation(para: IGetLocationParameter): void; 

    //*******摇一摇周边，这部分还要参考摇一摇周边获取设备信息
    /**
     * 开启查找周边ibeacon设备接口
     * 
     * @param para 一个对象，包含ticket
     */
    startSearchBeacons(para: IStartSearchBeaconsParameter): void; 
    /**
     * 关闭查找周边ibeacon设备接口
     * 
     * @param para 
     */
    stopSearchBeacons(para: IParameter<IResponse>): void; 
    /**
     * 监听周边ibeacon设备接口
     * 
     * @param para 
     */
    onSearchBeacons(para: IParameter<IResponse>): void; 

    //********界面操作
    /**
     * 关闭当前网页窗口接口
     * */
    closeWindow(): void; 
    /**
     * 批量隐藏功能按钮接口
     * 
     * @param para 一个对象，包含要隐藏的菜单项列表，只能隐藏“传播类”和“保护类”
     */
    hideMenuItems(para: IHideMenuItemsParameter): void;
    /**
     * 批量显示功能按钮接口
     * 
     * @param para 一个对象，包含要显示的菜单项
     */
    showMenuItems(para: IShowMenuItemsParameter): void;
    /**
     * 隐藏所有非基础按钮接口
     * */
    hideAllNonBaseMenuItem(): void;
    /**
     * 显示所有功能按钮接口
     * */
    showAllNonBaseMenuItem(): void;

    //*******微信扫一扫
    /**
     * 调起微信扫一扫接口
     * 
     * @param para 一个对象，包含是否需要处理扫描结构，扫描一维码还是二维码，返回扫描的结果
     */
    scanQRCode(para: IScanQRCodeParameter): void;

    //*******微信小店
    /**
     * 跳转微信商品页接口
     * 
     * @param para 一个对象，包含商品id和页面类型（0.默认值，普通商品详情页1.扫一扫商品详情页2.小店商品详情页）
     */
    openProductSpecificView(para: IOpenProductSpecificViewParameter): void;

    //*******微信卡券
    /**
     * 拉取适用卡券列表并获取用户选择信息
     * 
     * @param para 一个对象，包含门店Id，卡券类型，卡券Id，卡券签名时间戳，卡券签名随机串，签名方式（默认SHA1），卡券签名，返回用户选中的卡券列表
     */
    chooseCard(para: IChooseCardParameter): void; 
    /**
     * 批量添加卡券接口
     * 
     * @param para 一个对象，包含要添加的卡券列表，返回添加成功的卡券列表
     */
    addCard(para: IAddCardParameter): void; 
    /**
     * 查看微信卡包中的卡券接口
     * 
     * @param para 一个对象，包含卡券列表
     */
    openCard(para: IOpenCardParameter): void; 

    //*******微信支付
    /**
     * 发起一个微信支付请求
     * 
     * @param para 一个对象，包含时间戳、随机串、prepay_id、签名方式（默认SHA1），签名
     */
    chooseWXPay(para: IChooseWXPayParameter): void; 

    //*******快速输入
    /**
     * 共享收货地址接口
     * 
     * @param para 一个对象，包含姓名、邮编、省市县、详细地址、国家码、电话号码
     */
    openAddress(para: IParameter<IOpenAddressResponse>): void; 
}

declare module "jweixin" {
    export = wx;
}
declare var jWeixin: IJWeixin;
declare var wx: IJWeixin;

