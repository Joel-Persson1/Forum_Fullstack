import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Homepage } from "../pages/Homepage";
import { AppLayout } from "../pages/AppLayout";
import { QuestionFormPage } from "../pages/QuestionFormPage";
import { ClickedQuestionPage } from "../pages/ClickedQuestionPage";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Navigate to="app" />} />
        <Route path="app" element={<AppLayout />}>
          <Route index element={<Homepage />} />
          <Route path="question" element={<QuestionFormPage />} />
          <Route path="question/:id" element={<ClickedQuestionPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

// NÄSTA UTMANING BLIR ATT FYLLA PÅ CLICKEDQUESTIONPAGE MED ALLA SVAR KOPPLADE TILL FRÅGAN. REQUEST FUNGERAR KOLLA I POSTMAN OCH SERVERN. DET ÄR BARA ATT KÖRA IGÅNG.
