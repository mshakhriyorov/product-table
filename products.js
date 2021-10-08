const products = {
    name: 'Container',
    template: `
    <div>

    <button type="button"
    class="btn btn-primary m-2 float-end"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
    @click="addClick()">
     Add Product
    </button>
    
    <table class="table table-striped">
    <thead>
        <tr>
            <th>
                Product Number
            </th>
            <th>
                 Name
            </th>
            <th>
                 Price($)
            </th>
            <th>
                Adress
            </th>
            <th>
                Options
            </th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="item in products">
            <td>{{item.id}}</td>
            <td>{{item.name_uz}}</td>
            <td>{{item.cost}}</td>
            <td>{{item.address}}</td>
            <td>
                <button type="button"
                class="btn btn-success mr-1"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                @click="editClick(item)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                </button>
                <button type="button" @click="deleteClick(item.id)"
                class="btn btn-danger mr-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                    </svg>
                </button>
    
            </td>
        </tr>
    </tbody>
    </thead>
    </table>
    
    <div class="modal fade" id="exampleModal" tabindex="-1"
        aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered">
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{modalTitle}}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"
            aria-label="Close"></button>
        </div>
    
        <div class="modal-body">
    
            <div class="input-group mb-3">
                <span class="input-group-text"> Name</span>
                <input type="text" class="form-control" v-model="name_uz">
                <span class="input-group-text"> Price</span>
                <input type="text" class="form-control" v-model="cost">
                <span class="input-group-text"> Adress</span>
                <input type="text" class="form-control" v-model="address">
            </div>
    
            <button type="button" @click="createClick()"
            v-if="id==0" class="btn btn-primary">
            Create
            </button>
            <button type="button" @click="updateClick()"
            v-if="id!=0" class="btn btn-primary">
            Update
            </button>
    
        </div>
    
    </div>
    </div>
    </div>
    
    
    </div>
    `,

    data() {
        return {
            products: [],
            modalTitle: "",
            name_uz: "",
            id: 0,
            address: "",
            cost: 0
        }
    },
    methods: {
        refreshData() {
            axios.get(variables.API_URL + 'product')
                .then((response) => {
                    this.products = response.data;
                });
        },
        addClick() {
            this.modalTitle = "Add Product";
            this.name_uz = "";
            this.id = 0;
            this.cost = 0;
            this.address = "";
        },
        editClick(item) {
            this.modalTitle = "Edit Product";
            this.name_uz = item.name_uz;
            this.id = item.id;
            this.cost = item.cost;
            this.address = item.address;
        },
        createClick() {
            axios.post(variables.API_URL + "product", {
                name_uz: this.name_uz,
                id: this.id,
                cost: this.cost,
                address: this.address
            })
                .then((response) => {
                    this.refreshData();
                    alert(response.data);
                })
        },
        updateClick() {
            axios.put(variables.API_URL + "product", {
                name_uz: this.name_uz,
                id: this.id,
                cost: this.cost,
                address: this.address
            })
                .then((response) => {
                    this.refreshData();
                    alert(response.data);
                })
        },
        deleteClick(id) {
            if(!confirm("Are you sure?")){
                return;
            }

            axios.put(variables.API_URL + "product/"+id, {
                name_uz: this.name_uz,
                id: this.id,
                cost: this.cost,
                address: this.address
            })
                .then((response) => {
                    this.refreshData();
                    alert(response.data);
                })
        }
    },
    mounted: function () {
        this.refreshData();
    }

}