<template>
    <div id="app">
        <!--irgendwann danach die razor view generierung nutzen @Html.EditorFor(m=>m.Street)-->
        <form ref="form">
            <wn-autocomplete name="wn-autocomplete-city" v-model="city" :data-source="createCityDataSource()" label="PLZ oder Stadt eingeben" autocompleteFor="City" placeholder="z.B.: Dortmund oder 44139"></wn-autocomplete>
            <div class="col" v-if="city.City && !checked">
                <wn-autocomplete name="wn-autocomplete" v-model="street" :data-source="createStreetDataSource()" label="Straße" autocompleteFor="Street" placeholder="z.B.: Flamingoweg"></wn-autocomplete>
                <wn-textfeld name="hausnr" label="Hausnummer" v-model="hausNr" :validation-rules="[{required: true}]"></wn-textfeld>
            </div>
            <div class="checkbox" v-if="city.City">
                <input id="checkbox-1" name="checkbox-1" type="checkbox" v-model="checked">
                <label class="icon" for="checkbox-1"> Ist ihre Straße nicht aufgeführt? </label>
                <wn-info name="wn-info" info="Weil sich die Straße z. B. in einem Neubaugebiet befindet? Dann geben Sie bitte Gemarkung/Flur/Flurstück an."></wn-info>
            </div>
            <div class="col" v-if="city.City && checked" :key="'unbekannteadresse'">
                <wn-textfeld name="wn-textfeld" label="Straße (optional)"></wn-textfeld>
                <wn-textfeld name="wn-textfeld" label="Hausnummer (optional)"></wn-textfeld>
                <wn-textfeld name="wn-textfeld" label="Gemarkung" :validation-rules="[{required: true}]" v-model="gemarkung"></wn-textfeld>
                <wn-textfeld name="wn-textfeld" label="Flur" :validation-rules="[{required: true}]" v-model="flur"></wn-textfeld>
                <wn-textfeld name="wn-textfeld" label="Flurstück" :validation-rules="[{required: true}]" v-model="flurstueck"></wn-textfeld>
            </div>
            <button id="checkButton" v-if="city.City" class="btn color-cta-3" type="submit">Prüfen</button>
        </form>
    </div>
</template>

<script>
    import wnTextfeld from './components/wnTextfeld.vue';
    import wnAutocomplete from './components/wnAutocomplete.vue';
    import wnInfo from './components/wnInfo.vue';
    import CityDataSource from './dataSources/cityDataSource.js';
    import StreetDataSource from './dataSources/streetDataSource.js';

    export default {
        name: 'app',
        components: {
            wnTextfeld,
            wnAutocomplete,
            wnInfo
        },
        data: function () {
            return {
                city: { "PostCode": "44139", "City": "Dortmund", "Name": "44139 Dortmund" },
                street: { "Street": "Flamingoweg", "Name": "Flamingoweg" },
                hausNr: "2",
                checked: false,
                gemarkung: "",
                flur: "",
                flurstueck: "",
            }
        },
        beforeUpdate() {
            if (!this.city.Name || this.checked) {
                this.street = {};
                this.hausNr = "";
            }
            if (!this.checked) {
                this.gemarkung = "";
                this.flur = "";
                this.flurstueck = "";
            }
        },
        updated() {
            if ((this.street.Name && this.hausNr) || (this.gemarkung && this.flur && this.flurstueck)) {
                document.getElementById("checkButton").removeAttribute("disabled")
            } else if (document.getElementById("checkButton") !== null) {
                document.getElementById("checkButton").setAttributeNode(document.createAttribute("disabled"))
            }
        },
        methods: {
            createCityDataSource: function () {
                return new CityDataSource();
            },

            createStreetDataSource: function () {
                return new StreetDataSource(this.city);
            },
        },
    }
</script>
<style>
</style>