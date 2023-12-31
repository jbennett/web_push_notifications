const VERSION = "Accept Push 1"

self.addEventListener("install", event => {
    console.log(`Installing ${VERSION}`)
})

self.addEventListener("activate", event => {
    console.log(`Activating ${VERSION}`)
})

self.addEventListener('push', event => {
    const data = event.data?.json() || {}
    console.log("Received push", data)
    
    event.waitUntil(
        self.registration.showNotification(data.title, {
            body: data.body,
            data: data,
        })
    )
})

self.addEventListener("notificationclick", event => {
    event.notification.close()
    console.log(`opening event.notification.data.redirect`)

    event.waitUntil(
        self.clients.openWindow(event.notification.data.redirect)
    )
})

self.addEventListener('pushsubscriptionchange', async (event) => {
    const subscription = await self.registration.pushManager.getSubscription()
    await fetch("/web_push_subscriptions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(subscription),
    })
})
