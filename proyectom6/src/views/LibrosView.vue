<template>
    <div>
        <h5>Libros</h5>
        <tabs>
            <template v-slot:lista>
                <search placeholder="Buscar Libros" @searchtext="searchFx($event)"></search>
                <filter-group>
                    <filter-item :items="categorias" label="Categorias"
                        @onfilter="onFilterFx('categoriaId', $event)"></filter-item>
                </filter-group>
                <table class="highlight responsive-table ">
                    <thead>
                        <tr>
                            <th>Titulo</th>
                            <th>Precio</th>
                            <th>Categoria</th>
                            <th>Pais</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="item in items">
                            <td>{{ item.titulo }}</td>
                            <td>{{ item.precio }}</td>
                            <td>{{ item.categorias.nombre }}</td>
                            <td>{{ item.paises.nombre }}</td>
                            <td>
                                <router-link :to="'/libros/' + item.id"><i class="material-icons">crear</i></router-link>

                                <i class="material-icons" style="color:red"
                                    @click="eliminarItem(item.id)">delete_forever</i>
                            </td>
                        </tr>
                    </tbody>
                </table>

            </template>
            <template v-slot:nuevo>
                <div class="row card p-2" style="max-width: 650px;">
                    <h6>Formulario nuevo Libro</h6>
                    <form class="col s12" @submit.prevent="saveLibro()">
                        <div class="row">
                            <div class="input-field col s12">
                                <input id="name" type="text" class="validate" v-model="payload.nombre">
                                <label for="name"> Titulo</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12">
                                <input id="precio" type="number" class="validate" v-model="payload.precio">
                                <label for="precio"> Precio</label>
                            </div>
                        </div>
                        <div class="row" v-if="paises.length > 0">
                            <div class="input-field col s12">
                                <select v-model="payload.paisesId">
                                    <option value="0" disabled selected>Elija un Pais</option>
                                    <option v-for="(value, key) in paises" :key="key" :value="value.id">{{ value.nombre }}
                                    </option>
                                </select>
                                <label>Pais</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12">
                                <button class="btn waves-effect waves-light" type="submit" name="action">Submit
                                    <i class="material-icons right">Enviar</i>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </template>
        </tabs>
        <pre>{{ payload }}</pre>
    </div>
</template>
  
<script>

import Tabs from '@/components/Tabs.vue'
import Search from '@/components/Search.vue'
import FilterGroup from '@/components/FilterGroup.vue';
import FilterItem from '@/components/FilterItem.vue';
export default {
    name: 'libreria',
    data() {
        const api = process.env.VUE_APP_API;
        return {
            api,
            items: [],
            categorias: [],
            paises: [],
            toSearch: "",
            toFilter:"",
            payload: {
                titulo: '',
                precio: null,
                paisesId: 0,
                categoriaId: 0
            }
        }
    },
    methods: {
        onFilterFx(field, event) {
            if (event === '') {
                this.toFilter = '';
            } else {
                this.toFilter = '&' + field + '=' + event;
            }
            this.getItems();
        },
        
        getItems() {
            this.axios({
                method: 'get',
                url: this.api + '/libros?_expand=categorias'+this.toSearch+this.toFilter
            })
                .then((response) => {
                    this.items = response.data;
                    console.log(response);
                })
                .catch((error) => { console.log(error) })
                .finally(() => { });
        },
        getPaises() {
            this.axios({
                method: 'get',
                url: this.api + '/paises'
            })
                .then((response) => {
                    this.states = response.data;
                    setTimeout(function () {
                        var elems = document.querySelectorAll('select');
                        var select = M.FormSelect.init(elems);
                    });
                    console.log(response);
                });
        },
        getPaises(paisesId) {
            this.axios({
                method: 'get',
                url: this.api + '/paises?paisesId=' + paisesId
            })
                .then((response) => {
                    this.cities = response.data;
                    setTimeout(function () {
                        var elems = document.querySelectorAll('select');
                        var select = M.FormSelect.init(elems);
                    });
                    console.log(response);
                });
        },
        getCategorias() {
            this.axios({
                method: 'get',
                url: this.api + '/categorias'
            })
                .then((response) => {
                    this.categorias = response.data;
                    setTimeout(function () {
                        var elems = document.querySelectorAll('select');
                        var select = M.FormSelect.init(elems);
                    });
                    console.log(response);
                });
        },
        getCategorias(categoriasId) {
            this.axios({
                method: 'get',
                url: this.api + '/categorias?categoriasId=' + categoriasId
            })
                .then((response) => {
                    this.categorias = response.data;
                    setTimeout(function () {
                        var elems = document.querySelectorAll('select');
                        var select = M.FormSelect.init(elems);
                    });
                    console.log(response);
                });
        },
        saveLibro() {

            this.axios({
                method: 'post',
                url: this.api + '/libros',
                data: this.payload
            })
                .then((response) => {
                    this.payload = {
                        titulo: '',
                        precio: null,
                        categoriaId: 0,
                        paisesId: 0,
                    };
                    setTimeout(function () {
                        var elems = document.querySelectorAll('select');
                        var select = M.FormSelect.init(elems);
                    });
                    this.getItems();

                    console.log(response);
                });


        },
        eliminarItem(id) {
            if (confirm("Esta seguro de eliminar?")) {
                this.axios({
                    method: 'delete',
                    url: this.api + '/libros/' + id
                })
                    .then((response) => {
                        this.getItems();
                        console.log(response);
                    });
            }
        },
        searchFx(event){
            if (event === "") {
                this.toSearch = '';
            } else {
                this.toSearch = '&q=' + event;
            }
            this.getItems();
        }
    },
    mounted() {
        this.getItems();
        this.getPaises();
        this.getCategorias();
    },
    components: {
        Tabs,Search,FilterGroup,FilterItem
    },
    created() {
        setTimeout(() => {
            var elems = document.querySelectorAll('select');
            var select = M.FormSelect.init(elems);
        });
    }
}
</script>

<style></style>