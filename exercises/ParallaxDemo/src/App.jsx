import "./App.css";
import { Canvas, useFrame } from "@react-three/fiber";
import { Mesh } from "./Mesh";

function App() {
  return (
    <>
      <div className="container">
        <div className="card hero">
          <h1>
            Conheça o melhor <span>café</span> para a sua empresa!
          </h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis,
            cum. Laborum neque illo illum dicta placeat distinctio, officiis
            corrupti dolorum in ex enim necessitatibus repellendus odio quisquam
            iusto atque quae.
          </p>
          <button className="cta">
            <strong>Saiba mais</strong>
          </button>
        </div>
        <div className="card">
          <Canvas>
            <Mesh />
          </Canvas>
        </div>
      </div>
    </>
  );
}

export default App;
