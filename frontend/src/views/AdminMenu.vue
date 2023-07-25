<template>
  <div id="bg-fullscreen">
    <div
      class="container hero py-5"
      style="align-items: center; position: relative;"
    >
      <div class="columns is-multiline" style="width:80%">
        <div class="column is-6" v-for="course in courses" :key="course.id">
          <div class="box">
            <h2 class="title pl-5">{{ course.name }}</h2>
            <article class="media pl-5 pr-5">
              <div class="media-content">
                <div class="field is-grouped">
                  <div class="field-label is-normal">
                    <figure class="image is-3by2">
                      <img :src="course.image" alt="Placeholder image">
                    </figure>
                  </div>
                  <div class="field-label has-text-left  is-normal">
                    <div class="title is-6">
                      รายการอาหาร
                    </div>
                    <div class="control" v-for="food in foods" :key="food.food_id">
                      <p v-if="course.menu1 == food.food_id">1. {{ food.name }}</p>
                    </div>
                    <div class="control" v-for="food in foods" :key="food.food_id">
                      <p v-if="course.menu2 == food.food_id">2. {{ food.name }}</p>
                    </div>
                    <div class="control" v-for="food in foods" :key="food.food_id">
                      <p v-if="course.menu3 == food.food_id">3. {{ food.name }}</p>
                    </div>
                    <div class="control" v-for="food in foods" :key="food.food_id">
                      <p v-if="course.menu4 == food.food_id">4. {{ food.name }}</p>
                    </div>
                    <div class="control" v-for="food in foods" :key="food.food_id">
                      <p v-if="course.menu5 == food.food_id">5. {{ food.name }}</p>
                    </div>
                  </div>
                </div>
                <div class="field is-grouped is-grouped-centered mt-5">
                  <div class="control">
                    <button class="button is-link" @click="showCourse(course)">
                        Edit
                    </button>
                  </div>
                  <div class="control">
                    <button class="button is-danger" @click="delCourse(course.course_id)">
                        Delete
                    </button>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>

    <!-- ส่วน ไปหน้า Add Course -->
    <div id="btn">
      <button class="button is-large is-rounded is-success">
        <router-link to="/menuAdmin/addCourse">
          <span class="icon" style="color: white">
            <i class="fas fa-plus"></i>
          </span>
        </router-link>
      </button>
    </div>

    <!-- Edit Couse -->
    <div class="modal" :class="[showUpdate ? 'is-active' : '']">
        <div class="modal-background"></div>
        <div id="modal-size" class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Update Course</p>
          </header>
          <section class="modal-card-body">
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
                <input class="input" type="price" placeholder="กรอกราคา" v-model="price" />
              </div>
            </div>
            <!-- food menu -->
            <div class="field is-grouped">
              <div class="field-label has-text-left">
                <label class="label">Menu 1:</label>
                <div class="select">
                  <select v-model="menu1">
                    <option
                      :value="food.food_id"
                      v-for="food in foods"
                      :key="food.food_id"
                    >
                      {{ food.name }}
                    </option>
                  </select>
                </div>

                <label class="label">Amount:</label>
                <div class="control">
                  <input
                    v-model="amount1"
                    class="input"
                    type="text"
                    placeholder="กรอกจำนวน"
                  />
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
                    <option
                      :value="food.food_id"
                      v-for="food in foods"
                      :key="food.food_id"
                    >
                      {{ food.name }}
                    </option>
                  </select>
                </div>

                <label class="label">Amount:</label>
                <div class="control">
                  <input
                    v-model="amount2"
                    class="input"
                    type="text"
                    placeholder="กรอกจำนวน"
                  />
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
                    <option
                      :value="food.food_id"
                      v-for="food in foods"
                      :key="food.food_id"
                    >
                      {{ food.name }}
                    </option>
                  </select>
                </div>

                <label class="label">Amount:</label>
                <div class="control">
                  <input
                    v-model="amount3"
                    class="input"
                    type="text"
                    placeholder="กรอกจำนวน"
                  />
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
                    <option
                      :value="food.food_id"
                      v-for="food in foods"
                      :key="food.food_id"
                    >
                      {{ food.name }}
                    </option>
                  </select>
                </div>

                <label class="label">Amount:</label>
                <div class="control">
                  <input
                    v-model="amount4"
                    class="input"
                    type="text"
                    placeholder="กรอกจำนวน"
                  />
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
                    <option
                      :value="food.food_id"
                      v-for="food in foods"
                      :key="food.food_id"
                    >
                      {{ food.name }}
                    </option>
                  </select>
                </div>

                <label class="label">Amount:</label>
                <div class="control">
                  <input
                    v-model="amount5"
                    class="input"
                    type="text"
                    placeholder="กรอกจำนวน"
                  />
                </div>
                <div class="control" v-for="food in foods" :key="food.food_id">
                  <figure class="image is-3by2 mt-5" v-if="menu5 == food.food_id">
                      <img :src="food.image" alt="Placeholder image">
                  </figure>
                </div>
              </div>
            </div>

          </section>
          <footer class="modal-card-foot">
            <button class="button is-success" @click="updateCouse()">Save</button>
            <button class="button is-danger" @click="close()">Cancel</button>
          </footer>
        </div>
      </div>
  </div>
</template>

<script>
import axios from "@/plugins/axios";

export default {
  name: "menuAdmin",
  props: ["user"],
  data() {
    return {
      showUpdate: false,
      nameFood: '',
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
      courses: [],
      foods: []
    };
  },
  mounted() {
    this.getCourses();
    this.getFoods();
  },
  methods: {
    updateCouse(){
      axios
        .put("http://localhost:9002/course", {
          course_id: this.course_id,
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
          this.showUpdate = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    delCourse(course_id) {
      axios
        .delete("http://localhost:9002/course", {
          data: {id: course_id}
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
    getCourses(){
      axios
        .get("http://localhost:9002/course")
        .then((res) => {
          this.courses = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    showCourse(course) {
      this.showUpdate = true;
      this.course_id = course.course_id;
      this.nameCourse = course.name;
      this.price = course.price;
      this.image = course.image;
      this.menu1 = course.menu1;
      this.amount1 = course.amount1;
      this.menu2 = course.menu2;
      this.amount2 = course.amount2;
      this.menu3 = course.menu3;
      this.amount3 = course.amount3;
      this.menu4 = course.menu4;
      this.amount4 = course.amount4;
      this.menu5 = course.menu5;
      this.amount5 = course.amount5;
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
  height: 100vh;
}
#btn {
  position: fixed;
  bottom: 4%;
  right: 3%;
}
#modal-size {
  width: 55%;
}
</style>
