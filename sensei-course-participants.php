<?php
/*
 * Plugin Name: Sensei Course Participants
 * Version: 1.1.3
 * Plugin URI: https://woocommerce.com/products/sensei-course-participants/
 * Description: Displays the number of learners taking a course, and a widget with a list of those learners.
 * Author: Automattic
 * Author URI: https://automattic.com/
 * Requires at least: 3.8
 * Tested up to: 4.1
 * Requires PHP: 5.6
 * Text Domain: sensei-course-participants
 * Domain Path: /languages/
 * Woo: 435834:f6479a8a3a01ac11794f32be22b0682f
 *
 * @package WordPress
 * @author Automattic
 * @since 1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'SENSEI_COURSE_PARTICIPANTS_VERSION', '1.1.3' );
define( 'SENSEI_COURSE_PARTICIPANTS_PLUGIN_FILE', __FILE__ );
define( 'SENSEI_COURSE_PARTICIPANTS_PLUGIN_BASENAME', plugin_basename( __FILE__ ) );

require_once dirname( __FILE__ ) . '/includes/class-sensei-course-participants-dependency-checker.php';

if ( ! Sensei_Course_Participants_Dependency_Checker::are_system_dependencies_met() ) {
	return;
}

require_once dirname( __FILE__ ) . '/includes/class-sensei-course-participants.php';

// Load the plugin after all the other plugins have loaded.
add_action( 'plugins_loaded', array( 'Sensei_Course_Participants', 'init' ), 5 ) ;

Sensei_Course_Participants::instance();
