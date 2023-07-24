<template>
  <nav>
    <div class="nav-wrapper">
      <a href="#!" class="brand-logo"></a>
      <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
      <ul class="right hide-on-med-and-down">
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/libros">Libros</router-link></li>
        <li><router-link to="/categorias">Categorias</router-link></li>
        <li><router-link to="/paises">Paises</router-link></li>
        </ul>
    </div>
  </nav>

  <ul class="sidenav" id="mobile-demo">
    <li><router-link to="/">Home</router-link></li>
    <li><router-link to="/libros">Libros</router-link></li>
    <li><router-link to="/categoria">Categorias</router-link></li>
    <li><router-link to="/paises">Paises</router-link></li>
   
    
  </ul>
  <router-view/>
</template>

<style lang="scss">


</style>

<script>

export default {
  name: 'AppView',
  data(){
    return {
      
    }
  },
  methods:{
    
  },
  created() {
    document.addEventListener('DOMContentLoaded', function () {
      var elems = document.querySelectorAll('.sidenav');
      var instances = M.Sidenav.init(elems, {});

    });
  }
}
</script>