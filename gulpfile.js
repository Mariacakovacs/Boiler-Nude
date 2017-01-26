'use strict';

    var gulp = require('gulp'); //require gulp main
    var sass = require('gulp-sass'); //require sass plugin
    var cssnano = require('gulp-cssnano');// to minify
    var sourcemaps = require('gulp-sourcemaps'); // map css origin
    var autoprefixer = require('gulp-autoprefixer'); // autoprefix compiled css 
    var browserSync = require('browser-sync').create();//required and create instance of bs
    var reload = browserSync.reload;
    var sassdoc = require('sassdoc');
    
    
    
    
     //sass task   
    gulp.task('sass', function () {
	    
	    //Find my sass files
	    gulp.src('./src/sass/**/*.scss')
	    
		//initialize sourcemaps for better debugging
	    .pipe(sourcemaps.init())
	    
	    //run sass on those files and tell me if i have errors	
	    .pipe(sass().on('error', sass.logError))
	    
	   //add vendor prefixes to the compile css
	        .pipe(autoprefixer({
	        
	        	browsers: ['last 2 versions'],
	      
				cascade: false
				
			}))
			
			//minify the compiled css
        
			.pipe(cssnano())
			
			//write the maps
        
			.pipe(sourcemaps.write('./'))
			
			//send all to css folder
    
			.pipe(gulp.dest('./dist/css/'))
			
			//reload my browser
        
			.pipe(reload({stream: true}));
			
      
    	});
    	
    	gulp.task('sassdoc', function () {
	    
	     var options = {
		 	dest: 'docs',
		 	verbose: true,
		 	
		 	
		 };
	    
		return gulp.src('./src/sass/**/*.scss')
		
		.pipe(sassdoc(options))
		
		
	});

    gulp.task('serve', ['sass'], function() {
        
        browserSync.init({
                
           server: "./"
        
        });
        
        
        gulp.watch('./src/sass/**/*.scss', ['sass']);
        
        gulp.watch("*.html").on('change', browserSync.reload);

        
    });
    
     
    
   	gulp.task('default', ['serve']);
    
    
     
   
    
    

    
    
