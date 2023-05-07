import React from "react";
import axios from "axios";
import { useState } from "react";
import { Button } from "../button/Button";
import logo from "../images/cook-e.svg";
import "./CookE.css";

export default function CookE() {
  const [prompt, setPrompt] = useState("");
  const [calories, setCalories] = useState("");
  const [response, setResponse] = useState("");
  const [recipe, setRecipe] = useState("");
  const [materials, setMaterials] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4001/chat", { prompt: prompt })
      .then((res) => {
        console.log(prompt);
        if (res.data.recipe.includes("Instructions:")) {
            const ingredients = res.data.recipe.split("Instructions:")[0];
            const directions = res.data.recipe.split("Instructions:")[1];
            setMaterials(ingredients)
            setRecipe(directions)
        }
        if (res.data.recipe.includes("Directions:")) {
            const ingredients = res.data.recipe.split("Directions:")[0];
            const directions = res.data.recipe.split("Directions:")[1];
            setMaterials(ingredients)
            setRecipe(directions)
        }
        if (res.data.recipe.includes("Recipe:")) {
            const ingredients = res.data.recipe.split("Recipe:")[0];
            const directions = res.data.recipe.split("Recipe:")[1];
            setMaterials(ingredients)
            setRecipe(directions)
        }
        setResponse(res.data.recipe);
        setCalories(res.data.calories);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  


  return (
    <>
      <div className="cookeApp">
        <div className="appHeader">
          <img src={logo} alt="" style={{ width: "300px" }} />
          <h3 className="text-cookeapp">
            get your favourite recipe in 5 seconds
          </h3>
        </div>
        <div className="prompt">
          <form className="form" onSubmit={handleSubmit}>
            <div>
              <h3 className="text-prompt">Enter Prompt:</h3>
            </div>
            <div>
              <input
                className="input"
                placeholder="Enter the name of your meal"
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              className="btn"
              buttonStyle="btn-primary"
              buttonSize="btn-medium"
              buttonColor="dark"
            >
              Submit
            </Button>
          </form>
        </div>
        <div className="cards">
            <div className="response-container">
                <h4 className="text-container">Nutrition Facts:</h4>
                <p className="resp">Serving Size: {calories.serving_size_g ? calories.serving_size_g : "Not Available"}</p>
                <p className="resp">Calories: {calories.calories? calories.calories : "Not Available"}</p>
                <p className="resp">Total Fat: {calories.fat_total_g? calories.fat_total_g : "Not Available"}</p>
                <p className="resp">Saturated Fat: {calories.fat_saturated_g? calories.fat_saturated_g : "Not Available"}</p>
                <p className="resp">Protein: {calories.protein_g? calories.protein_g : "Not Available"}</p>
                <p className="resp">Sodium: {calories.sodium_mg? calories.sodium_mg : "Not Available"}</p>
                <p className="resp">Potassium: {calories.potassium_mg? calories.potassium_mg : "Not Available"}</p>
                <p className="resp">Cholesterol: {calories.cholesterol_mg? calories.cholesterol_mg : "Not Available"}</p>
                <p className="resp">Total Carbohydrates: {calories.carbohydrates_total_g? calories.carbohydrates_total_g : "Not Available"}</p>
                <p className="resp">Dietary Fiber: {calories.fiber_g? calories.fiber_g : "Not Available"}</p>
                <p className="resp">Sugar: {calories.sugar_g? calories.sugar_g : "Not Available"}</p>
            </div>
            
            <div className="response-container">
                <h4 className="text-container">Ingredients List:</h4>
                <ul className="resp">
                {materials.split(/\s(?=\d)/).slice(1).map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
                </ul>
            </div>
            <div className="response-container">
                <h4 className="text-container">Recipe:</h4>
                <ul className="resp">
                    {recipe.split(/\d+\./).filter(step => step.trim().length > 0).map((step, index) => (
                    <li key={index}>{step.trim()}</li>
                    ))}
                </ul>
            </div>
        </div>
      </div>
    </>
  );
}
