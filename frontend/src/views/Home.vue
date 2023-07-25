<template>
  <div id="bg-fullscreen">
    <div class="container hero pt-4 pb-6" style="align-items: center; position: relative;">
    <section class="section" id="app">
      <div class="field is-grouped is-grouped-centered">
        <div class="button is-link" @click="api()">API</div>
        <div class="field pl-4">{{ fact }}</div>
      </div>

      <div class="content">
        <div class="columns is-multiline">
          <div class="column is-6" v-for="rest in rests" :key="rest.rest_id">
            <div class="card">
              <div class="card-image pt-5">
                <figure class="image">
                  <img
                    style="height: 120px; width: 220px"
                    src="https://media.timeout.com/images/104693497/image.jpg"
                    alt="Placeholder image"
                  />
                </figure>
              </div>
              <div class="card-content">
                <div class="is-size-4 has-text-centered">ร้านอาหาร DB</div>
                <div class="is-size-5 has-text-centered">
                  สาขา {{ rest.branch }}
                </div>
                <div class="field is-grouped is-grouped-centered">
                <button class="button is-success has-text-centered">
                    <router-link :to="{name:'detailrestaurant', params:{id:rest.rest_id}}" style="color: white">
                      Detail
                    </router-link>
                </button>
              </div>
              </div>
              <footer class="card-footer">
              </footer>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  </div>
</template>

<script>
import axios from "@/plugins/axios";

export default {
  name: "Home",
  props: ["user"],
  data() {
    return {
      rests: [],
      fact: null
    };
  },
  mounted() {
    this.getRest();
  },
  methods: {
    api(){
      axios
        .get("https://catfact.ninja/fact")
        .then((res) => {
          this.fact = res.data.fact;
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