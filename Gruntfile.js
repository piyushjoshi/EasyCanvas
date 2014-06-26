module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
	clean: [
		'dist'
	],
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'dist/<%= pkg.name %>.js',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    concat: {
		  options: {
			// define a string to put between each file in the concatenated output
			separator: ''
		  },
		  dist: {
			// the files to concatenate
			src: ['src/EasyCanvas.prefix','src/contextWrapper.js','src/exposeAPI.js','src/shapes/shapes.js',
				'src/shapes/circle.js', 'src/shapes/image.js', 'src/shapes/linearGradient.js', 'src/shapes/rectangle.js',
				'src/shapes/text.js', 'src/shapes/loadShapes.js', 'src/EasyCanvas.suffix' ],
			// the location of the resulting JS file
			dest: 'dist/<%= pkg.name %>.js'
		  }
		}
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');


  // Default task(s).
  grunt.registerTask('default', ['clean','concat','uglify']);

};
