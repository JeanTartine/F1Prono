import './App.css'
import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "./core/libs/react-query/react-query.ts";
import {CreateGroupPage} from "./components/CreateGroupPage.tsx";

function App() {

    return (
        <QueryClientProvider client={queryClient}>
            <div className="flex items-center justify-center w-full">
                <h4 className="text-4xl lg:text-5xl font-semibold mx-3 mb-2 md:mb-3">Welcome to F1 prono!</h4>
            </div>
            <CreateGroupPage/>
        </QueryClientProvider>
      )
}

export default App
