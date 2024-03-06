<template>
  <div class="burger-table-container" v-if="burgers.length > 0">
    <Notification  v-show="msg" :msg="msg"/>
    <h1 aria-label="Manager requests table" tabindex="0">Manager Requests:</h1>
    <DataTable :value="burgers" tableStyle="min-width: 50rem">
      <Column header="ID">
        <template #body="slotProps">
          <span :aria-label='`Id Column Content: ${slotProps.data.id}.`'>{{ slotProps.data.id }}</span>
        </template>
      </Column>
      <Column header="Client">
        <template #body="slotProps">
          <span :aria-label='`Client Column Content: ${slotProps.data.name}.`'>{{ slotProps.data.name }}</span>
        </template>
      </Column>
      <Column header="Bread">
        <template #body="slotProps">
          <span :aria-label='`Bread Column Content: ${slotProps.data.bread}.`'>{{ slotProps.data.bread }}</span>
        </template>
      </Column>
      <Column header="Meat">
        <template #body="slotProps">
          <span :aria-label='`Meat Column Content: ${slotProps.data.meat}.`'>{{ slotProps.data.meat }}</span>
        </template>
      </Column>
      <Column header="Toppings">
        <template #body="slotProps">
          <ul 
            v-for="(topping, index) in slotProps.data.toppings" 
            :aria-label="formatToppingsColumnAriaLabel(slotProps.data.toppings)"
            :key="index"
          >
            <li>{{ topping }}</li>
          </ul>
        </template>
      </Column>
      <Column header="Actions">
        <template #body="slotProps">
          <Button 
            class="delete-btn" 
            label="Cancel" 
            :aria-label="`Cancel Request ${slotProps.data.id}?`"
            @click="deleteBurger(slotProps.data.id)"
          />
          <select 
            aria-label="Request Status Dropdown."
            class="status" 
            name="status" 
            @change="updateBurger($event, slotProps.data.id)"
          >
            <option 
              v-for="s in status" 
              :key="s.id" 
              :selected="slotProps.data.status == s.type"
              :value="s.type" 
            >
              {{ s.type }}
            </option>
          </select>
        </template>
      </Column>
    </DataTable>
  </div>
  <div class="empty-table" v-else>
    <h2 aria-label="Manager requests table empty" tabindex="0">No burgers request yet.</h2>
  </div>
</template>

<script>

import { getRequestBurgers, updateRequestBurger, deleteRequestBurger } from '@/services/BurgerService';
import { getRequestStatus } from '@/services/StatusService'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Row from 'primevue/row';
import Notification from './Notification.vue';

export default {
  name: "RequestsTable",
  components: {
    Button,
    Column,
    DataTable,
    Notification,
    Row
  },
  data() {
    return {
      burgers: [],
      msg: '',
      status: [],
    }
  },
  async created() {
    await this.getBurgers();
    await this.getStatus();
  },
  methods: {
    notification (msg) {
      this.msg =  msg;
      setTimeout(() => this.msg = '', 5000);
    },
    formatToppingsColumnAriaLabel(toppings) {
      return 'Toppings Column Content: ' + toppings.toString();
    },
    async getBurgers() {
      try {
        const { data } = await getRequestBurgers();
        this.burgers = data;
      } catch (error) {
        this.notification('Error while fetching Burgers Requests');
      }
    },
    async getStatus() {
      try {
        const { data } = await getRequestStatus();
        this.status = data;
      } catch (error) {
        this.notification('Error while fetching Requests Status');
      }
    },
    async deleteBurger(id) {
      try {
        await deleteRequestBurger(id);
        await this.getBurgers();
      } catch (error) {
        this.notification('Error while deleting Burger Request');
      }
    },
    async updateBurger(event, id) {
      try {
        const option = event.target.value;
        await updateRequestBurger(id, option);
      } catch (error) {
        this.notification('Error while updating Burger Status');
      }
    }
  }
}
</script>