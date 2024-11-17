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

    return(

        <div className="bg-slate-300">
      <h1>Heart Disease Prediction</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Age:
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </label>
        <br />
        <label>
          Sex (1 = male, 0 = female):
          <input
            type="number"
            value={sex}
            onChange={(e) => setSex(e.target.value)}
          />
        </label>
        <br />
        <label>
          Chest Pain Type (cp):
          <input
            type="number"
            value={cp}
            onChange={(e) => setCp(e.target.value)}
          />
        </label>
        <br />
        <label>
          Resting Blood Pressure (trestbps):
          <input
            type="number"
            value={trestbps}
            onChange={(e) => setTrestbps(e.target.value)}
          />
        </label>
        <br />
        <label>
          Serum Cholesterol (chol):
          <input
            type="number"
            value={chol}
            onChange={(e) => setChol(e.target.value)}
          />
        </label>
        <br />
        <label>
          Fasting Blood Sugar greater than 120 mg/dl (fbs):
          <input
            type="number"
            value={fbs}
            onChange={(e) => setFbs(e.target.value)}
          />
        </label>
        <br />
        <label>
          Resting Electrocardiographic Results (restecg):
          <input
            type="number"
            value={restecg}
            onChange={(e) => setRestecg(e.target.value)}
          />
        </label>
        <br />
        <label>
          Maximum Heart Rate (thalach):
          <input
            type="number"
            value={thalach}
            onChange={(e) => setThalach(e.target.value)}
          />
        </label>
        <br />
        <label>
          Exercise Induced Angina (exang):
          <input
            type="number"
            value={exang}
            onChange={(e) => setExang(e.target.value)}
          />
        </label>
        <br />
        <label>
          Depression Induced by Exercise (oldpeak):
          <input
            type="number"
            value={oldpeak}
            onChange={(e) => setOldpeak(e.target.value)}
          />
        </label>
        <br />
        <label>
          Slope of Peak Exercise ST Segment (slope):
          <input
            type="number"
            value={slope}
            onChange={(e) => setSlope(e.target.value)}
          />
        </label>
        <br />
        <label>
          Number of Major Vessels Colored by Fluoroscopy (ca):
          <input
            type="number"
            value={ca}
            onChange={(e) => setCa(e.target.value)}
          />
        </label>
        <br />
        <label>
          Thalassemia (thal):
          <input
            type="number"
            value={thal}
            onChange={(e) => setThal(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>

      {prediction && (
        <div>
          <h3>Prediction: {prediction === 1 ? 'Heart Disease' : 'No Heart Disease'}</h3>
        </div>
      )}
    </div>

    )

};

export default Predict;

