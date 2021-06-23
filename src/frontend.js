/**
 * Internal dependencies.
 */
import './style.scss';

const menuItems = document.querySelectorAll( '.wp-block-navigation-link' );

if ( 0 < menuItems.length ) {
	Array.from( menuItems ).forEach( ( item ) => {
		const menuItem = item.querySelector(
			'.wp-block-navigation-link__content'
		);
		let classList = Array.from( item.classList );
		const prefix =
			classList.find(
				( i ) =>
					i.includes( 'fab' ) ||
					i.includes( 'far' ) ||
					i.includes( 'fas' )
			) || 'fas';
		const icon = classList.find( ( i ) => i.includes( 'fa-' ) );

		if ( icon ) {
			item.classList.remove( prefix, icon );
			menuItem.classList.add( prefix, icon );
		}
	});
}
