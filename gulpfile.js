/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

 
// get the dependencies
var gulp        = require('gulp'), 
  childProcess  = require('child_process'), 
  electron      = require('electron-prebuilt'),
  shell         = require('gulp-shell'),
  gulp_electron = require('gulp-electron');
  
var packageJson = require('./resources/app/package.json');

gulp.task('copy-materialize-js', function() {
    gulp.src('./resources/app/assets/js/materialize.js')
    // Perform minification tasks, etc here
    .pipe(gulp.dest('./resources/app/node_modules/materialize'));
});

gulp.task('copy-config', function() {
    gulp.src('./resources/app/config.json')
    .pipe(gulp.dest('C:/Users/misc2/AppData/Roaming/DataSec'));
});

// create the gulp task
gulp.task('run', function () { 
  childProcess.spawn(electron, ['./resources/app'], { stdio: 'inherit' }); 
});

gulp.task('start_db', shell.task(['mongod -dbpath "C:/Data/db"']));
  
gulp.task('db_dump', shell.task(['mongodump --host localhost:27017 --db DataSec --out "C:\Users\misc2\Documents\NetBeansProjects\DataSecDesktop\resources\app\database\data\dump"']));

gulp.task('db_restore', shell.task(['mongorestore --host localhost:27017 --db DataSec "C:\Users\misc2\Documents\NetBeansProjects\DataSecDesktop\resources\app\database\data\dump"']));

gulp.task('release', function() {
    gulp.src("")
    .pipe(gulp_electron({
        src: './resources/app',
        packageJson: packageJson,
        release: './release',
        cache: './cache',
        version: 'v1.6.6',
        packaging: false,
        platforms: ['win32-ia32'],
//        platforms: ['win32-ia32' , 'darwin-x64'],
        platformResources: {
//            darwin: {
//                CFBundleDisplayName: packageJson.name,
//                CFBundleIdentifier: packageJson.name,
//                CFBundleName: packageJson.name,
//                CFBundleVersion: packageJson.version,
//                icon: 'gulp-electron.icns'
//            },
            win: {
                "version-string": packageJson.version,
                "file-version": packageJson.version,
                "product-version": packageJson.version,
                "icon": './resources/app/assets/img/icon.ico'
            }
        }
    }))
    .pipe(gulp.dest(""));
});
