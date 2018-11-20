
import '../common.scss';
import './style.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { getCurrentPostId } = wp.data.select( 'core/editor' );
const Dashicon = wp.components.Dashicon;
const icon = (
	<svg version="1.1" id="Layer_1" x="0px" y="0px"
     viewBox="0 0 32 32" enable-background="new 0 0 32 32" >
		<g>
		    <path fill="#231F20" d="M16,3.9C9.3,3.9,3.9,9.3,3.9,16c0,4.9,3,9.2,7.2,11.1c0-0.8,0-1.9,0.2-2.8c0.2-1,1.6-6.6,1.6-6.6
		        s-0.4-0.8-0.4-1.9c0-1.8,1-3.1,2.3-3.1c1.1,0,1.6,0.8,1.6,1.8c0,1.1-0.7,2.8-1.1,4.3c-0.3,1.3,0.6,2.3,1.9,2.3
		        c2.3,0,3.8-2.9,3.8-6.4c0-2.6-1.8-4.6-5-4.6c-3.7,0-5.9,2.7-5.9,5.8c0,1.1,0.3,1.8,0.8,2.4c0.2,0.3,0.3,0.4,0.2,0.7
		        c-0.1,0.2-0.2,0.8-0.2,1c-0.1,0.3-0.3,0.4-0.6,0.3c-1.7-0.7-2.5-2.5-2.5-4.6c0-3.4,2.9-7.5,8.6-7.5c4.6,0,7.6,3.3,7.6,6.9
		        c0,4.7-2.6,8.3-6.5,8.3c-1.3,0-2.5-0.7-2.9-1.5c0,0-0.7,2.8-0.9,3.3c-0.3,0.9-0.8,1.9-1.2,2.6c1.1,0.3,2.2,0.5,3.4,0.5
		        c6.7,0,12.1-5.4,12.1-12.1C28.1,9.3,22.7,3.9,16,3.9z"/>
		</g>
	</svg>);

/**
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'social-warfare/pinterest', {
	title: __( 'Pinterest Image' ), // Block title.
	icon: { src: icon, foreground: '#cd2029' },
	category: 'social-warfare', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		// Has a limit of 3 keywords.
		__( 'social' ),
		__( 'tailwind' ),
		__( 'marketing' ),
	],
	attributes: {
	   hasFocus: { type: 'boolean', defualt: false },
	   id: { type: 'number', default: 0},
	   width: { type: 'number', default: 0 },
	   height: { type: 'number', default: 0 },
	   className: { type: 'string', default: ''},
	   alignment: { type: 'string', default: ''},
   },

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	 edit: function( props ) {
		   const icon = '';
		   console.log('props', props)

		   const toggleFocus = ( event ) => {
	   			props.setAttributes( { hasFocus: !props.attributes.hasFocus } );
	   		}

		   const attributes = ['id', 'width', 'height', 'className', 'alignment']
		   const attributeString = attributes.reduce((string, attr) => {
			    if (!props.attributes[attr]) return string;

				if (props.attributes)

				string += ` ${attr}="${props[attr]}"`

			}, '');

		//* Inactive state
		if ( !props.attributes.hasFocus ) {
			return (
				<div className={ `${props.className} pinterest-block-wrap swp-inactive-block` }>
					<div className="head" onClick={toggleFocus}>
						{icon}
						<div className="swp-preview">[pinterest_image{attributeString}]</div>
						<Dashicon className="swp-dashicon"
								  icon="arrow-down"
						/>
					</div>
				</div>
			);
		}

		//* Active state
		return (
			<div className={ `${props.className} pinterest-block-wrap swp-active-block` }>
				<div className="head" onClick={toggleFocus}>
					<p >Click to Tweet</p>
					<Dashicon className="swp-dashicon"
							  icon="arrow-up"
					/>
				</div>
			</div>
		);
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	save: function( props ) {

		return (
			<div>
				[pinterest_image]
			</div>
		);
	},
} );
