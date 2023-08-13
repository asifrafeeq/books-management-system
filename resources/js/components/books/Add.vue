<template>
    <form @submit.prevent="create" enctype="multipart/form-data">
        <div class="row">
            <div class="col-12 mb-2">
                <div class="form-group">
                    <label>Book Name</label>
                    <input type="text" class="form-control" v-model="book.book_name" :class="{'is-invalid': errors.book_name}">
                    <div class="invalid-feedback">{{ errors.book_name }}</div>
                </div>
            </div>
            <div class="col-12 mb-2">
                <div class="form-group">
                    <label>Author Name</label>
                    <input type="text" class="form-control" v-model="book.author_name" :class="{'is-invalid': errors.author_name}">
                    <div class="invalid-feedback">{{ errors.author_name }}</div>
                </div>
            </div>
            <div class="col-12 mb-2">
                <div class="form-group">
                    <label for="book_image">Book Image</label>
                    <input type="file" name="book_image" class="form-control" ref="imageFile">
                </div>
            </div>
            <div class="col-12 mb-2">
                <div class="form-group">
                    <label for="published_date">Published Date</label>
                    <input type="date" class="form-control" id="published_date" v-model="book.published_date" :class="{'is-invalid': errors.published_date}">
                    <div class="invalid-feedback">{{ errors.published_date }}</div>
                </div>
            </div>
            <div class="col-12 mb-2">
                <div class="form-group">
                    <label for="description">Description</label>
                    <textarea class="form-control" id="description" rows="4" v-model="book.description" :class="{'is-invalid': errors.description}"></textarea>
                    <div class="invalid-feedback">{{ errors.description }}</div>
                </div>
            </div>
            <div class="col-12">
                <button type="submit" class="btn btn-primary">Save</button>
            </div>
        </div>
    </form>
</template>

<script>

import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    data() {
        return {
            book: {
                book_name: '',
                author_name: '',
                book_image: '',
                published_date: '',
                description: ''
               
            },
            errors: {}
        };
    },
    methods: {
        create() {
            this.errors = {};

            const formData = new FormData();
            formData.append('book_image', this.$refs.imageFile.files[0]);
            formData.append('book_name', this.book.book_name);
            formData.append('author_name', this.book.author_name);
            formData.append('published_date', this.book.published_date);
            formData.append('description', this.book.description);
    

            if (!this.book.book_name) {
                this.errors.book_name = 'Book name is required.';
            }
            if (!this.book.author_name) {
                this.errors.author_name = 'Author name is required.';
            }
            if (!this.book.published_date) {
                this.errors.published_date = 'Published date is required.';
            }
            if (!this.book.description) {
                this.errors.description = 'Description is required.';
            }
            
            if (Object.keys(this.errors).length > 0) {
                return;
            }

          
            axios.post('/api/books', this.book)
                .then(response => {
                  
                    console.log('Book created successfully:', response.data);

                    this.book = {
                        book_name: '',
                        author_name: '',
                        book_image: '',
                        published_date: '',
                        description: ''
                    };

                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Book created successfully'
                    });


                    this.$router.push({name:"booksList"});

                })
                .catch(error => {
                  
                    console.error('Error creating book:', error);
                });
        }
    }
};
</script>

<style>
.is-invalid {
    border-color: red;
}
</style>
