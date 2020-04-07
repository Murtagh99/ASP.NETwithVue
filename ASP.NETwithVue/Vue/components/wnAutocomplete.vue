<template>
    <div :id="this.label" @keydown.enter.prevent>
        <label class="required" :for="'input'+this.label">{{ this.label }}</label>
        <label class="form-control__container">
            <input :id="'input'+this.label" v-model="searchString" @input="onInput" @click="onClick" @keydown.tab="blockBlur" @blur="onBlur" :placeholder="this.placeholder" class="form-control__field" name="auto-input" type="text" autocorrect="off" spellcheck="false" required="required" tabindex="1">
            <span class="form-control__btns"></span>
        </label>
        <div class="error-block" v-if="JSON.stringify(errors())!=='[]' && !this.editing">
            <ul style="margin-bottom: 0">
                <li v-for="error in errors()" class="error-list-elements">{{ error }}</li>
            </ul>
        </div>
        <div class="suggestions" v-if="this.editing && this.searchString && this.filteredCompletions.length !== 0">
            <ul tabindex="0" class="ui-menu ui-widget ui-widget-content ui-autocomplete ui-autocomplete_scroll ui-front">
                <li class="ui-menu-item" v-for="completion in filteredCompletions" @mousedown="itemComplete(completion)" @keydown.enter="itemComplete(completion)" tabindex="2"><div class="ui-menu-item-wrapper">{{ completion.Name }}</div></li>
            </ul>
        </div>
    </div>
</template>

<script>
    import SearchDataSource from '../dataSources/searchDataSource';
    import ValidatorAutocomplete from '../validation/validatorAutocomplete.js';

    export default {

        name: 'wnAutocomplete',
        props: {
            value: Object,
            dataSource: SearchDataSource,
            label: String,
            autocompleteFor: String,
            placeholder: String
        },
        data: function () {
            return {
                searchString: this.value && this.value.Name,
                selectedItem: this.value || {},
                filteredCompletions: [],
                editing: false,
                blocker: false,
            }
        },

        mounted() {
            this.isValid();
        },

        methods: {

            itemComplete: function (item) {
                this.selectedItem = item;
                if (item.Name) {
                    this.searchString = item.Name;
                }
                this.$emit("input", this.selectedItem);
                this.filteredCompletions = [];
                this.isValid();
                this.blocker = false;
            },

            filterCities: async function () {
                if (this.searchString && this.dataSource) {
                    this.filteredCompletions = await this.dataSource.search(this.searchString) || [];
                }
            },

            onInput: async function () {
                this.selectedItem = {};
                this.$emit("input", this.selectedItem);
                await this.filterCities();
                this.editing = true;
                this.isValid();
            },

            onBlur: function () {
                console.log(document.activeElement.tagName);
                if (!this.blocker) {
                    this.editing = false;
                }
            },

            onClick: async function () {
                await this.filterCities();
                this.editing = true;
            },

            getValidation: function () {
                if (document.getElementById(("validation" + this.autocompleteFor)) !== null) {
                    return document.getElementById(("validation" + this.autocompleteFor)).innerHTML;
                }
            },

            errors: function () {
                let validator = new ValidatorAutocomplete();
                let array = [];
                if (this.getValidation()) {
                    array.push(validator.validate(this.searchString, this.selectedItem, JSON.parse(this.getValidation())));
                }
                return array.filter(Boolean);
            },

            isValid: function () {
                if (this.selectedItem.Name) {
                    document.getElementById(this.label).setAttribute("class", "field-group required valid autocomplete suggestions-open");
                } else {
                    document.getElementById(this.label).setAttribute("class", "field-group required autocomplete suggestions-open");
                }
            },

            blockBlur: function () {
                this.blocker = true;
            },
        }
    }
</script>
<style scoped>
    .error-list-elements {
        padding: 0;
        margin: 0;
    }
</style>