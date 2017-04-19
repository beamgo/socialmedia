'use strict';

module.exports = {
	app: {
		title: 'Twister',
		description: 'A twitter clone',
		keywords: 'twitter, clone, mean'
	},
	port: process.env.PORT || 3000,
	templateEngine: 'jade',
	sessionSecret: 'MEAN',
	sessionCollection: 'sessions',
	assets: {
		lib: {
			css: [
				'public/lib/bootstrap/dist/css/bootstrap.css',
				'https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/1.12.3/semantic.min.css',

			],
			js: [
				'public/lib/angular/angular.js',
				'public/lib/angular/angular.min.js',
				'public/lib/angular-resource/angular-resource.js', 
				'public/lib/angular-cookies/angular-cookies.js', 
				'public/lib/angular-animate/angular-animate.js', 
				'public/lib/angular-touch/angular-touch.js', 
				'public/lib/angular-sanitize/angular-sanitize.js', 
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/lib/angular-ui-utils/ui-utils.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
				'public/lib/jquery/dist/jquery.min.js',
				'public/lib/bootstrap/dist/js/bootstrap.min.js',
				'public/lib/flow.js/dist/flow.min.js',
				'public/lib/ng-flow/dist/ng-flow.js',
				'public/lib/ng-file-upload/ng-file-upload-all.min.js',
				'public/lib/socket.io-client/dist/socket.io.js',
				'public/lib/angular-socket-io/socket.js',
				'public/lib/angular-route-styles/route-styles.js',
				'https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular-route.js'
			]
		},
		css: [
			'public/modules/**/css/*.css'
		],
		js: [
			'public/config.js',
			'public/application.js',
			'public/modules/*/*.js',
			'public/modules/*/*[!tests]*/*.js',
			// 'public/js/signup.js'
			'//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js',
			'https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/1.12.3/semantic.min.js',
			'public/js/jquery.storageapi.min.js',
			// 'public/js/chat.js'

		],
		tests: [
			'public/lib/angular-mocks/angular-mocks.js',
			'public/modules/*/tests/*.js'
		]
	}
};