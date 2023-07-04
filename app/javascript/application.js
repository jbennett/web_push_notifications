// Entry point for the build script in your package.json
import "@hotwired/turbo-rails"
import "./controllers"

document.addEventListener("turbo:load", () => {
    switch (Notification.permission) {
        case "granted":
            // send to server
            return
        case "denied":
            // do nothing?
            return
        default:
            promptForNotifications()
    }
})

function promptForNotifications() {
    const notificationsButton = document.getElementById("enable_notifications")
    if (!notificationsButton) return

    notificationsButton.classList.remove("hidden")
    notificationsButton.addEventListener("click", event => {
        event.preventDefault()
        Notification.requestPermission()
            .then((permission) => {
                if (permission === "granted") {
                    new Notification("Notiifcations enabled") // test notification
                } else {
                    alert("Notifications declined")
                }
            })
            .catch(error => console.log("Notifications error", error))
            .finally(() => notificationsButton.classList.add("hidden"))
    })
}