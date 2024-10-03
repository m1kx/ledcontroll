'use client';

import mqtt from "mqtt";
import { useEffect, useState } from "react";
import { RgbColor } from "react-colorful";
import { DebouncedPicker } from "./DebouncedPicker";
import styles from "./MQQTDisplay.module.scss";

export default function MQQTDisplay() {
  const [latestMessage, setLatestMessage] = useState<string>("");
  const [client, setClient] = useState<mqtt.MqttClient | null>();
  const [color, setColor] = useState<RgbColor | undefined>();

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_MQTT_URL!;

    const options = {
      clean: true,
      connectTimeout: 4000,
      clientId: 'webbrowser',
      username: process.env.NEXT_PUBLIC_MQTT_UNAME,
      password: process.env.NEXT_PUBLIC_MQTT_PASS,
    }

    if (!client) {
      setClient(mqtt.connect(url, options));
    }

    if (!client) return;

    client.on('connect', function () {
      client.subscribe('led', function () {})
    })
    
    client.on('message', function (topic: string, message) {
      if (message.toString().includes('RGB')) {
        return;
      }
      setLatestMessage(message.toString())
    })
  }, [client])

  const onButtonClicked = (newState: 'ON' | 'OFF') => {
    if (!client) return;

    client.publish('led', newState);
  }

  useEffect(() => {
    if (!client || !color) return;
    client.publish('led', `RGB:${color.r},${color.g},${color.b}`)
  }, [color, client])

  return (
    <div className={styles.container}>
      <div>
        Latest message: {latestMessage}
      </div>
      <div className={styles.buttonContainer}>
        <button onClick={() => onButtonClicked('ON')}>ON</button>
        <button onClick={() => onButtonClicked('OFF')}>OFF</button>
      </div>
      <div className={styles.colorPickerContainer}>
        <DebouncedPicker color={color!} onChange={setColor} />
      </div>
    </div>
  );
}