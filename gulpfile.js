const { dest, parallel, series, src } = require( 'gulp' );
const del = require( 'del' );
const minify = require('gulp-minify');
const sass = require( 'gulp-sass' );
const wpPot = require( 'gulp-wp-pot' );
const zip = require( 'gulp-zip' );

const buildDir = 'build/sensei-course-participants';

function clean() {
	return del( [ 'build' ] );
}

function css() {
	return src( 'assets/css/*.scss')
		.pipe( sass( { outputStyle: 'expanded' } ) )
		.pipe( dest( 'assets/css' ) )
		.pipe( dest( buildDir + '/assets/css' ) )
}

function cssMinify() {
	return src( 'assets/css/*.scss')
		.pipe( sass( { outputStyle: 'compressed' } ) )
		.pipe( dest( buildDir + '/assets/css' ) )
}

function docs() {
	return src( [ 'changelog.txt', 'README.md' ] )
		.pipe( dest( buildDir ) )
}

function js() {
	return src( 'assets/js/*.js')
		.pipe( dest( buildDir + '/assets/js' ) )
}

function jsMinify() {
	return src( 'assets/js/*.js')
		.pipe( minify( {
			ext:{ min:'.js' },
			noSource: true
		} ) )
		.pipe( dest( buildDir + '/assets/js' ) )
}

function languages() {
	return src( 'languages/*.*', { base: '.' } )
		.pipe( dest( buildDir ) );
}

function php() {
	return src( [ 'sensei-course-participants.php', 'includes/**/*.php' ], { base: '.' } )
		.pipe( dest( buildDir ) )
}

function pot() {
	return src( [ 'sensei-course-participants.php', 'includes/**/*.php' ] )
		.pipe( wpPot( {
			domain: 'sensei-course-participants',
			package: 'Sensei Course Participants',
		} ) )
		.pipe( dest( 'languages/sensei-course-participants.pot' ) );
}

function zipFiles() {
	return src( buildDir + '/**/*', { base: buildDir + '/..' } )
		.pipe( zip( buildDir + '.zip' ) )
		.pipe( dest( '.' ) );
}

exports.clean = clean;
exports.css = css;
exports.docs = docs;
exports.js = js;
exports.languages = languages;
exports.php = php;
exports.pot = pot;
exports.zipFiles = zipFiles;

if ( process.env.NODE_ENV === 'dev' ) {
	exports.package = series(
		clean,
		parallel(
			css,
			docs,
			js,
			series( pot, languages ),
			php,
		),
		zipFiles,
	);
} else {
	exports.package = series(
		clean,
		parallel(
			cssMinify,
			docs,
			jsMinify,
			series( pot, languages ),
			php,
		),
		zipFiles,
	);
}
