import React, { useContext, useState } from 'react';
const post_back = 'http://127.0.0.1:8000/referal/post_basics'
import { useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Swal from 'sweetalert2';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';

function BasicInfo() {
    const {user} = useContext(AuthContext)
    const [status, setStatus] = useState(false);
    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        FullName: "",
        TelephoneNumber: "",
        Age: "",
        Gender: "",
        MaritalStatus: "",
        EmailAddress: "",
        Nationality: "",
        Ugandan_Identification_Number:"",
        Refugee_Number:"",
        settlement: "",
        district_city: "",
        subcounty_division: "",
        parish_ward: "",
        village_cell_zone: "",
        user:user.user_id
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'radio') {
            setFormData({ ...formData, [name]: value });
        } else if (type === 'checkbox') {
            setFormData({ ...formData, [name]: checked });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSelect = (e) => {
        setFormData({ ...formData, MaritalStatus: e.target.value });
    };
    console.log(formData)

    const handleSave = ()=>{

    }

    
  const handlePhoneChange = (value) => {
    setFormData({ ...formData, TelephoneNumber: value });
  };

    const handleSubmit = (e)=>{
        setStatus(true)
      e.preventDefault()
      axios.post(post_back, formData)
      .then(response => {
        if (response.status === 201) {
          ShowSuccessAlert("Submitting Completed");
          setStatus(false)
          navigate("/application/bussiness_information");
        }
      })
      .catch(err => {
        
        Swal.fire({
            title: "Please fill in all necessary the Credentials",
            icon: "error",
            timer: 6000,
            toast: true,
            position: 'top',
            timerProgressBar: true,
            showConfirmButton: true,
          });
        if (err.response) {
          if (err.response.status === 400 && err.response.data.error) {
            Swal.fire({
              title: err.response.data.error,
              icon: "error",
              timer: 6000,
              toast: true,
              position: 'top',
              timerProgressBar: true,
              showConfirmButton: true,
            });
          } else if (err.response.data.mobile) {
            setMobileErrors(err.response.data.mobile);
          }
        } else {
          console.log(err);
        }
        setStatus(false)
      });
  };
const ShowSuccessAlert = (message) => {
  Swal.fire({
    title: message,
    icon: "success",
    timer: 6000,
    toast: true,
    position: 'top',
    timerProgressBar: true,
    showConfirmButton: true,
  });
};

    return (
        <>

        {/* main form */}
            <div className="container col-md-9 col-sm-12">
                <span className='d-flex text-center span'>
                    <i className="bi bi-person-circle"></i>
                    <h4 className='text-success'>Background Information</h4>
                </span>
                <form className='row g-3'>
                    <div className="col-md-6">
                        <label htmlFor="fullName" className="form-label">
                            Full Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="fullName"
                            name='FullName'
                            value={formData.FullName}
                            onChange={handleChange}
                            required
                           
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="telephoneNumber" className="form-label">
                            Telephone Number
                        </label>
                         <PhoneInput
            country={'ug'}
            value={formData.TelephoneNumber}
            onChange={handlePhoneChange}
            inputProps={{
                name:'TelephoneNumber',
              required: true,
              className: 'form-control',
            }}
            countryCodeEditable={false}
            required
          />
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="age" className="form-label">
                            Age
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            id="age"
                            name='Age'
                            value={formData.Age}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="col-md-6">
                            <label className="form-label">
                            Gender
                        </label>
                        <div className="bool">
                            <div className="first">
                        <div>
                            <input
                                type="radio"
                                className="form-check-input"
                                id="genderMale"
                                name="Gender"
                                value="Male"
                                checked={formData.Gender === "Male"}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="genderMale">
                                Male
                            </label>
                        </div>
                            </div>
                            <div className="second">
                            <div>
                            <input
                                type="radio"
                                className="form-check-input"
                                id="genderFemale"
                                name="Gender"
                                value="Female"
                                checked={formData.Gender === "Female"}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="genderFemale">
                                Female
                            </label>
                        </div>
                            </div>
                        </div>
                       
                      
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">
                            Marital Status
                        </label>
                        <select className="form-control" onChange={handleSelect} value={formData.MaritalStatus}>
                            <option value="">Choose Status</option>
                            <option value="Single">Single</option>
                            <option value="Married">Married</option>
                            <option value="Divorced">Divorced</option>
                            <option value="Separated">Separated</option>
                            <option value="Widowed">Widowed</option>
                        </select>
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="emailAddress" className="form-label">
                            Email Address (Optional)
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="emailAddress"
                            name='EmailAddress'
                            value={formData.EmailAddress}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">
                            Nationality
                        </label>
                        <div className="bool">
                            <div className="first">
                            <div>
                            <input
                                type="radio"
                                className="form-check-input"
                                id="nationalityUgandan"
                                name="Nationality"
                                value="Ugandan"
                                checked={formData.Nationality === "Ugandan"}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="nationalityUgandan">
                                Ugandan
                            </label>
                        </div>
                            </div>
                            <div className="second">
                            <div>
                            <input
                                type="radio"
                                className="form-check-input"
                                id="nationalityRefugee"
                                name="Nationality"
                                value="Refugee"
                                checked={formData.Nationality === "Refugee"}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="nationalityRefugee">
                                Refugee
                            </label>
                        </div>
                            </div>
                        </div>
                        
                       
                    </div>

                    {formData.Nationality === 'Ugandan' && (
                        <>
                        <div className="col-md-6">
                        <p><b>Ugandan Information</b></p>
                            <label htmlFor="identificationNumber" className="form-label">
                                National Identification Number (NIN)
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="identificationNumber"
                                name='Ugandan_Identification_Number'
                                value={formData.Ugandan_Identification_Number}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="identificationNumber" className="form-label">
                               District/City
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="identificationNumber"
                                name='district_city'
                                value={formData.district_city}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="identificationNumber" className="form-label">
                               Subcounty/Division
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="identificationNumber"
                                name='subcounty_division'
                                value={formData.subcounty_division}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="identificationNumber" className="form-label">
                               Parish/Ward
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="identificationNumber"
                                name='parish_ward'
                                value={formData.parish_ward}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="identificationNumber" className="form-label">
                                Village/Cell/Zone
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="identificationNumber"
                                name='village_cell_zone'
                                value={formData.village_cell_zone}
                                onChange={handleChange}
                            />
                        </div>

                        </>
                    )}

                    {formData.Nationality === 'Refugee' && (
                        <>
                        
                        <div className="col-md-6">
                            <p><b>Refugee Information</b></p>
                            <label htmlFor="refugeeNumber" className="form-label">
                                Refugee Number
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="refugeeNumber"
                                name='Refugee_Number'
                                value={formData.Refugee_Number}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="refugeeNumber" className="form-label">
                                Refugee Settlement
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="refugeeNumber"
                                name='settlement'
                                value={formData.settlement}
                                onChange={handleChange}
                            />
                        </div>
                        </>
                    )}

                    <div className="pro_btns ms-auto">
                        <button type="button" className="btn-register text-white p-2"  onClick={() => setShowModal(true)}>
                            Save
                        </button>
                    </div>
                </form>
            </div>



             {/* Custom Modal */}
      {showModal && (
        <div className="custom-modal-overlay">
          <div className="custom-modal">
            <div className="custom-modal-header">
              <h5 className="custom-modal-title">View Information</h5>
            </div>
            <div className="custom-modal-body">
              <form className={formData.Nationality === 'Ugandan' ? 'edit_form' : ''} onClick={handleSubmit}>
              <>
  <div className="row mb-3">
    <label
      htmlFor="colFormLabelSm"
      className="col-sm-2 col-form-label col-form-label-sm"
    >
    FullName
    </label>
    <div className="col-sm-10">
      <input
        type="text"
        className="form-control form-control-sm"
        id="colFormLabelSm"
        name='FullName'
        value={formData.FullName}
        onChange={handleChange}
        required
      />
    </div>
  </div>
  <div className="row mb-3">
    <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">
   Tel Number
    </label>
    <div className="col-sm-10">
      <input
        type="number"
        className="form-control"
        id="colFormLabel"
       name='TelephoneNumber'
       value={formData.TelephoneNumber}
       onChange={handleChange}
       required
      />
    </div>
  </div>
  <div className="row mb-3">
    <label
      htmlFor="colFormLabelLg"
      className="col-sm-2 col-form-label col-form-label-lg"
    >
      Age
    </label>
    <div className="col-sm-10">
      <input
        type="number"
        className="form-control form-control-lg"
        id="colFormLabelLg"
       name='Age'
       value={formData.Age}
       onChange={handleSave}
       required
      />
    </div>
  </div>

  <div className="row mb-3">
    <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">
  Gender
    </label>
    <div className="col-sm-10">
      <input
        type="text"
        className="form-control"
        id="colFormLabel"
        name='Gender'
        value={formData.Gender}
        onChange={handleSave}
        required
      />
    </div>
  </div>

  <div className="row mb-3">
    <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">
  Marital Status
    </label>
    <div className="col-sm-10">
    <select className="form-control" onChange={handleSelect} value={formData.MaritalStatus}>
                            <option value="">Choose Status</option>
                            <option value="Single">Single</option>
                            <option value="Married">Married</option>
                            <option value="Divorced">Divorced</option>
                            <option value="Separated">Separated</option>
                            <option value="Widowed">Widowed</option>
                        </select>
    </div>
  </div>

  <div className="row mb-3">
    <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">
  Nationality
    </label>
    <div className="col-sm-10">
      <input
        type="text"
        className="form-control"
        id="colFormLabel"
       name='Nationality'
       value={formData.Nationality}
       onChange={handleSave}
       required
      />
    </div>
  </div>

{formData.Nationality === 'Ugandan' && (
    <>
    <div className="row mb-3">
    <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">
    National Identification Number
    </label>
    <div className="col-sm-10">
      <input
        type="text"
        className="form-control"
        id="colFormLabel"
        name='Ugandan_Identification_Number'
        value={formData.Ugandan_Identification_Number}
        onChange={handleSave}
        required
      />
    </div>
  </div>


  <div className="row mb-3">
    <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">
    District/City
    </label>
    <div className="col-sm-10">
      <input
        type="text"
        className="form-control"
        id="colFormLabel"
        name='district_city'
        value={formData.district_city}
        onChange={handleSave}
        required
      />
    </div>
  </div>

  <div className="row mb-3">
    <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">
    Subcounty/Division:
    </label>
    <div className="col-sm-10">
      <input
        type="text"
        className="form-control"
        id="colFormLabel"
      name='subcounty_division'
      value={formData.subcounty_division}
      onChange={handleSave}
      required
      />
    </div>
  </div>

  <div className="row mb-3">
    <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">
    Parish/Ward
    </label>
    <div className="col-sm-10">
      <input
        type="text"
        className="form-control"
        id="colFormLabel"
        name='parish_ward'
        value={formData.parish_ward}
        onChange={handleSave}
        required
      />
    </div>
  </div>

  <div className="row mb-3">
    <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">
    Village/Cell/Zone
    </label>
    <div className="col-sm-10">
      <input
        type="text"
        className="form-control"
        id="colFormLabel"
       name='village_cell_zone'
       value={formData.village_cell_zone}
       onChange={handleSave}
       required
      />
    </div>
  </div>
    </>
)}


  {formData.Nationality === 'Refugee' && (
    <>
     <div className="row mb-3">
    <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">
    Refugee Number
    </label>
    <div className="col-sm-10">
      <input
        type="text"
        className="form-control"
        id="colFormLabel"
        name='Refugee_Number'
        value={formData.Refugee_Number}
        onChange={handleSave}
        required
      />
    </div>
  </div>

  <div className="row mb-3">
    <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">
    Refugee Settlement
    </label>
    <div className="col-sm-10">
      <input
        type="text"
        className="form-control"
        id="colFormLabel"
       name=''
       value={formData.settlement}
       onChange={handleSave}
       required
      />
    </div>
  </div>

    </>
  )}
 
</>
                <div className='edit_btns'>
                <button type="submit" className="btn-register text-white text-center p-2">
                  {status ? 'Confirming...' : 'Confirm and Continue'}
                  </button>

                  <button type="button" className="close mt-2" onClick={() => setShowModal(false)}>
                Cancel
              </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
        </>
    );
}

export default BasicInfo;
