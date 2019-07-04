<template>
  <div>
    地图
    <div id="container"></div>
    <div id="panel"></div>
  </div>
</template>

<script>
export default {
  mounted() {
    window.onLoad = function() {
      var map = new AMap.Map("container", {
        zoom: 12,
        resizeEnable: true
      });
      var traffic = new AMap.TileLayer.Traffic({
        autoRefresh: true, //是否自动刷新，默认为false
        interval: 180 //刷新间隔，默认180s
      });
      map.add(traffic); //通过add方法添加图层
      var marker = new AMap.Marker({
        //position: new AMap.LngLat(116.39, 39.9), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        title: "广州"
      });
      map.add(marker);
      
      AMap.plugin("AMap.Driving", function() {
        var driving = new AMap.Driving({
          // 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式
          policy: AMap.DrivingPolicy.LEAST_TIME,
          panel: "panel",
          map
        });

        var points = [
          { keyword: "广州动物园", city: "广州" },
          { keyword: "广州东站", city: "广州" }
        ];

        driving.search(points, function(status, result) {
          // 未出错时，result即是对应的路线规划方案
        });
      });
    };
    var url =
      "https://webapi.amap.com/maps?v=1.4.15&key=0d088186d19c717644aedcda01c01196&callback=onLoad";
    var jsapi = document.createElement("script");
    jsapi.charset = "utf-8";
    jsapi.src = url;
    document.head.appendChild(jsapi);
  }
};
</script>

<style>
#container {
  width: 600px;
  height: 480px;
}
</style>
