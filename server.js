const express = require('express');
const nunjucks = require('nunjucks');

const data = require("./data");
const server = express();

server.use(express.static('public'));

server.set("view engine", "html");

nunjucks.configure("views", {
  express: server,
  autoescape: false,
  noCache: true
})

server.get("/", function (req, res) {
  let data = {
    name: "Thiago Araujo",
    role: "Estudante - algum lugar",
    description: 'Programador ou quase, tentando ser o melhor que pode ser e estudando na <a href="http://rocketseat.com.br"target="_blank">Rocketseat</a>.',
    links: [
      { name: "Github", link: "https://github.com/Thiago-a1" },
      { name: "Twitter", link: "https://twitter.com" },
      { name: "Linkedin", link: "https://linkedin.com" }
    ]
  }

  return res.render("about", { about: data });
})

server.get("/portfolio", function (req, res) {
  return res.render("portfolio", { itens: data });
})

server.get("/video", function (req, res) {
  const { id } = req.query;
  const item = data.find(function (item) {
    return item.id == id;
  })
  if (!item) {
    return res.send("video not found !");
  }
  return res.render("video", { item })
})

server.listen(5000, function () {
  console.log("server is running");
})