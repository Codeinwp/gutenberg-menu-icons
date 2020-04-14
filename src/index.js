/**
 * Internal dependencies.
 */
import './editor.scss';

import MenuIconPickerControl from './control.js';

/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;

const { BlockControls } = wp.blockEditor;

const { createHigherOrderComponent } = wp.compose;

const { Fragment } = wp.element;

const { addFilter } = wp.hooks;

const withBlockControls = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		if ( 'core/navigation-link' === props.name && props.isSelected ) {
			return (
				<Fragment>
					<BlockEdit { ...props } />

					<BlockControls>
						<MenuIconPickerControl
							label={ __( 'Change Menu Icon' ) }
							classes={ props.attributes.className }
							setAttributes={ props.setAttributes }
						/>
					</BlockControls>
				</Fragment>
			);
		}

		return <BlockEdit { ...props } />;
	};
}, 'withInspectorControl' );

addFilter( 'editor.BlockEdit', 'themeisle-menu-icons/with-blocks-controls', withBlockControls );
