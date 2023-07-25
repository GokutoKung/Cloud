<template>
  <div id="bg-fullscreen">
    <div class="container hero is-fullheight" style="align-items: center; position: relative;">
      <div class="column is-5" style="display: inline-block; text-align: left">
        <div class="box" v-if="status === 0">
          <h2 class="title has-text-centered">Reservation</h2>
          <article class="media">
            <div class="media-content">
              <div class="content">
                <div class="field">
                  <label class="label">Date</label>
                  <div class="control">
                    <input class="input" type="date" v-model="date" />
                  </div>
                </div>
                <div class="field">
                  <label class="label">Time</label>
                  <div class="control">
                    <input class="input" type="time" v-model="eating_time" />
                  </div>
                </div>
                <div class="field">
                  <label class="label">Branch</label>
                  <div class="select is-fullwidth">
                    <select v-model="branch">
                      <option
                        :value="rest.rest_id"
                        v-for="rest in rests"
                        :key="rest.rest_id"
                      >
                        {{ rest.branch }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="columns is-multiline">
                  <div class="column is-6" v-for="t in table" :key="t.table_id">
                    <div class="card">
                      <div class="card-image pt-5">
                        <figure class="image" v-if="t.status == 'Unavailable'">
                          <img
                            style="height: 120px; width: 200px"
                            src="https://media.discordapp.net/attachments/844870220757860372/971619616965144636/ty.png"
                            alt="Placeholder image"
                          />
                        </figure>
                        <figure class="image" v-if="t.status == 'Available'">
                          <img
                            style="height: 120px; width: 200px"
                            src="https://media.discordapp.net/attachments/934752929892667422/971620982869606430/try.png"
                            alt="Placeholder image"
                          />
                        </figure>
                      </div>
                      <div class="card-content has-text-centered">
                        <span class="icon-text">
                          <span style="height: 30px"
                            >Table No. {{ t.table_no }}<br />Status:
                            {{ t.status }}</span
                          >
                        </span>
                      </div>
                      <div class="card-footer">
                        <a
                          class="card-footer-item has-background-primary"
                          v-if="
                            t.status == 'Available' && t.table_id != chooseTable
                          "
                          @click="changeStatus(t)"
                          style="color: white"
                        >
                          จอง
                        </a>
                        <a
                          class="card-footer-item has-background-success"
                          v-if="
                            t.status == 'Available' && t.table_id == chooseTable
                          "
                          style="color: white"
                        >
                          จองแล้ว
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="field is-grouped is-grouped-centered">
                  <div class="control">
                    <router-link class="button is-danger" to="/"
                      >Cancel</router-link
                    >
                  </div>
                  <div class="control">
                    <button class="button is-success" @click="nextToOrder()">
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>

        <div class="box" v-if="status === 1">
          <h2 class="title has-text-centered">Order</h2>
          <article class="media">
            <div class="media-content">
              <div class="field">
                <label class="label">course</label>
                <div class="select is-fullwidth">
                  <select v-model="course_id">
                    <option
                      :value="course.course_id"
                      v-for="course in courses"
                      :key="course.course_id"
                    >
                      {{ course.name }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="field">
                <label class="label">Price:</label>
                <div class="control">
                  <input
                    class="input"
                    type="text"
                    placeholder="Enter your Amount"
                    v-model="price"
                  />
                </div>
              </div>
              <div class="field">
                <label class="label">Code:</label>
                <div class="control">
                  <input
                    class="input"
                    type="text"
                    placeholder="Enter your Code"
                    v-model="code"
                  />
                </div>
              </div>

              <div class="field is-grouped">
                <div class="field-label has-text-left">
                  <label class="label">Menu 1:</label>
                  <div
                    class="control"
                    v-for="food in foods"
                    :key="food.food_id"
                  >
                    <div v-if="food.food_id == menu1">{{ food.name }}</div>
                    <figure
                      class="image is-3by2 mt-5"
                      v-if="menu1 == food.food_id"
                    >
                      <img :src="food.image" alt="Placeholder image" />
                    </figure>
                  </div>

                  <label class="label">Amount:</label>
                  <div class="control">
                    {{ amount1 }}
                  </div>
                </div>
                <div class="field-label has-text-left">
                  <label class="label">Menu 2:</label>
                  <div
                    class="control"
                    v-for="food in foods"
                    :key="food.food_id"
                  >
                    <div v-if="food.food_id == menu2">{{ food.name }}</div>
                    <figure
                      class="image is-3by2 mt-5"
                      v-if="menu2 == food.food_id"
                    >
                      <img :src="food.image" alt="Placeholder image" />
                    </figure>
                  </div>

                  <label class="label">Amount:</label>
                  <div class="control">
                    <p>{{ amount2 }}</p>
                  </div>
                </div>
                <div class="field-label has-text-left">
                  <label class="label">Menu 3:</label>
                  <div
                    class="control"
                    v-for="food in foods"
                    :key="food.food_id"
                  >
                    <div v-if="food.food_id == menu3">{{ food.name }}</div>
                    <figure
                      class="image is-3by2 mt-5"
                      v-if="menu3 == food.food_id"
                    >
                      <img :src="food.image" alt="Placeholder image" />
                    </figure>
                  </div>

                  <label class="label">Amount:</label>
                  <div class="control">
                    <p>{{ amount3 }}</p>
                  </div>
                </div>
                <div class="field-label has-text-left">
                  <label class="label">Menu 4:</label>
                  <div
                    class="control"
                    v-for="food in foods"
                    :key="food.food_id"
                  >
                    <div v-if="food.food_id == menu4">{{ food.name }}</div>
                    <figure
                      class="image is-3by2 mt-5"
                      v-if="menu4 == food.food_id"
                    >
                      <img :src="food.image" alt="Placeholder image" />
                    </figure>
                  </div>

                  <label class="label">Amount:</label>
                  <div class="control">
                    <p>{{ amount4 }}</p>
                  </div>
                </div>
                <div class="field-label has-text-left">
                  <label class="label">Menu 5:</label>
                  <div
                    class="control"
                    v-for="food in foods"
                    :key="food.food_id"
                  >
                    <div v-if="food.food_id == menu5">{{ food.name }}</div>
                    <figure
                      class="image is-3by2 mt-5"
                      v-if="menu5 == food.food_id"
                    >
                      <img :src="food.image" alt="Placeholder image" />
                    </figure>
                  </div>

                  <label class="label">Amount:</label>
                  <div class="control">
                    <p>{{ amount5 }}</p>
                  </div>
                </div>
              </div>
              <div class="field is-grouped is-grouped-centered">
                <div class="control">
                  <button class="button is-dark" @click="backToReserv()">
                      Back
                  </button>
                </div>
                <div class="control">
                  <button class="button is-success" @click="nextToPayment()">
                      Next
                  </button>
                </div>
              </div>
            </div>
          </article>
        </div>

        <div class="box" v-if="status === 2">
          <h2 class="title has-text-centered">ส่งหลักฐานการโอนเงิน</h2>
          <article class="media">
            <div class="media-content">
              <div class="content">
                
                <div class="field">
                  <label class="label">จำนวนเงินที่ต้องชำระ *</label>
                  <div class="control">
                    <input
                      class="input"
                      type="input"
                      placeholder="0000.00"
                      v-model="total_price"
                    />
                  </div>
                </div>

                <div class="field">
                  <label>File</label>
                  <div class="control">
                    <input
                      class="input"
                      type="text"
                      placeholder="link image"
                      v-model="image"
                    />
                  </div>
                </div>

                <div class="field">
                  <label class="label">วันที่โอน *</label>
                  <div class="control">
                    <input class="input" type="date" v-model="payment_date" />
                  </div>
                </div>

                <div class="field">
                  <label class="label">เวลาโอน *</label>
                  <div class="control">
                    <input class="input" type="time" v-model="payment_time" />
                  </div>
                </div>

                <div class="field">
                  <label class="label">จำนวนเงินที่โอน *</label>
                  <div class="control">
                    <input
                      class="input"
                      type="input"
                      placeholder="0000.00"
                      v-model="payment_price"
                    />
                  </div>
                </div>

                <div class="field is-grouped is-grouped-centered">
                  <div class="control">
                    <button class="button is-dark" @click="backToOrder()">
                      Back
                    </button>
                  </div>
                  <div class="control">
                    <button class="button is-success" @click="addReservation()">
                      <router-link to="/" style="color: white">
                        Submit
                      </router-link>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/plugins/axios";

export default {
  name: "rerservation",
  props: ["user"],
  data() {
    return {
      status: 0,
      date: null,
      eating_time: null,
      payment_date: null,
      payment_time: null,
      branch: 1,
      t: 1,
      course_id: null,
      table: [],
      rests: [],
      courses: [],
      foods: [],
      payment_price: 0,
      price: 0,
      chooseTable: null,
      list: null,
      image: null,
      menu1: null,
      amount1: null,
      menu2: null,
      amount2: null,
      menu3: null,
      amount3: null,
      menu4: null,
      amount4: null,
      menu5: null,
      amount5: null,
      discount: 0,
      total_price: 0,
      code: null,
      resv_id: null,
      table_no: null,
      user_id: null,
    };
  },
  mounted() {
    this.getRest();
    this.getTable();
    this.getCourse();
    this.getFood();
    this.setUser();
  },
  watch: {
    branch() {
      this.getTable();
      console.log(1);
    },
    course_id() {
      this.list = this.courses.filter((c) => (c.course_id == this.course_id));
      this.price = this.list[0].price;
      this.image = this.list[0].image;
      this.menu1 = this.list[0].menu1;
      this.menu2 = this.list[0].menu2;
      this.menu3 = this.list[0].menu3;
      this.menu4 = this.list[0].menu4;
      this.menu5 = this.list[0].menu5;
      this.amount1 = this.list[0].amount1;
      this.amount2 = this.list[0].amount2;
      this.amount3 = this.list[0].amount3;
      this.amount4 = this.list[0].amount4;
      this.amount5 = this.list[0].amount5;
    },
  },
  methods: {
    setUser(){
      this.user_id = this.user.user_id;
    },
    calculator(){
      this.total_price = this.price - this.discount;
    },
    nextToOrder() {
      this.status = 1;
    },
    backToReserv() {
      this.status = 0;
    },
    nextToPayment() {
      this.useCode();
      this.status = 2;
    },
    backToOrder() {
      this.status = 1;
    },
    getDate() {
      const datenow = new Date().toJSON().slice(0,10).replace(/-/g,'-');
      return datenow;
    },
    sec_Time(){
      return this.eating_time + ":00";
    },
    secPaymentTime(){
      return this.payment_time + ":00";
    },
    addReservation() {
      axios
        .post(`http://localhost:9001/reservation`, {
          booking_date: this.getDate(),
          eating_date: this.date,
          eating_time: this.sec_Time(),
          user_id: this.user_id,
          rest_id: this.branch,
        })
        .then((res) => {
          this.resv_id = res.data;
          this.updateSeat();
          this.addOrder();
          this.addPayment();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateSeat() {
      axios
        .put(`http://localhost:9001/seat`, {
          table_id: this.chooseTable,
          status: "Unavailable",
          rest_id: this.branch,
          table_no: this.table_no,
        })
        .then((res) => {
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getRest() {
      axios
        .get(`http://localhost:9001/rest`)
        .then((res) => {
          this.rests = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getTable() {
      axios
        .post(`http://localhost:9001/seat`, {
          id: this.branch,
        })
        .then((res) => {
          this.table = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    changeStatus(table) {
      this.chooseTable = table.table_id;
      this.table_no = table.table_no;
    },
    getCourse() {
      axios
        .get(`http://localhost:9002/course`)
        .then((res) => {
          this.courses = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getFood() {
      axios
        .get("http://localhost:9002/food")
        .then((res) => {
          this.foods = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    useCode(){
      axios
        .put(`http://localhost:9005/promotion/usecode`, {
          code: this.code
        })
        .then((res) => {
          console.log(res.data);
          this.discount = res.data;
          this.calculator();
        })
        .catch((err) => {
          console.log(err);
          this.calculator();
        });
    },
    addOrder() {
      axios
        .post(`http://localhost:9001/order`, {
          price: this.price,
          discount: this.discount,
          total_price: this.total_price,
          reserv_id: this.resv_id,
        })
        .then((res) => {
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addPayment() {
      axios
        .post(`http://localhost:9001/payment`, {
          image: this.image,
          date: this.payment_date,
          time: this.secPaymentTime(),
          price: this.price,
          reserv_id: this.resv_id,
        })
        .then((res) => {
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style>
#bg-fullscreen {
  background-color: rgb(255, 239, 226);
  -webkit-background-size: cover;
  background-size: cover;
  height: 100%;
}
</style>