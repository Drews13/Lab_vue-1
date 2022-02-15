<template>
  <div class="product-details-component">
    <div class="field">
      <h2>Image</h2>
      <InputComponent type="file" :text="image" accept="image/*" @update="onImageChanged"/>
    </div>
    <div class="field">
      <h2>Name</h2>
      <InputComponent type="text" :text="name" @update="onNameChanged"/>
    </div>
    <div class="field">
      <h2>Short Description</h2>
      <InputComponent type="text" :text="shortDesc" @update="onShortDescChanged"/>
    </div>
    <div class="field">
      <h2>Detailed Description</h2>
      <InputComponent type="text" :text="detailedDesc" @update="onDetailedDescChanged"/>
    </div>
    <div class="field">
      <h2>Publisher</h2>
      <InputComponent type="text" :text="publisher" @update="onPublisherChanged"/>
    </div>
    <div class="field">
      <h2>Edition</h2>
      <InputComponent type="text" :text="edition" @update="onEditionChanged"/>
    </div>
    <div class="field">
      <h2>Release Date</h2>
      <InputComponent type="text" :text="release" :mask="dateMask" @update="onReleaseChanged"/>
    </div>
    <div class="field">
      <h2>Announcement Date</h2>
      <InputComponent type="text" :text="announce" :mask="dateMask" @update="onAnnounceChanged"/>
    </div>
    <div class="field">
      <h2>Tags</h2>
      <InputComponent type="text" :text="tags" @update="onTagsChanged"/>
    </div>
    <div class="field">
      <h2>System Requirements</h2>
      <InputComponent type="text" :text="requirements" @update="onRequirementsChanged"/>
    </div>
    <div class="field">
      <h2>Genre</h2>
      <InputComponent type="text" :text="genre" @update="onGenreChanged"/>
    </div>
    <div class="field">
      <h2>Rating</h2>
      <InputComponent type="text" :text="rating" :mask="ratingMask" @update="onRatingChanged"/>
    </div>
    <div class="field">
      <h2>Price</h2>
      <InputComponent type="text" :text="price" @update="onPriceChanged"/>
    </div>
    <button type="button" class="product-details__submit" @click="submit">Submit</button>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import InputComponent from '@/components/InputComponent.vue';
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
          this.image = data.image; 
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
    return this.image.slice(this.image.lastIndexOf('\\') + 1);
  }

  onImageChanged(value: string) {
    this.image = value;
  }

  onNameChanged(value: string) {
    this.name = value;
  }

  onShortDescChanged(value: string) {
    this.shortDesc = value;
  }

  onDetailedDescChanged(value: string) {
    this.detailedDesc = value;
  }

  onPublisherChanged(value: string) {
    this.publisher = value;
  }

  onEditionChanged(value: string) {
    this.edition = value;
  }

  onReleaseChanged(value: string) {
    this.release = value;
  }

  onAnnounceChanged(value: string) {
    this.announce = value;
  }

  onTagsChanged(value: string) {
    this.tags = value;
  }

  onRequirementsChanged(value: string) {
    this.requirements = value;
  }

  onRatingChanged(value: string) {
    this.rating = value;
  }

  onGenreChanged(value: string) {
    this.genre = value;
  }

  onPriceChanged(value: string) {
    this.price = value;
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
    if (!this.image) {
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
