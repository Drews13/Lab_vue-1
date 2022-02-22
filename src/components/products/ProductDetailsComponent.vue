<template>
  <div class="product-details-component">
    <div class="field">
      <h2>Image</h2>
      <InputComponent type="file" accept="image/*" v-model="image"/>
    </div>
    <div class="field">
      <h2>Name</h2>
      <InputComponent type="text" v-model="name"/>
    </div>
    <div class="field">
      <h2>Short Description</h2>
      <InputComponent type="text" v-model="shortDesc"/>
    </div>
    <div class="field">
      <h2>Detailed Description</h2>
      <InputComponent type="text" v-model="detailedDesc"/>
    </div>
    <div class="field">
      <h2>Publisher</h2>
      <InputComponent type="text" v-model="publisher"/>
    </div>
    <div class="field">
      <h2>Edition</h2>
      <InputComponent type="text" v-model="edition"/>
    </div>
    <div class="field">
      <h2>Release Date</h2>
      <InputComponent type="text" :mask="dateMask" v-model="release"/>
    </div>
    <div class="field">
      <h2>Announcement Date</h2>
      <InputComponent type="text" :mask="dateMask" v-model="announce"/>
    </div>
    <div class="field">
      <h2>Tags</h2>
      <InputComponent type="text" v-model="tags"/>
    </div>
    <div class="field">
      <h2>System Requirements</h2>
      <InputComponent type="text" v-model="requirements"/>
    </div>
    <div class="field">
      <h2>Genre</h2>
      <InputComponent type="text" v-model="genre"/>
    </div>
    <div class="field">
      <h2>Rating</h2>
      <InputComponent type="text" :mask="ratingMask" v-model="rating"/>
    </div>
    <div class="field">
      <h2>Price</h2>
      <InputComponent type="text" v-model="price"/>
    </div>
    <button type="button" class="product-details-component__submit" @click="submit">Submit</button>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import InputComponent from '@/components/ui/InputComponent.vue';
import TextConstants from '@/constants/TextConstants';
import Constants from '@/constants/Constants';
import Validation from '@/utils/Validation';

@Options({
  components: {
    InputComponent
  },
  props: {
    id: {
      type: String,
      default: ''
    }
  }
})
export default class ProductDetailsComponent extends Vue {
  id?: string;
  image = '';
  oldImage = '';
  name = '';
  shortDesc = '';
  detailedDesc = '';
  publisher = '';
  edition = '';
  release = '';
  announce = '';
  tags = '';
  requirements = '';
  rating = '';
  genre = '';
  price = '';
  creationDate = '';
  showAlert = false;
  error = false;
  alertMessage = '';
  dateMask = TextConstants.dateMask;
  ratingMask = TextConstants.ratingMask;

  async mounted() {
    if (this.id) {
      await fetch(`${TextConstants.connectionStr}/products/${this.id}`)
        .then((res) => res.json())
        .then((data) => { 
          this.oldImage = data.image;
          this.name = data.name;
          this.shortDesc = data.shortDescription;
          this.detailedDesc = data.detailedDescription;
          this.publisher = data.publisher;
          this.edition = data.edition;
          this.release = data.releaseDate;
          this.announce = data.announcementDate;
          this.tags = data.tags;
          this.requirements = data.systemRequirements;
          this.rating = data.rating.toString();
          this.genre = data.genre;
          this.price = data.price.toString();
          this.creationDate = data.creationDate;
        })
        .catch((err) => console.log(err.message));
    }
  }

  get imageStr() {
    return this.image ? this.image.slice(this.image.lastIndexOf('\\') + 1) : this.oldImage.slice(this.image.lastIndexOf('\\') + 1);
  }

  async submit() {
    if (!this.checkForm()) {
      this.$emit('alert', true, this.alertMessage, null);
      return false;
    }
    const product = {
      categoryId: Constants.defaultCartCategory,
      name: this.name,
      shortDescription: this.shortDesc,
      detailedDescription: this.detailedDesc,
      publisher: this.publisher,
      edition: this.edition,
      releaseDate: this.release,
      announcementDate: this.announce,
      tags: this.tags,
      systemRequirements: this.requirements,
      image: this.imageStr,
      rating: Number(this.rating),
      genre: this.genre,
      price: Number(this.price),
      creationDate: this.creationDate,
      quantity: Constants.defaultCartQuantity
    }

    this.$emit('alert', false, this.alertMessage, product);
    return true;
  }

  checkForm() {
    if (!this.imageStr) {
      this.alertMessage = TextConstants.noImgMsg;
      return false;
    }

    if (!this.name) {
      this.alertMessage = TextConstants.wrongNameMsg;
      return false;
    }

    if (!this.shortDesc) {
      this.alertMessage = TextConstants.wrongShortDescMsg;
      return false;
    }

    if (!this.detailedDesc) {
      this.alertMessage = TextConstants.wrongDescMsg;
      return false;
    }

    if (!this.publisher) {
      this.alertMessage = TextConstants.wrongPublisherMsg;
      return false;
    }

    if (!this.edition) {
      this.alertMessage = TextConstants.wrongEditionMsg;
      return false;
    }

    if (!Validation.checkDate(this.release)) {
      this.alertMessage = TextConstants.wrongReleaseDateMsg;
      return false;
    }

    if (!Validation.checkDate(this.announce)) {
      this.alertMessage = TextConstants.wrongAnnoucementDateMsg;
      return false;
    }

    if (!this.requirements) {
      this.alertMessage = TextConstants.wrongRequirementsMsg;
      return false;
    }

    if (!this.genre) {
      this.alertMessage = TextConstants.wrongGenreMsg;
      return false;
    }

    if (!Validation.checkRating(this.rating)) {
      this.alertMessage = TextConstants.wrongRatingMsg;
      return false;
    }

    if (!Validation.checkPrice(this.price)) {
      this.alertMessage = TextConstants.wrongPriceMsg;
      return false;
    }

    this.alertMessage = TextConstants.successMsg;
    return true;
  }
}
</script>

<style lang="scss">
  .product-details-component {
    border-radius: 15px;
    padding: 10px 10px 100px 10px;
    margin-bottom: 20px;
    background: $color-black;

    &__submit {
      padding: 13px;
      margin: 40px 18.5%;
      line-height: 24px;
      color: $color-white;
      background-color: $color-green;
      border: none;
      width: 63%;
    }
  }

  .field {
    color: $color-white;
    width: 100%;
    padding: 0;
    margin-bottom: 30px;
  }
</style>
