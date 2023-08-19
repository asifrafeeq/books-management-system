<template>
    <div class="row">
        <div class="col-12 mb-2 text-end">
            <router-link :to='{name:"booksAdd"}' class="btn btn-success">Add New Book</router-link>
        </div>
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h4>Books</h4>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th>SR#</th>
                                    <th>Book Name</th>
                                    <th>Author Name</th>
                                    <th>Published Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody v-if="books.length > 0">
                            <tr v-for="(book, index) in visibleBooks" :key="book.id">
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ book.book_name }}</td>
                                    <td>{{ book.author_name }}</td>
                                    <td>{{ book.published_date }}</td>
                                    <td>
                                        <router-link :to='{name:"booksEdit",params:{id:book.id}}' class="btn btn-success">Edit</router-link>
                                        <router-link :to="{ name: 'booksShow', params: { id: book.id } }" class="btn btn-info mx-2">Show</router-link>
                                        <button type="button" @click="deleteBooks(book.id)" class="btn btn-danger">Delete</button>
                                    </td>
                                </tr>
                            </tbody>
                            <tbody v-else>
                                <tr>
                                    <td colspan="4" align="center">No Books Found.</td>
                                </tr>
                            </tbody>
                        </table>
<!-- 
                        <button v-if="visibleBooks.length < books.length" @click="loadMore" class="btn btn-primary btn-block mt-3">Load More</button> -->

                        <button v-if="currentIndex < books.length" @click="loadMore" class="btn btn-primary">Load More</button>


                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    name: "books",
    data() {
        return {
            books: [],
            itemsPerPage: 5,
            visibleBooks: [],
            currentIndex: 0
        }
    },
    mounted() {
        this.getBooks();
    },
    methods: {
        async getBooks() {
              try {
                const { data } = await axios.get('/api/books');
                this.books = data;
                this.loadMore(); 
              } catch (error) {
                console.error(error);
                this.books = [];
              }
            },

        // loadMore() {
        //   const endIndex = this.currentIndex + this.itemsPerPage;
        //   if (endIndex < this.books.length) {
        //     this.visibleBooks = this.books.slice(this.currentIndex, endIndex);
        //     this.currentIndex = endIndex;
        //   } else {
        //     this.visibleBooks = this.books.slice(this.currentIndex);
        //   }
        // },

        loadMore() {
              const endIndex = this.currentIndex + this.itemsPerPage;
              if (endIndex <= this.books.length) {
                this.visibleBooks = this.books.slice(0, endIndex);
                this.currentIndex = endIndex;
              } else if (this.currentIndex < this.books.length) {
                this.visibleBooks = this.books.slice(0, this.books.length);
                this.currentIndex = this.books.length;
              }
            },

        async deleteBooks(id) {
            if (confirm('Are you sure to delete this book?')) {
                try {
                    await axios.delete(`/api/books/${id}`);
                  
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Book deleted successfully'
                    });

                    this.getBooks();
                } catch (error) {
                    console.error('Error deleting book:', error);
                }
            }
        }
    }
}
</script>
