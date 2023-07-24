<template>
    <div>
        <h5>Editar Libro </h5>
        <div class="row card p-2" style="max-width: 650px;">
            <h6>Formulario editar libro</h6>
            <form class="col s12" @submit.prevent="saveLibro()">
                <div class="row">
                    <div class="input-field col s12">
                        <input id="titulo" type="text" class="validate" v-model="payload.titulo">
                        <label for="titulo"> Titulo</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input id="precio" type="number" class="validate" v-model="payload.precio">
                        <label for="precio"> Precio</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <select v-model="payload.categoriasId" >
                            <option value="" disabled selected>Elija una categoria</option>
                            <option v-for="(value, key) in categorias" :key="key" :value="value.id">{{ value.nombre }}
                            </option>
                        </select>
                        <label>Categoria</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <select v-model="payload.paisId" >
                            <option value="" disabled selected>Elija una pais</option>
                            <option v-for="(value, key) in paises" :key="key" :value="value.id">{{ value.nombre }}
                            </option>
                        </select>
                        <label>Pais</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <button class="btn waves-effect waves-light" type="submit" name="action">Enviar
                            <i class="material-icons right">enviar</i>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
  
<script>

export default {
    name: 'Libros',
    data() {
        const api = process.env.VUE_APP_API;
        return {
            api,
            categorias: [],
            paises:[],
            payload: {
                
            }
        }
    },
    methods: {

        getItem() {
            this.axios({
                method: 'get',
                url: this.api + '/libros/'+this.$route.params.id
            })
                .then((response) => {
                    this.payload = response.data;
                    setTimeout(function () {
                        M.updateTextFields();
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
        getPaises(paisId) {
            this.axios({
                method: 'get',
                url: this.api + '/paises?paisId=' + paisId
            })
                .then((response) => {
                    this.paises = response.data;
                    setTimeout(function () {
                        var elems = document.querySelectorAll('select');
                        var select = M.FormSelect.init(elems);
                    });
                    console.log(response);
                });
        },
        saveLibro() {
            this.axios({
                method: 'patch',
                url: this.api + '/libros/'+this.$route.params.id,
                data: this.payload
            })
                .then((response) => {
                   this.$router.push('/libros');

                    console.log(response);
                });
        }
        
    },
    mounted() {
        this.getItem();
        this.getCategorias();
        this.getPaises();
        
    },
    components: {
        
    },
    created() {
        setTimeout(() => {
            var elems = document.querySelectorAll('select');
            var select = M.FormSelect.init(elems);
        });
    }
}
</script>

<style scoped lang="scss">
i {
    cursor: pointer;
    margin-right: 10px;

}
</style>