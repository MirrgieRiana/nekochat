'use strict';

const browserify = require('browserify');
const fs = require('fs');
const gulp = require('gulp');
const babel = require('gulp-babel');
const liveserver = require('gulp-live-server');
const sourcemaps = require('gulp-sourcemaps');
const gutil = require('gulp-util');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const watchify = require('watchify');

let server = liveserver.new('.');

gulp.task('default', ['build']);

gulp.task('build', ['build:server', 'build:browser']);
gulp.task('build:server', ['babel']);
gulp.task('build:browser', ['browserify']);

gulp.task('serve', ['server']);

gulp.task('watch', ['watch:server', 'watch:browser']);
gulp.task('watch:server', ['server'], () => {
    gulp.watch(['src/**/*', '!src/browser/**/*'], ['server']);
    gulp.watch(['dist/**/*', 'public/**/*', 'views/**/*'], file => server.notify(file));
});
gulp.task('watch:browser', ['watchify'], () =>
    gulp.watch(['src/**/*', '!src/server/**/*'], ['watchify']));

gulp.task(
    'sync-lib',
    next => {
        if (!fs.existsSync('lib')) return next();

        let read = (dir) =>
            fs.readdirSync(dir)
                .map(item => `${dir}/${item}`)
                .map(item => 
                    fs.statSync(item).isDirectory()
                    ? read(item).concat([ item ])
                    : [ item ]
                )
                .reduce((a, b) => a.concat(b));
        read('lib')
            .filter(item => !fs.existsSync(item.replace(/^lib/, 'src')))
            .forEach(item => {
                gutil.log(`rm ${item}`);
                if (fs.statSync(item).isDirectory()) {
                    fs.rmdirSync(item);
                } else {
                    fs.unlinkSync(item);
                }
            });
        return next();
    }
);

gulp.task(
    'babel', ['sync-lib'],
    () => gulp.src('src/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('lib'))
);

const BrowserifyConfig = {
    entries: ['lib/browser'],
    debug: true,
};
const bundle = function(b) {
    return function() {
        return b.bundle()
            .on('error', e => {
                throw e;
            })
            .pipe(source('browser.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init({loadMaps: true}))
            //.pipe(sourcemaps.write())
            .pipe(gulp.dest('dist/js'));
    };
};
const w = watchify(browserify(Object.assign({}, watchify.args, BrowserifyConfig)));
w.on('update', bundle);
w.on('log', gutil.log);
gulp.task('watchify', ['babel'], bundle(w));
gulp.task('browserify', ['babel'], bundle(browserify(BrowserifyConfig)));

gulp.task('server', ['babel'], next => {
    server.start();
    next();
});