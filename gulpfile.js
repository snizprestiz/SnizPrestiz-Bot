const gulp = require("gulp");
const tsc = require("gulp-typescript");
const sourcemaps = require("gulp-sourcemaps");
const terser = require("gulp-terser");

const tscProject = tsc.createProject({
	module: "commonjs",
	moduleResolution: "node",
	target: "es6",
	removeComments: true
});

gulp.task("build-typescript", () => gulp.src("Source/**/*.ts")
	.pipe(sourcemaps.init())
	.pipe(tscProject())
	.pipe(terser())
	.pipe(sourcemaps.write(".", { sourceRoot: "../Source", includeContent: false }))
	.pipe(gulp.dest("Build/"))
);

gulp.task("default", (done) => {
	gulp.task("build-typescript")();
	if (done) done();
});

gulp.task("watch", () => {
	gulp.task("default")();
	gulp.watch('Source/**/*.ts', { usePolling: true }, gulp.task("build-typescript"));
});