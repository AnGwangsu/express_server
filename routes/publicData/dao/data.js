const axios = require("axios");

//고정값
const ServiceKey = process.env.PUBLIC_DATA_SERVICEKEY;
const MobileApp = "tour";
const MobileOS = "ETC";

exports.locationList = async (req, res) => {
  try {
    var pageNo = req.body.page;
    var numOfRows = req.body.limit;
    var areaCode = req.body.areaCode;
    var contentTypeId = req.body.contentTypeId;
    var cat1 = req.body.cat1;
    var cat2 = req.body.cat2;
    var cat3 = req.body.cat3;
    var arrange = req.body.arrange;
    var items = [];
    var response = await axios.get(
      "http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaBasedList",
      {
        params: {
          ServiceKey,
          pageNo,
          numOfRows,
          MobileApp,
          MobileOS,
          arrange,
          areaCode,
          contentTypeId,
          cat1,
          cat2,
          cat3,
        },
      }
    );
    items = response.data.response.body.items.item;
    console.log("공공데이터 지역기반 리스트 성공");
    res.status(200).json({ resultCode: 1, data: { items: items } });
  } catch (error) {
    console.log("공공데이터 지역기반 리스트 실패" + error);
    res.status(400).json({ resultCode: -1, data: null });
  }
};
exports.stayList = async (req, res) => {
  try {
    var numOfRows = req.body.limit;
    var areaCode = req.body.areaCode;
    var sigunguCode = req.body.sigunguCode;
    var arrange = "P";
    var items = [];
    var response = await axios.get(
      "http://api.visitkorea.or.kr/openapi/service/rest/KorService/searchStay",
      {
        params: {
          ServiceKey,
          numOfRows,
          areaCode,
          sigunguCode,
          arrange,
          MobileApp,
          MobileOS,
        },
      }
    );
    items = response.data.response.body.items.item;
    console.log("숙박 리스트 완료");
    res.status(200).json({ resultCode: 1, data: { items: items } });
  } catch (error) {
    console.log("숙박 리스트 실패");
    res.status(400).json({ resultCode: -1, data: null });
  }
};
exports.enterLocation = async (req, res) => {
  try {
    var pageNo = req.body.page;
    var numOfRows = req.body.limit;
    var areaCode = req.body.areaCode;
    var contentTypeId = req.body.contentTypeId;
    var cat1 = req.body.cat1;
    var cat2 = req.body.cat2;
    var arrange = req.body.arrange;
    var items = [];
    var response = await axios.get(
      "http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaBasedList",
      {
        params: {
          ServiceKey,
          pageNo,
          numOfRows,
          MobileApp,
          MobileOS,
          arrange,
          areaCode,
          contentTypeId,
          cat1,
          cat2,
        },
      }
    );
    items = response.data.response.body.items.item;
    console.log("즐길거리 리스트 완료");
    res.status(200).json({ resultCode: 1, data: { items: items } });
  } catch (error) {
    console.log("즐길거리 리스트 실패" + error);
    res.status(400).json({ resultCode: -1, data: null });
  }
};

exports.locationCode = async (req, res) => {
  try {
    var numOfRows = 35;
    var areaCode = req.body.areaCode;
    var items = [];
    var response = await axios.get(
      "http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaCode",
      {
        params: {
          ServiceKey,
          MobileApp,
          MobileOS,
          areaCode,
          numOfRows,
        },
      }
    );
    items = response.data.response.body.items.item;
    console.log("공공데이터 지역코드 리스트 성공");
    res.status(200).json({ resultCode: 1, data: { items: items } });
  } catch (error) {
    console.log("공공데이터 지역코드 리스트 실패");
    res.status(400).json({ resultCode: -1, data: null });
  }
};
exports.categoryList = async (req, res) => {
  try {
    var areaCode = req.body.areaCode
    var numOfRows = req.body.limit;
    var contentTypeId = req.body.contentTypeId
    var arrange = "P";
    var cat1 = req.body.cat1
    var cat2 = req.body.cat2
    var items = []
    var category = await axios.get('http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaBasedList',{
      params:{
        ServiceKey,
        MobileApp,
        MobileOS,
        arrange,
        areaCode,
        contentTypeId,
        cat1,
        cat2,
        numOfRows
      }
    })
    items = category.data.response.body.items.item
    console.log('카테고리별 리스트 성공')
    res.status(200).json({"resultCode":1, "data":{"items":items}})
  } catch (error) {
    console.log('카테고리별 리스트 실패'+error)
    res.status(400).json({"resultCode":-1, "data":null})
  }
};

exports.read = async (req, res) => {
  try {
    var contentId = req.body.contentId;
    var contentTypeId = req.body.contentTypeId;
    var mapx = req.body.mapx;
    var mapy = req.body.mapy;
    var image = await axios.get(
      "http://api.visitkorea.or.kr/openapi/service/rest/KorService/detailImage",
      {
        params: {
          ServiceKey,
          MobileApp,
          MobileOS,
          contentId,
          contentTypeId,
        },
      }
    );
    var path = "";
    image = image.data.response.body.items.item;
    for (i in image) {
      path = image[i].originimgurl;
      image[i] = path;
    }
    var intro = await axios.get(
      "http://api.visitkorea.or.kr/openapi/service/rest/KorService/detailIntro",
      {
        params: {
          ServiceKey,
          MobileApp,
          MobileOS,
          contentId,
          contentTypeId,
        },
      }
    );
    intro = intro.data.response.body;
    console.log("지역기반 상세 보기 성공");
    res.status(200).json({ resultCode: 1, data: { image, intro, mapx, mapy } });
  } catch (error) {
    console.log("지역기반 상세 보기 실패" + error);
    res.status(400).json({ resultCode: -1, data: null });
  }
};
