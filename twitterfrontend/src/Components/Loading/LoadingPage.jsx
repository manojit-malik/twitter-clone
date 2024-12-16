import React from "react";
import XLogo from "../../Media/XLogo.svg";
import React, { Suspense, lazy } from "react";

const MyComponent = lazy(() => import("./MyComponent"));

function App() {
  return (
    <Suspense
      fallback={
        <div>
          <img src={XLogo} />
        </div>
      }
    >
      <MyComponent />
    </Suspense>
  );
}
