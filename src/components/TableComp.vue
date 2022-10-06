<template>
    <div class="main-container">
        <div>
            <table>
                <tr>
                    <th 
                        v-for="(header, index) in columns" 
                        :key="index"
                        @click="sortBy(index)"
                    >
                        {{ header.text }}
                        <i class="fa fa-sort"></i>
                    </th>
                </tr>
                <tr v-for="(td, index) in paginatedItems" :key="index">
                    <td>{{ td.date.slice(0, 10) }}</td>
                    <td>{{ td.name }}</td>
                    <td>{{ td.quantity }}</td>
                    <td>{{ td.distance }}</td>
                </tr>
            </table>
            <div class="pagination">
                <span v-for="page in pages" :key="page" @click="onPage(page)" class="page">
                    {{page}}
                </span>
            </div>
        </div>
        <div class="menu-side" :class="{active: inputbar}">
    
            <div @click="menuToggle()" class="menu-icon">
                <i id="menu-btn" class="fas fa-bars">X</i>
            </div>
    
            <nav class="inputbar" v-bind:class="{active: inputbar}">

                <div class="inputbar__field">
                    <span>Колонка</span>
                    <span id="v-model-select" class="category">
                         <select v-model="selectedCategory">
                             <option disabled value="">Выбор колонки для фильтрации</option>
                             <option>Name</option>
                             <option>Quantity</option>
                             <option>Distance</option>
                         </select>
                    </span>
                </div>

                <div class="inputbar__field" v-if="selectedCategory === 'Quantity' || selectedCategory === 'Distance'">
                    <span>Условие</span>
                    <span>
                        <span id="v-model-select" class="category">
                        <select v-model="selectedCondition">
                            <option disabled value="">Выбор колонки для фильтрации</option>
                            <option v-for="(condition, index) in conditions" :key="index">{{ condition }}</option>
                        </select>
                    </span>
                    </span>
                </div>

                <div class="inputbar__field" v-if="selectedCategory === 'Quantity' || selectedCategory === 'Distance'">
                    <span>Значение</span>
                    <input v-model="inputCondition" placeholder="Значение для фильтрации" size="28" type="text"/>
                </div>

                <div class="inputbar__field" v-if="selectedCategory === 'Name'">
                    <span>Название</span>
                    <input v-model="inputTitle" placeholder="Значение для фильтрации" size="28" type="text"/>
                </div>
            </nav>
    
        </div>
    </div>
</template>

<script>

export default {
    name: 'TableComp',
    props: {
        columns: {
            type: Array,
            default: () => {
                return []
            }
        },
        rows: {
            type: Array,
            default: () => {
                return []
            } 
        },
    },
    data() {
        return {
            itemsPerPage: 5,
            pageNumber: 1,
            menu: false,
            inputbar: false,

            selectedCategory: '',
            selectecCondition: '',
            inputTitle: '',
            inputCondition: '',

            conditions: ['==', '<', '>']
        }
    },
    computed: {
        pages() {
            return 4
        },
        // eslint-disable-next-line
        paginatedItems() {

            let from = (this.pageNumber - 1) * this.itemsPerPage;
            let to = from + this.itemsPerPage;

            if (!this.selectedCategory) {
                return this.featuredRows.slice(from, to)
            } 

            else if (this.selectedCategory === 'Name') {
                // eslint-disable-next-line
                this.inputCondition = '',
                // eslint-disable-next-line
                this.selectedCondition = !this.selectecCondition;
                return this.featuredRows.filter(elem => {
                    return elem.name.toLowerCase().includes(this.inputTitle.toLowerCase())
                }).slice(from, to)
            }

            else if (this.selectedCategory === 'Quantity') {
                // eslint-disable-next-line
                this.inputTitle = '';
                if (!this.inputCondition) {
                    return this.featuredRows.slice(from, to)
                }
                switch (this.selectedCondition) {
                    case "==":
                        return this.featuredRows.filter(elem => {
                            return elem.quantity == this.inputCondition
                        }).slice(from, to);
                    case "<":
                        return this.featuredRows.filter(elem => {
                            return elem.quantity < this.inputCondition
                        }).slice(from, to);
                    case ">":
                        return this.featuredRows.filter(elem => {
                            return elem.quantity > this.inputCondition
                        }).slice(from, to);
                }
            }

            else if (this.selectedCategory === 'Distance') {
                // eslint-disable-next-line
                this.inputTitle = '';
                if (!this.inputCondition) {
                    return this.featuredRows.slice(from, to)
                }
                switch (this.selectedCondition) {
                    case "==":
                        return this.featuredRows.filter(elem => {
                            return elem.distance == this.inputCondition
                        }).slice(from, to);
                    case "<":
                        return this.featuredRows.filter(elem => {
                            return elem.distance < this.inputCondition
                        }).slice(from, to);
                    case ">":
                        return this.featuredRows.filter(elem => {
                            return elem.distance > this.inputCondition
                        }).slice(from, to);
                }
            }

        },
        featuredRows() {
            return this.rows;
        } 
    },
    mounted () {
        console.log(this.paginatedItems)
    },
    methods: {
        onPage(page) {
            this.pageNumber = page;
        },
        sortBy(index) {
            if (index == 1) {
                // eslint-disable-next-line
                this.rows.sort((a, b) => a.name.localeCompare(b.name))
            } else if (index == 2) { 
                console.log(this.rows)
                // eslint-disable-next-line
                this.rows.sort((a, b) => a.quantity - b.quantity)
            } else if (index == 3) {    
                // eslint-disable-next-line
                this.rows.sort((a, b) => a.distance - b.distance)
            }   
        },
        menuToggle() {
            this.menu = !this.menu;
            this.inputbar = !this.inputbar
        },
    }
}
</script>

<style scoped>
.main-container {
    position: relative;
    right: 4rem;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
}
table {
    text-align: left;
    background: #b6c5e3;
    border-collapse: separate;
    border-spacing: 4px;
    border: 10px solid #466ab0;
    border-radius: 15px;
}

th, td {
    padding: .1rem 1.2rem;
}

th {
    font-size: 18px;
    font-weight: bold;
}

td {
    background: #98b7f5;
}

.page {
    position: relative;
    top: 2rem;
    padding: 1rem 1rem;
    margin: 2rem 0.3rem;

    background: #98b7f5;
    border-collapse: separate;
    border-spacing: 6px;
    border: 1px solid #466ab0;
    border-radius: 10px;
}

#menu-btn {
    width: 100%;
    font-size: 1.5rem;
    cursor: pointer;
    color:var(--black);
    padding: .2rem 0rem;
}

.menu-side {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;

    position: relative;
    bottom: 4.25rem;
    left: 2rem;
    min-width: 140px;
    min-height: 20px;

    background: #b6c5e3;
    border-collapse: separate;
    border-spacing: 6px;
    border: 1px solid #466ab0;
    border-radius: 10px;
}

.menu-side.active {
    bottom: -2.55rem;
}

.menu-icon {
    margin: 0 auto;
}

.inputbar {
    position: absolute;
    top:99%; left:0; right:0; 
    padding: .5rem;
    transition: .1s linear;
    clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
    overflow-x: hidden;
}

.inputbar.active {
    position: relative;
    display: block;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
}

.inputbar.active .inputbar__field {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 2rem;
    text-align: center;
}

.inputbar.active span {
    font-weight: bold;
}
</style>