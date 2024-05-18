import React from "react";
import EntityForm from "./components/EntityForm";
import EntityList from "./components/EntityList";
const App = () => {
  return (
    <>
      <div className="bg-gray-900 min-h-screen text-white">
        <div className="container mx-auto p-4 max-w-screen-lg">
          <h1 className="text-3xl text-center font-bold mb-4">
            Manage Entities
          </h1>
          <div>
            <EntityForm />
            <EntityList />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
