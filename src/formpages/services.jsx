import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../Context/AuthContext';

const post_back = 'http://127.0.0.1:8000/referal/post_services';
const modules = 'http://127.0.0.1:8000/referal/modules';

function Services() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [status, setStatus] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [module, setModule] = useState([]);
    const [formData, setFormData] = useState({
        user: user.user_id,
        reason_for_additional_services: "",
        modules_interested_in: [], // Changed to an array for multiple selections
        confirmation: false
    });

    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        if (type === 'checkbox') {
            if (name === 'confirmation') {
                setFormData({ ...formData, [name]: checked });
            } else {
                // Handle multiple checkboxes
                const updatedModules = checked
                    ? [...formData.modules_interested_in, value]
                    : formData.modules_interested_in.filter(module => module !== value);
                setFormData({ ...formData, modules_interested_in: updatedModules });
            }
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const fetchModules = async () => {
        try {
            const response = await axios.get(modules);
            const data = response.data;
            setModule(data);
        } catch (err) {
            console.log(err);
        }
    };
console.log(formData)
    useEffect(() => {
        fetchModules();
    }, []);

    // Determine if all required fields are filled
    const isFormValid =
        formData.reason_for_additional_services !== '' &&
        formData.modules_interested_in.length > 0 &&
        formData.confirmation;

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus(true);
        axios.post(post_back, formData)
            .then(response => {
                if (response.status === 201) {
                    ShowSuccessAlert("Submitting Completed");
                    setStatus(false);
                    navigate("/complete");
                }
            })
            .catch(err => {
                Swal.fire({
                    title: "Please fill in all necessary credentials",
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
                    }
                } else {
                    console.log(err);
                }
                setStatus(false);
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
            <div className="container col-md-9 col-sm-12">
                <span className='d-flex text-center span'>
                    <i className="bi bi-person-circle"></i>
                    <h4 className='text-success'>Business Information</h4>
                </span>
                <form className='row g-3'>
                    <div className="col-md-6">
                        <label htmlFor="name" className="form-label">
                            Please indicate the primary reason for seeking additional GROW services
                        </label>
                        <select onChange={handleChange} className="form-control" name="reason_for_additional_services">
                            <option value="">Choose Enterprise</option>
                            <option value="Networking and Marketing">Networking and Marketing</option>
                            <option value="Core Business Development">Core Business Development</option>
                            <option value="Sector specific skilling">Sector specific skilling</option>
                            <option value="Work Placement Program">Work Placement Program</option>
                        </select>

                        <div className='mt-3'>
                            <label htmlFor="confirmation" className="form-label">
                                Confirmation
                            </label>
                            <div className="check">
                                <input
                                    type="checkbox"
                                    id="confirmation"
                                    name='confirmation'
                                    checked={formData.confirmation}
                                    onChange={handleChange}
                                />
                                I declare and confirm that the information provided above is true and accurate to the best of my knowledge.
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="modules" className="form-label">
                            If you chose core business development as a service in 14.a, tick the modules you are interested in.
                        </label>
                        <div className="mb-3 label_form">
                            {module.map((list, index) => {
                                const { module } = list;
                                return (
                                    <div key={index}>
                                        <label>
                                            <input
                                                type="checkbox"
                                                name="modules_interested_in"
                                                value={module}
                                                checked={formData.modules_interested_in.includes(module)}
                                                onChange={handleChange}
                                            />
                                            {module}
                                        </label>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="pro_btns ms-auto">
                        <button
                            type="button"
                            className="btn-register text-white p-2"
                            onClick={() => setShowModal(true)}
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>

            {showModal && (
                <div className="custom-modal-overlay">
                    <div className="custom-modal buss">
                        <div className="custom-modal-header">
                            <h5 className="custom-modal-title">View Information</h5>
                        </div>
                        <div className="custom-modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className="row mb-3">
                                    <label htmlFor="reason_for_additional_services" className="col-sm-2 col-form-label col-form-label-sm">
                                        Reason
                                    </label>
                                    <div className="col-sm-10">
                                        <input
                                            type="text"
                                            className="form-control form-control-sm"
                                            id="reason_for_additional_services"
                                            name='reason_for_additional_services'
                                            value={formData.reason_for_additional_services}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="modules_interested_in" className="col-sm-2 col-form-label">
                                        Modules
                                    </label>
                                    <div className="col-sm-10">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="modules_interested_in"
                                            name='modules_interested_in'
                                            value={formData.modules_interested_in.join(', ')} // Display selected modules as a comma-separated string
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="confirmation" className="col-sm-2 col-form-label col-form-label-lg">
                                        Confirmation
                                    </label>
                                    <div className="col-sm-10">
                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            id="confirmation"
                                            name='confirmation'
                                            value={formData.confirmation ? 'Confirmed' : 'Not Confirmed'}
                                            readOnly
                                        />
                                    </div>
                                </div>

                                <div className='edit_btns'>
                                    <button type="submit" className="btn-register text-white text-center p-2 bt" disabled={!isFormValid || status}>
                                        {status ? 'Confirming...' : 'Complete Application'}
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

export default Services;
