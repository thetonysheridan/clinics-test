'use strict'

const del = require('del')
const gulp = require('gulp')
const typescript = require('gulp-typescript')

gulp.task('build:typescript:src', () => {
  let options = require('./tsconfig.json').compilerOptions

  return gulp.src('src/**/*.ts')
    .pipe(typescript(options))
    .pipe(gulp.dest('build/src'))
})

gulp.task('build:typescript:test', () => {
  let options = require('./tsconfig.json').compilerOptions

  // Fix for Mocha
  options.noUnusedLocals = false

  return gulp.src('test/**/*.ts')
    .pipe(typescript(options))
    .pipe(gulp.dest('build/test'))
})

gulp.task('clean', () => {
  return del('build')
})

gulp.task('build', gulp.series('build:typescript:src', 'build:typescript:test'))
