<template>
  <div id="bg-fullscreen">
    <div class="container hero is-fullheight" style="align-items: center; position: relative; height: 100px">
      <div class="column is-7">
        <div class="card px-6 py-2">
          <article class="px-5 py-5">
            <h2 class="title">Add Course</h2>
            <section class="card-body">
              <!-- pic -->
              <div class="field">
                <label class="label">Link Picture</label>
                <div class="control">
                  <input class="input" type="text" placeholder="ใส่ link รูป" v-model="image" />
                </div>
              </div>
              <div class="field">
                <label class="label has-text-left">Name Course</label>
                <div class="control">
                  <input class="input" type="text" placeholder="กรอกชื่อ course" v-model="nameCourse" />
                </div>
              </div>
              <div class="field">
                <label class="label has-text-left">Price</label>
                <div class="control">
                  <input class="input" type="text" placeholder="กรอกราคา" v-model="price" />
                </div>
              </div>

              <!-- food menu -->
              <div class="field is-grouped">
                <div class="field-label has-text-left">
                  <label class="label">Menu 1:</label>
                  <div class="select">
                    <select v-model="menu1">
                      <option :value="food.food_id" v-for="food in foods" :key="food.food_id">
                        {{ food.name }}
                      </option>
                    </select>
                  </div>

                  <label class="label">Amount:</label>
                  <div class="control">
                    <input v-model="amount1" class="input" type="text" placeholder="กรอกจำนวน" />
                  </div>
                  <div class="control" v-for="food in foods" :key="food.food_id">
                    <figure class="image is-3by2 mt-5" v-if="menu1 == food.food_id">
                      <img :src="food.image" alt="Placeholder image">
                    </figure>
                  </div>
                </div>

                <div class="field-label has-text-left">
                  <label class="label">Menu 2:</label>
                  <div class="select">
                    <select v-model="menu2">
                      <option :value="food.food_id" v-for="food in foods" :key="food.food_id">
                        {{ food.name }}
                      </option>
                    </select>
                  </div>

                  <label class="label">Amount:</label>
                  <div class="control">
                    <input v-model="amount2" class="input" type="text" placeholder="กรอกจำนวน" />
                  </div>
                  <div class="control" v-for="food in foods" :key="food.food_id">
                    <figure class="image is-3by2 mt-5" v-if="menu2 == food.food_id">
                      <img :src="food.image" alt="Placeholder image">
                    </figure>
                  </div>
                </div>

                <div class="field-label has-text-left">
                  <label class="label">Menu 3:</label>
                  <div class="select">
                    <select v-model="menu3">
                      <option :value="food.food_id" v-for="food in foods" :key="food.food_id">
                        {{ food.name }}
                      </option>
                    </select>
                  </div>

                  <label class="label">Amount:</label>
                  <div class="control">
                    <input v-model="amount3" class="input" type="text" placeholder="กรอกจำนวน" />
                  </div>
                  <div class="control" v-for="food in foods" :key="food.food_id">
                    <figure class="image is-3by2 mt-5" v-if="menu3 == food.food_id">
                      <img :src="food.image" alt="Placeholder image">
                    </figure>
                  </div>
                </div>

                <div class="field-label has-text-left">
                  <label class="label">Menu 4:</label>
                  <div class="select">
                    <select v-model="menu4">
                      <option :value="food.food_id" v-for="food in foods" :key="food.food_id">
                        {{ food.name }}
                      </option>
                    </select>
                  </div>

                  <label class="label">Amount:</label>
                  <div class="control">
                    <input v-model="amount4" class="input" type="text" placeholder="กรอกจำนวน" />
                  </div>
                  <div class="control" v-for="food in foods" :key="food.food_id">
                    <figure class="image is-3by2 mt-5" v-if="menu4 == food.food_id">
                      <img :src="food.image" alt="Placeholder image">
                    </figure>
                  </div>
                </div>

                <div class="field-label has-text-left">
                  <label class="label">Menu 5:</label>
                  <div class="select">
                    <select v-model="menu5">
                      <option :value="food.food_id" v-for="food in foods" :key="food.food_id">
                        {{ food.name }}
                      </option>
                    </select>
                  </div>

                  <label class="label">Amount:</label>
                  <div class="control">
                    <input v-model="amount5" class="input" type="text" placeholder="กรอกจำนวน" />
                  </div>
                  <div class="control" v-for="food in foods" :key="food.food_id">
                    <figure class="image is-3by2 mt-5" v-if="menu5 == food.food_id">
                      <img :src="food.image" alt="Placeholder image">
                    </figure>
                  </div>
                </div>
              </div>
            </section>

            <!-- btn Add -->
            <footer class="field is-grouped is-grouped-centered mt-5">
              <div class="control">
                <button class="button is-success" @click="addCourse()">
                  <router-link to="/menuAdmin" style="color: white">
                    Add
                  </router-link>
                </button>
              </div>
              <div class="control">
                <button class="button is-danger">
                  <router-link to="/menuAdmin" style="color: white">Cancel</router-link>
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
  name: "addCourse",
  props: ["user"],
  data() {
    return {
      showUpdate: false,
      course_id: null,
      nameCourse: '',
      image: '',
      price: null,
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
      foods: [],
    };
  },
  mounted() {
    this.getFoods();
  },
  methods: {
    addCourse() {
      axios
        .post("http://localhost:9002/course", {
          name: this.nameCourse,
          image: this.image,
          price: this.price,
          menu1: this.menu1,
          amount1: this.amount1,
          menu2: this.menu2,
          amount2: this.amount2,
          menu3: this.menu3,
          amount3: this.amount3,
          menu4: this.menu4,
          amount4: this.amount4,
          menu5: this.menu5,
          amount5: this.amount5
        })
        .then((res) => {
          this.getCourses();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getFoods(){
      axios
        .get("http://localhost:9002/food")
        .then((res) => {
          this.foods = res.data;
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
}
</style>
