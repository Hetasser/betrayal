module.exports = {	
	server: "http://localhost:7890", // the URL of Betrayal as seen by the browser
	base: "/", 	// path to Betrayal as seen by the browser
	port: 7890, // port on which to start Betrayal (might be hidden from the browser by a proxy)
	database: { //postgres://login:password@host/db
		url:"postgres://betrayal:betrayal@localhost/betrayal"
	},
	themes: {
	         tolkien: "starwars.css",
	         starwars: "tolkien.css"
	},	
	languages: {
		french: "french.dic",
		english: "english.dic"	
	},
	secrets: {
		session: 'sessionSecretToken',
		cookie: 'cookieSecretToken'
	},
	// connect-redis session store options. Leave empty to use default ones 
	redisStore: {
	},
}