<template>
    <TableComp :columns='columns' :rows='rows' />
</template>

<script>
import TableComp from '../components/TableComp.vue';
import DataService from '../services/DataService';

    export default {
        name: 'DataView',
        data() {
            return {
                columns: [
                    { name: 'date', text: 'Date' },
                    { name: 'name', text: 'Name'},
                    { name: 'quantity', text: 'Quantity' },
                    { name: 'distance', text: 'Distance' }
                ],
                rows: []
            }
        },
        components: {
            TableComp
        },
        methods: {
            getAllData() {
                DataService.getAll()
                  .then(response => {
                    this.rows = response.data;
                    console.log(response.data)
                })
                .catch(e => {
                    console.log(e);
                })
            }
        },
        mounted() {
            this.getAllData();
        }
    }
</script>