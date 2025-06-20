import './App.css'
import {CreateGroupPage} from "./components/CreateGroupPage.tsx";

function App() {

    return (
        <>
            <div className="flex items-center justify-center w-full">
                <h4 className="text-4xl py-10 lg:text-5xl font-semibold mx-3 mb-2 md:mb-3">Welcome to F1 prono!</h4>
            </div>
            <CreateGroupPage/>
        </>
      )
}

export default App
