<template>
  <div class="card">
    <h5>Добавить запись</h5>
    <div class="fields">
      <div class="field">
        <label for="value-min">Нижнее давление</label>
        <InputNumber id="value-min" v-model="minValue" inputClass="number-input" showButtons buttonLayout="horizontal"
                     min=5 max=500 :step=5
                     decrementButtonClass="p-button-danger" incrementButtonClass="p-button-success">
          <template #incrementbuttonicon>
            <span class="pi pi-plus"/>
          </template>
          <template #decrementbuttonicon>
            <span class="pi pi-minus"/>
          </template>
        </InputNumber>
      </div>

      <div class="field">
        <label for="value-max">Верхнее давление</label>
        <InputNumber id="value-max" v-model="maxValue" inputClass="number-input" showButtons buttonLayout="horizontal"
                     min=5 max=500
                     :step="5"
                     decrementButtonClass="p-button-danger" incrementButtonClass="p-button-success">
          <template #incrementbuttonicon>
            <span class="pi pi-plus"/>
          </template>
          <template #decrementbuttonicon>
            <span class="pi pi-minus"/>
          </template>
        </InputNumber>
      </div>


      <div class="field">
        <label for="pulse">Пульс</label>
        <InputNumber id="pulse" v-model="pulse" inputClass="number-input" showButtons buttonLayout="horizontal" min=5
                     max=180
                     decrementButtonClass="p-button-danger" incrementButtonClass="p-button-success">
          <template #incrementbuttonicon>
            <span class="pi pi-plus"/>
          </template>
          <template #decrementbuttonicon>
            <span class="pi pi-minus"/>
          </template>
        </InputNumber>
      </div>

      <div class="field">
        <label for="datetime">Дата и время</label>
        <Calendar @update:model-value="testDate" id="datetime" input-class="calendar-input" touchUI showTime
                  showButtonBar hourFormat="24" v-model="dateTime"></Calendar>
      </div>
    </div>

    <div class="button-wrapper">
      <Button @click="save">Save</Button>
    </div>


  </div>

  <div class="card">




  </div>

</template>

<script>

import {ref} from 'vue'
import moment from "moment";

export default {
  setup() {

    const eventsFromStorage = JSON.parse(window.localStorage.getItem("events") || "[]")

    const startDate = moment().format('MM/DD/YYYY H:mm');

    const minValue = ref(130)
    const maxValue = ref(80)
    const pulse = ref(70)
    const dateTime = ref(startDate)
    const events = ref(eventsFromStorage);

    const save = function () {
      const event = {
        minValue: minValue.value,
        maxValue: maxValue.value,
        pulse: pulse.value,
        dateTime: (new Date(dateTime.value)).toISOString()
      }
      events.value.push(event)

      window.localStorage.setItem("events", JSON.stringify(events.value))
    }

    return {
      minValue,
      maxValue,
      pulse,
      dateTime,
      save
    }
  },
}
</script>

<style lang="scss">

.card {
  background: var(--surface-card);
  border: 1px solid var(--surface-border);
  padding: 1rem;
  margin-bottom: 2rem;
  box-shadow: var(--card-shadow);
  border-radius: $borderRadius;

  &:last-child {
    margin-bottom: 0;
  }
}

.number-input {
  width: 4rem;
  text-align: center;
}

.calendar-input {
  width: 10rem
}

.field {
  margin-bottom: 1rem;
}

.field > label {
  display: block;
  margin-bottom: 0.5rem;
}

.fields {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.button-wrapper {
  padding-top: 1rem;
  text-align: center;
}
</style>