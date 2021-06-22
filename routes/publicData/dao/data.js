const axios = require("axios");

exports.locationList = async (req, res) => {
  try {
    var ServiceKey=process.env.PUBLIC_DATA_SERVICEKEY//Deconding된 인증키를 사용해야한다
    var pageNo = req.body.page
    var numOfRows = req.body.limit
    var areaCode = req.body.areaCode
    var arrange = req.body.arrange
    var MobileApp = "tour"
    var MobileOS = "ETC"
    var items = []
    var response = await axios.get('http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaBasedList',{
          params:{
              ServiceKey,
              pageNo,
              numOfRows,
              MobileApp,
              MobileOS,
              arrange,
              areaCode,
          }
      })
    items = response.data.response.body.items
    console.log('공공데이터 지역기반 리스트 성공')
    res.status(200).json({"resultCode":1, "data":{"items":items}})
  } catch (error) {
    console.log('공공데이터 지역기반 리스트 실패'+error)
    res.status(400).json({"resultCode":-1, "data":null})
  }
};

exports.read = async (req, res) => {
  try {
    var ServiceKey=process.env.PUBLIC_DATA_SERVICEKEY
    var MobileApp = "tour"
    var MobileOS = "ETC"
    var contentId = req.body.contentId
    var contentTypeId = req.body.contentTypeId
    var image = await axios.get('http://api.visitkorea.or.kr/openapi/service/rest/KorService/detailImage',{
        params:{
            ServiceKey,
            MobileApp,
            MobileOS,
            contentId,
            contentTypeId
        }
    })
    var path=''
    image = image.data.response.body.items.item
    for(i in image){
        path=image[i].originimgurl
        image[i]=path
    }
    // var intro = await axios.get('http://api.visitkorea.or.kr/openapi/service/rest/KorService/detailIntro',{
    //     params:{
    //         ServiceKey,
    //         MobileApp,
    //         MobileOS,
    //         contentId,
    //         contentTypeId
    //     }
    // })
    // console.log(intro.data.response.body)
    console.log('지역기반 상세 보기 성공')
    res.status(200).json({"resultCode":1, "data":{image}})
  } catch (error) {
    console.log('지역기반 상세 보기 실패'+error)
    res.status(400).json({"resultCode":-1, "data":null})
  }
};
