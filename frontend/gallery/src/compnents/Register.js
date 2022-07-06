import React,{useState,useEffect} from 'react';
import "./styles/register.css"
import "bootstrap/dist/css/bootstrap.css";
import Footer from './Footer';
import { first,second,feb,month,year } from './general';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
const Register = () => {

    // states:
    const [firstname,setFirstname] = useState("")
    const [lastname,setLastname] = useState("")
    const [email,setEmail] = useState("");
    const [username,setUsername] = useState("")
    const [occupation,setOccupation] = useState("")
    const [password,setPassword] = useState("")
    const [cpassword,setCPassword] = useState("")
    
    const [d,setDay] = useState()
    const [m,setMonth] = useState()
    const [y,setYear] = useState()
    const [dob,setDOB] = useState({
        day:d,
        month:m,
        year:y
    })
    const [country,setUserCountry] = useState()

    const history = useNavigate()

    const handleChange = ()=>{
        setDOB({
            day:d,
            month:m,
            year:y
        })
    }
    const user_register = async (e)=>{
        e.preventDefault()
        

        if(password === cpassword)
        {
            const res = await axios.post('/api/v1/register',{
                
               
                firstname,lastname,email,username,occupation,country,password,dob
                
            })
            console.log("AFTER POST");
            // const res = await user.json();
            if(!res || res.status==404) 
            {
                alert("Registration Unsuccessful!");
                console.log(res.message);
            }
            else {
                alert("Registration Successful!");
                history('/login')
            }
        }else{
            console.log("Enter correct credentials!");
        }
    }

    const getCountries = async()=>{
        try{
            const data = await fetch('https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases2_v1/FeatureServer/2/query?where=1%3D1&outFields=Country_Region&outSR=4326&f=json')
        const actual = await data.json()
        // console.log(actual.features[0].attributes.Country_Region);
        const country = []
        for(let i =0;i<=195;i++){
            country.push(actual.features[i].attributes.Country_Region)
        }setCountry(country)
        }catch(err){
        console.log(err);
        }
    }

    const [countries,setCountry] = useState([])
    const [date,setDate] = useState([])

    const getDate = (e)=>{
        if (e==1||e==3||e==5||e==7||e==8||e==10||e==12)
            setDate(first);
        else if(e==4||e==6||e==9||e==11)
            setDate(second);
        else setDate(feb)    
    }
    
    useEffect(()=>{
        getCountries()
    },[])
  return <>
  <div className="register_main">
        <div className='register_form'>
            {/* <div className='social_method'>
                <button className='google'>Login through <i className="fab fa-google"></i></button>
                
                
            </div> */}
            <hr className="divide"/>
           <form onSubmit={user_register} method="POST">
                <div className='reg_email'>
                    <label htmlFor='email'>Email : </label><br/>
                    <input type="email" className='input_email' autoComplete='off'
                    value={email} onChange={(e)=>setEmail(e.target.value)}/><br/>
                </div>
                
                <div className="reg_first">
                    <label htmlFor='firstname' >Firstname : </label><br/>
                    <input type="text" autoComplete='off'
                    value={firstname} onChange={(e)=>setFirstname(e.target.value)}/>
                </div>
                <div className='reg_last'>
                    <label htmlFor='lastname'>Lastname : </label><br/>
                    <input type="text" autoComplete='off'
                    value={lastname} onChange={(e)=>setLastname(e.target.value)}/>
                </div>
                <br/>
                <div className='reg_occupation'>
                    <label htmlFor='occupation' >Occupation : </label><br/>
                    <input type="text" className='input_occ' autoComplete='off'
                    value={occupation} onChange={(e)=>setOccupation(e.target.value)}/><br/>
                </div>

                <div className='user'>
                    <label htmlFor='occupation' >Username : </label><br/>
                    <input type="text" className='username' autoComplete='off'
                    value={username} onChange={(e)=>setUsername(e.target.value)}/><br/>
                </div>

                <div className='reg_password'>
                    <label htmlFor='password'>Password : </label><br/>
                    <input type="password" className='input_pass' autoComplete='off'
                    value={password} onChange={(e)=>setPassword(e.target.value)}/><br/>
                </div>
                <div className='reg_cpassword'>
                    <label htmlFor='cpassword'>Confirm Password : </label>
                    <br/><input type="password" className='input_cpass' autoComplete='off'
                    value={cpassword} onChange={(e)=>setCPassword(e.target.value)}/><br/>
                </div>
                <div className="dob">
                <label>Date of birth (DD/MM/YYYY)</label><br/>
                
                    <div className='Day'>
                        <select name="days" className='days' value={d} onChange={(e)=>setDay(e.target.value)}>
                            <option> Day</option>
                            {
                                date.map((ele)=>{
                                    return   <option value={ele}>{ele}</option>
                                })
                            }   
                        </select>
                    </div>
                    <div className='Month'>
                        
                        <select name="month" className='months' onClick={(e)=>getDate(e.target.value)}
                        value={m} onChange={(e)=>setMonth(e.target.value)}>
                            <option>Month</option>
                            {
                                month.map((ele)=>{
                                    return <option value={ele}>{ele}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className='Year'>
                        <select name="year" className='years'
                        value={y} onChange={(e)=>setYear(e.target.value)} onClick = {handleChange}>
                            <option>Year</option>
                            {
                                year.map((ele)=>{
                                    return <option value={ele}>{ele}</option>
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className='country'>
                    <label htmlFor='country'>Country : </label><br/>
                    <select name="country" className='countries'
                    value={country} onChange={(e)=>setUserCountry(e.target.value)}>
                        <option>Select Your Country</option>
                           {
                               countries.map((ele,index)=>{
                                   return <option value={ele}>{ele}</option>
                               })
                           } 
                        </select>
                </div>
                <div className='accept'>
                    <button className='custom' >Create Account</button>
                </div>
               
            </form> 
        </div>
        
  </div><Footer/></>;
};

export default Register;
