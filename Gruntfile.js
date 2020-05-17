module.exports = function(grunt) {

    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      uglify: {
        options: {
          banner: '/*! Copy o.soletormos <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        build : {
            src: 'src/**/*.js',
            dest: 'build/js/all.js'
        }
      },
      watch: {
        scripts: {
        files: ['src/**/*.js', 'src/**/*.html', 'src/**/*.css', 'src/**/*.pug'],
        tasks: ['dev'],
        options: {
          spawn: false,
        },
        }
      },
      clean: ['build/**'],
      copy: {
        main: {
          files: [
            // includes files within path
            {expand: true, cwd: 'src/', src: ['**/*.html', 'img/*'], dest: 'build/', filter: 'isFile'}
          ],
        },
      },
      jshint: {
        options: {
            "curly": true,
            "eqnull": true,
            "eqeqeq": true,
            "undef": true,
            "globals": {
              "jQuery": true,
              "module": true,
              "console": true
            }
        }, 
        all: ['Gruntfile.js', 'src/js/*.js']
      },
      imagemin: {
        dynamic: {
          files: [{
            options: {
              optimizationLevel: 7,
          },
              expand: true,
              cwd: 'src/img/',
              src: ['**/*.{png,jpg,gif}'],
              dest: 'build/img/'
          }]
      }
      }
    });
  
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
  
    grunt.registerTask('dev', ['jshint','clean','copy','uglify','imagemin']);
    grunt.registerTask('default', ['watch']);
    };