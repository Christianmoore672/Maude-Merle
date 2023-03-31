import { fetchRequests } from "./dataAccess.js"
import { SinkRepair } from "./SinkRepair.js"
import { deleteRequest } from "./dataAccess.js"
import { fetchPlumbers } from "./dataAccess.js"
import { fetchCompletions } from "./dataAccess.js"

const mainContainer = document.querySelector("#container")

// Request
mainContainer.addEventListener(
    "stateChanged", customEvent => {
        render()
    }
)

// Delete
mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [,requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})

//repair

const render = () => {
    fetchRequests()
    .then(() => fetchPlumbers())
    .then( 
        () => {
            mainContainer.innerHTML = SinkRepair()
        }
    )
    .then(() => fetchCompletions())
}

render()




