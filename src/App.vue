<template>
  <div id="app">
    <h1>Consultor de moedas</h1>
    <form class="form-select">
    <div class="div-select form-group col-md-4">
      <select @change="getValue($event)" v-model="item">
        <option value disabled selected>Escolha uma moeda</option>
        <option
          v-for="symbol in symbols"
          :key="symbol.code"
          :value="symbol.code"
        >{{ symbol.description }} ({{ symbol.code }})</option>
      </select>
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
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 60px;

  text-align: center;
}
#app h1 {
  color: #962d22;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
#app select {
  text-align: center;
  width: 80%;
  height: 50px;
  font-size: 100%;
  font-weight: bold;
  cursor: pointer;
  border-radius: 0;
  background-color: #c0392b;
  border: none;
  border-bottom: 2px solid #962d22;
  color: white;
  padding: 10px;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  transition: color 0.1s ease, background-color 0.1s ease, border-bottom-color 0.1s ease;
}
#app select:hover{
  color: #c0392b;
  background-color: white;
  border-bottom-color: #DCDCDC;
}
.div-select{
  text-align: center;
  text-align-last: center;
  
}
.form-select{
  align-items: center !important;
  text-align: center !important;
  display: flex !important;
  border: 1px solid #000;
}
</style>
