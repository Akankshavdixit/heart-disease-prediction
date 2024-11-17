import React, {useState} from 'react';
import axios from 'axios'

const Predict = () => {
    const[age , setAge] = useState('');
    const [sex, setSex] = useState('');
    const [cp, setCp] = useState('');
    const [trestbps, setTrestbps] = useState('');
    const [chol, setChol] = useState('');
    const [fbs, setFbs] = useState('');
    const [restecg, setRestecg] = useState('');
    const [thalach, setThalach] = useState('');
    const [exang, setExang] = useState('');
    const [oldpeak, setOldpeak] = useState('');
    const [slope, setSlope] = useState('');
    const [ca, setCa] = useState('');
    const [thal, setThal] = useState('');
    const [prediction, setPrediction] = useState(null);

    const handleSubmit = async(e) => {
        e.preventDefault();

        const features = [
            parseInt(age),
            parseInt(sex),
            parseInt(cp),
            parseInt(trestbps),
            parseInt(chol),
            parseInt(fbs),
            parseInt(restecg),
            parseInt(thalach),
            parseInt(exang),
            parseFloat(oldpeak),
            parseInt(slope),
            parseInt(ca),
            parseInt(thal),
        ];

        try{
            const response = await axios.post('http://localhost:8000/predict', {features});
            console.log("Response from server:", response.data);

            setPrediction(response.data.data.prediction[0]);
            

        }catch(err){
            console.error('Error making prediction:',err)
        }
    };

    return (
      <div
          className={`min-h-screen transition-colors ${
              prediction === 1 ? "bg-red-100" : prediction === 0 ? "bg-green-100" : "bg-gray-100"
          } flex flex-col items-center py-10`}
      >
          <h1 className="text-4xl font-bold mb-12 text-black">Heart Disease Prediction</h1>
          <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl px-6"
          >
              {[
                  { label: "Age", value: age, setter: setAge, description: "Age of the patient in years", type: "number" },
                  { label: "Sex", value: sex, setter: setSex, description: "1 = Male, 0 = Female", type: "number" },
                  {
                      label: "Chest Pain Type",
                      value: cp,
                      setter: setCp,
                      description: "[1: Typical angina, 2: Atypical, 3: Non-anginal, 4: Asymptomatic]",
                      type: "number",
                  },
                  {
                      label: "Resting Blood Pressure",
                      value: trestbps,
                      setter: setTrestbps,
                      description: "Blood pressure in mm Hg on hospital admission",
                      type: "number",
                  },
                  { label: "Cholesterol", value: chol, setter: setChol, description: "Serum cholesterol in mg/dl", type: "number" },
                  {
                      label: "Fasting Blood Sugar",
                      value: fbs,
                      setter: setFbs,
                      description: "1 = >120 mg/dl, 0 = <=120 mg/dl",
                      type: "number",
                  },
                  {
                      label: "Resting ECG",
                      value: restecg,
                      setter: setRestecg,
                      description: "[0: Normal, 1: ST-T abnormality, 2: LV hypertrophy]",
                      type: "number",
                  },
                  {
                      label: "Maximum Heart Rate",
                      value: thalach,
                      setter: setThalach,
                      description: "Maximum heart rate achieved",
                      type: "number",
                  },
                  {
                      label: "Exercise Angina",
                      value: exang,
                      setter: setExang,
                      description: "1 = Yes, 0 = No",
                      type: "number",
                  },
                  {
                      label: "Oldpeak",
                      value: oldpeak,
                      setter: setOldpeak,
                      description: "ST depression induced by exercise",
                      type: "number",
                  },
                  {
                      label: "Slope of ST Segment",
                      value: slope,
                      setter: setSlope,
                      description: "[0: Upsloping, 1: Flat, 2: Downsloping]",
                      type: "number",
                  },
                  {
                      label: "Major Vessels (ca)",
                      value: ca,
                      setter: setCa,
                      description: "Number of vessels (0-3) colored by fluoroscopy",
                      type: "number",
                  },
                  {
                      label: "Thalassemia",
                      value: thal,
                      setter: setThal,
                      description: "[1: Normal, 2: Fixed defect, 3: Reversible defect]",
                      type: "number",
                  },
              ].map((field, index) => (
                  <div
                      key={index}
                      className="bg-slate-200 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
                  >
                      <h2 className="font-semibold text-lg mb-2">{field.label}</h2>
                      <p className="text-sm text-gray-600 mb-4">{field.description}</p>
                      <input
                          type={field.type}
                          value={field.value}
                          onChange={(e) => field.setter(e.target.value)}
                          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                  </div>
              ))}
              <button
                  type="submit"
                  className="col-span-1 md:col-span-3 bg-black text-white px-6 py-3 rounded-lg shadow hover:bg-gray-800 transition"
              >
                  Predict
              </button>
          </form>
          {prediction !== null && (
              <div
                  className={`mt-6 p-4 rounded text-white font-bold ${
                      prediction === 1 ? "bg-red-500" : "bg-green-500"
                  }`}
              >
                  Prediction: {prediction === 1 ? "Heart Disease Detected" : "No Heart Disease"}
              </div>
          )}
      </div>
  );

};

export default Predict;

