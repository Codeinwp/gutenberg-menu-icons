/**
 * Internal dependencies.
 */
import './editor.scss';

import MenuIconPickerControl from './control.js';

/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';

import { BlockControls } from '@wordpress/block-editor';

import { createHigherOrderComponent } from '@wordpress/compose';

import { Fragment } from '@wordpress/element';

import { addFilter } from '@wordpress/hooks';

const withBlockControls = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		if ( 'core/navigation-link' === props.name && props.isSelected ) {
			return (
				<Fragment>
					<BlockEdit { ...props } />

					<BlockControls>
						<MenuIconPickerControl
							label={ __( 'Change Menu Icon', 'otter-blocks' ) }
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

addFilter(
	'editor.BlockEdit',
	'themeisle-menu-icons/with-blocks-controls',
	withBlockControls
);
