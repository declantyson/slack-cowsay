const package = require('./package.json'),
      http = require('http'),
      express = require('express'),
      bodyParser = require('body-parser'),
      app = express(),
      port = process.env.PORT || 1234;

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

    for(let i = 0; i < lines.length; i++) {
        let pad = new Array((MAX_LINE_LENGTH - lines[i].length) + 1).join(' '),
            start = "| ",
            end = " |";

        if(lines.length === 1) {
            start = "\< ";
            end = " \>";
        } else if(i === 0) {
            start = "\/ ";
            end = "\\";
        } else if (i === lines.length - 1) {
            start = "\\ ";
            end = " \/";
        }

        lines[i] = start + lines[i] + pad + end;
    }

    cowsay += lines.join("\n");
    cowsay += "\n" +
        " ----------------------------------------\n" +
        "        \\   ^__^\n" +
        "         \\  (oo)\\_______\n" +
        "            (__)\\       )\\/\\\n" +
        "                ||----w |\n" +
        "                ||     ||" +
        "```"

    res.json({
        "text" : cowsay
    });
});

http.createServer(app).listen(port);

console.log(`App running on ${port}`);