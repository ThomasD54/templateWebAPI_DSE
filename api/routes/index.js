module.exports = app => {  
  require("./pollution.routes")(app);
  require("./routes/utilisateurs.routes")(app);
}
