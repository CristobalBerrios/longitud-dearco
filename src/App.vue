<template>
  <v-app>
    <v-toolbar
      app
      color="primary"
      dark
    >
      <v-toolbar-title v-text="title"></v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <router-view/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      title: 'Longitud de Arco'
    }
  },
  name: 'App'
}
</script>
