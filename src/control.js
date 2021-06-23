/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

import { withInstanceId } from '@wordpress/compose';

import {
	Button,
	Dropdown,
	MenuGroup,
	MenuItem,
	TextControl,
	ToolbarButton,
	ToolbarGroup,
	ToolbarItem,
	Toolbar
} from '@wordpress/components';

import { useEffect, useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import data from './icons.json';

const MenuIconPickerControl = ({
	instanceId,
	label,
	classes,
	setAttributes
}) => {
	useEffect( () => {
		let icons = [];

		Object.keys( data ).forEach( ( i ) => {
			Object.keys( data[ i ].styles ).forEach( ( o ) => {
				let prefix = '';
				let terms = data[ i ].search.terms;

				switch ( data[ i ].styles[ o ]) {
				case 'brands':
					prefix = 'fab';
					break;
				case 'solid':
					prefix = 'fas';
					break;
				case 'regular':
					prefix = 'far';
					break;
				default:
					prefix = 'fas';
				}

				terms.push( i, data[ i ].label );

				icons.push({
					name: i,
					unicode: data[ i ].unicode,
					prefix: prefix,
					label: data[ i ].label,
					search: terms
				});
			});
		});

		setIcons( icons );

		if ( classes ) {
			const classList = classes.split( ' ' );
			const prefix =
				classList.find(
					( i ) =>
						i.includes( 'fab' ) ||
						i.includes( 'far' ) ||
						i.includes( 'fas' )
				) || 'fas';
			const icon = classList.find( ( i ) => i.includes( 'fa-' ) );

			if ( icon ) {
				setPrefix( prefix );
				setIcon( icon );
			}
		}
	}, []);

	const [ isPopoverOpen, setPopoverOpen ] = useState( false );
	const [ search, setSearch ] = useState( '' );
	const [ icons, setIcons ] = useState( null );
	const [ prefix, setPrefix ] = useState( '' );
	const [ icon, setIcon ] = useState( '' );

	const id = `inspector-menu-icon-picker-control-${ instanceId }`;

	const onSelectIcon = ( onToggle, i ) => {
		onToggle();
		let classList = classes ? classes.split( ' ' ) : [];
		classList.splice( classList.indexOf( prefix ), 1 );
		classList.splice( classList.indexOf( icon ), 1 );
		classList.push( i.prefix, `fa-${ i.name }` );
		classList = classList.join( ' ' );

		setAttributes({
			className: classList
		});

		setPrefix( i.prefix );
		setIcon( `fa-${ i.name }` );
	};

	const onRemoveIcon = ( onToggle ) => {
		onToggle();
		let classList = classes ? classes.split( ' ' ) : [];
		classList.splice( classList.indexOf( prefix ), 1 );
		classList.splice( classList.indexOf( icon ), 1 );
		classList = classList.join( ' ' );

		setAttributes({
			className: classList
		});

		setPrefix( '' );
		setIcon( '' );
	};

	return (
		<ToolbarGroup>
			<Dropdown
				contentClassName="wp-block-themeisle-blocks-menu-icon-picker-popover"
				position="bottom center"
				renderToggle={ ({ isOpen, onToggle }) => (
					<ToolbarButton
						label={ __( 'Menu Icons', 'otter-blocks' ) }
						showTooltip
						onClick={ () => {
							onToggle();
							setPopoverOpen( true );
						} }
					>
						{ prefix && icon ? (
							<i
								className={ classnames(
									prefix,
									icon,
									'fa-fw'
								) }
							/>
						) : (
							<i className="fas fa-icons fa-fw" />
						) }
					</ToolbarButton>
				) }
				renderContent={ ({ onToggle }) => (
					<MenuGroup
						label={ __( 'Menu Icons by Otter', 'otter-blocks' ) }
					>
						<TextControl
							label={ ( 'Search Icons', 'otter-blocks' ) }
							hideLabelFromVision={ true }
							placeholder={ ( 'Search Icons', 'otter-blocks' ) }
							value={ search }
							onChange={ setSearch }
						/>

						<div className="components-popover__items">
							{ icon && prefix && ! search && (
								<MenuItem
									label={ __( 'None', 'otter-blocks' ) }
									showTooltip={ true }
									onClick={ () => onRemoveIcon( onToggle ) }
								>
									<i className="fas fa-times fa-fw remove-icon" />
								</MenuItem>
							) }

							{ icons.map( ( i ) => {
								if (
									! search ||
								i.search.some( ( o ) =>
									o
										.toLowerCase()
										.match( search.toLowerCase() )
								)
								) {
									return (
										<MenuItem
											label={ i.label }
											showTooltip={ true }
											className={ classnames({
												'is-selected':
												`fa-${ i.name }` === icon &&
												i.prefix === prefix
											}) }
											onClick={ () =>
												onSelectIcon( onToggle, i )
											}
										>
											<i
												className={ classnames(
													i.prefix,
													`fa-${ i.name }`,
													'fa-fw'
												) }
											/>
										</MenuItem>
									);
								}
							}) }
						</div>
					</MenuGroup>
				) }
			/>
		</ToolbarGroup>
	);
};

export default withInstanceId( MenuIconPickerControl );
