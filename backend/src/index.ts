import {WebSocketServer, WebSocket} from 'ws'
const wss= new WebSocketServer({port:8080})
// reference to socket is socket similar to req and res
let userCount=0;
let allSocket:WebSocket[]=[];
wss.on("connection",(socket)=>{
        userCount++;
        allSocket.push(socket)

    
    console.log("user connected " +" " + userCount)
    socket.on("message",(event)=>{
        console.log("message received"+ event.toString()+" from user "+ userCount)
for (const s of allSocket) {
            
            s.send(event.toString()+": sent from the server this message is from the user"+ userCount)

        }
        // setInterval(()=>{
        //     socket.send(event.toString()+": sent from the server this message is from the user"+ userCount)



        // },1000)
        
    })



})