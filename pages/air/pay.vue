<template>
  <div class="container">
    <div class="main">
      <div class="pay-title">
        支付总金额
        <span class="pay-price">￥ {{price}}.00</span>
      </div>
      <div class="pay-main">
        <h4>微信支付</h4>
        <el-row type="flex" justify="space-between" align="middle" class="pay-qrcode">
          <div class="qrcode">
            <!-- 二维码 -->
            <canvas id="qrcode-stage"></canvas>
            <p>请使用微信扫一扫</p>
            <p>扫描二维码支付</p>
          </div>
          <div class="pay-example">
            <img src="http://157.122.54.189:9093/images/wx-sweep2.jpg" alt />
          </div>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from "qrcode";
import { async } from "q";
export default {
  data() {
    return {
      price: 0,
      data: {},
      timer: null
    };
  },
  methods: {
    isPay() {
      return this.$axios({
        url: "/airorders/checkpay",
        method: "POST",
        data: {
          id: this.data.id,
          out_trade_no: this.data.orderNo,
          nonce_str: this.price
        },
        headers: {
          Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
        }
      }).then(res1 => {
        if (res1.data.statusTxt == "订单未支付") {
          return false;
        } else {
          return true;
        }
      });
    }
  },
  mounted() {
    // const totalPrice = localStorage.getItem("totalPrice");
    // console.log(totalPrice)
    this.price = localStorage.getItem("totalPrice");
    setTimeout(() => {
      this.$axios({
        url: `/airorders/${this.$route.query.id}`,
        headers: {
          Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
        }
      }).then(res => {
        // console.log(res.data);
        this.data = res.data;
        const { code_url } = res.data.payInfo;
        QRCode.toCanvas(document.getElementById("qrcode-stage"), code_url, {
          width: 200
        });

        this.timer = setInterval(async () => {
          const pay = await this.isPay();
          console.log(pay);
          if (pay) {
            this.$message.success("订单支付成功");
            clearInterval(this.timer);
          }
        }, 3000);
      });
    }, 200);
  }
};
</script>

<style scoped lang="less">
.container {
  background: #f5f5f5;
  padding: 30px 0;

  .main {
    width: 1000px;
    margin: 0 auto;

    .pay-title {
      text-align: right;
      span {
        font-size: 28px;
        color: orangered;
      }
    }

    .pay-main {
      background: #fff;
      margin-top: 10px;
      border-top: 5px orange solid;
      padding: 30px;

      h4 {
        font-size: 28px;
        font-weight: normal;
        margin-bottom: 10px;
      }

      .pay-qrcode {
        padding: 0 80px;
      }

      .qrcode {
        border: 1px #ddd solid;
        padding: 15px;
        height: fit-content;

        #qrcode-stage {
          width: 200px;
          height: 200px;
          margin-bottom: 10px;
        }

        p {
          line-height: 2;
          text-align: center;
        }
      }
    }
  }
}
</style>