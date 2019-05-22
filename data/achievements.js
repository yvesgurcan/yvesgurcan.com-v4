const achievements = [
  {
    name: "More than just an upgrade",
    description: "Migrate a project from Webpack 3 to Webpack 4.",
    date: "2019-05-01",
    tags: "front end, javascript, learn"
  },
  {
    name: "Change the world, one slide at a time",
    description:
      "Speak on a technical topic at an internal one-hour presentation.",
    date: "2019-04-23",
    tags: "share, people"
  },
  {
    name: "Duly notified",
    description:
      "Attend an in-house tutorial on AWS Simple Notification Service.",
    date: "2019-04-10",
    tags: "aws, learn, microservices"
  },
  {
    name: "Blurred lines",
    description:
      "Cache an app with a Service Worker to allow users to access it offline.",
    date: "2019-04-09",
    tags: "experiment, javascript, front end, pwa"
  },
  {
    name: "Media Jam Session",
    description: "Make an app sweeter with the Media Session API.",
    date: "2019-04-02",
    tags: "front end, mobile, learn, javascript, experiment"
  },
  {
    name: "Last night a DevOps saved my life",
    description:
      "Be infinitively grateful for having the DevOps team help me clean up my AWS config.",
    date: "2019-03-29",
    tags: "people, aws, team player, learn"
  },
  {
    name: "Boom!",
    description:
      "Delete the content of my <code>bin</code> folder by mistake with <code>rm -rf</code>.",
    date: "2019-03-28",
    tags: "learn"
  },
  {
    name: "Labor of love",
    description: "Get some Web Workers cracking in a project.",
    date: "2019-03-21",
    tags: "experiment, javascript, front end, mobile, pwa"
  },
  {
    name: "For old time's sake",
    description: "Find a use case for <code>&lt;optgroup&gt;</code>.",
    date: "2019-03-16",
    tags: "learn, html, javascript, front end"
  },
  {
    name: "01100011101001112",
    description:
      "Use <code>input</code>, <code>FileReader</code> and <code>DataView</code> to upload and process binary files with HTML5.",
    date: "2019-03-06",
    tags: "learn, html, javascript, front end"
  },
  {
    name: "The alternative",
    description: "Briefly work on a project that uses <code>grunt</code>.",
    date: "2019-03-04",
    tags: "learn, javascript, front end"
  },
  {
    name: "Cliffhanger",
    description: "Learn about the React Suspense API.",
    date: "2019-02-27",
    tags: "learn, javascript, front end, react"
  },
  {
    name: "Froggie",
    description: "Listen to a web dev podcast in French.",
    date: "2019-02-27",
    image: "french-flag",
    imageClass: "yg-image-contain",
    tags: "learn"
  },
  {
    name: "You're doing it wrong",
    description:
      "Read a tweet that shows you a better way to use the React API.",
    date: "2019-02-15",
    tags: "learn, javascript, react, front end, share"
  },
  {
    name: "That was useful.",
    description: "Insert emojis in a commit message.",
    date: "2019-02-06"
  },
  {
    name: "Bro dawg",
    description: "Salivate on Data Dog's killer features.",
    date: "2019-02-05",
    tags: "learn, microservices, back end"
  },
  {
    name: "Dude, where's my cache?",
    description: "Attend a presentation about <code>dataloader</code>.",
    date: "2019-02-05",
    tags: "learn, javascript, microservices, back end"
  },
  {
    name: "It don't mean a thing",
    description: "Find a proper use case for <code>do ... while</code>.",
    date: "2019-02-04",
    tags: "learn, javascript"
  },
  {
    name: "Perverted",
    description:
      "Hack <code>border-image</code> to create a transparent gradient effect at the bottom of a <code>div</code>.",
    date: "2019-02-04",
    tags: "learn, css, front end, experiment"
  },
  {
    name: 100,
    description: "Get 100% test coverage on a project.",
    date: "2019-02-04",
    tags: "people"
  },
  {
    name: "Statistically significant",
    description: "Be #1 developer on the company's GitPrime leaderboard.",
    date: "2019-02-04",
    tags: "people"
  },
  {
    name: "It's the future, baby.",
    description: "Read about distributed tracing.",
    date: "2019-02-01",
    tags: "learn, microservices, back end"
  },
  {
    name: 'set "achievement" = ?',
    description:
      "Get a better understanding of the concept of data binding in the world of databases.",
    date: "2019-02-01",
    tags: "learn, aws, data stores, back end"
  },
  {
    name: "Abort! Abort!",
    description:
      "Discover the <code>ROLLBACK</code> SQL command while messing around in Redshift.",
    date: "2019-02-01",
    tags: "learn, aws, data warehouses, back end"
  },
  {
    name: "John Doe",
    description: "Truly mock a database for testing purposes.",
    date: "2019-01-31",
    tags: "learn, automation, javascript, back end"
  },
  {
    name: "it('Works')",
    description: "Write some unit tests with <code>jest</code>.",
    date: "2019-01-29",
    tags: "learn, automation, javascript"
  },
  {
    name: "AutoFormat",
    description:
      "Relish the pleasure of linting my code automatically on save.",
    date: "2019-01-29",
    tags: "learn, automation"
  },
  {
    name: "Just the right thing",
    description:
      "Be grateful for the existence of <code>document.activeElement.blur()</code>.",
    date: "2019-01-26",
    tags: "learn, javascript, front end"
  },
  {
    name: "There's an API for that™",
    description: "Leverage the Page Visibility API for a cool effect.",
    date: "2019-01-26",
    tags: "learn, javascript, front end"
  },
  {
    name: "CSS Mastermind",
    description:
      'Create a <img src="../../assets/doom.png" class="yg-achievement-inline-image"> CSS-only theme for my personal website.',
    date: "2019-01-25",
    tags: "videogames, css, html, front end"
  },
  {
    name: "Wait, wait, don't tell me!",
    description:
      "Triumphantly find the bug while the whole team is staring at the code gathered around a coworker's monitor.",
    date: "2019-01-24",
    image: "eyes",
    tags: "team player, people"
  },
  {
    name: "FOMO",
    description: "Catch up on all unread Slack messages during the weekend.",
    date: "2019-01-18",
    image: "infinity-notification-bubble",
    tags: "share"
  },
  {
    name: "Eureka!",
    description: "Understand how aliases work in webpack.",
    date: "2019-01-15",
    image: "light-bulb",
    tags: "learn, javascript"
  },
  {
    name: "Everything is AWESOME",
    description: "Be proud of my team.",
    date: "2019-01-14",
    image: "lego",
    tags: "team player, people"
  },
  {
    name: "AMA",
    description: "Help organize a workshop on microservices with AWS.",
    date: "2019-01-12",
    image: "wrench",
    imageClass: "yg-image-contain",
    tags: "share, teach, aws, microservices"
  },
  {
    name: "RTFM",
    description:
      "Read thoroughly a page of AWS documentation without killing myself.",
    date: "2019-01-11",
    image: "book",
    tags: "learn, aws"
  },
  {
    name: "Trophy tag",
    description: "Put the <code>&lt;object&gt;</code> tag to work.",
    date: "2019-01-09",
    image: "trophy",
    tags: "learn, html"
  },
  {
    name: "Easy!",
    description:
      "Become a CSS <code>transition-timing-functions</code> superhero.",
    date: "2019-01-08",
    image: "bezier-curve",
    imageClass: "yg-achievement-beige",
    tags: "learn, css"
  },
  {
    name: "So meta",
    description:
      "Come up with the idea of adding achievements to my personal website.",
    date: "2019-01-08",
    image: "lock-open",
    tags: "experiment, share"
  },
  {
    name: "Use the force",
    description: "Choose MDN over W3Schools.",
    date: "2019-01-07",
    image: "deathstar",
    tags: "learn, open source"
  },
  {
    name: "Give back",
    description: "Contribute to an open source project.",
    date: "2019-01-03",
    image: "pull-request",
    imageClass: "yg-achievement-white yg-image-contain",
    tags: "share, open source"
  },
  {
    name: "One frame at a time",
    description: "Use <code>steps()</code> in a stylesheet.",
    date: "2019-01-01",
    image: "stairs",
    tags: "learn, css"
  },
  {
    name: "Ad hoc",
    description: "Write a bunch of higher-order components.",
    date: "2018-12-13",
    image: "haddock",
    imageClass: "yg-image-contain",
    tags: "learn, javascript, react, front end"
  },
  {
    name: "Influenza",
    description: "Have 100 followers on twitter.",
    date: "2018-11-30",
    image: "egg",
    tags: "share"
  },
  {
    name: "The man, the legend",
    description: "Meet Dave Hahn in person.",
    date: "2018-11-29",
    tags: "learn, people"
  },
  {
    name: "Talk is cheap",
    description: "Go to a conference. Preferably re:Invent.",
    date: "2018-11-26",
    image: "smile",
    tags: "learn, share, aws"
  },
  {
    name: "Houston, we have a problem",
    description:
      "Implement Apollo in an application and suffer because this library is so broken.",
    date: "2018-10-29",
    image: "rocket",
    tags: "experiment, javascript, react, front end"
  },
  {
    name: "Redshift alert",
    description: "Familiarize myself with Redshift.",
    date: "2018-10-23",
    tags: "aws, data warehouses, back end"
  },
  {
    name: "IDDQD",
    description: "Write a Doom-like game engine in JavaScript.",
    date: "2018-08-06",
    tags: "experiment, videogames, javascript"
  },
  {
    name: "Travelling without moving",
    description: "Design a <code>BearerStrategy</code> for Passport.",
    date: "2018-07-18",
    tags: "auth, javascript, back end"
  },
  {
    name: "Freedom Friday",
    description:
      "Enjoy 2 hours of time per week to work on personal projects on the job.",
    date: "2018-07-13",
    tags: "experiment"
  },
  {
    name: "Tech support",
    description: "Get to know the DevOps team.",
    date: "2018-07-09",
    tags: "people, aws"
  },
  {
    name: "Out of the blue",
    description:
      "Randomly find the existence of the <code>util</code> Node module.",
    date: "2018-07-03",
    tags: "javascript, back end"
  },
  {
    name: "Copycat",
    description: "Learn GraphQL, like everybody else.",
    date: "2018-07-02",
    image: "graphql",
    tags: "experiment, javascript, full stack"
  },
  {
    name: "Dungeons & Co-workers",
    description: "Play Gloomhaven with my colleagures during our lunch break.",
    date: "2018-06-29",
    tags: "team player, people"
  },
  {
    name: "Gold digger",
    description: "Work at a company that employs 100+ people.",
    date: "2018-06-25",
    image: "cbtnuggets",
    tags: "learn, people"
  },
  {
    name: "Coup fourré",
    description: "Get a flat tire on my first day.",
    date: "2018-06-25",
    image: "creve"
  },
  {
    name: "I want to ride my bicycle",
    description: "Bike to work every day.",
    date: "2018-06-25"
  },
  {
    name: "On the sunny side of the street",
    description:
      "Make a great first impression on my interviewers with a big smile during the meeting.",
    date: "2018-06-11",
    tags: "people"
  },
  {
    name: "Greenthumb",
    description: "Use MongoDB in a project.",
    date: "2018-05-25",
    image: "tree",
    tags: "experiment, back end, data stores"
  },
  {
    name: "Malnourished",
    description: "Write a script to programatically build an XML feed.",
    date: "2018-05-15",
    tags: "learn, html, javascript"
  },
  {
    name: "Dr Hyde",
    description: "Use Jekyll for a website.",
    date: "2018-05-11",
    tags: "experiment, html"
  },
  {
    name: "I haz skillz",
    description: "Create an Alexa Skill.",
    date: "2018-05",
    tags: "experiment, aws, IoT"
  },
  {
    name: "Never again",
    description: "Get rid of Bootstrap. Write stylesheets from scratch.",
    date: "2018-04-21",
    tags: "css"
  },
  {
    name: "So modern",
    description: "Conceive a mobile app in Swift.",
    date: "2018-04",
    image: "swift",
    tags: "experiment, mobile, front end"
  },
  {
    name: "Late bloomer",
    description: "Write my first line of Java.",
    date: "2018-04",
    image: "java",
    imageClass: "yg-image-contain",
    tags: "experiment, mobile, front end"
  },
  {
    name: "Going Native",
    description: "Experiment with React Native.",
    date: "2018-04",
    image: "react",
    tags: "experiment, mobile, javascript, react, front end"
  },
  {
    name: "C minus",
    description: "Maintain a codebase written in Objective-C and cry.",
    date: "2018-04",
    tags: "experiment, mobile, front end"
  },
  {
    name: "Autoaim",
    description: "Find a use for the <code>:target</code> pseudo-class.",
    date: "2018-03-15",
    image: "target",
    tags: "experiment, css"
  },
  {
    name: "No more stick figures",
    description: "Work in close collaboration with a graphic designer.",
    date: "2018-03",
    image: "stick-figure",
    tags: "team player, people, css"
  },
  {
    name: "Style all the things!",
    description: "Discover the beauty of styled components.",
    date: "2018-03",
    image: "monalisa",
    tags: "learn, css, react, javascript, front end",
    imageClass: "yg-image-contain"
  },
  {
    name: "Gridlock",
    description: "Unleash the full potential of CSS grid.",
    date: "2018-03",
    image: "simcity",
    tags: "learn, css, front end"
  },
  {
    name: "It's complicated...",
    description: "Familiarize myself with object relational mapping.",
    date: "2018-03",
    image: "map",
    tags: "learn, back end, data stores"
  },
  {
    name: "I'm flexo",
    description: "Become a CSS flexbox master.",
    date: "2018-02",
    image: "flexo",
    tags: "learn, css"
  },
  {
    name: "SWAG I really need",
    description: "Receive a free pair of socks.",
    date: "2017-09-21",
    image: "socks"
  },
  {
    name: "Views on Vue",
    description: "Run an application with Vue.",
    date: "2017-08-31",
    image: "vue",
    imageClass: "yg-image-contain",
    tags: "experiment, javascript, front end"
  },
  {
    name: "Blurring the lines",
    description: "Follow a tutorial on IndexedDB.",
    date: "2017-07-16",
    tags: "experiment, javascript, front end"
  },
  {
    name: "So basic",
    description: "Be exposed to Visual Basic.",
    date: "2017-06",
    image: "zelda",
    tags: "learn, front end"
  },
  {
    name: "Power user",
    description: "Spin up a DynamoDB table.",
    date: "2017-04-22",
    tags: "learn, aws, back end, data stores, microservices",
    image: "lightning"
  },
  {
    name: "AWS-101",
    description: "Deploy my first Lambda behind API Gateway.",
    date: "2017-04-20",
    image: "lambda",
    tags: "learn, aws, microservices"
  },
  {
    name: "The cake is a lie",
    description:
      "Open an AWS account. Don't spend a single dollar on it for the next 12 months.",
    date: "2017-04-18",
    image: "cake",
    tags: "experiment, aws, microservices"
  },
  {
    name: "The path is clear.",
    description: "Draw SVGs.",
    date: "2017-04-17",
    image: "carcassonne",
    tags: "experiment"
  },
  {
    name: "Fake plastic trees",
    description: "Try and give up on Polymer.",
    date: "2017-04-07",
    image: "polymer",
    imageClass: "yg-image-contain",
    tags: "experiment, javascript"
  },
  {
    name: "Code till you die",
    description: "Participate to a hackathon.",
    date: "2017-04-07",
    image: "skull",
    tags: "team player, people"
  },
  {
    name: "Evil unleashed",
    description: "Dive deep into the source code of Doom.",
    date: "2017-03-17",
    image: "romero",
    imageClass: "yg-image-contain",
    tags: "learn, videogames"
  },
  {
    name: "Out on a limb",
    description: "Get acquainted with Elm.",
    date: "2017-02-23",
    image: "elm",
    imageClass: "yg-achievement-white",
    tags: "experiment, front end"
  },
  {
    name: "A big rock",
    description: "Design a .NET application.",
    date: "2017-02",
    image: "runestone",
    tags: "learn"
  },
  {
    name: "Top of the line",
    description: "Get a laptop for work.",
    date: "2017-02"
  },
  {
    name: "Tickets, please",
    description: "Discover the incredible world of JIRA.",
    date: "2017-01",
    image: "jira",
    imageClass: "yg-achievement-white",
    tags: "learn"
  },
  {
    name: "Biped",
    description: "Walk to work every day.",
    date: "2017-01"
  },
  {
    name: "Beer o' clock",
    description: "Go to a tech meetup.",
    date: "2016-11-01",
    image: "beer",
    tags: "people"
  },
  {
    name: "Thrifty",
    description: "Host a project on GitHub Pages.",
    date: "2016-11",
    tags: "front end"
  },
  {
    name: "A plate and a boiler",
    description:
      "Give new projects a kick start with <code>create-react-app</code>.",
    date: "2016-11",
    image: "flask",
    imageClass: "yg-image-contain",
    tags: "learn, javascript, react, front end"
  },
  {
    name: "Soooo hype",
    description: "Get started with React.",
    date: "2016-10",
    image: "react",
    tags: "learn, javascript, react, front end"
  },
  {
    name: "Too cool for school",
    description: "Use the <code>class</code> JavaScript keyword.",
    date: "2016-10",
    image: "sunglasses",
    imageClass: "yg-achievement-white",
    tags: "learn, javascript, react, front end"
  },
  {
    name: "Hey, Google",
    description: "Leverage the Google APIs in an application.",
    date: "2015-06",
    image: "g",
    imageClass: "yg-image-contain-none",
    tags: "learn"
  },
  {
    name: "Baker 2.0",
    description: "Found an online bakery.",
    image: "baguette",
    date: "2015-05-05",
    tags: "experiment"
  },
  {
    name: "Anyplace, Anywhere, Anytime",
    description: "Write code on a tablet.",
    date: "2015-03"
  },
  {
    name: "Collaborator",
    description: "Open a GitHub account.",
    date: "2014-06-09",
    image: "octocat",
    imageClass: "yg-achievement-white",
    tags: "share, open source"
  },
  {
    name: "Fashion victim",
    description: "Create a Wordpress site.",
    date: "2014-04-10",
    image: "w",
    imageClass: "yg-achievement-white",
    tags: "learn"
  },
  {
    name: "Pro bono",
    description: "Design a website for a friend.",
    date: "2008",
    image: "bono",
    tags: "people, css, html"
  },
  {
    name: "Terminal stage",
    description: "Switch to Ubuntu. Never look back.",
    date: "2007",
    image: "tux",
    imageClass: "yg-achievement-grey",
    tags: "open source"
  },
  {
    name: "Off-topic",
    description: "Write a Tic-Tac-Toe program on my TI-92+ calculator.",
    date: "2006",
    image: "calculator",
    tags: "experiment"
  },
  {
    name: "l33t",
    description:
      "Program key bindings that automatically buy equipment in Counter Strike.",
    date: "2005",
    tags: "videogames"
  },
  {
    name: "Number one fan",
    description: "Create my first website.",
    date: "2001",
    image: "doomguy",
    imageClass: "yg-image-contain",
    tags: "learn, videogames, html, css"
  },
  {
    name: "Math.random()",
    description:
      "Create a scripted StarCraft map where two AIs fight each other.",
    date: "2000",
    tags: "videogames"
  },
  {
    name: "Use your imagination",
    description: "Draw my own Doom levels on paper when I'm bored.",
    date: "2000",
    tags: "videogames"
  },
  {
    name: "Zug, zug",
    description: "Fool around with the sounds of the units in Warcraft II.",
    date: "1999",
    image: "grunt",
    tags: "videogames"
  }
];
