<template>
  <div id="bg-fullscreen">
    <div
      class="container hero is-fullheight"
      style="align-items: center; position: relative"
    >
      <section class="section" id="app">
        <div class="content">
          <div class="column is-12" v-for="rest in rests" :key="rest.rest_id">
            <div class="card" v-if="rest.rest_id == rest_id">
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
                <div class="is-size-4 has-text-centered">
                  {{ rest.address }}
                </div>
                <div class="field has-text-centered my-5">
                  <div class="control has-text-dark" style="font-size: 20px">
                    Rating: {{ rest.rating }}
                  </div>
                  <div
                    class="control has-text-centered"
                    style="font-size: 20px"
                  >
                    <label>Review</label>
                  </div>
                </div>
                <div
                  class="columns is-centered has-text-centered"
                  v-for="rv in reviews"
                  :key="rv.rv_id"
                >
                  <div class="column is-4">
                    <span style="font-size: 20px"
                      >Comment: {{ rv.comment }}</span
                    >
                  </div>
                  <div class="column is-4 has-text-centered">
                    <span class="stars">
                      <span class="has-text-warning"
                        ><i class="fas fa-star" aria-hidden="true"></i
                      ></span>
                      <span class="has-text-warning"
                        ><i
                          class="fas fa-star"
                          aria-hidden="true"
                          v-if="rv.rating >= 2"
                        ></i></span
                      ><span
                        class="far fa-star"
                        aria-hidden="true"
                        v-if="rv.rating < 2"
                      ></span>
                      <span class="has-text-warning"
                        ><i
                          class="fas fa-star"
                          aria-hidden="true"
                          v-if="rv.rating >= 3"
                        ></i></span
                      ><span
                        class="far fa-star"
                        aria-hidden="true"
                        v-if="rv.rating < 3"
                      ></span>
                      <span class="has-text-warning"
                        ><i
                          class="fas fa-star"
                          aria-hidden="true"
                          v-if="rv.rating >= 4"
                        ></i></span
                      ><span
                        class="far fa-star"
                        aria-hidden="true"
                        v-if="rv.rating < 4"
                      ></span>
                      <span class="has-text-warning"
                        ><i
                          class="fas fa-star"
                          aria-hidden="true"
                          v-if="rv.rating == 5"
                        ></i></span
                      ><span
                        class="far fa-star"
                        aria-hidden="true"
                        v-if="rv.rating < 5"
                      ></span>
                    </span>
                  </div>
                  <div class="column is-4 has-text-centered">
                    <button
                      class="button is-danger"
                      v-if="rv.user_id == user_id"
                      @click="deleteReview(rv)"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div class="field is-grouped is-grouped-centered">
                  <div class="field">
                    <textarea
                      type="text"
                      style="font-size: 20px"
                      v-model="comments"
                    ></textarea>
                  </div>
                  <div class="field mx-6">
                    <span class="stars">
                      <span class="has-text-warning"
                        ><i
                          class="fas fa-star"
                          aria-hidden="true"
                          @click="setStar(1)"
                        ></i
                      ></span>
                      <span class="has-text-warning"
                        ><i
                          class="fas fa-star"
                          aria-hidden="true"
                          v-if="star >= 2"
                          @click="setStar(2)"
                        ></i></span
                      ><span
                        class="far fa-star"
                        aria-hidden="true"
                        v-if="star < 2"
                        @click="setStar(2)"
                      ></span>
                      <span class="has-text-warning"
                        ><i
                          class="fas fa-star"
                          aria-hidden="true"
                          v-if="star >= 3"
                          @click="setStar(3)"
                        ></i></span
                      ><span
                        class="far fa-star"
                        aria-hidden="true"
                        v-if="star < 3"
                        @click="setStar(3)"
                      ></span>
                      <span class="has-text-warning"
                        ><i
                          class="fas fa-star"
                          aria-hidden="true"
                          v-if="star >= 4"
                          @click="setStar(4)"
                        ></i></span
                      ><span
                        class="far fa-star"
                        aria-hidden="true"
                        v-if="star < 4"
                        @click="setStar(4)"
                      ></span>
                      <span class="has-text-warning"
                        ><i
                          class="fas fa-star"
                          aria-hidden="true"
                          v-if="star == 5"
                          @click="setStar(5)"
                        ></i></span
                      ><span
                        class="far fa-star"
                        aria-hidden="true"
                        v-if="star < 5"
                        @click="setStar(5)"
                      ></span>
                    </span>
                  </div>
                  <div class="field">
                    <button class="button is-success" @click="addReview()">
                      Add
                    </button>
                  </div>
                </div>
              </div>
              <footer class="card-footer"></footer>
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
  name: "detailrestaurant",
  props: ["user"],
  data() {
    return {
      rests: [],
      reviews: [],
      ratings: null,
      user_id: null,
      rest_id: null,
      comments: null,
      star: 1,
    };
  },
  mounted() {
    this.getRest();
    this.setRest_Id();
    this.getReview();
  },
  watch: {},
  methods: {
    setStar(num) {
      this.star = num;
    },
    setRest_Id() {
      this.rest_id = this.$route.params.id;
      this.user_id = this.user.user_id;
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
    getReview() {
      axios
        .post(`http://localhost:9004/review/get`, {
          rest_id: this.rest_id,
        })
        .then((res) => {
          this.reviews = res.data;
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getRating() {
      axios
        .post(`http://localhost:9004/review/rating`, {
          rest_id: this.rest_id,
        })
        .then((res) => {
          this.ratings = res.data;
          this.updateRating();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateRating() {
      axios
        .post(`http://localhost:9001/rest`, {
          rest_id: this.rest_id,
          rating: this.ratings,
        })
        .then((res) => {
          this.getRest();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addReview() {
      axios
        .post(`http://localhost:9004/review`, {
          comment: this.comments,
          rest_id: this.rest_id,
          user_id: this.user_id,
          rating: this.star,
        })
        .then((res) => {
          this.getReview();
          this.getRating();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteReview(rv) {
      axios
        .delete(`http://localhost:9004/review`, {
          data: { id: rv.rv_id },
        })
        .then((res) => {
          this.getReview();
          this.getRating();
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