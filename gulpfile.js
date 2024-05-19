const gulp = require('gulp');
//sass转成css
const sass = require('gulp-sass')( require ( 'sass' ) ) 

const minifyCSS = require('gulp-minify-css') //压缩
gulp.task('sass',async function(){
    return gulp.src('components/css/*')
    .pipe(sass())
    .pipe(minifyCSS())
    .pipe(gulp.dest('dist/css'))
})



