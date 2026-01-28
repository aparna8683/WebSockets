import {WebSocketServer, WebSocket} from 'ws'
const wss= new WebSocketServer({port:8080})
// reference to socket is socket similar to req and res
// let userCount=0;
// let allSocket:WebSocket[]=[];
interface User{
    socket:WebSocket,
    room:string
}
let allSocket: User[]=[]
wss.on("connection",(socket)=>{
    //@ts-ignore
    socket.on("message",(message)=>{
            const parsedMessage=JSON.parse(message as unknown as string)
            if(parsedMessage.type==="join"){
                allSocket.push({
                    socket,
                    room:parsedMessage.payload.roomId

                })

            }
            if(parsedMessage.type==="chat"){
                // const currentUserRoom= allSocket.find((x)=>
                // x.socket==socket).room
                let currentUserRoom=null
                for (const user of allSocket) {
    if (user.socket === socket) {
      currentUserRoom = user.room;
      break;
    }
  }
                for(const user of allSocket){
                    if(user.room===currentUserRoom)
                        user.socket.send(parsedMessage.payload.message)
                }

            }  
            


    })
})
// wss.on("connection",(socket)=>{
//         userCount++;
//         allSocket.push(socket)

    
//     console.log("user connected " +" " + userCount)
//     socket.on("message",(event)=>{
//         console.log("message received"+ event.toString()+" from user "+ userCount)
// for (const s of allSocket) {
            
//             s.send(event.toString()+": sent from the server this message is from the user"+ userCount)

//         }
//         // setInterval(()=>{
//         //     socket.send(event.toString()+": sent from the server this message is from the user"+ userCount)



//         // },1000)
        
//     })



// })
