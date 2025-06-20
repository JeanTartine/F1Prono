import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter, Route, Routes} from "react-router";
import {GroupPage} from "./components/GroupPage.tsx";
import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "./core/libs/react-query/react-query.ts";
import {NewBetPage} from "./components/NewBetPage.tsx";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <DndProvider backend={HTML5Backend}>
      <QueryClientProvider client={queryClient}>
          <BrowserRouter>
              <Routes>
                  <Route index element={<App />}/>
                  <Route path="group">
                      <Route index  path=":id" element={<GroupPage />}/>
                      <Route path=":id/newbet" element={<NewBetPage />}/>
                  </Route>
              </Routes>
          </BrowserRouter>
      </QueryClientProvider>
      </DndProvider>
  </StrictMode>,
)
