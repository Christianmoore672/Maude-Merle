import { getRequests, saveCompletions, getPlumbers, } from "./dataAccess.js"

const mainContainer = document.querySelector("#container")

export const Requests = () => {
    const requests = getRequests()
    const plumbers = getPlumbers()

    let html = '<ul>'
    const requestConversion = requests.map((request => {
        return ` 
        <li>
            ${request.description}
            <select class="plumbers" id="plumbers">
                <option value="">Choose</option>
            ${
                 plumbers.map(
                    plumber => {
                        return `<option value="${request.id}--${plumber.id}">${plumber.name}</option>`}).join("")
             }
            </select>
            <button class="request__delete"
                    id="request--${request.id}">
                 Delete
            </button>
        </li>
        `
            }
            ))
        html += requestConversion.join("") //joining ll request objects together
        html+= '</ul>'
        return html
    }
    

    mainContainer.addEventListener("change",(event) => {
            if (event.target.id === "plumbers") {
                const [requestId, plumberId] = event.target.value.split("--")
                /*
                    This object should have 3 properties
                       1. requestId
                       2. plumberId
                       3. date_created
                */
                const completion = {
                    requestId: requestId, 
                    plumberId: plumberId,
                    date_created: Date.now()}
    
                /*
                    Invoke the function that performs the POST request
                    to the `completions` resource for your API. Send the
                    completion object as a parameter.
                 */
                saveCompletions(completion)
    
            }
        }
    )








    // back tick = something is not a string but you want it listed as a string
    //^like an object inside of an array
    //if its already a string use a regular apostrophe

