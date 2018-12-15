const express      = require('express'), // to create an express application 
app          = express(), // express function is a top level function, this must be always
bodyParser   = require('body-parser'), // to extract the entire body portion of an requesrt and exposes it on "req.body"
env          = process.env,
fs = require('fs'); //use file system module 

app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());

app.use(function(req, res, next) { // app. use is for binding middleware 

  if(req.hostname==="localhost"){
    res.redirect(301, 'localhost' + req.path);
  }else{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  }

});

//app. use only sees whether url starts with the specified path 
//app. all will match complete path 

app.use(express.static(__dirname + '/build')); //think could be + /build/static

app.get('/html/:lang/:name', function(req, res){
  res.sendFile('build/html/'+req.params.lang+'/'+req.params.name+'.html', { root: __dirname });
});


app.all('/*', function(req, res) { // all means it applies on all http methods, will match complete path  

  // send the index.html for other files to support HTML5Mode
  fs.exists('build/index.html.gz', (exists) => {
    if(exists){
      res.set('Content-Encoding', 'gzip');
      res.set('Content-Type', 'text/html');
      res.sendFile('build/index.html.gz', { root: __dirname });
    }else{
      res.sendFile('build/index.html', { root: __dirname });
    }
  });

});

console.log(env.PORT||9999); //write to the console 
app.listen(env.PORT || 8080, function () { //for start the server (can see it the output on the terminal)
  console.log(
    '\The application has started! \nPID: %d \nOn %s:%s...',
    process.pid, (env.NODE_IP ? env.NODE_IP : 'localhost'), (env.PORT ? env.PORT : '8080')
  );

});
