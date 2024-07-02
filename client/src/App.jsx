import React, { useEffect, useMemo, useState } from 'react'
import { io } from 'socket.io-client'
import {Button, Container, TextField, Typography} from '@mui/material'

function App() {
  const socket = useMemo(() => io("http://localhost:3000/") , [])

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected", socket.id);
      setSocketId(socket.id);
      socket.on("welcome", (s) => { console.log(s) });
    });

    socket.on("receive-message", (data) => {
      console.log(data);
    })
    
    return () => {
      socket.disconnect();
    }
  }, []);
  
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [socketId, setSocketId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", {message,room});
    setMessage("")
  };

  return (
    <Container maxWidth="sm">
      <Typography variant='h1' component="div" gutterBottom>
        {socketId}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          value={message}
          onChange={(e)=>setMessage(e.target.value)}
          id="outlined-basic"
          label="Message"
          variant="outlined"
        />
        <TextField
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          id="outlined-basic"
          label="Room"
          variant="outlined"
        />
        <Button type="submit" variant="contained" color="primary">
          Send
        </Button>
      </form>
      
    </Container>
  )
}

export default App
