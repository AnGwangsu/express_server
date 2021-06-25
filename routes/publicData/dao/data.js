const axios = require("axios");

exports.locationList = async (req, res) => {
  try {
    var ServiceKey = process.env.PUBLIC_DATA_SERVICEKEY; //Deconding된 인증키를 사용해야한다
    var pageNo = req.body.page;
    var numOfRows = req.body.limit;
    var areaCode = req.body.areaCode;
    var contentTypeId = req.body.contentTypeId;
    var cat1 = req.body.cat1;
    var cat2 = req.body.cat2;
    var cat3 = req.body.cat3;
    var arrange = req.body.arrange;
    var MobileApp = "tour";
    var MobileOS = "ETC";
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

exports.enterLocation = async (req, res) => {
  try {
    var ServiceKey = process.env.PUBLIC_DATA_SERVICEKEY; //Deconding된 인증키를 사용해야한다
    var pageNo = req.body.page;
    var numOfRows = req.body.limit;
    var areaCode = req.body.areaCode;
    var contentTypeId = req.body.contentTypeId;
    var cat1 = req.body.cat1;
    var cat2 = req.body.cat2;
    var arrange = req.body.arrange;
    var MobileApp = "tour";
    var MobileOS = "ETC";
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
    console.log('즐길거리 리스트 완료')
    res.status(200).json({"resultCode":1, "data":{"items":items}})
  } catch (error) {
    console.log('즐길거리 리스트 실패'+error)
    res.status(400).json({"resultCode":-1, "data":null})
  }
};

exports.locationCode = async (req, res) => {
  try {
    var ServiceKey = process.env.PUBLIC_DATA_SERVICEKEY;
    var MobileApp = "tour";
    var MobileOS = "ETC";
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

exports.read = async (req, res) => {
  try {
    var ServiceKey = process.env.PUBLIC_DATA_SERVICEKEY;
    var MobileApp = "tour";
    var MobileOS = "ETC";
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
