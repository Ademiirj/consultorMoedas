<template>
  <div id="app">
    <div class="row">
      <div class="title-main">
        <h1 class="title">Consultor de moedas</h1>
        <div class="title-image">
          <img class="blink-me" src="./assets/coin.png" alt srcset />
        </div>
      </div>
    </div>
    <form class="form-select">
      <div class="div-select form-group col-md-4">
        <select @change="getValue($event)" v-model="item">
          <option
            value
            disabled
            selected
          >Escolha uma moeda</option>
          <option
            v-for="symbol in symbols"
            :key="symbol.code"
            :value="symbol.code"
          >{{ symbol.description }} ({{ symbol.code }})</option>
        </select>
        <div class="select-icon">
          <svg
            focusable="false"
            width="30"
            height="45"
            viewBox="0 0 16 16"
            class="icon bi bi-cash"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M15 4H1v8h14V4zM1 3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H1z"
            />
            <path
              d="M13 4a2 2 0 0 0 2 2V4h-2zM3 4a2 2 0 0 1-2 2V4h2zm10 8a2 2 0 0 1 2-2v2h-2zM3 12a2 2 0 0 0-2-2v2h2zm7-4a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"
            />
          </svg>
        </div>
      </div>
    </form>
    <GraphCurrency v-bind:currency="item" />
  </div>
</template>

<script>
import Symbols from "./services/symbols";
import GraphCurrency from "./components/GraphCurrency.vue";

export default {
  name: "App",
  components: {
    GraphCurrency,
  },
  data() {
    return {
      symbols: [],
      item: "",
    };
  },
  methods: {
    getValue() {},
  },
  mounted() {
    Symbols.searchSymbols().then((response) => {
      this.symbols = response.data.symbols;
    });
  },
};
</script>

<style scoped>
@import url("https://use.fontawesome.com/releases/v5.8.1/css/all.css");
#app {
  margin-top: 50px;
  text-align: center;
  overflow: hidden;
}
#app h1 {
  color: #962d22;
  font-family: "Courier New", Courier, monospace;

  font-weight: 900;
  font-stretch: condensed;
}
#app select {
  text-align: center;
  width: 320px;
  height: 50px;
  font-size: 80%;
  font-weight: bold;
  cursor: pointer;
  border-radius: 0;
  background-color: #c0392b;
  border: none;
  border-bottom: 2px solid #962d22;
  border-right: 2px solid #962d22;
  color: white;
  padding: 10px;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  transition: color 0.1s ease, background-color 0.1s ease,
    border-bottom-color 0.1s ease;
}
#app select:hover,
#app select:focus {
  color: #c0392b;
  background-color: white;
  border-bottom-color: #dcdcdc;
  border-right-color: #dcdcdc;
}
.div-select {
  text-align: right;
  text-align-last: right;
  margin-left: 15px;
  width: auto;
}
.form-select {
  text-align: center;
  display: inline-flex;
  width: auto;
}
.row {
  display: flex;
}
.select-icon {
  position: absolute;
  top: 2px;
  margin-left: 5px;
  pointer-events: none;
  float: right;
}
.select-icon svg.icon {
  transition: fill 0.3s ease;
  fill: white;
}
select:hover ~ .select-icon svg.icon,
select:focus ~ .select-icon svg.icon {
  fill: #c0392b;
}
.blink-me {
  animation: blinker 1.5s linear infinite;
}

@keyframes blinker {
  50% {
    opacity: 0;
  }
}

.title-main {
  display: grid;
  grid-template-columns: 3fr 1fr;
  margin: auto;
  position: relative;
}
.title-image img {
  width: 4.7rem;
  float: left;
  padding: 5px;
  margin-top: 8px;
  margin-left: 24px;
}
.title {
  margin-top: 24px;
}
</style>
