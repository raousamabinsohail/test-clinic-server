const ClinicInfo = require("../../models/clinic");
const { ErrorHandler } = require("../../helpers/errorhandler");
const { default: mongoose } = require("mongoose");

const ClinicInfos = {


  getAllClinics: async function (req, res, next) {
    try {
      const uid = req.params.id;
      const pipeline = [
        {
          '$match': {
            '_id': mongoose.Types.ObjectId(uid)
          }
        }, {
          '$lookup': {
            'from': 'laboratory', 
            'localField': '_id', 
            'foreignField': 'clinics', 
            'as': 'labs'
          }
        }, {
          '$lookup': {
            'from': 'physician', 
            'localField': '_id', 
            'foreignField': 'clinics', 
            'as': 'physician'
          }
        }, {
          '$lookup': {
            'from': 'patient', 
            'localField': '_id', 
            'foreignField': 'clinics', 
            'as': 'patient'
          }
        }
      ]
      const lab = await ClinicInfo.aggregate(pipeline)
      
      res.json({
        msg: "Clinic fetched Successfully",
        data: lab,
        // total: totalData,
      });
    } catch (error) {
      next(error);
    }
  },



};

module.exports = ClinicInfos;
