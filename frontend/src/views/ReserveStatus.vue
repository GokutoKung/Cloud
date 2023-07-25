<template>
  <div id="bg-fullscreen">
    <div
      class="container hero is-fullheight"
      style="align-items: center; position: relative;"
    >
      <div
        class="column is-6"
      >
        <div class="card px-6 py-1 mt-5" v-for="reserv in reservations"
        :key="reserv.reserv_id">
          <article class="px-5 py-5">
            <section class="card-body">
              <div class="columns">
                <!-- Reservation -->
                <div class="column">
                  <div class="box px-6">
                    <div class="title is-4 has-text-centered">Reservation</div>
                    <div class="columns">
                      <div class="column is-6">
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
                      <div class="column is-6">
                        <strong>Date : </strong>
                      </div>
                      <div class="column is-6 has-text-right">
                        {{ reserv.eating_date }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <!-- btn Add -->
            <footer class="card-footer">
              <p class="card-footer-item" :class="[
                reserv.status=='Waiting'?'has-background-warning':
                reserv.status=='Reject'? 'has-background-danger has-text-white':
                'has-background-success has-text-white']">{{ reserv.status }}</p>
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
          rest_id: reserv.rest_id,
        })
        .then((res) => {
          this.getReservations();
        })
        .catch((err) => {
          console.log(err);
        });
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
          rest_id: reserv.rest_id,
        })
        .then((res) => {
          this.getReservations();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getReservations() {
      axios
        .get("http://localhost:9001/reservation")
        .then((res) => {
          // this.reservations = res.data;
          const data = res.data;
          data.forEach(item => {
            item.booking_date = new Date(item.booking_date).toISOString().replace(/T/, ' ').replace(/\..+/, '');
            item.eating_time = new Date( item.eating_time).toISOString().replace(/T/, ' ').replace(/\..+/, '');
          })
          this.reservations = data;
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
  background-color: rgb(59, 39, 33);
  -webkit-background-size: cover;
  background-size: cover;
  width: 100vh;
}
.box {
  background-color: rgb(255, 249, 230);
  height: 100%;
}
</style>
