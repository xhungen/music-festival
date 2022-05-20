const { src, dest, watch, parallel } = require("gulp");
const plumber = require("gulp-plumber");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("autoprefixer");
const postcss = require("gulp-postcss");
const cssnano = require("cssnano");
const sourcemaps = require("gulp-sourcemaps");


//JAVASCRIPT 

const terser = require("gulp-terser");

//IMAGENES

const cache = require("gulp-cache");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");

//funciones

function css(done) {
  src("src/scss/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(plumber())

    .pipe(sass())

    .pipe(postcss([autoprefixer(), cssnano()]))

    .pipe(sourcemaps.write("."))

    .pipe(dest("build/css"));

  done(); //
}

function imagenes(done) {
  const op = {
    optimizationLevel: 3,
  };

  src("src/img/**/*.{jpg,png}")
    .pipe(cache(imagemin(op)))
    .pipe(dest("build/img"));

  done(); //
}

function versionWebp(done) {
  const op = {
    quality: 50,
  };

  src("src/img/**/*.{jpg,png}").pipe(webp(op)).pipe(dest("build/img"));

  done(); //
}

function javascript(done) {
  src("src/js/**/*.js")
  .pipe(terser())
  .pipe(dest("build/js"));

  done(); //
}

function dev(done) {
  watch("src/scss/**/*.scss", css);
  watch("src/js/**/*.js", javascript);

  done(); //
}

exports.css = css;
exports.versionWebp = versionWebp;
exports.imagenes = imagenes;
exports.javascript = javascript;
exports.dev = parallel(imagenes, versionWebp, javascript, dev);
