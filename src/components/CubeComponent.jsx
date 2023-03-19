import React from "react";
import {
  ArcRotateCamera,
  Color3,
  Vector3,
  HemisphericLight,
  MeshBuilder,
  StandardMaterial,
  Texture,
} from "@babylonjs/core";
import SceneComponent from "./SceneComponent";
import { Link, useLocation } from "react-router-dom";
import MAP_TOKEN from "../constants";

const CubeComponent = (props) => {
  const location = useLocation();
  const { longitude, latitude, zoom } = location.state;
  let box;
  let url = `https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v12/static/${longitude},${latitude},${zoom},0/600x600?access_token=${MAP_TOKEN}`;
  const onSceneReady = (scene) => {
    scene.clearColor = new Color3(1, 1, 1);

    // This creates and positions a free camera (non-mesh)
    // const camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);

    // This creates a rotating camera
    const camera = new ArcRotateCamera(
      "camera1",
      -Math.PI / 2,
      Math.PI / 2.5,
      15,
      new Vector3(0, 0, 0),
      scene
    );

    camera.inertia = 0.7;

    // This targets the camera to scene origin
    camera.setTarget(Vector3.Zero());

    const canvas = scene.getEngine().getRenderingCanvas();

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.9;

    // Our built-in 'box' shape.
    box = MeshBuilder.CreateBox("box", { size: 6 }, scene);

    // Move the box upward 1/2 its height
    // box.position.y = 3;

    // Creating the material for adding texture
    const material = new StandardMaterial("material", scene);
    // Creating the texture
    material.diffuseTexture = new Texture(url, scene);
    // adding the material to the box;
    box.material = material;

    // Our built-in 'ground' shape.
    // MeshBuilder.CreateGround("ground", { width: 10, height: 6 }, scene);
  };
  /**
   * Will run on every frame render.  We are spinning the box on y-axis.
   */
  const onRender = (scene) => {
    if (box !== undefined) {
      const deltaTimeInMillis = scene.getEngine().getDeltaTime();

      const rpm = 2;
      box.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
    }
  };
  return (
    <div className="cont">
      <Link to="/">
        <button type="button" className="button">
          Go back
        </button>
      </Link>
      <SceneComponent
        antialias
        onSceneReady={onSceneReady}
        onRender={onRender}
        id="my-canvas"
      />
    </div>
  );
};
export default CubeComponent;
