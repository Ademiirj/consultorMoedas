<template>
  <div id="app">
    <form class="form-text">
      <div class="testando col-sm-10">
        <input type="text" readonly class="ademir form-control-plaintext" v-model="labelCurrency" />
      </div>
    </form>

    <!-- <line-chart /> -->
    <div class="small">
      <line-chart :chart-data="datacollection"></line-chart>
    </div>
  </div>
</template>

<script>
import Search from "../services/timeseries";
import LineChart from "./LineChart.vue";

export default {
  name: "Graph",
  components: {
    LineChart,
  },
  props: ["currency"],
  data() {
    return {
      dates: ["0"],
      value: [0],
      textResult: "Visualizando grafico da moeda: ",
      labelCurrency: "",
      startFormatedDate: "",
      endFormatedDate: "",

      datacollection: null,
    };
  },
  methods: {
    refreshGraph() {
      let valor = 0;
      this.value = [];

      Search.currencyHistory(
        this.startFormatedDate,
        this.endFormatedDate,
        this.currency
      )
        .then((response) => {
          this.dates = Object.keys(response.data.rates);

          for (let i = 0; i < this.dates.length; i++) {
            if (response.data.rates[this.dates[i]][this.currency] > 0) {
              valor = (
                1 / response.data.rates[this.dates[i]][this.currency]
              ).toFixed(2);
              this.value.splice(i, 1, valor);
            }
            this.value = this.value.map((item) => Number(item));
          }

          this.fillData();
        })
        .catch(console.log());
    },

    fillData() {
      this.datacollection = {
        labels: this.dates,
        datasets: [
          {
            label: this.currency + " fluctuation",
            backgroundColor: "#c03a2bc7",
            data: this.value,
          },
        ],
      };
    },
  },
  watch: {
    currency() {
      this.refreshGraph();
      this.labelCurrency = this.textResult + this.currency;
    },
  },
  mounted() {
    this.labelCurrency = "Escolha uma moeda para visualizar seu grafico";
    let date = new Date();

    let day = date.getDate().toString().padStart(2, "0");
    let month = (date.getMonth() + 1).toString().padStart(2, "0");
    let year = date.getFullYear();

    this.startFormatedDate = year + "-" + month + "-" + day;

    date.setDate(date.getDate() - 30);

    day = date.getDate().toString().padStart(2, "0");
    month = (date.getMonth() + 1).toString().padStart(2, "0");
    year = date.getFullYear();

    this.endFormatedDate = year + "-" + month + "-" + day;
  },
};
</script>

<style scoped>
.small {
  width: 420px;
  margin: auto;
}
.ademir{
  color: #962d22;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  padding: 2px;
}
.testando{
  display: inline;
  text-align: center;
}
</style>