import UserPage from './components/userPage'

function App() {

  return (
    <>
      {/* <div className="bg-red-500">
        <div className="container mx-auto">
          <h1 className="text-4xl text-center text-white">Hello Vite + React!</h1>
          <p className="text-center text-white">
            <Button className="bg-white text-black" onClick={() => setCount((count) => count + 1)} variant={'destructive'} color='secondary'>
              count is: {count}
            </Button>
          </p>
          <p className="text-center text-white">
            <img src={reactLogo} alt="react logo" width="200" />
            <img src={viteLogo} alt="vite logo" width="200" />
          </p>
        </div>
        <MolecularNavigation />
      </div> */}
      <UserPage />
    </>
  )
}

export default App
