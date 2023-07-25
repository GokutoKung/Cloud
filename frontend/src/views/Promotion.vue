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
                      <button class="button is-link" @click="copy(promo)">
                        Copy
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/plugins/axios";

export default {
  name: "promotion",
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
    copy(promo){
      navigator.clipboard.writeText(promo.code);
      alert("Copied the code: " + promo.code);
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
