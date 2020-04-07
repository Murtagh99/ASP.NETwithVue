<template>
    <div class="field-group">
        <label for="input-text-6">{{ this.label }}</label>
        <label class="form-control__container">
            <input v-model="searchString" @input="onInput" class="form-control__field" name="textfeld" type="text" autocorrect="off" spellcheck="false">
            <span class="form-control__btns"></span>
        </label>
        <div class="error-block" v-if="validationRules && JSON.stringify(errors())!=='[]'">
            <ul style="margin-bottom: 0">
                <li v-for="error in errors()">{{ error }}</li>
            </ul>
        </div>
    </div>
</template>


<script>
    import Validator from '../validation/validator.js';

    export default {

        props: {
            label: String,
            value: String,
            validationRules: Array,
        },

        name: 'wnTextfeld',

        data:
            function () {
                return {
                    searchString: this.value || "",
                };
            },

        methods: {
            errors: function () {
                let validator = new Validator();
                let array = [];

                for (let i = 0; i < this.validationRules.length; i++) {
                    array.push(validator.validate(this.searchString, this.validationRules[i]));
                }
                return array.filter(Boolean);
            },
            onInput: function () {
                this.$emit("input", this.searchString)
            }
        }
    }
</script>

<style scoped>
    li {
        padding: 0;
        margin: 0;
    }
</style>