<template>
    <div>
        <h5>Editar Pais </h5>
        <div class="row card p-2" style="max-width: 650px;">
            <h6>Formulario editar pais</h6>
            <form class="col s12" @submit.prevent="saveCategoria()">
                <div class="row">
                    <div class="input-field col s12">
                        <input id="nombre" type="text" class="validate" v-model="payload.nombre">
                        <label for="nombre"> Nombre</label>
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
    name: 'Paises',
    data() {
        const api = process.env.VUE_APP_API;
        return {
            api,
            paises:[],
            payload: {
                
            }
        }
    },
    methods: {

        getItem() {
            this.axios({
                method: 'get',
                url: this.api + '/paises/'+this.$route.params.id
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
                url: this.api + '/paises'
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
        saveCategoria() {
            this.axios({
                method: 'patch',
                url: this.api + '/paises/'+this.$route.params.id,
                data: this.payload
            })
                .then((response) => {
                   this.$router.push('/paises');

                    console.log(response);
                });
        }
        
    },
    mounted() {
        this.getItem();

        
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