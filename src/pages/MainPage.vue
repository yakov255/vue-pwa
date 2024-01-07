<template>
  <div class="card">
    <h5>Добавить запись</h5>
    <div class="field">
      <label for="value-min">Нижнее давление</label>
      <InputNumber id="value-min" v-model="amount" inputClass="number-input" showButtons buttonLayout="horizontal"
                   min="5" max="500" :step="5"
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
      <InputNumber v-model="amount" inputClass="number-input" showButtons buttonLayout="horizontal" min="5" max="500"
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
      <InputNumber v-model="amount" inputClass="number-input" showButtons buttonLayout="horizontal" min="5" max="500"
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
  </div>

  <Button class="button is-fullwidth is-medium is-primary" @click="inputModalActive = true">Record a drink
  </Button>
  <Dialog v-model:visible="inputModalActive">
    <div class="card">
      <div class="card-content">
        <div class="content">
          <div class="field">
            <label class="label">Time</label>
            <div class="control">
              <Calendar showTime showButtonBar hourFormat="24" v-model="time"></Calendar>
            </div>
          </div>
          <div class="field">
            <label class="label">Amount of caffeine in miligrams</label>
            <div class="control">
              <InputNumber v-model="amount" showButtons buttonLayout="horizontal" min="5" max="500" :step="5"
                           decrementButtonClass="p-button-danger" incrementButtonClass="p-button-success">
                <template #incrementbuttonicon>
                  <span class="pi pi-plus"/>
                </template>
                <template #decrementbuttonicon>
                  <span class="pi pi-minus"/>
                </template>
              </InputNumber>

            </div>
          </div>
          <div class="field">
            <div class="control">
              <Button :disabled="amount ? null : true" @click="saveIngestion">Save</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Dialog>
</template>

<script>
export default {
  name: "app",
  data: () => {
    return {
      lastKnownAmount: null,
      lastKnownAmountTime: null,
      inputModalActive: false,
      time: new Date(),
      amount: 5
    };
  },
  methods: {
    amountAtUnixtime: function (date) {
      if (typeof date != "number") {
        throw "Date passed to amountAtUnixtime MUST BE number"
      }
      const halfLife = 18000000; // all durations are in ms // 5 hours approx
      var res =
          this.lastKnownAmount *
          Math.pow(0.5, (date - this.lastKnownAmountTime) / halfLife);
      return res;
    },
    amountAtHoursOfDay: function (hoursOfDay) {
      var curr = new Date();
      if (curr.getHours() > hoursOfDay) {
        return Math.round(
            this.amountAtUnixtime(
                new Date(
                    curr.getFullYear(),
                    curr.getMonth(),
                    curr.getDate() + 1,
                    hoursOfDay
                ).valueOf()
            )
        );
      } else {
        return Math.round(
            this.amountAtUnixtime(
                new Date(
                    curr.getFullYear(),
                    curr.getMonth(),
                    curr.getDate(),
                    hoursOfDay
                ).valueOf()
            )
        );
      }
    },
    computeLastKnown: function () {
      this.lastKnownAmount = null
      this.lastKnownAmountTime = null
      if (window.localStorage.getItem("ingestions") != null) {
        var ingestions = JSON.parse(window.localStorage.getItem("ingestions"))
        for (var i = 0; i < ingestions.length; i++) {
          if (this.lastKnownAmountTime != null) {
            this.lastKnownAmount = this.amountAtUnixtime(new Date(ingestions[i].t).valueOf()) + ingestions[i].v
          } else {
            this.lastKnownAmount = ingestions[i].v
          }
          this.lastKnownAmountTime = new Date(ingestions[i].t)
        }
      }
    },
    saveIngestion: function () {
      var ingestionsJson = window.localStorage.getItem("ingestions")
      var ingestions
      if (ingestionsJson == null) {
        ingestions = []
      } else {
        ingestions = JSON.parse(ingestionsJson)
      }
      ingestions.push({t: this.time, v: this.amount})
      window.localStorage.setItem("ingestions", JSON.stringify(ingestions))
      this.computeLastKnown()
      this.inputModalActive = false
      this.amount = 5
    }
  },
  computed: {
    currentAmount: function () {
      return this.amountAtUnixtime(new Date().valueOf())
    }
  },
  mounted() {
    this.computeLastKnown()
  }
};
</script>

<style lang="scss">

.card {
  background: var(--surface-card);
  border: 1px solid var(--surface-border);
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: var(--card-shadow);
  border-radius: $borderRadius;

  &:last-child {
    margin-bottom: 0;
  }
}

.number-input {
  width: 100%;
  text-align: center;
}

.field {
  margin-bottom: 1rem;
}

.field > label {
  display: inline-block;
  margin-bottom: 0.5rem;
}
</style>