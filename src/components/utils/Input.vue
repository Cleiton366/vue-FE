<template>
  <div class="input-container">
    <label>{{ label }}</label>
    <InputText 
      class="input" 
      type="text" 
      v-model="value"
      :aria-label="ariaLabel" 
      :placeholder="placeHolder" 
      @input="updateValue($event)"
    />
  </div>
</template>

<script>
import InputText from 'primevue/inputtext';

export default {
  name: 'Input',
  components: { InputText },
  emits: ['update:value'],
  props: {
    label: {
      type: String
    },
    placeHolder: {
      type: String
    },
    ariaLabel: {
      type: String
    }
  },
  data()  {
    return{
      value: ''
    }
  },
  methods: {
    updateValue(event) {
      this.$emit('update:value', event.target.value)
    }
  }
}
</script>