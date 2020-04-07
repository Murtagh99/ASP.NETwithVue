<template>
    <div>
        <div data-tpl="tooltip" class="tooltip--bottom tooltip--left" id="tooltip">
            <span class="icon icon-info tooltip-trigger" data-toggle="tooltip" @click="infoToggler"></span>
            <div class="tooltip-container" v-if="toggleInfo">
                <div class="tooltip-close icon icon-close_info" @click="closeInfo"></div>
                <div class="tooltip-content">
                    <div>
                        <p>
                            {{ this.info }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {

        name: 'wnInfo',
        props: {
            info: String
        },
        data: function () {
            return {
                toggleInfo: false
            }
        },
        methods: {

            infoToggler: function () {
                this.toggleInfo = !this.toggleInfo;
                if (this.toggleInfo) {
                    setTimeout(() => document.getElementById("tooltip").setAttributeNode(document.createAttribute("aria-expanded")), 1)
                } else {
                    setTimeout(() => document.getElementById("tooltip").removeAttribute("aria-expanded"), 1)
                }
            },

            closeInfo: function () {
                this.toggleInfo = false;
                document.getElementById("tooltip").removeAttribute("aria-expanded")
            }

        }
    }
</script>
<style scoped>
    p {
        margin: 0;
    }
</style>