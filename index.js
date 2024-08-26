import {initializeApp } from 'firebase-admin/app';
import { getMessaging } from "firebase-admin/messaging";
import express from "express";
import credentials from "./credentials.json" assert { type: "json" };
import cors from "cors"; 

const orderDetails = {
  id: '318cdb09-a3d9-41c5-a0a7-5223d94ec976',
  deliveryOrderId: '1282799285',
  status: 'ACCEPTED',
  deliveryProvider: 'RAPPI',
  orderTimestamp: '2024-08-18T19:16:32',
  subtotalAmount: 60,
  discount: null,
  totalAmount: 60,
  preparationTime: 15,
  deliveryPartnerName: 'KIWI SOFTWARE FACTORY (Padre)',
  distance: 0,
  notes: null,
  customerName: 'John Doe',
  customerPhone: '3163535',
  customerPin: '34545678',
  brand: {
    id: 'dcd7a286-502c-11ef-a6e7-cbe312ac28c6',
    name: 'brand 1',
    enabled: true,
    restaurantId: '75a805a8-502a-11ef-a6e7-cbe312ac28c6',
    automaticPrintEnabled: true,
    preparationTime: 30
  },
  userId: null,
  orderItems: [
    {
      id: 'c51eb323-21ae-4610-a12c-bf8e1f1dbc4a',
      quantity: 1,
      name: 'Moka',
      detail: null,
      note: '',
      cost: 60,
      orderId: '318cdb09-a3d9-41c5-a0a7-5223d94ec976'
    }
  ],
  possibleStatuses: [ 'READY_FOR_HANDOFF', 'CANCELED' ]
}

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.use(
  cors({
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);

app.use(function(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  next();
});

initializeApp(credentials);


app.post("/send", function (req, res) {
  const receivedToken = req.body.fcmToken;
  
  const message = {
    data: {
      title: "Notif",
      body: 'This is a Test Notification',
      orderDetails: JSON.stringify(orderDetails)
    },
    token: "d0XQjRh5euhPWyEthP0pfI:APA91bErPekVChYKORCVAzxOedoISaAlHVOfgt4ApGW2zaaMFJv9qoAPAGJIiOVLFPHE0Vok7Dxfy3P3JJhYkQhCWifs2yIDuzWN3xeXE1_iBs_iZ17OK80YtrcC4e9Qd_5rQjTo-69u",
  };
  
  getMessaging()
    .send(message)
    .then((response) => {
      res.status(200).json({
        message: "Successfully sent message",
        token: receivedToken,
      });
      console.log("Successfully sent message:", response);
    })
    .catch((error) => {
      res.status(400);
      res.send(error);
      console.log("Error sending message:", error);
    });
  
  
});

app.listen(4000, function () {
  console.log("Server started on port 4000");
});