import Chat from "./components/chat/Chat"
import Details from "./components/details/Details"
import List from "./components/list/List"


function App() {
  

  return (
    <>
      <h1 className='boxContainer flex bg-opacity-90 backdrop-blur-xl  border-white border rounded-lg'>
        
        <List />
        <Chat />
        <Details />
        

      </h1>
    </>
  )
}

export default App
