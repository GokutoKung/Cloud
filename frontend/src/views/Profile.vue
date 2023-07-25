<template>
  <div id="bg-fullscreen">
    <div class="container is-widescreen has-text-centered">
      <h2 class="title is-2 has-text-centered py-5">My Profile</h2>
      <div class="columns is-centered">
        <!-- show profile -->
        <div class="column is-4" style="display: inline-block; text-align: left">
          <div class="box" style="height:100%">
            <article class="media">
              <div class="media-content">
                <div class="content">
                  <!-- first name -->
                  <div class="field">
                    <label class="label">First Name : <span>{{ name }}</span></label>

                  </div>

                  <!-- last name -->
                  <div class="field">
                    <label class="label">Last Name : {{ surname }}</label>
                  </div>

                  <!-- email -->
                  <div class="field">
                    <label class="label">Email : {{ email }}</label>
                  </div>

                </div>
              </div>
            </article>
          </div>
        </div>

        <!-- Edit profile-->
        <div class="column is-4" style="display: inline-block; text-align: left">
          <div class="box">
            <article class="media">
              <div class="media-content">
                <div class="content">
                  <!-- first name -->
                  <div class="field">
                    <label class="label">First Name</label>
                    <div class="control">
                      <input
                        v-model="editName"
                        class="input"
                        type="text"
                        :placeholder="name"
                      />
                    </div>
                  </div>

                  <!-- last name -->
                  <div class="field">
                    <label class="label">Last Name</label>
                    <div class="control">
                      <input
                        v-model="editSurname"
                        class="input"
                        type="text"
                        :placeholder="surname"
                      />
                    </div>
                  </div>

                  <!-- email -->
                  <div class="field">
                    <label class="label">Email</label>
                    <div class="control has-icons-left has-icons-right">
                      <input
                        v-model="editEmail"

                        class="input"
                        type="email"
                      />
                      <span class="icon is-small is-left">
                        <i class="fas fa-envelope"></i>
                      </span>
                    </div>
                  </div>

                  <!-- password -->
                  <div class="field">
                    <label class="label">Password</label>
                    <div class="control has-icons-left has-icons-right">
                      <input
                        v-model="editPass"
                        class="input"
                        type="password"
                      />
                      <span class="icon is-small is-left">
                        <i class="fas fa-lock"></i>
                      </span>
                    </div>
                  </div>

                  <!-- btn -->
                  <div class="field is-grouped is-grouped-centered "
                  >
                    <div class="control">
                      <button class="button is-success" @click="saveEdit()">
                        Save
                      </button>
                    </div>
                    <div class="control">
                      <button class="button is-danger" @click="cancel()">
                        Cancel
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
  </div>
</template>

<script>
import axios from "@/plugins/axios";

export default {
  name: "profile",
  props: ["user"],
  data() {
    return {
      name: null,
      surname: null,
      email: null,
      password: null,
      user_id: null,
      role: null,
      rest_id: null,
      editName: null,
      editSurname: null,
      editEmail: null,
      editPass: null,
    };
  },
  mounted() {
    this.setProfile();
  },
  methods: {
    setProfile() {
      this.user_id = this.user.user_id;
      this.name = this.user.name;
      this.surname = this.user.surname;
      this.email = this.user.email;
      this.password = this.user.password;
      this.role = this.user.role;
      this.rest_id = this.user.rest_id;
    },
    saveEdit() {
      if (this.editName != null) {
        this.name = this.editName;
      }

      if (this.editSurname != null) {
        this.surname = this.editSurname;
      }

      if (this.editEmail != null) {
        this.email = this.editEmail;
      }

      if (this.editPass != null) {
        this.password = this.editPass;
      }

      axios
      axios({
          method: 'put',
          url: "http://localhost:9003/user",
          data: {
            "user_id": this.user_id,
            "email": this.email,
            "password": this.password,
            "name": this.name,
            "surname": this.surname,
            "role": this.role,
            "rest_id": this.rest_id
          }
        })
        .then((res) => {
          this.editName = null;
          this.editSurname = null;
          this.editEmail = null;
          this.editPass = null;
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    cancel(){
      this.editName = null;
      this.editSurname = null;
      this.editEmail = null;
      this.editPass = null;
    }
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
.box{
  padding: 50px;
}
</style>
