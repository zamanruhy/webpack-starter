<template>
  <div class="styleguide container">
    <v-button v-modal.main-modal variant="primary">
      Open Modal
    </v-button>
    <v-modal id="main-modal" ref="modal">
      <p>
        <v-swiper navigation pagination :options="{ keyboard: true }">
          <v-swiper-slide v-for="n in 6" :key="n">
            <div class="styleguide__slide" v-text="n"></div>
          </v-swiper-slide>
        </v-swiper>
      </p>
      <v-button v-modal.nested-modal variant="primary">
        Open Nested Modal
      </v-button>
    </v-modal>
    <v-modal id="nested-modal">
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto deleniti dolorem eum ex explicabo nesciunt quas quisquam, repellendus sunt temporibus unde voluptatibus! Accusamus at beatae consectetur cumque distinctio doloribus esse exercitationem fuga hic incidunt iusto molestiae neque nobis, odio possimus provident quam qui recusandae sint sunt vero voluptas voluptate voluptatem? Et explicabo quod repudiandae similique tempore, vero voluptas. Aspernatur autem beatae dolor eum incidunt nostrum pariatur quae. A assumenda beatae blanditiis commodi, culpa est fugit illo illum magni nam nihil nobis nulla obcaecati odit porro quae quia quisquam quo reiciendis sapiente sed tempora unde ut? Delectus fuga modi molestiae sapiente?</p>
      <v-button v-modal.deep-modal variant="primary">
        Open Deep Modal
      </v-button>
    </v-modal>
    <v-modal id="deep-modal" no-stack>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto deleniti dolorem eum ex explicabo nesciunt quas quisquam, repellendus sunt temporibus unde voluptatibus! Accusamus at beatae consectetur cumque distinctio doloribus esse exercitationem fuga hic incidunt iusto molestiae neque nobis, odio possimus provident quam qui recusandae sint sunt vero voluptas voluptate voluptatem? Et explicabo quod repudiandae similique tempore, vero voluptas. Aspernatur autem beatae dolor eum incidunt nostrum pariatur quae. A assumenda beatae blanditiis commodi, culpa est fugit illo illum magni nam nihil nobis nulla obcaecati odit porro quae quia quisquam quo reiciendis sapiente sed tempora unde ut? Delectus fuga modi molestiae sapiente?</p>
    </v-modal>
    <h1>H1 lorem ipsum dolor sit</h1>
    <h2>H2 lorem ipsum dolor sit</h2>
    <h3>H3 lorem ipsum dolor sit</h3>
    <h4>H4 lorem ipsum dolor sit</h4>
    <h5>H5 lorem ipsum dolor sit</h5>
    <h6>H6 lorem ipsum dolor sit</h6>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A accusamus ad amet consequuntur dolorum eum ipsum labore laborum maiores, molestiae nisi reprehenderit sapiente sit tempore tenetur. Alias consectetur tempore unde!</p>
    <hr>
    <h4 class="styleguide__title">
      Hamburger
    </h4>
    <div class="row">
      <div class="col">
        <v-hamburger></v-hamburger>
      </div>
      <div class="col"></div>
    </div>
    <h4 class="styleguide__title">
      Icons
    </h4>
    <div class="row">
      <div class="col">
        <v-icon name="close"></v-icon>
      </div>
    </div>
    <h4 class="styleguide__title">
      Form
    </h4>
    <div class="row">
      <div class="col">
        <v-input
          v-model="value"
          label="Name"
          placeholder="Type your name"
          name="name"
        ></v-input>
      </div>
      <div class="col">
        <div class="row">
          <div class="col">
            <v-checkbox
              v-model="checkbox"
              name="checkbox"
              value="checkbox-a"
            ></v-checkbox>
          </div>
          <div class="col">
            <v-checkbox
              v-model="checkbox"
              label="Check this custom checkbox"
              name="checkbox"
              value="checkbox-b"
            ></v-checkbox>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <v-radio
              v-model="radio"
              label="Check this custom radio"
              name="radio"
              value="radio-a"
            ></v-radio>
          </div>
          <div class="col">
            <v-radio
              v-model="radio"
              label="Check this custom radio"
              name="radio"
              value="radio-b"
            ></v-radio>
          </div>
        </div>
        <!--<input v-model="checked" type="radio">-->
      </div>
    </div>
    <h4 class="styleguide__title">
      Buttons
    </h4>
    <div class="row">
      <div class="col">
        <v-button
          variant="primary"
          size="small"
          type="submit"
        >
          Primary small
        </v-button>
        <v-button
          class="parent__button"
          variant="primary"
          href="#"
          :loading="buttonLoading"
        >
          <v-icon name="house" left></v-icon>
          Primary normal
        </v-button>
        <v-checkbox v-model="buttonLoading" aria-label="Toggle button loading"></v-checkbox>
        <v-button
          variant="primary"
          size="large"
          type="reset"
          disabled
        >
          Primary large
          <v-icon name="house" right></v-icon>
        </v-button>
      </div>
    </div>
    <div class="row">
      <div v-if="showSlider" class="col">
        <h4 class="styleguide__title">
          Swiper
        </h4>
        <v-swiper v-model="slideIndex" navigation pagination>
          <v-swiper-slide v-for="n in 6" :key="n">
            <div class="styleguide__slide" v-text="n"></div>
          </v-swiper-slide>
        </v-swiper>
      </div>
      <div class="col">
        <h4 v-collapse.collapse class="styleguide__title">
          Collapse
        </h4>
        <v-collapse id="collapse" visible>
          <div class="styleguide__slide">
            <v-spinner :size="70" :width="2"></v-spinner>
          </div>
        </v-collapse>
      </div>
    </div>
    <h4 class="styleguide__title">
      Data
    </h4>
    <div class="row">
      <div class="col">
        <pre>{{ $data }}</pre>
      </div>
    </div>
    <v-to-top></v-to-top>
  </div>
</template>

<script>
export default {
  name: 'Styleguide',
  data () {
    return {
      slideIndex: 2,
      value: 'default',
      checkbox: ['checkbox-b'],
      radio: 'radio-a',
      checked: null,
      showSlider: true,
      showModal: true,
      buttonLoading: true
    }
  },
  methods: {
    async onEvent (e) {
      console.log(this.event?.())
    },
    onStart () {
      console.log('start', Date.now())
      this.$refs.modal.checkModalOverflow()
      this._timer = setInterval(() => {
        console.log('process', Date.now())
        this.$refs.modal.checkModalOverflow()
      })
    },
    onEnd () {
      console.log('end', Date.now())
      this.$refs.modal.checkModalOverflow()
      clearTimeout(this._timer)
    }
  }
}
</script>

<style lang="scss">
.row {
  display: flex;
  margin: 0 ($grid-gutter / -2);
}
.col {
  flex: 1 1 0%;
  min-width: 0;
  padding: 0 ($grid-gutter / 2);
}
.styleguide {
  padding-top: 50px;
  padding-bottom: 50px;

  &__title {
    margin-top: 40px;
    margin-bottom: 20px;
  }

  &__slide {
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    /*box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);*/
    /*margin: 5px;*/
    background-color: #eeeeee;
  }

  h1 {
    @include linear(font-size, 32px, 70px, 320px, 1200px);
    //padding: linear(10px 15px 17px 20px, 40px 60px 68px 80px, 320px, 1200px);
  }
}
</style>
