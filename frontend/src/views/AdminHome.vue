<template>
  <div id="bg-fullscreen">
    <div class="container hero pt-4 pb-6" style="align-items: center; position: relative;">
      <div class="column is-12" v-for="reserv in reservations" :key="reserv.reserv_id">
        <div class="card px-6 py-2" v-if="reserv.status == 'Waiting'">
          <article class="px-5 py-5">
            <div v-for="order in orders" :key="order.order_id">
              <div v-for="pay in payments" :key="pay.payment_id">
                <div class="columns mb-5" :class="[order.reserv_id != reserv.reserv_id || pay.reserv_id != reserv.reserv_id? 'is-hidden': '']">
                  <div class="column">
                    <div class="box px-6">
                      <div class="title is-4 has-text-centered">Reservation</div>
                      <div class="columns">
                        <div class="column is-6 ">
                          <strong>Booking Date : </strong>
                        </div>
                        <div class="column is-6 has-text-right">
                          {{ reserv.booking_date }}
                        </div>
                      </div>

                      <div class="columns">
                        <div class="column is-6 py-0">
                          <strong>Time : </strong>
                        </div>
                        <div class="column is-6 py-0 has-text-right">
                          {{ reserv.eating_time }}
                        </div>
                      </div>

                      <div class="columns">
                        <div class="column is-6 ">
                          <strong>Date : </strong>
                        </div>
                        <div class="column is-6 has-text-right">
                          {{ reserv.eating_date }}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="column">
                    <div class="box px-6">
                      <div class="title is-4 has-text-centered">Order</div>
                      <div class="columns">
                        <div class="column is-6 ">
                          <strong>Price : </strong>
                        </div>
                        <div class="column is-6 has-text-right">
                          {{ order.price }}
                        </div>
                      </div>

                      <div class="columns">
                        <div class="column is-6 py-0">
                          <strong>Discount : </strong>
                        </div>
                        <div class="column is-6 py-0 has-text-right">
                          {{ order.discount }}
                        </div>
                      </div>

                      <div class="columns">
                        <div class="column is-6 ">
                          <strong>Total : </strong>
                        </div>
                        <div class="column is-6 has-text-right">
                          {{ order.total_price }}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="column">
                    <div class="box px-6">
                      <div class="title is-4 has-text-centered">Payment</div>
                      <div class="columns">
                        <div class="column is-6 ">
                          <strong>Date : </strong>
                        </div>
                        <div class="column is-6 has-text-right">
                          {{ pay.date }}
                        </div>
                      </div>

                      <div class="columns">
                        <div class="column is-6 py-0">
                          <strong>Time : </strong>
                        </div>
                        <div class="column is-6 py-0 has-text-right">
                          {{ pay.time }}
                        </div>
                      </div>

                      <div class="columns">
                        <div class="column is-6">
                          <strong>Price : </strong>
                        </div>
                        <div class="column is-6 has-text-right">
                          {{ pay.price }}
                        </div>
                      </div>
                      <figure class="image is-2by2 mt-5">
                        <img :src="pay.image" alt="Placeholder image">
                      </figure>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- btn Add -->
            <footer class="field is-grouped is-grouped-centered">
              <div class="control">
                <button class="button is-success" @click="approve(reserv)">
                  Approve
                </button>
              </div>
              <div class="control">
                <button class="button is-danger" @click="reject(reserv)">
                  Reject
                </button>
              </div>
            </footer>
          </article>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import axios from "@/plugins/axios";

export default {
  name: "homeAdmin",
  props: ["user"],
  data() {
    return {
      reservations: [],
      orders: [],
      payments: [],
    };
  },
  mounted() {
    this.getReservations();
    this.getOrders();
    this.getPayments();
  },
  methods: {
    approve(reserv) {
      axios
        .put("http://localhost:9001/reservation", {
          reserv_id: reserv.reserv_id,
          booking_date: reserv.booking_date,
          eating_date: reserv.eating_date,
          eating_time: reserv.eating_time,
          status: "Approve",
          user_id: reserv.user_id,
          rest_id: reserv.rest_id
        })
        .then((res) => {
          this.getReservations();
          this.getOrders();
          this.getPayments();
        })
        .catch((err) => {
          console.log(err);
        })
    },
    reject(reserv) {
      axios
        .put("http://localhost:9001/reservation", {
          reserv_id: reserv.reserv_id,
          booking_date: reserv.booking_date,
          eating_date: reserv.eating_date,
          eating_time: reserv.eating_time,
          status: "Reject",
          user_id: reserv.user_id,
          rest_id: reserv.rest_id
        })
        .then((res) => {
          this.getReservations();
          this.getOrders();
          this.getPayments();
        })
        .catch((err) => {
          console.log(err);
        })
    },
    getReservations() {
      axios
        .get("http://localhost:9001/reservation")
        .then((res) => {
          this.reservations = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getOrders() {
      axios
        .get("http://localhost:9001/order")
        .then((res) => {
          this.orders = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getPayments() {
      axios
        .get("http://localhost:9001/payment")
        .then((res) => {
          this.payments = res.data;
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
.box {
  background-color: rgb(255, 240, 196);
  height: 100%;
}
</style>
