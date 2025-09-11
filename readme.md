GraphQL CRUD API with Mongoose
Overview

This project is a simple GraphQL API built with Node.js and Mongoose. It manages Authors and Books, demonstrating basic CRUD operations and one-to-many relationships.

Features

Query and fetch authors and books

Add new authors and books

Handles one-to-many relationships (books belong to authors)

Uses asynchronous database operations with Mongoose

Clean separation of GraphQL queries and mutations

Setup

Install dependencies

Connect to MongoDB

Start the server

Access GraphQL endpoint for queries and mutations

Notes

Mongoose create method automatically saves documents

All resolvers are asynchronous

Nested relationships allow fetching related data (e.g., author details for a book)

Next Steps

Add update and delete operations

Implement input validation

Add pagination for large datasets

Integrate with a frontend for full-stack usage