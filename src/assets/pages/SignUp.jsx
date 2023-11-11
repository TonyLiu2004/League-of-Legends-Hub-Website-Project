import React, {useState} from 'react';
import {supabase} from '../../client';
import {Link} from 'react-router-dom';

const SignUp = () => { 
    const [formData, setFormData] = useState({
        name: "", email: "", password: ""
    })

    console.log(formData);
    const handleChange = (e) =>{
        setFormData((prevData) => {
            return{
                ...prevData, [e.target.name] : e.target.value
            }
        })
    }

    const handleSubmit = async (e) =>{   
        e.preventDefault();
        try{
            const { data, error } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: {
                        full_name: formData.name
                    }
                }
              }
            );

            if(error) throw error
            alert("Check your email for verification.");
        } catch (error) {
            alert(error.message);
        }
    }
    return(
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder='Name'
                    name='name'
                    onChange={handleChange}
                />
                <input
                    placeholder='Email'
                    name='email'
                    onChange={handleChange}
                />
                <input
                    placeholder='password'
                    name='password'
                    type='password'
                    onChange={handleChange}
                />
                <button type='submit'>Submit</button>
            </form>
            Already have an account? <Link to="/login">Login</Link>
        </div>
    )
}

export default SignUp;