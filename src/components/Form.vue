<template>
  <div class="form-container">
    <form class="form">
      <Notification  v-show="msg" :msg="msg"/>
      <h1 aria-label="Make your burger form" tabindex="0">Make your burger:</h1>
      <Input 
        ariaLabel="Name Input" 
        label="Your name"
        placeHolder="Type your name" 
        v-model:value="name"
      />
      <DDropdown 
        ariaLabel="Select bread type Dropdown"
        label="Select your bread:" 
        placeHolder="Select bread type" 
        v-model:value="bread"
        :options="breads"
      />
      <DDropdown 
        ariaLabel="Select meat type Dropdown"
        label="Select your meat:" 
        placeHolder="Select meat type" 
        v-model:value="meat"
        :options="meats"
      />
      <div class="checkbox-container">
        <label for="name" id="title">Select toppings:</label>
        <div 
          v-for="topping in toppings"
          class="checkbox"
          :key="topping.id"
        > 
          <Checkbox 
            v-model="selectedToppings" 
            :value="topping.type"
            :aria-label="setCheckBoxAriaLabel(topping)"
            @keydown.enter="handleCheckBoxClick($event)"
            @click="handleCheckBoxClick($event)"
          />
          <label>{{ topping.type }}</label>
        </div>
      </div>

      <Button 
        class="button" 
        label="Request Burger" 
        tabindex="0" 
        @click="submitBurger($event)"
      />
    </form>
  </div>
</template>

<script>

import { getRequestIngredients } from '@/services/IngredientsService';
import { postRequestBurger } from '@/services/BurgerService';

import Notification from '@/components/Notification.vue';
import Input from './utils/Input.vue';
import DDropdown from './utils/DDropdown.vue';
import Button from 'primevue/button';
import Checkbox from 'primevue/checkbox';

export default {
  name: 'Form',
  components: {
    Notification,
    Input,
    DDropdown,
    Button,
    Checkbox
  },
  data() {
    return {
      bread: '',
      breads: [],
      meat: '',
      meats: [],
      msg: '',
      name: '',
      selectedToppings: [],
      status: 'Requested',
      toppings: []
    }
  },
  async created() {
    await this.getIngredients();
  },
  methods: {
    setCheckBoxAriaLabel(topping) {
      return `Select ${topping.type} as topping?`;
    },
    notification (msg) {
      this.msg =  msg;
      setTimeout(() => this.msg = '', 5000);
    },
    handleCheckBoxClick(event) {
      event.preventDefault();
      let topping = this.selectedToppings.find(topping => topping === event.target.value);
      if(topping) {
        let index = this.selectedToppings.findIndex(topping => topping === event.target.value);
        this.selectedToppings.splice(index, 1);
      } else this.selectedToppings.push(event.target.value);
    },
    async getIngredients() {
      try {
        const { data } = await getRequestIngredients();
        this.breads = data.breads;
        this.meats = data.meats;
        this.toppings = data.toppings;
      } catch (error) {
        this.notification(`Error while fetching Ingredients`);
      }
    },
    async submitBurger(event) {
      event.preventDefault();
      try {
        const burger = {
          name: this.name,
          meat: this.meat,
          bread: this.bread,
          toppings: this.selectedToppings,
          status: 'Solicitado'
        }

        postRequestBurger(burger);

        this.name = '';
        this.meat = '';
        this.bread = '';
        this.selectedToppings = [];

        this.notification(`Burger requested.`);
      } catch (error) {
        this.notification(`Error. Burger request not made.`);
      }
    }
  }
}
</script>