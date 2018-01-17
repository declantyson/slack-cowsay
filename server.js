const package = require('./package.json'),
      http = require('http'),
      express = require('express'),
      bodyParser = require('body-parser'),
      app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/', function(req,res) {

    let words = req.body.text.split(' '),
        lines = [],
        current_line = "",
        current_line_index = 0,
        MAX_LINE_LENGTH = 40;


    let cowsay = "\`\`\`" +
        " ________________________________________\n";

    words.forEach(function (word) {
        if((current_line + word).length < MAX_LINE_LENGTH) {
            current_line += " " + word;
        } else {
            current_line = word;
            current_line_index++;
        }

        lines[current_line_index] = current_line;
    });

    if(lines.length === 1) {
        lines[0] = "\< " + lines[0] + " \>";
    } else {
        lines[0] = "\/ " + lines[0] + " \\";
        for(let i = 1; i < lines.length - 1; i++) {
            lines[i] = "| " + lines[i] + " |";
        }
        lines[lines.length - 1] = "\\ " + lines[lines.length - 1] + " \/";

    }

    cowsay += lines.join("\n");
    cowsay += "" +
        " ----------------------------------------\n" +
        "        \\\\   ^__^\n" +
        "         \\\\  (oo)\\\\_______\n" +
        "            (__)\\\\       )\\\\/\\\\\n" +
        "                ||----w |\n" +
        "                ||     ||" +
        "```"

    res.json({
        "text" : cowsay
    });
});

http.createServer(app).listen(3000);

console.log("App running on 3000");