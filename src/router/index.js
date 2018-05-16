import Vue from 'vue'
import Router from 'vue-router'
import Calculo from '@/components/Calculo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Calculo',
      component: Calculo
    }
  ]
})
