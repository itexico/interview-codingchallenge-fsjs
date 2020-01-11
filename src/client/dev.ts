require("@babel/register");
require("react-hot-loader/patch");
require("@babel/runtime-corejs3/regenerator");
require("core-js");
require("es6-promise/auto");
require("./start/dev.tsx");

console.log("process.env: ", process.env);
