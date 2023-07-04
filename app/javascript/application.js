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
                    setupSubscription()
                } else {
                    alert("Notifications declined")
                }
            })
            .catch(error => console.log("Notifications error", error))
            .finally(() => notificationsButton.classList.add("hidden"))
    })
}

async function setupSubscription() {
    if (Notification.permission !== "granted") return
    if (!navigator.serviceWorker) return
    
    let vapid = new Uint8Array(JSON.parse(document.querySelector("meta[name=web_push_public]")?.content))

    await navigator.serviceWorker.register("/service_worker.js")
    const registration = await navigator.serviceWorker.ready
    const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: vapid
    })

    await fetch("/web_push_subscriptions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(subscription)
    })
}