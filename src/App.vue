<template>
  <section class="section">
    <div class="container content">
      <h1 class="title is-2">Caffeine tracker</h1>
      <nav class="level" v-if="lastKnownAmount != null">
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Current level</p>
            <p class="title">{{Math.round(amountAtUnixtime(Date.now()))}} mg</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">In three hours</p>
            <p class="title">{{ Math.round(amountAtUnixtime(Date.now() + 3*3600000) )}} mg</p>
          </div>
        </div>
        <div v-if="(new Date()).getHours() < 20.5" class="level-item has-text-centered">
          <div>
            <p class="heading">At 23:00</p>
            <p class="title" v-bind:class="{ insignificant: (amountAtHoursOfDay(23) < 20)}">{{ amountAtHoursOfDay(23) }} mg</p>
          </div>
        </div>
        <div v-if="((new Date()).getHours() > 19) && amountAtHoursOfDay(7) > 5" class="level-item has-text-centered">
          <div>
            <p class="heading">At 7:00</p>
            <p class="title">{{ amountAtHoursOfDay(7) }} mg</p>
          </div>
        </div>
      </nav>
      <Button class="button is-fullwidth is-medium is-primary" @click="inputModalActive = true">Record a drink</Button>
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
                  <InputNumber v-model="amount" showButtons buttonLayout="horizontal" min="5" max="500" :step="5" decrementButtonClass="p-button-danger" incrementButtonClass="p-button-success">
                    <template #incrementbuttonicon>
                      <span class="pi pi-plus" />
                    </template>
                    <template #decrementbuttonicon>
                      <span class="pi pi-minus" />
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
      <br>
      <article v-if="currentAmount > 400" class="is-danger message">
        <div class="message-header">
          <p>You overdid it.</p>
        </div>
        <div class="message-body">
          Doses higher than 400 mg cause overdose symptoms like nausea, vomiting, jitters, restlessness and nervousness. Your sleep will be severely impaired.
        </div>
      </article>
      <hr>
      <p>
        <a href="https://github.com/tensojka/caffeine-tracker">source code</a>
      </p>
    </div>
  </section>
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
    amountAtUnixtime: function(date) {
      if(typeof date != "number"){
        throw "Date passed to amountAtUnixtime MUST BE number"
      }
      const halfLife = 18000000; // all durations are in ms // 5 hours approx
      var res =
          this.lastKnownAmount *
          Math.pow(0.5, (date - this.lastKnownAmountTime) / halfLife);
      return res;
    },
    amountAtHoursOfDay: function(hoursOfDay) {
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
    computeLastKnown: function(){
      this.lastKnownAmount = null
      this.lastKnownAmountTime = null
      if(window.localStorage.getItem("ingestions") != null){
        var ingestions = JSON.parse(window.localStorage.getItem("ingestions"))
        for (var i = 0; i < ingestions.length; i++) {
          if(this.lastKnownAmountTime != null){
            this.lastKnownAmount = this.amountAtUnixtime(new Date(ingestions[i].t).valueOf()) + ingestions[i].v
          }else{
            this.lastKnownAmount = ingestions[i].v
          }
          this.lastKnownAmountTime = new Date(ingestions[i].t)
        }
      }
    },
    saveIngestion: function(){
      var ingestionsJson = window.localStorage.getItem("ingestions")
      var ingestions
      if (ingestionsJson == null){
        ingestions = []
      }else{
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
    currentAmount: function(){
      return this.amountAtUnixtime(new Date().valueOf())
    }
  },
  mounted(){
    this.computeLastKnown()
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
.insignificant {
  color: hsl(0, 0%, 71%);
}
</style>
