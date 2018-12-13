import React from 'react';

import {Footer} from 'react-materialize';

const footer = (props) =>(
	<div className= 'footer'>
		<Footer copyrights="Gracias"
		  links={
		    <ul>
		      <li><a className="grey-text text-lighten-3" href="https://github.com/MGMike0">Github</a></li>
		      <li><a className="grey-text text-lighten-3" href="https://www.linkedin.com/in/miguel-angel-moran-gomez-9792b8156/">Linkedin</a></li>
		      <li><a className="grey-text text-lighten-3" href="mailto:ingmiguelmorangomez@gmail.com?Subject=Te%20queremos%20en%20iTexico">Gmail</a></li>
		    </ul>
		  }
		  >
		    <h5 className="white-text">Miguel Moran</h5>
		    <p className="grey-text text-lighten-4">Todos nuestros sueños pueden hacerse realidad si tenemos el coraje de perseguirlos. Walt Disney</p>
		</Footer>
	</div>
);

export default footer;