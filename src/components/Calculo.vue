<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 md6>
        <v-form v-model="valid" ref="form" lazy-validation>
          <v-layout row wrap>
            <v-flex xs12>
              <h3 class="title">Condiciones iniciales</h3>
            </v-flex>
            <v-flex xs12>
            <v-text-field
              label="f(x)"
              v-model="integral.funcion">
            </v-text-field>
          </v-flex>
          <v-flex xs12>
            <h3 class="subheading">Limites</h3>
          </v-flex>
          <v-flex xs6>
            <v-text-field
              label="Desde"
              v-model.number="integral.a"
              type="number">
            </v-text-field>
          </v-flex>
          <v-flex xs6>
            <v-text-field
              label="Hasta"
              v-model.number="integral.b"
              type="number">
            </v-text-field>
          </v-flex>
          <v-flex xs6>
            <v-text-field
              label="N° Partes"
              v-model.number="num_partes"
              type="number">
            </v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-btn @click="calcular(integral, num_partes)" block color="primary" dark>Calcular</v-btn>
          </v-flex>
          </v-layout>
        </v-form>
      </v-flex>
      <v-flex xs12 md6>
        <v-layout v-if="longitudArco !== Number" row wrap>
          <v-flex xs12>
            <h3 class="title">Resultado</h3>
          </v-flex>
          <v-flex xs12>
            <v-text-field
              label="Longitud de Arco aprox"
              readonly
              v-model.number="longitudArco"
              type="number">
            </v-text-field>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import math from 'mathjs'

export default {
  data () {
    return {
      valid: false,
      integral: {
        funcion: '',
        a: 0,
        b: 0
      },
      num_partes: 0,
      resultado: 0,
      loading: false,
      longitudArco: Number
    }
  },
  methods: {
    calcular (integral, numPartes) {
      let vm = this
      vm.loading = true
      let puntos = vm.getPuntos(integral, numPartes)
      let distancia = vm.calcularDistancias(puntos)
      vm.longitudArco = distancia
    },
    getPuntos (integral, numPartes) {
      let vm = this
      let distanciaPunto = (integral.b - integral.a) / numPartes
      let puntos = []
      for (let x = integral.a; x <= integral.b; x = x + distanciaPunto) {
        let punto = vm.crearPunto(integral.funcion, x)
        puntos.push(punto)
      }
      return puntos
    },
    crearPunto (funcion, x) {
      return {
        x: x,
        y: math.eval(funcion, {x: x})
      }
    },
    calcularDistancias (puntos) {
      let vm = this
      let distancia = 0
      for (let i = 0; i < puntos.length - 1; i++) {
        distancia += vm.calcularDistancia(puntos[i], puntos[i + 1])
      }
      return distancia
    },
    calcularDistancia (puntoA, puntoB) {
      let raiz = 1 / 2
      return math.eval(`((j - x)^2 + (i - y)^2)^${raiz}`, {
        j: puntoB.x,
        x: puntoA.x,
        i: puntoB.y,
        y: puntoA.y
      })
    }
  }
}
</script>

