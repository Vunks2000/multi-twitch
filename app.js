var express        = require('express');
var bodyParser     = require('body-parser');
var cookieParser   = require('cookie-parser');
var cookieSession  = require('cookie-session');
var passport       = require('passport');
var twitchStrategy = require('passport-twitch').Strategy;

var app = express();

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cookieSession({secret:'somesecrettokenhere'}));
app.use(passport.initialize());
app.use(express.static('./build'));

passport.use(new twitchStrategy({
        clientID: 'kf8hyon7e40sq30csmy8rd2g1gpnhc',
        clientSecret: 'g4e7ps08mk7sf3qymlmpkx1i0790nr',
        callbackURL: 'http://localhost:3000/auth/twitch/callback',
        scope: 'user_read'
    },
    function(accessToken, refreshToken, profile, done) {
        console.log('accessToekn', accessToken);
        console.log('refreshToken', refreshToken);
        console.log('profile', profile);
        done(profile);
    }
));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

app.get('/', function (req, res) {
    res.render('index');
});

app.get('/auth/twitch', passport.authenticate('twitch'));
app.get('/auth/twitch/callback', passport.authenticate('twitch', { failureRedirect: '/' }), function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
});

app.listen(3000);
console.log('app started');