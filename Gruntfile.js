module.exports = function (grunt) {
	'use strict';

	var targetsList = [
		'pages-desktop/common/',
		'pages-desktop/index/'
	];
	var defaultTask = 'enb copy rename replace prettify csso cssbeautifier autoprefixer';
	var watchTask = 'enb copy rename replace prettify csso cssbeautifier autoprefixer';
	var fullTask = 'clean imgo enb copy favicons rename replace prettify csso cssbeautifier autoprefixer csscomb';

	grunt.initConfig({
		meta: {
			styles: ['blocks-*/**/*.css', 'blocks-*/**/*.styl'],
			js: ['blocks-*/**/*.js'],
			bh: ['blocks-*/**/*.bh.js'],
			deps: ['blocks-*/**/*.deps.js'],
			bemjson: ['blocks-*/**/*.bemjson.js']
		},
		enb: {
			development: {
				beforeBuild: function () {
					console.log('beforeBuild');
				},
				afterBuild: function () {
					console.log('afterBuild');
				},
				targets: targetsList
			},
			options: {
				noLog: true
			}
		},
		clean: {
			build: {
				src: ["product/**/*"]
			}
		},
		copy: {
			css: {
				files: [
					{
						expand: true,
						flatten: true,
						src: ['pages-desktop/common/common.css', 'pages-desktop/common/common.ie9.css', 'pages-desktop/common/common.ie8.css', 'pages-desktop/common/common.ie.css'],
						dest: 'product/css/'
					}
				]
			},
			js: {
				files: [
					{
						expand: true,
						flatten: true,
						src: ['pages-desktop/common/common.js'],
						dest: 'product/js/'
					}
				]
			},
			html: {
				files: [
					{
						expand: true,
						flatten: true,
						src: ['pages-desktop/*//*.html'],
						dest: 'product/'
					}
				]
			}
		},
		rename: {
			main: {
				src: 'product/css/common.css',
				dest: 'product/css/styles.css'
			}/*,
			ie: {
				src: 'product/css/common.ie.css',
				dest: 'product/css/ie.css'
			},
			ie8: {
				src: 'product/css/common.ie8.css',
				dest: 'product/css/ie8.css'
			},
			ie9: {
				src: 'product/css/common.ie9.css',
				dest: 'product/css/ie9.css'
			}*/
		},
		prettify: {
			options: {
				"indent_size": 1,
				"condense": true,
				"indent_char": " ",
				"unformatted": ["a", "abbr", "acronym", "address", "b", "bdo", "big", "cite", "code", "del", "dfn", "dt", "em", "font", "h1", "h2", "h3", "h4", "h5", "h6", "i", "ins", "kbd", "pre", "q", "s", "samp", "small", "span", "strike", "strong", "sub", "sup", "tt", "u", "var" ]
			},
			html: {
				expand: true,
				cwd: 'product/',
				ext: '.html',
				src: ['*.html'],
				dest: 'product/'
			}
		},
		cssbeautifier : {
			files : ['product/css/*.css'],
			options : {
				indent:'	',
				openbrace:'end-of-line'
			}
		},
		replace: {
			html: {
				src: ['product/*.html'],
				overwrite: true,
				replacements: [
					{
						from: 'href="../common/common.css"',
						to: 'href="css/styles.css"'
					},
					/*{
						from: 'href="../common/common.ie8.css"',
						to: 'href="css/ie8.css"'
					},
					{
						from: 'href="../common/common.ie9.css"',
						to: 'href="css/ie9.css"'
					},
					{
						from: 'href="../common/common.ie.css"',
						to: 'href="css/ie.css"'
					},*/
					{
						from: 'src="../common/common.js"',
						to: 'src="js/common.js"'
					}
					/*{
					 from: /href=\"\/(common).css\//ig,
					 to: 'href="css/$1.css'
					}*/
				]
			},
			css: {
				src: ['product/css/*.css'],
				overwrite: true,
				replacements: [
					/*{
					 from: /href=\"\/(common).css\//ig,
					 to: 'href="css/$1.css'
					 }*/
				]
			}
		},
		autoprefixer: {
			mixdown: {
				options: {
					browsers: ['last 2 version', '> 1%', 'ie 8', 'ie 7']
				},
				files: [
					{
						expand: true,
						cwd: 'product/css',
						src: ['*.css'],
						dest: 'product/css',
						filter: 'isFile'
					}
				]
			}
		},
		csscomb: {
			main: {
				files: [
					{
						expand: true,
						cwd: 'product/',
						src: ['**/*.css'], // '**/*.styl',
						dest: 'product/',
						filter: 'isFile'
					}
				]
			}
		},
		csso: {
			compress: {
				options: {
					report: 'min',
					restructure: true
				},
				files: [
					{
						expand: true,
						cwd: 'product/css',
						src: ['*.css'],
						dest: 'product/css',
						filter: 'isFile'
					}
				]
			}

		},
		imgo: {
			icons: {
				src: ['blocks-*/**/*.png', 'blocks-*/**/*.jpg', 'blocks-*/**/*.gif']
			}
		},
		favicons: {
			options: {
				trueColor: true,
				precomposed: true,
				appleTouchBackgroundColor: "#fff",
				windowsTile: true,
				tileBlackWhite: false,
				tileColor: "#fff"
			},
			icons: {
				src: 'blocks-*/**/favicon.png',
				dest: 'product/'
			}
		},
		watch: {
			styl: {
				files: '<%= meta.styles %>',
				tasks: 'watching'
			},
			js: {
				files: '<%= meta.js %>',
				tasks: 'watching'
			},
			bh: {
				files: '<%= meta.bemhtml %>',
				tasks: 'watching'
			},
			deps: {
				files: '<%= meta.deps %>',
				tasks: 'watching'
			},
			bemjson: {
				files: '<%= meta.bemjson %>',
				tasks: 'watching'
			}
		}
	});

	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	// Compile
	grunt.registerTask('default', defaultTask.split(' '));
	grunt.registerTask('watching', watchTask.split(' '));
	grunt.registerTask('full', fullTask.split(' '));
};