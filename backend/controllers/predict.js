const axios = require('axios')

exports.predict = async(req,res) => {
    const features = req.body.features;
    try{
        const response = await axios.post('http://127.0.0.1:5000/predict', {features});
        res.status(200).json({
            success : true,
            message : 'Results predicted successfully',
            data : response.data
        })

    }catch(err)
    {
        return res.status(500).json({
            success : false,
            error : err.message
        })
    }
}