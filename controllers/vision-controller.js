require("dotenv").config();
const mqtt = require("mqtt");

const mqtt_protocol = process.env.MQTT_PROTOCOL;
const mqtt_host = process.env.MQTT_SERVER;
const mqtt_port = process.env.MQTT_PORT;

const mqtt_connect_url = `${mqtt_protocol}://${mqtt_host}:${mqtt_port}`;

const mqttClient = mqtt.connect(mqtt_connect_url, {
    clientId: process.env.MQTT_CLIENT_ID,
    clean: true,
    connectTimeout: 4000,
    username: 'emqx',
    password: 'public',
    reconnectPeriod: 1000

})

mqttClient.on("connect", () => {
    console.log("MQTT Connected")


})

const getRoot = (req, res, next) => {
    res.send("test")
}

const postHSVConfig = (req, res, next) => {

    try{
        mqttClient.publish(process.env.HSV_CONFIG_TOPIC,
            req.body.hl.value.toString(),
            { qos: 0, retain: false },
            (err) => {
                if (err) {
                    console.error(err)
                }
            })
    }catch(err){
        console.error(err)
    }

    res.status(200).send("Posted successfully")
}

exports.getRoot = getRoot;
exports.postHSVConfig = postHSVConfig;