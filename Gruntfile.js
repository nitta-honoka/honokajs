module.exports = function (grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        concat: {
            options: {
                separator: "\n\n"
            },
            dist: {
                src: [
                    'src/_intro.js',
                    'src/main.js',
                    'src/ajax.js',
                    'src/dom.js',
                    'src/handle.js',
                    'src/event.js',
                    'src/_outro.js'
                ],
                dest: 'dist/<%= pkg.name.replace(".js", "") %>.js'
            }
        },
        jasmine: {
			coverage: {
				src: 'dist/honokajs.js',
				options: {
					specs: 'test/*.js',
					template: require('grunt-template-jasmine-istanbul'),
					templateOptions: {
						coverage: 'coverage/coverage.json',
						report: [
							{
								type: 'html',
								options: {
									dir: 'coverage/html'
								}
							},
							{
								type: 'cobertura',
								options: {
									dir: 'coverage/cobertura'
								}
							},
							{
								type: 'text-summary'
							}
						]
					}
				}
			}
		},
        uglify: {
            options: {
                banner: '/*! <%= pkg.name.replace(".js", "") %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'dist/<%= pkg.name.replace(".js", "") %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },

        qunit: {
            files: ['test/*.html']
        },

        jshint: {
            files: ['dist/honokajs.js'],
            options: {
                globals: {
                    console: true,
                    module: true,
                    document: true
                },
                jshintrc: '.jshintrc'
            }
        },

        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['concat', 'jshint', 'qunit']
        }

    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    // grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    // grunt.registerTask('test', ['jshint', 'qunit']);
    grunt.registerTask('test', ['jasmine:coverage']);
    grunt.registerTask('default', ['concat', 'jasmine:coverage', 'uglify']);

};
