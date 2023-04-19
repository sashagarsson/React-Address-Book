import React, { useState, useEffect } from "react";
import "./Contacts.css"

const Contacts = () => {
    const [contacts, setContacts] = useState([])
    const [moreInfo, setMoreInfo] = useState([]);

    useEffect(() => {
      fetch("https://randomuser.me/api?results=25")
      .then((response) => response.json())
      .then((data) => {
        setContacts(data.results)


        //DO NOT DO THIS IN THE FUTURE lol. WAY TOO COMPLICATED. Use isToggled with useState like 

        // {isToggled && <p>information you want to show</p>}
        //   <button onClick={() => setIsToggled(!isToggled)}>Show More</button>

        // Array(data.results.length) creates a new array equal to the number of contacts in the fetched data, which is the length of the results array
        // New array is filled with false values
        // New array's initial state is all false values
        setMoreInfo(Array(data.results.length).fill(false))
      })
    
    }, []);

// Function that shows more details when clicked
// Takes in index as a parameter, which represents the index of the contact in the contacts array. This shows the details of just the contact whose button was clicked.
 const handleClick = (index) => {
       
        // Updates state of setMoreInfo to determine whether to display more details in a  callback function
        // prevState is the argument
         
        
        setMoreInfo(prevState => {
            // First, create variable with a spread operator so it doesn't change the original state of moreInfo, which is an array of all false values
            const updatedState = [...prevState];
            // Uses the index parameter to access the element in the array that corresponds to the contact whose button was clicked
            //Changes value of clicked index to true, therefore showing more details
            updatedState[index] = !updatedState[index];
            // updatedState array is returned and becomes new state value for moreInfo. This will trigger a re-render of the component with the updated state, causing the additional information to be shown or hidden based on the updated state value.
            return updatedState;
        });
    }

    return (
        <div className="all-contacts">
            <ul className="contact">
                {contacts.map((contact, index) => (
                    <li className="contact-info">
                    <img src={contact.picture.thumbnail} alt={contact.name.first} />
                    <p>{contact.name.first} {contact.name.last}</p>
                    {/* Calls handleClick function when clicked, which takes index as an argument because its targeting the index of the contact in the contacts array. This allows it to show more information for contact whose button was clicked */}
                    <button className="details" onClick={() => handleClick(index)}>
                        {/* If moreInfo state is true, aka clicked, show "Hide Details". Otherwise show "Show Details" */}
                        {moreInfo[index] ? "Hide Details" : "Show Details"}
                    </button>
                    {/* If state of contact button that was clicked, aka moreInfo[index], is true, it displays contact's address, phone number and email. 
                    If expression before && is true, the code will execute. Otherwise it doesn't do anything. */}
                    {moreInfo[index] && (
                            <div>
                                <p>{contact.location.street.number} {contact.location.street.name}</p>
                                <p>{contact.location.city}, {contact.location.state}, {contact.location.country} {contact.location.postcode}</p>
                                <p>{contact.phone}</p>
                                <p>{contact.email}</p>
                            </div>
                        )}
                     </li>
                ))} 
            </ul>
            </div>
    );
}

export default Contacts;
