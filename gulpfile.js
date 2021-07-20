'use strict';

    var gulp = require('gulp'); //require gulp main node 
    var sass = require('gulp-sass'); //require sass plugin
    var cssnano = require('gulp-cssnano');// to minify see documentation
    var sourcemaps = require('gulp-sourcemaps'); // map css origin to map the source of the uncomplile code
    var autoprefixer = require('gulp-autoprefixer'); // autoprefix compiled css - to no worry about vendor prefixes
    var browserSync = require('browser-sync').create();//required and create instance of bs - as a local server
    var reload = browserSync.reload;
    var sassdoc = require('sassdoc');
    
     //sass task   
    gulp.task('sass', function () {
	    
	    //Find my sass files
	    gulp.src('./src/sass/**/*.scss')
	    
		//Initialize sourcemaps for better debugging
	    .pipe(sourcemaps.init())
	    
	    //Run sass on those files and tell me if I have errors	
	    .pipe(sass().on('error', sass.logError))
	    
	   //Add vendor prefixes to the compiled css
	   .pipe(autoprefixer({browsers: ['last 2 versions'],cascade: false}))
			
	   //Minify the compiled css
       .pipe(cssnano())
			
	   //Write the maps
	   .pipe(sourcemaps.write('./'))
			
	   //Send all to css folder
	   .pipe(gulp.dest('./dist/css/'))
			
		//Reload my browser
        .pipe(reload({stream: true}));
	});
	
    	
    //Build documentation of this project
    gulp.task('sassdoc', function () {
	    
	    var options = {
		    dest: 'docs',
		 	verbose: true,
		 };
	    
		return gulp.src('./src/sass/**/*.scss')
		
		.pipe(sassdoc(options))
		
	});
	
	// Initialize the server via browser sync 

    gulp.task('serve', ['sass'], function() {
        
        browserSync.init({
                
           server: "./"
        
    	});
        
		//Watch for changes on my scss files 
		gulp.watch('./src/sass/**/*.scss', ['sass']);
        
        // Watch for changes on my html files testest ing 
        gulp.watch("*.html").on('change', browserSync.reload);

        
    });
    
    // Run the serve taks which includes the sass task as a default task with command gulp
   	gulp.task('default', ['serve']);
    
    
     
   
    
    

    
    
