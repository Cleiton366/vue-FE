<template>
  <div class="input-container">
    <label>{{ label }}</label>
    <Dropdown 
      class="dropdown" 
      v-model="selectedOption" 
      :aria-label="ariaLabel"
      :options="options" 
      :tabindex="0"
      :placeholder="placeHolder"
      @update:model-value="updateValue()"
    />
  </div>
</template>

<script>
import Dropdown from 'primevue/dropdown';

export default {
  name: 'DDropdown',
  components: { Dropdown },
  emits: ['update:value'],
  props: {
    ariaLabel: {
      type: String
    },
    label: {
      type: String
    },
    options: {
      type: Array
    },
    placeHolder: {
      type: String
    }
  },
  data()  {
    return{
      selectedOption: ''
    }
  },
  methods: {
    updateValue() {
      this.$emit('update:value', this.selectedOption)
    }
  }
}
</script>