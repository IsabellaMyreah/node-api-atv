
const express = require("express");
const { randomUUID } = require("crypto");
const { appendFile } = require("fs");
const {get} = require("http");

const blog = express();

    blog.use(express.json());

    blog.get((request, response) => {
        
    });


//INÍCIO DO ARRAY DE USUÁRIOS
    const usuarios = [];

    blog.post("/usuarios", (request, response) => {

        const {name, age, email} = request.body;

        const usuario = {
            id: randomUUID(),
            name,
            age,
            email
        };

        usuarios.push(usuario);

        console.log(usuarios);

        return response.json(usuario);

    });

    blog.get("/usuarios", (request, response) => {
        return response.json(usuarios)
    });
//FIM DO ARRAY DE USUÁRIO




//INÍCIO DO ARRAY DE POST
    const posts = [];

    blog.post("/posts", (request, response) => {
        
        const {date, user, description} = request.body

        const post = {
            id: randomUUID(),
            date, 
            user,
            description
        }

            posts.push(post);

            console.log(posts)

            return response.json(posts)

    });

    blog.get("/posts", (request, response) => {
        return response.json(posts)
    });

//FIM DO ARRAY DE POST




//INÍCIO DA ATUALIZAÇÃO DE USUARIOS

    blog.put("/usuarios/:id", (request, response) => {
        const { id } = request.params;
        const {name, age, email} = request.body

        const usuarioIndex = usuarios.findIndex((usuario) => usuario.id === id);

        usuarios[usuarioIndex] = {
            ...usuarios[usuarioIndex],
            name,
            age,
            email
        };

        return response.json({message: "Atualização de usuário concluída com sucesso!👍"})
    });

//FIM DA ATUALIZAÇÃO DE USUARIOS



//INÍCIO DA ATUALIZAÇÃO DE POSTS

blog.put("/posts/:id", (request, response) => {
    const { id } = request.params;
    const {date, user, description} = request.body

    const postIndex = posts.findIndex((post) => post.id === id);

    posts[postIndex] = {
        ...posts[postIndex],
        date,
        user,
        description
    };

    return response.json({message: "Atualização de post concluída com sucesso!👍"})
});

//FIM DA ATUALIZAÇÃO DE POSTS




//INÍCIO DO DELETE DE USUARIOS

    blog.delete("/usuarios/:id", (request, response) => {
        const { id } = request.params

        const usuario = usuarios.findIndex((usuario) => usuario.id === id)

        usuarios.splice(usuario, 1)

        return response.json({message: "Usuário deletado com sucesso!👍"})

    });

//FIM DO DELETE DE USUARIOS




//INÍCIO DO DELETE DE POSTS

    blog.delete("/posts/:id", (request, response) => {
        const { id } = request.params

        const post = posts.findIndex((post) => post.id === id)

        posts.splice(post, 1)

        return response.json({message: "Post deletado com sucesso!👍"})

    });

//FIM DO DELETE DE POSTS

    blog.listen(5002, () => console.log("O servidor está sendo executado na porta 5002💗"));