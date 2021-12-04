const fetch = require("node-fetch");

const Discord = require("discord.js");
const client = new Discord.Client();

const settings = require("./settings.json");

var random = Math.floor(Math.random() * Math.floor(settings.limit));

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", (msg) => {
  if (msg.content === settings.prefix + "subreddit " + settings.subreddit) {
    //fetch("https://api.reddit.com/r/" + subreddit + "/top.json?sort=top&t=month&limit=" + limit)
    fetch("https://api.reddit.com/r/" + settings.subreddit + "/new.json?limit=" + settings.limit)
      .then((response) => response.json())
      .then((response) => {
        let x = 0;
        while (x < settings.limit) {
          if (response.data.children[random].data.domain === "i.redd.it") {
            /*if (
              response.data.children[random].data.url_overridden_by_dest ===
              "https://i.redd.it/4a73sn3ychw51.jpg"
            ) {
              console.log("Fuck that snake we skipping it");
              random++;
              x++;
            } else {*/
              msg.channel.send(response.data.children[random].data.url_overridden_by_dest);
              console.log("This is a reddit link.");
              x = settings.limit + 1;
            //}
          } else {
            console.log("This isn't a reddit link.");
            random++;
            x++;
          }
        }
        random++;
      });
  }
});

client.login(settings.token);
