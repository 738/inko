'use strict';

import gulp from 'gulp';
import gutil from 'gulp-util';
import uglify from 'gulp-uglify-es';
import mocha from 'gulp-mocha';
import rename from 'gulp-rename';
import sourcemaps from 'gulp-sourcemaps';
import pump from 'pump';
import ts from 'gulp-typescript';

let tsProject = ts.createProject("tsconfig.json");

gulp.task('test', () =>
    gulp.src('test/**/*.js')
        .pipe(mocha())
);

gulp.task('watch', () => {
    gulp.watch(['inko.js', 'gulpfile.babel.js', 'test/**/*.js'], ['test'])
});


gulp.task('build', (cb) => {
    pump([gulp.src('inko.js'), sourcemaps.init(),
        rename('inko.min.js'), uglify(), sourcemaps.write('.'),
        gulp.dest('./'),
    ], cb);
})

gulp.task('default', ['watch', 'test'], () => {
    gutil.log('Gulp is running...');
});

gulp.task("default", function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("dist"));
});
