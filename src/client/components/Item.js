import Vue from 'vue';

export default Vue.component('Item', {
  data() {
    return {
      name: ''
    };
  },
  props: ['item'],
  template: `
  <div class="content">
   <h2>{{ item.name }} </h2>
   <div class="field is-grouped">
     <p class="control">
       <input class="input" type="text" placeholder="Text input" v-model="name">
     </p>
     <p class="control">
       <a class="button" @click="edit">Update</a>
     </p>
     <p class="control">
       <a class="button is-danger" @click="deleteItem">
         Delete
       </a>
     </p>
   </div>
   </div>
  `,
  methods: {
    edit() {
      const item = {
        name: this.name,
        list: this.item.list,
        _id: this.item._id
      };
      this.$emit('edit-item', item);
      this.name = '';
    },
    deleteItem() {
      this.$emit('delete-item', this.item);
    }
  }
});
