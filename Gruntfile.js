module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    connect: {
      server: {
        options: {
          port: 8080,
          base: './dest'
        }
      }
    },

    concat: {
      dist: {
        src: [
          "bower/**/*.min.js",
          "src/lib/**/*.js",
          "src/game/**/*.js"
        ],
        dest: 'dest/js/<%= pkg.name %>.js'
      }
    },

    jshint: {
      files: ['Gruntfile.js', 'src/game/**/*.js', 'test/**/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },

    copy: {
      index: {
        src: 'src/index.html',
        dest: 'dest/index.html'
      },
      assets: {
        expand: true,
        cwd: 'src/assets',
        src: '**',
        dest: 'dest/assets'
      }
    },

    watch: {
      gruntfile: {
        files: 'Gruntfile.js',
        tasks: ['jshint']
      },
      assets: {
        files: 'src/assets/**/*.js',
        tasks: ['copy']
      },
      src: {
        files: ['bower_components/**/*.js', 'src/**/*.js'],
        tasks: ['jshint', 'concat']
      }
    },

    open: {
      dev: {
        path: 'http://127.0.0.1:8080/index.html'
      }
    }
  });

  // measures the time each task takes
  require('time-grunt')(grunt);

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-open');

  //grunt.loadNpmTasks('grunt-contrib-copy');
  //grunt.loadNpmTasks('grunt-contrib-cssmin');
  //grunt.loadNpmTasks('grunt-contrib-htmlmin');
  //grunt.loadNpmTasks('grunt-contrib-imagemin');
  //grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['jshint', 'concat', 'copy', 'connect', 'watch']);
  grunt.registerTask('fast', ['jshint', 'concat', 'connect', 'watch']);
};
