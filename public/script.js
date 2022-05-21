/* eslint-disable no-restricted-globals */
addEventListener("DOMContentLoaded", () => {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("Service Worker registered", registration);
        })
        .catch((error) => {
          console.log("Service Worker registration failed", error);
        });
    });

    navigator.serviceWorker.addEventListener("message", (event) => {
      const appBody = this.document.getElementById("appBody");
      appBody.style.backgroundColor = event.data.color;
    });
  }

  // push notification
  const applicationServerPublicKey =
    "BI7pdFiNIW_5EWL4ugyL73UucEaO4Pmos4oIaSwwh9rWOoPypg6VBJeWrmJNgXMz-FIz--m6CCZHOdjIJGSozyk";

  const pushButton = document.querySelector("#pushButton");

  let swRegistration = null;
  let isSubscribed = false;

  function urlB64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, "+")
      .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  if ("serviceWorker" in navigator && "PushManager" in window) {
    navigator.serviceWorker
      .register("sw.js")
      .then(function (swReg) {
        swRegistration = swReg;
        initializeUI();
      })
      .catch(function (error) {
        console.error("Service Worker Error", error);
      });
  } else {
    console.warn("Push messaging is not supported");
    pushButton.textContent = "Push Not Supported";
  }

  function initializeUI() {
    pushButton.addEventListener("click", function () {
      pushButton.disabled = true;
      if (isSubscribed) {
        unsubscribeUser();
      } else {
        subscribeUser();
      }
    });

    // Set the initial subscription value
    swRegistration.pushManager.getSubscription().then(function (subscription) {
      isSubscribed = !(subscription === null);

      if (isSubscribed) {
        console.log("User IS subscribed.");
      } else {
        console.log("User is NOT subscribed.");
      }

      updateBtn();
    });
  }

  function updateBtn() {
    if (Notification.permission === "denied") {
      pushButton.textContent = "Push Notifications Blocked.";
      pushButton.disabled = true;
      return;
    }

    if (isSubscribed) {
      pushButton.textContent = "Disable Push Notifications";
    } else {
      pushButton.textContent = "Enable Push Notifications";
    }

    pushButton.disabled = false;
  }

  function subscribeUser() {
    const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
    swRegistration.pushManager
      .subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey,
      })
      .then(function (subscription) {
        console.log("User is subscribed.");

        console.dir(JSON.stringify(subscription));

        isSubscribed = true;

        updateBtn();
      })
      .catch(function (err) {
        console.log("Failed to subscribe the user: ", err);
        updateBtn();
      });
  }

  function unsubscribeUser() {
    swRegistration.pushManager
      .getSubscription()
      .then(function (subscription) {
        if (subscription) {
          return subscription.unsubscribe();
        }
      })
      .catch(function (error) {
        console.log("Error unsubscribing", error);
      })
      .then(function () {
        console.log("User is unsubscribed.");
        isSubscribed = false;

        updateBtn();
      });
  }
});
