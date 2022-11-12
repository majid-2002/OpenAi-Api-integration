import { Configuration, OpenAIApi } from "openai";
import express from "express";
import bodyParser from "body-parser";
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()


const app = express();
const port = 3000;
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); //* static files setup.

var url = "";

app.get("/", (req, res) => {
  res.render("index", {imgsrc : url});
});

app.post("/", async (req, res) => {
  const prompt = req.body.prompttyped;

  const configuration = new Configuration({
    apiKey: process.env.OPEN_AI_KEY
  });

  const openai = new OpenAIApi(configuration); // requesting to Open AI api
  const result = await openai.createImage({
    prompt,
    n: 1,
    size: "256x256",
  });

  url = result.data.data[0].url;

  console.log(url)

  res.render('index', {imgsrc: url});

});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
