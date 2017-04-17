var http = require('http').Server(app);
var io = require('socket.io')(http);
 
// watson developer cloud SDK/language translation model invoke
var LanguageTranslatorV2 = require('watson-developer-cloud/language-translator/v2');
var language_translator = new LanguageTranslatorV2({
// Bluemix will handle username/password automatically by service
});
 
io.on('connection', function(socket) {
    socket.on('P', function(msg) {
        io.emit('P', msg);
        language_translator.translate({
            text: msg,
            source: 'en',
            target: 'fr'
        }, function(err, translation) {
            if (err) {
                console.log(err);
            } else {
                console.log(translation);
                io.emit('P', 'FR: ' + translation.translations[0].translation);
            }
        });
    });
});
 
// start server on the specified port and binding host
http.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
