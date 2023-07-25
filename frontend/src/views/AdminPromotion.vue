<template>
  <div
    id="bg-fullscreen"
  >
    <div class="container is-max-desktop pt-6">
      <!-- ส่วนแสดง Promotion -->
      <div class="columns is-multiline is-mobile">
        <div class="column">
          <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
            <thead class="has-background-black">
              <tr class="m-5">
                <th class="has-text-white">Code</th>
                <th class="has-text-white">Quantity</th>
                <th class="has-text-white">Discount</th>
                <th class="has-text-white">*</th>
              </tr>
            </thead>
            <tbody>
              <tr class="has-text-left" v-for="promo in promotions" :key="promo.promotion_id">
                <td>{{ promo.code }}</td>
                <td>{{ promo.quantity }}</td>
                <td>{{ promo.discount }}</td>
                <td>
                  <div class="field is-grouped is-grouped-centered">
                    <div class="control">
                      <button class="button is-link" @click="showPro(promo)">
                        Edit
                      </button>
                    </div>
                    <div class="control">
                      <button class="button is-danger" @click="deletePro(promo.promotion_id)">
                        Delete
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- ส่วนเพิ่ม Promotion -->
      <div class="columns mt-6">
        <div class="column is-3">
          <input class="input is-rounded" type="text" placeholder="New Code" v-model="code" />
        </div>
        <div class="column is-3">
          <input class="input is-rounded" type="text" placeholder="New Quantity" v-model="quantity" />
        </div>
        <div class="column is-3">
          <input class="input is-rounded" type="text" placeholder="New Discount" v-model="discount" />
        </div>
        <div class="column is-3">
          <button class="button is-success" @click="addPro()">Add</button>
        </div>
      </div>

      <!-- ส่วนแก้ไข Promotion -->
      <div class="modal" :class="[showUpdate ? 'is-active' : '']">
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Update Promotion</p>
          </header>
          <section class="modal-card-body">
            <div class="field">
              <label class="label has-text-left">Code</label>
              <div class="control">
                <input class="input" type="text" placeholder="กรอกโค้ด" v-model="upCode" />
              </div>
            </div>
            <div class="field">
              <label class="label has-text-left">Quantity</label>
              <div class="control">
                <input class="input" type="price" placeholder="กรอกจำนวน" v-model="upQuantity" />
              </div>
            </div>
            <div class="field">
              <label class="label has-text-left">Discount</label>
              <div class="control">
                <input class="input" type="price" placeholder="กรอกราคา" v-model="upDiscount" />
              </div>
            </div>
          </section>
          <footer class="modal-card-foot">
            <button class="button is-success" @click="updatePro()">Save</button>
            <button class="button is-danger" @click="close()">Cancel</button>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/plugins/axios";

export default {
  name: "promotionAdmin",
  props: ["user"],
  data() {
    return {
      showUpdate: false,
      code: "",
      quantity: null,
      discount: null,
      promo_id: null,
      upCode: null,
      upQuantity: null,
      upDiscount: null,
      promotions: [],
    };
  },
  mounted() {
    this.getPromotion();
  },
  methods: {
    deletePro(promotion_id) {
      axios
        .delete("http://localhost:9005/promotion", {
          data: {id: promotion_id}
        })
        .then((res) => {
          this.getPromotion();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updatePro(){
      axios
        .put("http://localhost:9005/promotion", {
          promotion_id: this.promo_id,
          code: this.upCode,
          quantity: this.upQuantity,
          discount: this.upDiscount
        })
        .then((res) => {
          this.getPromotion();
          this.showUpdate = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addPro() {
      axios
        .post("http://localhost:9005/promotion", {
          code: this.code,
          quantity: this.quantity,
          discount: this.discount
        })
        .then((res) => {
          this.getPromotion();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    showPro(items) {
      this.showUpdate = true
      this.promo_id = items.promotion_id
      this.upCode = items.code
      this.upQuantity = items.quantity
      this.upDiscount = items.discount
    },
    getPromotion(){
      axios
        .get("http://localhost:9005/promotion")
        .then((res) => {
          this.promotions = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    close() {
      this.showUpdate = false
    },
  },
};
</script>
<style>
#bg-fullscreen {
  background-color: rgb(255, 239, 226);
  -webkit-background-size: cover;
  background-size: cover;
  width: 100vw;
  height: 100vh;
}
</style>
