"use client";

import { useEffect } from "react";
import { pusherClient } from "@/lib/pusherClient";

export default function StatusListener() {

   useEffect(() => {

      const channel = pusherClient.subscribe(
         "presence-channel"
      );

      channel.bind(
         "status-update",
         (data) => {

            //console.log("Realtime Update:", data);

         }
      );

      return () => {

         channel.unbind_all();

         pusherClient.unsubscribe(
            "presence-channel"
         );

      };

   }, []);

   return null;
}