import React from 'react';
import Contact from '../Contact/Contact';

interface ContactProfileProps extends Contact {  };

const ContactProfileComponent: React.FC<ContactProfileProps> = props =>
    <div>
        <p>{props.firstname}</p>
        <p>{props.lastname}</p>
        <p>{props.address}</p>
    </div>;

export default ContactProfileComponent;