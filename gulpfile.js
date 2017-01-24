'use strict';

    var gulp = require('gulp');
    var sass = require('gulp-sass');
    var cssnano = require('gulp-cssnano');
    var sourcemaps = require('gulp-sourcemaps');
    var autoprefixer = require('gulp-autoprefixer');
    var bs = require('browser-sync').create(); 
    
        
    gulp.task('workflow', function () {
        
      gulp.src('./src/sass/**/*.scss')
      
            .pipe(sourcemaps.init())
        
            .pipe(sass().on('error', sass.logError))
        
            .pipe(autoprefixer({
            
            browsers: ['last 2 versions'],
          
            cascade: false
          
        }))
        
        .pipe(cssnano())
        
        .pipe(sourcemaps.write('./'))
    
        .pipe(gulp.dest('./dist/css/'))
        
        .pipe(bs.reload({stream: true}));
      
    });
    
    // define default tak
    gulp.task('default', function () {
        
        gulp.watch('./src/sass/**/*.scss', ['workflow']);
        
        gulp.watch("*.html").on('change', bs.reload);
        
  
    });
    

    gulp.task('browser-sync', function() {
        
        bs.init({
                
            
            server: {
            
            baseDir: "./"
            
        
        }
        
        });
        
    });

    
    
