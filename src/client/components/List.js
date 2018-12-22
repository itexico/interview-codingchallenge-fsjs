import Vue from 'vue';

export default Vue.component('list', {
  props: ['list', 'isActive'],
  template: `
    <li :class="{ 'is-active' : isActive }" @click="selectList"><a>{{ list.type }}</a></li>
  `,
  methods: {
    selectList() {
      this.$emit('list-selected', this.list._id);
    }
  }
});
