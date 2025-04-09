import { Waffle } from "./waffle.js";
let w = new Waffle("https://google.com");
let r = await w.Get("/cheese");
console.log(r);
