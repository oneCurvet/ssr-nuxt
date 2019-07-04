<template>
  <div class="container">
    <el-row class="strategy_header" type="flex">
      <el-row class="strategy_recommended">
        <el-row class="strategy_nav">
          <el-row type="flex" justify="space-between">
            <span>海外冬季目的地精选</span>
            <i class="el-icon-arrow-right"></i>
          </el-row>
          <el-row type="flex" justify="space-between">
            <span>国内冬季目的地推荐</span>
            <i class="el-icon-arrow-right"></i>
          </el-row>
          <el-row type="flex" justify="space-between">
            <span>奔向海岛</span>
            <i class="el-icon-arrow-right"></i>
          </el-row>
          <el-row type="flex" justify="space-between">
            <span>主题推荐</span>
            <i class="el-icon-arrow-right"></i>
          </el-row>
        </el-row>

        <el-row class="strategy_search" type="flex" justify="space-between">
          <span></span>
          <el-input placeholder="请输入想去的地方,如香港" class="input-with-select"></el-input>
        </el-row>
        <el-row class="strategy_app" type="flex" justify="space-around">
          <el-row class="strategy_app_logo">
            <img src="http://images.mafengwo.net/images/app/m/logo_gonglve_v6.png?v=20150825" alt />
          </el-row>
          <el-row class="strategy_app_download">
            <h5>马蜂窝自由行APP下载</h5>
            <p>iPhone版 | Android版 | iPad版</p>
            <!-- <img
              src="https://p3-q.mafengwo.net/s12/M00/17/80/wKgED1vb_fqAeZq0AAAxwHmnAuc675.png"
              alt
            />-->
          </el-row>
        </el-row>
      </el-row>
      <el-row class="strategy_carousel">
        <el-carousel trigger="click" height="340px">
          <el-carousel-item v-for="item in img" :key="item">
            <img :src="item" alt />
          </el-carousel-item>
        </el-carousel>
      </el-row>
    </el-row>

    <el-row class="strategy_middle" type="flex">
      <el-row class="Travel_strategy_navigation">
        <h5>旅游攻略导航</h5>
        <el-row class="area_theme">
          <span>
            国内<i class="el-icon-caret-bottom"></i><span>|</span>
          </span>
          <span>
            国外<i class="el-icon-caret-bottom"></i><span>|</span>
          </span>
          <span>
            主题<i class="el-icon-caret-bottom"></i>
          </span>
        </el-row>
        <el-row class="specific_name">
          <ul>
            <li class="showDate_downNum">
              <img
                src="https://b4-q.mafengwo.net/s9/M00/B7/67/wKgBs1eIpuKAWMIqAAX50SJdFGY72.jpeg?imageMogr2%2Fthumbnail%2F%21130x184r%2Fgravity%2FCenter%2Fcrop%2F%21130x184%2Fquality%2F90"
                alt
              />
              <p>更新日期:2016-07-15</p>
              <span>
                <i></i>1269097人下载
              </span>
            </li>
            <li><span>2</span>东京</li>
            <li><span>3</span>京都</li>
            <li><span>4</span>日本</li>
            <li><span>5</span>西安</li>
            <li><span>6</span>成都</li>
            <li><span>7</span>北京</li>
            <li><span>8</span>重庆</li>
            <li><span>9</span>台湾</li>
            <li><span>10</span>青岛</li>
          </ul>
        </el-row>
      </el-row>
      <el-row class="Travel_strategy_recommended"></el-row>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      img: [
        "https://b4-q.mafengwo.net/s12/M00/1F/F1/wKgED1uHx-2AVONCAASTAwl30cw73.jpeg",
        "https://n2-q.mafengwo.net/s11/M00/3D/3F/wKgBEFtrlBWAUHczAAR1Jh3BMT410.jpeg",
        "https://b2-q.mafengwo.net/s12/M00/D4/09/wKgED1vpIAiAI6D9AAZ72-z4yZw188.png",
        "https://p3-q.mafengwo.net/s11/M00/4A/E0/wKgBEFrQBqeAYyjMAAURcw8MxG470.jpeg",
        "https://n3-q.mafengwo.net/s13/M00/03/30/wKgEaVyu94SAIqDcAAheevdYPB4887.png"
      ]
    };
  },
  methods: {}
};
</script>

<style lang="less">
.container {
  width: 1000px;
  margin: 0 auto;
  li{
      list-style: none;
  }
  .strategy_header {
    margin-top: 15px;
    height: 350px;
    .strategy_recommended {
      width: 260px;
      //   border: 1px solid #000;
      .strategy_nav {
        color: #666;
        box-shadow: 0 0.5px 2px rgba(0, 0, 0, 0.1);
        border: 1px solid #ddd;
        > div {
          padding: 15px;
          border-bottom: 1px solid #ddd;
        }
        span {
          font-size: 12px;
        }
        i {
          font-size: 12px;
          color: #666;
        }
      }
      .strategy_search {
        // width: 100%;
        // position: relative;
        border: 2px solid #ffa800;
        margin-top: 10px;
        .input-with-select {
          width: 206px;
          flex: 1;
          font-size: 12px;
          color: #000;
          .el-input__inner {
            border: 1px solid #fff !important;
          }
        }
        span {
          float: left;
          width: 29px;
          height: 27px;
          display: block;
          background: url("http://images.mafengwo.net/images/gonglve/new-gl-icon6.png") -20px -60px
            no-repeat;
          margin-top: 8px;
          margin-left: 6px;
        }
      }
      .strategy_app {
        margin-top: 10px;
        height: 65px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        .strategy_app_logo {
          img {
            width: 50px;
            height: 50px;
          }
        }
        .strategy_app_download {
          h5 {
            font-size: 16px;
            color: #ffa800;
            margin-top: 3px;
          }
          p {
            font-size: 12px;
            margin-top: 5px;
            color: #999;
          }
        }
      }
    }
    .strategy_carousel {
      flex: 1;
      margin-left: 30px;
      height: 700px;
      img {
        border: 0 none;
      }
    }
  }
  .strategy_middle{
      margin-top: 15px;
      .Travel_strategy_navigation{
          width: 160px;
          h5{
              font-size: 16px;
              color: #333;
              height: 50px;
              border-bottom: 1px solid #eee;
              line-height: 48px;
              font-weight: normal;
          }
          .area_theme{
              width: 100%;
              padding: 15px 0px;
              border-bottom: 1px solid #eee;

              > span{
                  width: 33.333%;
                  font-size: 14px;
                  text-align: center;
                  margin: 0 2px;
                  color: #666;
                  i{

                  }
              }
          }
          .specific_name{
              ul{
                  li{
                      border-bottom: 1px solid #eee;
                      padding: 15px 0;
                      font-size: 16px;
                      span{
                        color: #ff9d00;
                        font-size: 18px;
                        margin-right: 8px;
                      }
                  }
                  .showDate_downNum{
                      p{
                          font-size: 12px;
                          color: #666;
                        //   margin-left: 5px;
                          margin:5px 0 5px 5px;
                      }
                      >span{
                          background: #EBEBEB;
                          widows: 130px;
                          height: 24px;
                          font-size: 12px;
                          color: #666;
                          margin-left: 7px;
                          padding: 3px 20px;
                          border-radius: 25px;
                          i{
                              width: 24px;
                              height: 24px;
                              display: block;
                              position: absolute;
                              background: url(http://images.mafengwo.net/images/gonglve/new-gl-icon6.png) -20px -90px no-repeat;
                          }
                      }
                  }
              }
          }

      }
  }
}
</style>

