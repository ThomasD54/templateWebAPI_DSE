module.exports = app => {  
  require("./pollution.routes")(app);
  require("./utilisateurs.routes")(app);
}
